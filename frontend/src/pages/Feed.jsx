import { useEffect, useState } from "react";
import API from "../services/api";
import CreatePost from "../components/CreatePost";

import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Box,
  Chip,
  Stack,
  MenuItem,
  Avatar,
  IconButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ThumbUpAltOutlined from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownAltOutlined from "@mui/icons-material/ThumbDownAltOutlined";

function formatRelativeTime(value) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  const sec = Math.floor((Date.now() - d.getTime()) / 1000);
  if (sec < 45) return "just now";
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min} minute${min === 1 ? "" : "s"} ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} hour${hr === 1 ? "" : "s"} ago`;
  const day = Math.floor(hr / 24);
  if (day < 7) return `${day} day${day === 1 ? "" : "s"} ago`;
  return d.toLocaleDateString();
}

function Feed() {
  const theme = useTheme();
  const isLightMode = theme.palette.mode === "light";

  const [posts, setPosts] = useState([]);
  const [openComments, setOpenComments] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("newest");

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

  const visiblePosts = [...posts]
    .filter((post) => {
      const haystack = `${post.username} ${post.text || ""} ${post.category || ""}`.toLowerCase();
      return haystack.includes(searchText.toLowerCase());
    })
    .sort((a, b) => {
      const aTime = new Date(a.createdAt || 0).getTime();
      const bTime = new Date(b.createdAt || 0).getTime();
      return sortBy === "newest" ? bTime - aTime : aTime - bTime;
    });

  const actionButtonSx = {
    minWidth: "auto",
    px: 1.15,
    py: 0.6,
    borderRadius: "12px",
    background: isLightMode
      ? "linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.4) 100%)"
      : "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)",
    color: isLightMode ? "#12343f" : "#ffffff",
    border: isLightMode ? "1px solid rgba(18,52,63,0.14)" : "1px solid rgba(255,255,255,0.08)",
    boxShadow: isLightMode
      ? "0 2px 8px rgba(16, 52, 63, 0.1)"
      : "0 2px 8px rgba(0,0,0,0.2)",
    "&:hover": {
      background: isLightMode
        ? "linear-gradient(180deg, rgba(255,255,255,0.62) 0%, rgba(255,255,255,0.5) 100%)"
        : "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%)",
    },
  };

  return (
    <Box
      sx={{
        mt: 3,
        minHeight: "100vh",
        px: { xs: 2, md: 3 },
        pb: 4,
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "320px 1fr" },
          gap: 3,
        }}
      >
        <Stack spacing={2}>
          <Button
            variant="outlined"
            href="https://github.com/vishu2724/SocialX"
            target="_blank"
            rel="noreferrer"
            sx={{ alignSelf: "flex-start", borderRadius: "999px" }}
          >
            Star on GitHub
          </Button>

          <CreatePost onPostCreated={fetchPosts} />
        </Stack>

        <Box>
          <TextField
            fullWidth
            placeholder="Search Posts..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": { borderRadius: "12px" },
            }}
          />

          <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
            <TextField
              select
              size="small"
              label="Sort by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              sx={{ minWidth: 180 }}
            >
              <MenuItem value="newest">Newest</MenuItem>
              <MenuItem value="oldest">Oldest</MenuItem>
            </TextField>

            <TextField
              select
              size="small"
              label="Filter by tags"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              sx={{ minWidth: 210 }}
            >
              {["All", "Academics", "Internships", "Events", "Clubs", "General"].map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          {visiblePosts.length === 0 && (
            <Typography color="text.secondary" mt={8} textAlign="center">
              No posts found. Be the first to create one!
            </Typography>
          )}

          {visiblePosts.map((post) => (
            <Card
              key={post._id}
              sx={{
                mb: 2,
                borderRadius: "16px",
              }}
            >
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography fontWeight="bold" sx={{ color: "primary.main" }}>
                      @{post.username}
                    </Typography>

                    <Chip label={post.category || "General"} size="small" color="primary" />
                  </Box>

                  {post.username === currentUser && (
                    <Button size="small" color="error" onClick={() => handleDelete(post._id)}>
                      Delete
                    </Button>
                  )}
                </Box>

                {post.text && (
                  <Typography sx={{ mt: 1, color: "text.primary" }}>
                    {post.text}
                  </Typography>
                )}

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

                <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                  <Button
                    size="small"
                    variant="contained"
                    sx={{
                      ...actionButtonSx,
                      px: 1.2,
                      borderRadius: "999px",
                    }}
                    onClick={() => handleLike(post._id)}
                  >
                    <Box display="flex" alignItems="center" gap={1}>
                      <Box component="span" sx={{ fontSize: 18, lineHeight: 1 }}>
                        👍
                      </Box>
                      <Box
                        sx={{
                          width: "1px",
                          height: 18,
                          backgroundColor: isLightMode ? "rgba(18,52,63,0.24)" : "rgba(255,255,255,0.22)",
                        }}
                      />
                      <Box component="span" sx={{ fontWeight: 700 }}>
                        {post.likes.length}
                      </Box>
                    </Box>
                  </Button>

                  <Button
                    size="small"
                    variant="contained"
                    sx={actionButtonSx}
                    onClick={() => toggleComments(post._id)}
                  >
                    <Box display="flex" alignItems="center" gap={0.8}>
                      <Box component="span" sx={{ fontSize: 17, lineHeight: 1 }}>
                        💬
                      </Box>
                      <Box component="span" sx={{ fontWeight: 700 }}>
                        {post.comments.length}
                      </Box>
                    </Box>
                  </Button>

                  <Button
                    size="small"
                    variant="contained"
                    sx={actionButtonSx}
                    onClick={() => handleReport(post._id)}
                  >
                    <Box component="span" sx={{ fontSize: 17, lineHeight: 1 }}>
                      ⚑
                    </Box>
                  </Button>
                </Box>

                <TextField
                  id={`comment-input-${post._id}`}
                  size="small"
                  fullWidth
                  placeholder="Add a comment..."
                  variant="standard"
                  InputProps={{
                    disableUnderline: false,
                  }}
                  sx={{
                    mt: 2,
                    "& .MuiInput-root": {
                      color: "text.primary",
                      "&:before": {
                        borderColor: isLightMode ? "rgba(18,52,63,0.22)" : "rgba(255,255,255,0.12)",
                      },
                      "&:hover:not(.Mui-disabled):before": {
                        borderColor: isLightMode ? "rgba(18,52,63,0.35)" : "rgba(255,255,255,0.2)",
                      },
                      "&:after": {
                        borderColor: "primary.main",
                      },
                    },
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleComment(post._id, e.target.value);
                      e.target.value = "";
                    }
                  }}
                />

                {openComments[post._id] && (
                  <Box sx={{ mt: 2 }}>
                    {post.comments.length === 0 && (
                      <Typography variant="body2" color="text.secondary" sx={{ py: 1 }}>
                        No comments yet.
                      </Typography>
                    )}

                    {post.comments.map((c, index) => (
                      <Box
                        key={c._id || `${post._id}-${index}-${c.username}`}
                        sx={{
                          display: "flex",
                          gap: 1.5,
                          pt: index === 0 ? 0 : 2,
                          mt: index === 0 ? 0 : 0,
                          borderTop:
                            index === 0
                              ? "none"
                              : isLightMode
                                ? "1px solid rgba(18,52,63,0.08)"
                                : "1px solid rgba(255,255,255,0.06)",
                        }}
                      >
                        <Avatar
                          sx={{
                            width: 40,
                            height: 40,
                            fontSize: "0.95rem",
                            bgcolor: isLightMode ? "rgba(18,52,63,0.12)" : "rgba(255,255,255,0.12)",
                            color: "text.primary",
                          }}
                        >
                          {(c.username || "?").charAt(0).toUpperCase()}
                        </Avatar>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: 1 }}>
                            <Typography component="span" variant="body2" fontWeight={600} color="text.primary">
                              @{c.username}
                            </Typography>
                            <Typography component="span" variant="caption" color="text.secondary">
                              {formatRelativeTime(c.createdAt)}
                            </Typography>
                          </Box>
                          <Typography
                            variant="body2"
                            color="text.primary"
                            sx={{ mt: 0.5, whiteSpace: "pre-wrap", wordBreak: "break-word" }}
                          >
                            {c.text}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 0.25,
                              mt: 0.75,
                              ml: -0.5,
                            }}
                          >
                            <IconButton
                              size="small"
                              aria-label="like comment"
                              sx={{
                                color: "text.secondary",
                                p: 0.65,
                                "&:hover": { bgcolor: "transparent", color: "text.primary" },
                              }}
                            >
                              <ThumbUpAltOutlined sx={{ fontSize: 18 }} />
                            </IconButton>
                            <IconButton
                              size="small"
                              aria-label="dislike comment"
                              sx={{
                                color: "text.secondary",
                                p: 0.65,
                                ml: -0.25,
                                "&:hover": { bgcolor: "transparent", color: "text.primary" },
                              }}
                            >
                              <ThumbDownAltOutlined sx={{ fontSize: 18 }} />
                            </IconButton>
                            <Button
                              size="small"
                              variant="text"
                              sx={{
                                ml: 0.5,
                                minWidth: 0,
                                px: 1,
                                py: 0.25,
                                fontSize: "0.8rem",
                                fontWeight: 600,
                                color: "text.secondary",
                                textTransform: "none",
                                "&:hover": { bgcolor: "transparent", color: "text.primary" },
                              }}
                              onClick={() => {
                                const el = document.getElementById(`comment-input-${post._id}`);
                                el?.focus();
                              }}
                            >
                              Reply
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                )}
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default Feed;