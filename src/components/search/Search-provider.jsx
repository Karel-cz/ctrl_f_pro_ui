//@@viewOn:imports
import React, { createContext, useContext, useEffect, useState } from "react";
import { highlightWordFuzzy, highlightWord } from "./helpers/helpers.js";
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

  const [isFuzzy, setIsFuzzy] = useState(false);

  // highlight logic
  useEffect(() => {
    let stop = false;

    async function run() {
      try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (!tab?.id) return;

        const [res] = await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: isFuzzy ? highlightWordFuzzy : highlightWord,
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
  }, [searchValue, isFuzzy]);

  const ctx = { searchValue, setSearchValue, lastResult, isFuzzy, setIsFuzzy };

  return <SearchContext.Provider value={ctx}>{children}</SearchContext.Provider>;
}
//@@viewOff:exports
