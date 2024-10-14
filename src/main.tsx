import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ISAProvider } from "./context/ISAContext";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <StrictMode>
    <ISAProvider>
      <App />
    </ISAProvider>
  </StrictMode>
);
