import React from "react";
import ReactDOM from "react-dom/client";
import VapiAssistant from "./assets/vapi-container/vapi";

export function mount(container) {
  const root = ReactDOM.createRoot(container);
  root.render(<VapiAssistant />);
}
