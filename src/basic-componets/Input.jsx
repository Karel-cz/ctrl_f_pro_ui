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
function getStyle({ size, borderRadius, width, customStyle }) {
  return {
    padding: SIZE[size] || SIZE.medium,
    borderRadius: BORDER_RADIUS[borderRadius] || BORDER_RADIUS.medium,
    width: width || "auto",
    border: "1px solid #ccc",
    outline: "none",
    ...customStyle,
  };
}
//@@viewOff:helpers

//@@viewOn:render
export function Input({
  required,
  placeholder,
  size = "medium",
  borderRadius = "medium",
  width,
  style: customStyle,
  value,
  name,
  type = "text",
  readOnly,
  onChange,
  hidden,
  autoFocus = false,
}) {
  if (hidden) return null;

  const style = getStyle({ size, borderRadius, width, customStyle });

  return (
    <input
      style={style}
      type={type}
      name={name}
      required={required}
      placeholder={placeholder}
      value={value}
      readOnly={readOnly}
      onChange={onChange}
      autoFocus={autoFocus}
    />
  );
}
//@@viewOff:render

//@@viewOn:exports
export default Input;
//@@viewOff:exports
