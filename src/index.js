import React from "react";
import { createRoot } from "react-dom/client";
import App from "../src/components/App";
import { BrowserRouter } from "react-router-dom";

const domnode = document.getElementById("root");
const root = createRoot(domnode);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
