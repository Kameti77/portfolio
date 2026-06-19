import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

import "@fontsource/roboto";
import "@fontsource/outfit";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename="/portfolio">
      <App />
    </BrowserRouter>
  </StrictMode>
);
