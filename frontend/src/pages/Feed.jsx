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
} from "@mui/material";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [openComments, setOpenComments] = useState({});

  const fetchPosts = () => {
    API.get("/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.log("Error fetching posts", err.message));
  };

  const handleLike = async (postId) => {
    try {
      await API.post(`/posts/${postId}/like`);
      fetchPosts();
    } catch {
      alert("Failed to like post");
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

  const toggleComments = (postId) => {
    setOpenComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

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

      {posts.length === 0 && (
        <Typography color="text.secondary">No posts yet</Typography>
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
            {/* Username */}
            <Typography
              fontWeight="bold"
              sx={{ color: "#1976d2" }}
            >
              @{post.username}
            </Typography>

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

            {/* Comments List */}
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
