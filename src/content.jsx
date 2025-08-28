import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

const rootEl = document.createElement("div");
rootEl.id = "ctrlfpro-root";
document.body.appendChild(rootEl);

ReactDOM.createRoot(rootEl).render(<App />);
