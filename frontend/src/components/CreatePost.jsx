import { useState } from "react";
import API from "../services/api";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";

function CreatePost({ onPostCreated }) {

  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("General"); // ⭐ NEW STATE

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text && !image) return alert("Write something or add image");

    try {

      await API.post("/posts/create", {
        text,
        image,
        category // ⭐ SEND CATEGORY
      });

      setText("");
      setImage("");
      setCategory("General");

      onPostCreated();

    } catch {
      alert("Failed to create post");
    }
  };

  return (
    <Card
      sx={{
        mb: 2,
        borderRadius: "16px",
      }}
    >
      <CardContent>
        <Typography fontWeight="bold" variant="h6" gutterBottom>
          Share Your Thoughts
        </Typography>

        <form onSubmit={handleSubmit}>

          <TextField
            multiline
            rows={3}
            fullWidth
            placeholder="What's on your mind?..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            sx={{ mb: 2 }}
          />

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Category</InputLabel>

            <Select
              value={category}
              label="Category"
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value="General">General</MenuItem>
              <MenuItem value="Academics">Academics</MenuItem>
              <MenuItem value="Internships">Internships</MenuItem>
              <MenuItem value="Events">Events</MenuItem>
              <MenuItem value="Clubs">Clubs</MenuItem>
            </Select>

          </FormControl>

          <Box textAlign="right">
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ borderRadius: "10px", py: 1.1 }}
            >
              Post
            </Button>
          </Box>

        </form>

      </CardContent>
    </Card>
  );
}

export default CreatePost;