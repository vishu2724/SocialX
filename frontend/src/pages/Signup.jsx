import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";

function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/signup", form);
      alert("Signup successful");
      navigate("/login");
    } catch {
      alert("Signup failed");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          width: 380,
          borderRadius: "16px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <CardContent>
          <Typography variant="h5" fontWeight="bold" textAlign="center">
            Create Account
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
            mb={2}
          >
            Join SocialX today
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              name="username"
              label="Username"
              fullWidth
              margin="normal"
              onChange={handleChange}
              required
            />

            <TextField
              name="email"
              type="email"
              label="Email"
              fullWidth
              margin="normal"
              onChange={handleChange}
              required
            />

            <TextField
              name="password"
              type="password"
              label="Password"
              fullWidth
              margin="normal"
              onChange={handleChange}
              required
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2, borderRadius: "20px" }}
            >
              Signup
            </Button>
          </form>

          <Typography
            variant="body2"
            textAlign="center"
            sx={{ mt: 2 }}
          >
            Already have an account?{" "}
            <Link to="/login">Login</Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Signup;
