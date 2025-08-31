//@@viewOn:imports
import React, { createContext, useContext, useEffect, useState } from "react";
//@@viewOff:imports

//@@viewOn:helpers
// Kontext + hook
const SearchContext = createContext(null);
export function useSearch() {
  return useContext(SearchContext);
}

/**
 * Tohle se spouští PŘÍMO na stránce přes chrome.scripting.executeScript.
 * Musí být samostatné (bez závislostí zvenku).
 *
 * Cíl: bezpečně zvýraznit shody (bez innerHTML), a vrátit:
 *  - count: celkový počet shod
 *  - sample: až 20 výřezů (~200 znaků) kolem shod
 *  - frame: URL konkrétního rámu (kvůli debug/slévání)
 */
function highlightWord(word) {
  // --- nastavení
  const MAX_SNIPPETS = 20; // kolik výřezů max vrátit
  const CONTEXT = 100; // kolik znaků vlevo/vpravo od shody

  // --- utilita: smazání starých zvýraznění
  function clearHighlights(root) {
    const marks = root.querySelectorAll("mark[data-search-highlight]");
    for (const mark of marks) {
      const parent = mark.parentNode;
      if (!parent) continue;
      while (mark.firstChild) parent.insertBefore(mark.firstChild, mark);
      parent.removeChild(mark);
      parent.normalize();
    }
  }

  // --- utilita: které elementy přeskočit (skripty, inputy, atd.)
  function shouldSkip(el) {
    if (!el || el.nodeType !== 1) return false;
    const SKIP = {
      SCRIPT: 1,
      STYLE: 1,
      NOSCRIPT: 1,
      IFRAME: 1,
      TEXTAREA: 1,
      INPUT: 1,
      SELECT: 1,
      OPTION: 1,
      CODE: 1,
      PRE: 1,
      KBD: 1,
      SAMP: 1,
      CANVAS: 1,
      SVG: 1,
      IMG: 1,
      VIDEO: 1,
      AUDIO: 1,
    };
    if (SKIP[el.nodeName]) return true;
    if (el.isContentEditable) return true;
    return false;
  }

  // --- utilita: získej všechny textové uzly, kde by mohla být shoda
  function collectTextNodes(root, qLower) {
    const found = [];
    const walker = document.createTreeWalker(root.body || root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentNode;
        if (!parent || shouldSkip(parent)) return NodeFilter.FILTER_REJECT;
        const text = node.nodeValue;
        if (!text || !text.trim()) return NodeFilter.FILTER_REJECT;
        return text.toLowerCase().includes(qLower)
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_SKIP;
      },
    });
    for (let n = walker.nextNode(); n; n = walker.nextNode()) found.push(n);
    return found;
  }

  // --- utilita: pro daný textový uzel najdi shody, vrať jejich rozsahy
  function findRangesInNode(text, qLower) {
    const ranges = [];
    const lower = text.toLowerCase();
    const len = qLower.length;
    if (!len) return ranges;
    let i = 0;
    while (true) {
      const pos = lower.indexOf(qLower, i);
      if (pos === -1) break;
      ranges.push([pos, pos + len]);
      i = pos + len;
    }
    return ranges;
  }

  // --- utilita: z rozsahu vytvoř „výřez“ kolem shody (~200 znaků)
  function makeSnippet(text, start, end) {
    const left = Math.max(0, start - CONTEXT);
    const right = Math.min(text.length, end + CONTEXT);
    let slice = text.slice(left, right).replace(/\s+/g, " ").trim();
    if (left > 0) slice = "…" + slice;
    if (right < text.length) slice = slice + "…";
    return slice;
  }

  // --- utilita: faktické obalení shody <mark> elementem (bez innerHTML)
  function wrapRangesInNode(textNode, ranges) {
    // jdeme od konce, aby se indexy „nerozjížděly“
    let cur = textNode;
    for (let i = ranges.length - 1; i >= 0; i--) {
      const [start, end] = ranges[i];
      const after = cur.splitText(end);
      const mid = cur.splitText(start);
      const mark = document.createElement("mark");
      mark.setAttribute("data-search-highlight", "");
      mark.style.background = "yellow";
      mark.appendChild(mid);
      after.parentNode.insertBefore(mark, after);
      cur = after;
    }
  }

  // --- hlavní tok funkce
  const root = document;
  clearHighlights(root);
  if (!word) {
    return { count: 0, sample: [], frame: location.href };
  }

  const qLower = String(word).toLowerCase();
  const nodes = collectTextNodes(root, qLower);

  let totalCount = 0;
  const snippets = [];

  for (const node of nodes) {
    const text = node.nodeValue || "";
    const ranges = findRangesInNode(text, qLower);
    if (ranges.length === 0) continue;

    // čísla + výřezy
    totalCount += ranges.length;
    for (const [start, end] of ranges) {
      if (snippets.length < MAX_SNIPPETS) {
        snippets.push(makeSnippet(text, start, end));
      } else {
        break;
      }
    }

    // obalení shod <mark> elementem
    wrapRangesInNode(node, ranges);
  }

  return { count: totalCount, sample: snippets, frame: location.href };
}
//@@viewOff:helpers

//@@viewOn:exports
export function SearchProvider({ children }) {
  // --- veřejný stav v kontextu
  const [searchValue, setSearchValue] = useState(""); // co uživatel hledá
  const [lastResult, setLastResult] = useState({ count: 0, sample: [] }); // souhrn výsledků
  const [framesInfo, setFramesInfo] = useState([]); // přehled po framech
  const [logs, setLogs] = useState([]); // jednoduché logy do popupu

  // přidej řádek do log panelu (drž max ~50)
  function logLine(msg, data) {
    const text =
      `${new Date().toLocaleTimeString()} ${msg}` + (data ? ` ${JSON.stringify(data)}` : "");
    setLogs((arr) => (arr.length >= 50 ? [...arr.slice(-49), text] : [...arr, text]));
  }

  // kdykoli se změní hledaný text → spustíme zvýraznění v aktivním tabu
  useEffect(() => {
    let stop = false;

    async function run() {
      // pojistka: běž v popupu i bez chrome API (lokální vývoj / jiné prostředí)
      const canRun =
        typeof chrome !== "undefined" &&
        chrome?.tabs &&
        chrome?.scripting &&
        typeof chrome.scripting.executeScript === "function";

      if (!canRun) {
        logLine("[skip] chrome APIs nejsou dostupné");
        return;
      }

      try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (!tab?.id) {
          logLine("[warn] Bez aktivního tabu");
          return;
        }

        // spuštění ve VŠECH framech, izolovaný svět (výchozí) – žádné kolize se stránkou
        const frames = await chrome.scripting.executeScript({
          target: { tabId: tab.id, allFrames: true },
          func: highlightWord,
          args: [searchValue],
        });

        if (stop) return;

        // slévání výsledků napříč framy
        let total = 0;
        const mergedSnippets = [];
        const perFrame = [];

        for (const f of frames || []) {
          const r = f?.result;
          if (!r) continue;
          total += r.count || 0;
          perFrame.push({ frame: r.frame, count: r.count });

          for (const s of r.sample || []) {
            if (mergedSnippets.length >= 20) break;
            mergedSnippets.push(s);
          }
        }

        setLastResult({ count: total, sample: mergedSnippets });
        setFramesInfo(perFrame);

        logLine("[result]", { total, frames: perFrame.length });
      } catch (e) {
        console.error("[Ctrl-F Pro] executeScript error:", e);
        logLine("[error]", { message: e?.message || String(e) });
      }
    }

    run();
    return () => {
      stop = true;
    };
  }, [searchValue]);

  // hodnoty, které dostanou komponenty v popupu
  const ctx = {
    searchValue, // string
    setSearchValue, // setter pro input
    lastResult, // { count, sample[snippety] }
    framesInfo, // [{ frame, count }]
    logs, // string[]
    clearLogs: () => setLogs([]), // vymazání log panelu
  };

  return <SearchContext.Provider value={ctx}>{children}</SearchContext.Provider>;
}
//@@viewOff:exports
