import { AppBar, Toolbar, Typography, Button, Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Navbar({ themeMode, onToggleTheme }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar sx={{ maxWidth: 1200, width: "100%", mx: "auto", position: "relative", zIndex: 1 }}>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            cursor: "pointer",
            letterSpacing: 0.5,
            color: themeMode === "light" ? "#083640" : "text.primary",
          }}
          onClick={() => navigate("/")}
        >
          SocialX
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <IconButton
          onClick={onToggleTheme}
          sx={{
            mr: 2,
            width: 54,
            height: 54,
            borderRadius: "14px",
            border: "2px solid",
            borderColor: themeMode === "light" ? "#c8dcea" : "#33476d",
            color: themeMode === "light" ? "#0b244a" : "#f4f7fb",
            backgroundColor: themeMode === "light" ? "#ffffff" : "rgba(16, 23, 40, 0.65)",
            boxShadow:
              themeMode === "light"
                ? "0 0 0 1px rgba(10, 36, 74, 0.08)"
                : "inset 0 0 0 1px rgba(255,255,255,0.05)",
            "&:hover": {
              backgroundColor: themeMode === "light" ? "#f4fbff" : "rgba(20, 29, 50, 0.85)",
            },
          }}
          aria-label="toggle theme"
        >
          <Box component="span" sx={{ fontSize: 24, lineHeight: 1 }}>
            {themeMode === "light" ? "☾" : "☀"}
          </Box>
        </IconButton>

        {!token && (
          <Box display="flex" gap={2}>
            <Button
              onClick={() => navigate("/login")}
              sx={{ color: themeMode === "light" ? "#083640" : "text.secondary", fontWeight: 700 }}
            >
              Login
            </Button>

            <Button
              variant="contained"
              onClick={() => navigate("/signup")}
              sx={{ borderRadius: "20px" }}
            >
              Signup
            </Button>
          </Box>
        )}

        {token && (
          <Box display="flex" alignItems="center" gap={2}>
            <Typography sx={{ color: themeMode === "light" ? "#0a4a58" : "primary.main", fontWeight: 600 }}>
              @{username}
            </Typography>

            <Button
              onClick={() => navigate("/profile")}
              sx={{ color: themeMode === "light" ? "#083640" : "text.secondary", fontWeight: 700 }}
            >
              Profile
            </Button>

            <Button
              variant="outlined"
              onClick={logout}
              sx={{
                borderRadius: "20px",
                ...(themeMode === "light" && {
                  borderColor: "#145363",
                  color: "#083640",
                }),
              }}
            >
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
