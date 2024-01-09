import express from "express";

import {
  getUserProfile,
  upadateUserProfile,
  userLogin,
  userLogout,
  verifyUserLogin,
} from "../controller/userController.js";

import { protect } from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/login", userLogin);
userRouter.post("/logout", userLogout);
userRouter.route("/profile").get(protect, getUserProfile);
// .put(protect, upadateUserProfile);

userRouter.get("/verify", protect, verifyUserLogin);

export default userRouter;
