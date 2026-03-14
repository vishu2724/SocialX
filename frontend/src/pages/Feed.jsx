import { useEffect, useState } from "react";
import API from "../services/api";
import CreatePost from "../components/CreatePost";

import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Box,
  Chip
} from "@mui/material";

function Feed() {

  const [posts, setPosts] = useState([]);
  const [openComments, setOpenComments] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("All");

  const currentUser = localStorage.getItem("username");

  const fetchPosts = () => {

    const url =
      selectedCategory === "All"
        ? "/posts"
        : `/posts?category=${selectedCategory}`;

    API.get(url)
      .then((res) => setPosts(res.data))
      .catch((err) =>
        console.log("Error fetching posts", err.message)
      );
  };

  const handleLike = async (postId) => {
    try {
      await API.post(`/posts/${postId}/like`);
      fetchPosts();
    } catch {
      alert("Failed to like post");
    }
  };

  const handleDelete = async (postId) => {
    if (!window.confirm("Delete this post?")) return;

    try {
      await API.delete(`/posts/${postId}`);
      fetchPosts();
    } catch {
      alert("Failed to delete post");
    }
  };

  const handleComment = async (postId, text) => {
    if (!text) return;

    try {
      await API.post(`/posts/${postId}/comment`, { text });
      fetchPosts();
    } catch {
      alert("Failed to add comment");
    }
  };

  const handleReport = async (postId) => {

    try {
  
      await API.post(`/posts/${postId}/report`);
  
      alert("Post reported");
  
    } catch {
  
      alert("Failed to report post");
  
    }
  
  };

  const toggleComments = (postId) => {
    setOpenComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  useEffect(() => {
    fetchPosts();
  }, [selectedCategory]);

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 3,
        backgroundColor: "#f5f7fb",
        minHeight: "100vh",
        padding: "20px",
        borderRadius: "8px",
      }}
    >

      {/* Create Post */}
      <CreatePost onPostCreated={fetchPosts} />

      {/* CATEGORY FILTER */}
      <Box
        sx={{
          display: "flex",
          gap: 1,
          mb: 2,
          flexWrap: "wrap"
        }}
      >
        {["All","Academics","Internships","Events","Clubs"].map((cat) => (

          <Button
            key={cat}
            size="small"
            variant={selectedCategory === cat ? "contained" : "outlined"}
            onClick={() => setSelectedCategory(cat)}
            sx={{
              borderRadius: "20px",
              textTransform: "none"
            }}
          >
            {cat}
          </Button>

        ))}
      </Box>

      {posts.length === 0 && (
        <Typography color="text.secondary">
          No posts yet
        </Typography>
      )}

      {posts.map((post) => (

        <Card
          key={post._id}
          sx={{
            mb: 2,
            borderRadius: "16px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >

          <CardContent>

            {/* Username + Category + Delete */}
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >

              <Box display="flex" alignItems="center" gap={1}>

                <Typography
                  fontWeight="bold"
                  sx={{ color: "#1976d2" }}
                >
                  @{post.username}
                </Typography>

                <Chip
              label={post.category || "General"}
              size="small"
              color="primary"
              />

              </Box>

              {post.username === currentUser && (
                <Button
                  size="small"
                  color="error"
                  onClick={() => handleDelete(post._id)}
                >
                  Delete
                </Button>
              )}

            </Box>

            {/* Text */}
            {post.text && (
              <Typography sx={{ mt: 1, color: "#333" }}>
                {post.text}
              </Typography>
            )}

            {/* Image */}
            {post.image && (
              <Box sx={{ mt: 1 }}>
                <img
                  src={post.image}
                  alt="post"
                  style={{
                    width: "100%",
                    borderRadius: "10px",
                    marginTop: "8px",
                  }}
                />
              </Box>
            )}

            {/* Actions */}
            <Box sx={{ display: "flex", gap: 1, mt: 1 }}>

              <Button
                size="small"
                variant="outlined"
                sx={{
                  borderRadius: "20px",
                  textTransform: "none",
                  px: 2,
                }}
                onClick={() => handleLike(post._id)}
              >
                ❤️ {post.likes.length}
              </Button>

              <Button
                size="small"
                variant="outlined"
                sx={{
                  borderRadius: "20px",
                  textTransform: "none",
                }}
                onClick={() => toggleComments(post._id)}
              >
                💬 {post.comments.length}
              </Button>

              <Button
                size="small"
                variant="outlined"
                 color="error"
                 onClick={() => handleReport(post._id)}
                 >
                🚩 Report
              </Button>

            </Box>

            {/* Comment Input */}
            <TextField
              size="small"
              fullWidth
              placeholder="Write a comment..."
              sx={{
                mt: 1,
                backgroundColor: "#f9fafb",
                borderRadius: "10px",
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleComment(post._id, e.target.value);
                  e.target.value = "";
                }
              }}
            />

            {/* Comments */}
            {openComments[post._id] && (

              <Box
                sx={{
                  mt: 1,
                  backgroundColor: "#f0f2f5",
                  padding: "8px",
                  borderRadius: "8px",
                }}
              >

                {post.comments.length === 0 && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    No comments yet
                  </Typography>
                )}

                {post.comments.map((c, index) => (
                  <Typography
                    key={index}
                    variant="body2"
                    sx={{ marginBottom: "4px" }}
                  >
                    <b>@{c.username}</b> {c.text}
                  </Typography>
                ))}

              </Box>

            )}

          </CardContent>

        </Card>

      ))}

    </Container>
  );
}

export default Feed;