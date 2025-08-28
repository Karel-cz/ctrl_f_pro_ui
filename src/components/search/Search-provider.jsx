//@@viewOn:imports
import React, { createContext, useContext, useState } from "react";
//@@viewOff:imports

//@@viewOn:helpers
const SearchContext = createContext(null);

export function useSearch() {
  return useContext(SearchContext);
}
//@@viewOff:helpers

//@@viewOn:render
export function SearchProvider({ children }) {
  const [searchValue, setSearchValue] = useState("");

  const value = {
    setSearchValue,
    searchValue,
  };

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
}
//@@viewOff:render
