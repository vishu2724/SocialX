const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
{
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true
  },

  reportedBy: {
    type: String,
    required: true
  },

  reason: {
    type: String,
    default: "Inappropriate content"
  }

},
{ timestamps: true }
);

module.exports = mongoose.model("Report", reportSchema);