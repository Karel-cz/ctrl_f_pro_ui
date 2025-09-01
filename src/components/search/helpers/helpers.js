/**
 * highlightWord(query)
 * Tahle funkce se spouští přímo v prohlížeči pomocí chrome.scripting.executeScript.
 * Musí být "self-contained", tj. obsahovat všechny pomocné funkce uvnitř.
 *
 * Vrací objekt:
 *  - count: počet nalezených shod
 *  - sample: ukázkové úryvky textu kolem shody (max 20)
 *  - frame: URL frame, kde se hledalo
 */
export function highlightWord(query) {
  const CONTEXT = 100; // kolik znaků vlevo/vpravo dát do snippetu
  const MAX_SNIPPETS = 20; // kolik snippetů maximálně vrátit

  // ===== Pomocné funkce =====

  // Smaže staré zvýraznění <mark>
  function clearMarks(root) {
    const marks = root.querySelectorAll("mark[data-search-highlight]");
    for (const m of marks) {
      const p = m.parentNode;
      if (!p) continue;
      while (m.firstChild) p.insertBefore(m.firstChild, m);
      p.removeChild(m);
      p.normalize();
    }
  }

  // Zkontroluje, jestli element nemáme procházet (skripty, inputy, atd.)
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
    return !!(SKIP[el.nodeName] || el.isContentEditable);
  }

  // Najde všechny textové uzly, které obsahují hledaný výraz
  function collectTextNodes(root, qLower) {
    const nodes = [];
    const walker = document.createTreeWalker(root.body || root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const p = node.parentNode;
        if (!p || shouldSkip(p)) return NodeFilter.FILTER_REJECT;
        const t = node.nodeValue;
        if (!t || !t.trim()) return NodeFilter.FILTER_REJECT;
        return t.toLowerCase().includes(qLower) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
      },
    });
    for (let n = walker.nextNode(); n; n = walker.nextNode()) nodes.push(n);
    return nodes;
  }

  // Vrátí všechny rozsahy [start, end) pro hledaný výraz v textu
  function findRanges(text, qLower) {
    const out = [];
    const low = text.toLowerCase();
    const len = qLower.length;
    if (!len) return out;
    let i = 0;
    while (true) {
      const pos = low.indexOf(qLower, i);
      if (pos === -1) break;
      out.push([pos, pos + len]);
      i = pos + len;
    }
    return out;
  }

  // Udělá snippet – úryvek textu kolem shody
  function makeSnippet(text, s, e, context = CONTEXT) {
    const left = Math.max(0, s - context);
    const right = Math.min(text.length, e + context);
    let slice = text.slice(left, right).replace(/\s+/g, " ").trim();
    if (left > 0) slice = "…" + slice;
    if (right < text.length) slice = slice + "…";
    return slice;
  }

  // Obarví shody pomocí <mark>
  function wrapRanges(textNode, ranges) {
    let cur = textNode;
    for (let i = ranges.length - 1; i >= 0; i--) {
      const [s, e] = ranges[i];
      const after = cur.splitText(e);
      const mid = cur.splitText(s);
      const mark = document.createElement("mark");
      mark.setAttribute("data-search-highlight", "");
      mark.style.background = "yellow";
      mark.appendChild(mid);
      after.parentNode.insertBefore(mark, after);
      cur = after;
    }
  }

  // Zpracuje jeden uzel – vrátí počet shod a přidá snippety
  function processNode(node, qLower, outSnippets, maxSnippets) {
    const text = node.nodeValue || "";
    const ranges = findRanges(text, qLower);
    if (!ranges.length) return 0;

    for (const [s, e] of ranges) {
      if (outSnippets.length >= maxSnippets) break;
      outSnippets.push(makeSnippet(text, s, e));
    }

    wrapRanges(node, ranges);
    return ranges.length;
  }

  // ===== Hlavní běh =====

  const root = document;
  clearMarks(root);

  if (!query) return { count: 0, sample: [], frame: location.href };

  const qLower = String(query).toLowerCase();
  const nodes = collectTextNodes(root, qLower);

  let total = 0;
  const sample = [];

  for (const node of nodes) {
    total += processNode(node, qLower, sample, MAX_SNIPPETS);
  }

  return { count: total, sample, frame: location.href };
}
