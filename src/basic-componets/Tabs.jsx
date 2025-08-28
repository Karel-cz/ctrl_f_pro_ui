//@@viewOn:imports
import React, { useState } from "react";
//@@viewOff:imports

//@@viewOn:helpers
function getTabStyle(isActive, customStyle) {
  return {
    minWidth: 120,
    padding: "8px 16px",
    cursor: "pointer",
    borderBottom: isActive ? "2px solid black" : "2px solid transparent",
    fontWeight: isActive ? 600 : 400,
    opacity: isActive ? 1 : 0.7,
    display: "flex",

    ...customStyle,
  };
}

function renderIcon(ic, extraStyle) {
  if (!ic) return null;
  if (typeof ic === "string") {
    return <i className={`mdi ${ic}`} style={extraStyle} />;
  }
  return <span style={extraStyle}>{ic}</span>;
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
  const [internalActive, setInternalActive] = useState(
    activeCode ?? (itemList.length > 0 ? itemList[0].code : null)
  );

  if (hidden) return null;

  const currentActive = activeCode || internalActive;

  function handleClick(item) {
    if (item.onClick) item.onClick(item.code);
    if (!activeCode) setInternalActive(item.code);
    if (onChange) onChange(item.code);
  }

  const activeItem = itemList.find((i) => i.code === currentActive);

  const leftItems = itemList.filter((i) => !i.alignRight);
  const rightItems = itemList.filter((i) => i.alignRight);

  return (
    <div style={{ ...customStyle }}>
      {/* tab headers */}
      <div
        style={{
          display: "flex",
          borderBottom: "1px solid #ccc",
          alignItems: "center",
          height: "40px",
        }}
      >
        {/* left group */}
        <div style={{ display: "flex" }}>
          {leftItems.map((item) => (
            <div
              key={item.code}
              style={getTabStyle(item.code === currentActive, item, item.style)}
              onClick={() => handleClick(item)}
            >
              {renderIcon(item.icon, { marginRight: item.label ? "6px" : 0 })}
              {item.label}
            </div>
          ))}
        </div>

        <div style={{ minWidth: 40 }}></div>

        {/* right group */}
        <div
          style={{
            display: "flex",
            marginLeft: "auto",
            textAlign: "right",
          }}
        >
          {rightItems.map((item) => (
            <div
              key={item.code}
              style={getTabStyle(item.code === currentActive, item, item.style)}
              onClick={() => handleClick(item)}
            >
              {renderIcon(item.icon, { marginRight: item.label ? "6px" : 0 })}
              {item.label}
            </div>
          ))}
        </div>
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
export default Tabs;
//@@viewOff:exports
