if (typeof global === 'undefined') {
  (window as any).global = window;
}




import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import aws_exports from "./aws-exports.ts";
import { Amplify } from "aws-amplify";
Amplify.configure(aws_exports);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
