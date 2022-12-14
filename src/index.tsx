import "./index.css";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import React from "react";

const container = document.getElementById("root");
const root = createRoot(container!);
const strictMode = process.env.NODE_ENV === "development"; // set production
root.render(
  (strictMode && <App />) || (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
