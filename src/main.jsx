import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import { ConfigProvider } from "antd";
import theme from "@theme/antConfig.js";

import "@assets/scss/main.scss";

import Apollo from "@providers/Apollo";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Apollo>
      <ConfigProvider theme={theme}>
        <App />
      </ConfigProvider>
    </Apollo>
  </React.StrictMode>
);
