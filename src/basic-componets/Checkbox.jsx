//@@viewOn:imports
import React from "react";
//@@viewOff:imports

//@@viewOn:constants
const SIZE = {
  small: "6px 8px",
  medium: "8px 12px",
  large: "10px 16px",
};

const BORDER_RADIUS = {
  none: "0px",
  small: "4px",
  medium: "8px",
  large: "16px",
};
//@@viewOff:constants

//@@viewOn:helpers
function getStyle({ size, borderRadius, customStyle }) {
  return {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    cursor: "pointer",
    padding: SIZE[size] || SIZE.medium,
    borderRadius: BORDER_RADIUS[borderRadius] || BORDER_RADIUS.medium,
    userSelect: "none",
    ...customStyle,
  };
}
//@@viewOff:helpers

//@@viewOn:render
export function Checkbox({
  checked = false,
  onChange,
  label,
  size = "medium",
  borderRadius = "medium",
  style: customStyle,
  disabled = false,
  name,
  value,
  hidden = false,
}) {
  if (hidden) return null;

  const style = getStyle({ size, borderRadius, customStyle });

  return (
    <label style={style}>
      <input
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked, e)}
        disabled={disabled}
        style={{ cursor: disabled ? "not-allowed" : "pointer" }}
      />
      {label && <span>{label}</span>}
    </label>
  );
}
//@@viewOff:render

//@@viewOn:exports
export default Checkbox;
//@@viewOff:exports
