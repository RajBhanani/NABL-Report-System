import express from "express";

import {
  userRegister,
  verifyAdminLogin,
} from "../controller/adminController.js";

import { admin } from "../middleware/adminMiddleware.js";

const adminRouter = express.Router();

adminRouter.post("/register", admin, userRegister);

adminRouter.get("/verify", admin, verifyAdminLogin);

export default adminRouter;
