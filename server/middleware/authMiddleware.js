import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";

import User from "../models/userModels.js";

export const protect = expressAsyncHandler(async (request, response, next) => {
  let token = request.cookies.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      request.user = await User.findOne({ _id: decoded.userId }).select(
        "-password"
      );
      next();
    } catch (error) {
      response.status(401);
      throw new Error(error);
    }
  } else {
    response.status(401);
    throw new Error("Not authorised, no token");
  }
});
