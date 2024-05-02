const mongoose = require("mongoose");

const StorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  media: {
    type: String,
    default: "",
    validate: {
      validator: function (value) {
        if (value === "") {
          return true;
        }
        // Here, you might want to add specific checks for video and image URLs
        // based on your application needs. For instance, checking file extensions or content types.
        return true; // Return true if the value is a valid media URL
      },
      message: "Media must be a valid URL for an image or video.",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiry: {
    type: Date,
  },
});

StorySchema.methods.isActive = function () {
  const now = new Date();
  return now < this.expiry;
};

const Story = mongoose.model("stories", StorySchema);

module.exports = Story;
