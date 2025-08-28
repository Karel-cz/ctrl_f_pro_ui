//@@viewOn:imports
import React, { useState } from "react";

import { tabsProps } from "./utils/prop-types.js";
//@@viewOff:imports

//@@viewOn:helpers
function getTabStyle(isActive, customStyle) {
  return {
    padding: "8px 16px",
    cursor: "pointer",
    borderBottom: isActive ? "2px solid black" : "2px solid transparent",
    fontWeight: isActive ? "bold" : "normal",
    opacity: isActive ? 1 : 0.7,
    ...customStyle,
  };
}
//@@viewOff:helpers

//@@viewOn:render
function Tabs({
  itemList = [],
  activeCode,
  onChange,
  style: customStyle,
  hidden,
  contentMaxHeight,
}) {
  // ✅ Hook vždy nahoře – nikdy podmíněně
  const [internalActive, setInternalActive] = useState(
    activeCode ?? (itemList.length > 0 ? itemList[0].code : null)
  );

  if (hidden) return null;

  const currentActive = activeCode || internalActive;

  function handleClick(item) {
    if (item.onClick) item.onClick(item.code);
    if (!activeCode) setInternalActive(item.code); // controlled vs uncontrolled
    if (onChange) onChange(item.code);
  }

  const activeItem = itemList.find((i) => i.code === currentActive);

  return (
    <div style={{ ...customStyle }}>
      {/* tab headers */}
      <div style={{ display: "flex", borderBottom: "1px solid #ccc" }}>
        {itemList.map((item) => (
          <div
            key={item.code}
            style={getTabStyle(item.code === currentActive, item.style)}
            onClick={() => handleClick(item)}
          >
            {item.icon && <span style={{ marginRight: "6px" }}>{item.icon}</span>}
            {item.label}
          </div>
        ))}
      </div>

      {/* tab content */}
      <div
        style={{
          padding: "12px",
          maxHeight: contentMaxHeight || "auto",
          overflow: contentMaxHeight ? "auto" : "visible",
        }}
      >
        {activeItem?.children}
      </div>
    </div>
  );
}
//@@viewOff:render

//@@viewOn:exports
Tabs.propTypes = tabsProps;
export default Tabs;
//@@viewOff:exports
