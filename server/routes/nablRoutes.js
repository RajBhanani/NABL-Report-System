import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/superAdminMiddleware.js";

import {
  authoriseReport,
  createParameter,
  createParameterSet,
  createReport,
  createSample,
  evaluateTestData,
  getNablData,
  getParams,
  getReports,
  getSamples,
  updateNablData,
  updateParameter,
  // setId,
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
nablRouter.get("/getNablData", protect, getNablData);

// nablRouter.post("/setId", admin, setId);
nablRouter.put("/updateNablData", admin, updateNablData);
nablRouter.post("/createParam", admin, createParameter);
nablRouter.put("/updateParam", admin, updateParameter);
nablRouter.post("/createParamSet", admin, createParameterSet);

export default nablRouter;
