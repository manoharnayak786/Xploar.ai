import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { ModalProvider } from "./context/ModalContext"; // 1. Import the provider
import { Analytics } from "@vercel/analytics/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* 2. Wrap your App component with the ModalProvider */}
      <ModalProvider>
        <App />
      </ModalProvider>
      <Analytics />
    </BrowserRouter>
  </React.StrictMode>
);
