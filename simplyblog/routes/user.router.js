import express from "express";
const router = express.Router();
import { createUser, deleteUser } from "../models/user.models.js";
import { encryptPassword } from "../config/bcrypt.js";
// create a user
router.post("/", async (req, res, next) => {
  try {
    // we want to insert the hashed password
    let encryptedPass = await encryptPassword(req.body.password);
    req.body.password = encryptedPass;
    const result = await createUser(req.body);
    result._id &&
      res.json({
        status: "success",
        message: "User creatd successfully!",
        result
      });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error")) {
      error.message = "Email already exists";
    }
    next(error);
  }
});
// get a user by id
// delete a user

export default router;
