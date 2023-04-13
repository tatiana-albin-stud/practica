import React from "react";
import App from "./App";
import "./styles/index.scss";
import { UserProvider } from "./hooks/useUser";
import { ConfirmProvider } from "./hooks/useConfirm";
import { ToastContainer } from "react-toastify";
import customTheme from "lib/theme";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { createRoot } from "react-dom/client";
import { StyledEngineProvider } from "@mui/material/styles";
import "./i18n";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={customTheme}>
        <UserProvider>
          <ConfirmProvider>
            <App />
          </ConfirmProvider>
        </UserProvider>
      </ThemeProvider>
      <ToastContainer position="bottom-right" autoClose={2500} />
    </StyledEngineProvider>
  </BrowserRouter>
  // </React.StrictMode>
);
