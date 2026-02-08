import { useState } from "react";
import API from "../services/api";
import { Card, CardContent, TextField, Button, Typography, Box } from "@mui/material";

function CreatePost({ onPostCreated }) {
  const [text, setText] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text && !image) return alert("Write something or add image");

    try {
      await API.post("/posts/create", { text, image });
      setText("");
      setImage("");
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
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
      }}
    >
      <CardContent>

        <Typography fontWeight="bold" gutterBottom>
          Create Post
        </Typography>

        {/* 👇 FORM START */}
        <form onSubmit={handleSubmit}>
          <TextField
            multiline
            rows={3}
            fullWidth
            placeholder="What's on your mind?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            sx={{ mb: 1 }}
          />

          <TextField
            fullWidth
            placeholder="Image URL (optional)"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            sx={{ mb: 1 }}
          />

          <Box textAlign="right">
            <Button
              type="submit"
              variant="contained"
              sx={{ borderRadius: "20px", px: 3 }}
            >
              POST
            </Button>
          </Box>
        </form>
        {/* 👆 FORM END */}

      </CardContent>
    </Card>
  );
}

export default CreatePost;
