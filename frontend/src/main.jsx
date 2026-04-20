import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { useMemo, useState } from "react";

import { BrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { getAppTheme } from "./theme";

function Root() {
  const [themeMode, setThemeMode] = useState(localStorage.getItem("themeMode") || "dark");
  const theme = useMemo(() => getAppTheme(themeMode), [themeMode]);

  const toggleTheme = () => {
    setThemeMode((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("themeMode", next);
      return next;
    });
  };

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App themeMode={themeMode} onToggleTheme={toggleTheme} />
      </ThemeProvider>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
