import { Card, CardContent, Typography, Box, Button, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const username = localStorage.getItem("username") || "User";

  // 🔤 Get initials
  const initials = username
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        mt: 4,
      }}
    >
      <Card
        sx={{
          width: 420,
          borderRadius: "16px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          textAlign: "center",
        }}
      >
        <CardContent>
          {/* AVATAR */}
          <Avatar
            sx={{
              bgcolor: "primary.main",
              width: 80,
              height: 80,
              fontSize: 32,
              margin: "0 auto 12px",
            }}
          >
            {initials}
          </Avatar>

          <Typography variant="h5" fontWeight="bold">
            @{username}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 0.5 }}
          >
            Active user
          </Typography>

          <Button
            variant="outlined"
            fullWidth
            sx={{ mt: 3, borderRadius: "20px" }}
            onClick={logout}
          >
            Logout
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Profile;
