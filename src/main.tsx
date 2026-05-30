import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { FarmProvider } from "./context/FarmContext";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FarmProvider>
      <App />
    </FarmProvider>
  </StrictMode>
);
