import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import GlobalStyles from "./style-global";
import theme from "./style-global/theme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
