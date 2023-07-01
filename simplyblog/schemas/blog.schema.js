import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  image: {
    type: String,
  },
  title: {
    type: String,
    maxlength: [50, "we donot accept title longer than 50 characters"],
    required: true,
  },
  description: {
    type: String,
    required: true,
    maxlength: [500, "we don't accept blog post longer than 500 characters."],
    minlength: [100, "your blog post must be at least 100 characters long."],
  },
});
