//@@viewOn:imports
import React, { createContext, useContext, useEffect, useState } from "react";
import { highlightWord } from "./helpers/helpers.js";
//@@viewOff:imports

//@@viewOn:helpers
const SearchContext = createContext(null);
export function useSearch() {
  return useContext(SearchContext);
}
//@@viewOff:helpers

//@@viewOn:exports
export function SearchProvider({ children }) {
  const [searchValue, setSearchValue] = useState("");
  const [lastResult, setLastResult] = useState({ count: 0, sample: [] });

  useEffect(() => {
    let stop = false;

    async function run() {
      try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (!tab?.id) return;

        const [res] = await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: highlightWord, // funkce z helpers.js
          args: [searchValue],
        });

        if (stop) return;
        setLastResult(res?.result || { count: 0, sample: [] });
      } catch (e) {
        console.error("[Ctrl-F Pro] executeScript error:", e);
      }
    }

    run();
    return () => {
      stop = true;
    };
  }, [searchValue]);

  const ctx = { searchValue, setSearchValue, lastResult };

  return <SearchContext.Provider value={ctx}>{children}</SearchContext.Provider>;
}
//@@viewOff:exports
