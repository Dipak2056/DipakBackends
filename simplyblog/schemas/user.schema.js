// here user simply means the author who will have ability to read write update and delete the blog post
// user will have email address
// user will have password

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    maxlength: [50, "Email must have less than 50 characters."],
    index: 1,
  },
  password: {
    type: String,
    required: true,
    maxlength: [8, "Password must not be longer than 8 characters"]},
});
export default mongoose.model("User", UserSchema);
