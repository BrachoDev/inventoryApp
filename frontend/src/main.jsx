// main.jsx
// Frontend entry point for the React application.
// Renders the root App component and wraps it with
// global providers for routing and UI styling.

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "@/components/ui/provider";
import { BrowserRouter } from "react-router-dom";

// Create the React root and render the application
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Enables client-side routing throughout the app */}
    <BrowserRouter>
      {/* Provides global UI/theme configuration */}
      <Provider>
        {/* Main application component */}
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
