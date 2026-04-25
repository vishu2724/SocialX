import { createTheme } from "@mui/material/styles";

export const getAppTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            primary: { main: "#53b9d2" },
            secondary: { main: "#9ed3dc" },
            background: { default: "#ffffff", paper: "#ffffff" },
            text: { primary: "#0f2e35", secondary: "#29464d" },
          }
        : {
            primary: { main: "#cf4bb7" },
            secondary: { main: "#2de39a" },
            background: { default: "#07090d", paper: "#10141c" },
            text: { primary: "#e8edf7", secondary: "#93a0bb" },
          }),
    },
    shape: {
      borderRadius: 14,
    },
    typography: {
      fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif",
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            background:
              mode === "light"
                ? "#ffffff"
                : "radial-gradient(circle at top left, #1b1134 0%, #080a0f 45%, #06080d 100%)",
            minHeight: "100vh",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            border:
              mode === "light"
                ? "1px solid rgba(26, 58, 64, 0.14)"
                : "1px solid rgba(255,255,255,0.08)",
            background:
              mode === "light"
                ? "linear-gradient(180deg, rgba(255,255,255,0.58) 0%, rgba(255,255,255,0.46) 100%)"
                : "linear-gradient(160deg, #121821 0%, #0d1219 100%)",
            boxShadow:
              mode === "light"
                ? "0 10px 22px rgba(15, 46, 53, 0.14)"
                : "0 12px 26px rgba(0, 0, 0, 0.45)",
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            backgroundColor: mode === "light" ? "rgba(255,255,255,0.7)" : "#0d1219",
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            ...(mode === "light"
              ? {
                  background: "#ffffff",
                  backgroundColor: "#ffffff",
                  color: "#0f2e35",
                  borderBottom: "1px solid rgba(15, 46, 53, 0.14)",
                  boxShadow: "none",
                  backdropFilter: "none",
                  WebkitBackdropFilter: "none",
                }
              : {
                  backgroundColor: "rgba(9, 12, 19, 0.88)",
                  color: "#edf1f0",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "none",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                }),
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: 10,
            fontWeight: 600,
          },
          containedPrimary: {
            backgroundColor: mode === "light" ? "#2f7f93" : "#cf4bb7",
            color: mode === "light" ? "#f6fbfc" : "#ffffff",
            "&:hover": {
              backgroundColor: mode === "light" ? "#256b7c" : "#b43f9f",
            },
          },
          outlined: {
            borderColor: mode === "light" ? "#2f7f93" : "#b5bfd3",
            color: mode === "light" ? "#205c6a" : "#e8edf7",
          },
          text: {
            color: mode === "light" ? "#17424c" : "#d3dbeb",
          },
        },
      },
    },
  });

export default getAppTheme;
