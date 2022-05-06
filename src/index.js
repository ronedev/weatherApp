import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GeoProvider } from "components/context/geoContext";
import { LoadingProvider } from "components/context/loadingContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <LoadingProvider>
      <GeoProvider>
        <App />
      </GeoProvider>
    </LoadingProvider>
  </React.StrictMode>
);
