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

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      navigate("/");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Card
        sx={{
          width: 380,
          borderRadius: "16px",
        }}
      >
        <CardContent>
          <Typography variant="h5" fontWeight="bold" textAlign="center">
            Welcome Back
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
            mb={2}
          >
            Login to continue
          </Typography>

          <form onSubmit={handleSubmit}>
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
              sx={{ mt: 2, borderRadius: "10px", py: 1.1 }}
            >
              Login
            </Button>
          </form>

          <Typography
            variant="body2"
            textAlign="center"
            sx={{ mt: 2 }}
          >
            Don’t have an account?{" "}
            <Link to="/signup" style={{ color: "#cf4bb7" }}>Signup</Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Login;
