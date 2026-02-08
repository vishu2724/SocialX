import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "#fff",
        color: "#000",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <Toolbar sx={{ maxWidth: 900, width: "100%", mx: "auto" }}>
        {/* LOGO / HOME */}
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          SocialX
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        {/* NOT LOGGED IN */}
        {!token && (
          <Box display="flex" gap={2}>
            <Button
              onClick={() => navigate("/login")}
              sx={{ textTransform: "none" }}
            >
              Login
            </Button>

            <Button
              variant="contained"
              onClick={() => navigate("/signup")}
              sx={{ borderRadius: "20px", textTransform: "none" }}
            >
              Signup
            </Button>
          </Box>
        )}

        {/* LOGGED IN */}
        {token && (
          <Box display="flex" alignItems="center" gap={2}>
            <Typography color="primary">@{username}</Typography>

            <Button
              onClick={() => navigate("/profile")}
              sx={{ textTransform: "none" }}
            >
              Profile
            </Button>

            <Button
              variant="outlined"
              onClick={logout}
              sx={{ borderRadius: "20px", textTransform: "none" }}
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
