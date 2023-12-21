import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";

import {
  authoriseReport,
  createParameter,
  createReport,
  createSample,
  evaluateTestData,
  getParams,
  getReports,
  getSamples,
  setId,
  updateReport,
  updateSample,
} from "../controller/nablController.js";

const nablRouter = express.Router();

nablRouter.post("/createSample", protect, createSample);
nablRouter.put("/updateSample", protect, updateSample);
nablRouter.get("/getSamples", protect, getSamples);
nablRouter.get("/evaluateTestData", protect, evaluateTestData);
nablRouter.post("/createReport", protect, createReport);
nablRouter.put("/updateReport", protect, updateReport);
nablRouter.put("/authoriseReport", protect, authoriseReport);
nablRouter.get("/getReports", protect, getReports);
nablRouter.get("/getParams", protect, getParams);

nablRouter.post("/setId", admin, setId);
nablRouter.post("/createParam", admin, createParameter);

export default nablRouter;
