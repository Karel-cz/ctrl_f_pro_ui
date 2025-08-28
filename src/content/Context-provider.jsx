//@@viewOn:imports
import React, { createContext, useContext } from "react";
import Icons from "../utils/enums.js";
//@@viewOff:imports

//@@viewOn:helpers
const Context = createContext(null);

export function useProjectContext() {
  return useContext(Context);
}

//@@viewOff:helpers

//@@viewOn:render
export function ContextProvider({ children }) {
  const value = {
    Icons,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}
//@@viewOff:render
