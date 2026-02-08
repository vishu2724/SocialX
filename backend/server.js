const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());
// middleware
app.use(express.json());
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/posts", require("./routes/post.routes"));




connectDB();

// test route
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
