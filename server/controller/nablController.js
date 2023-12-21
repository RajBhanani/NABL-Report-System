import expressAsyncHandler from "express-async-handler";

import {
  NABLData,
  NABLParameterSets,
  NABLSoilParameters,
  NABLWaterParameters,
  Report,
  Sample,
} from "../models/nablModels.js";
import evaluateData from "../utils/evaluateData.js";

// POST /createSample
// Authorised only
export const createSample = expressAsyncHandler(async (request, response) => {
  const {
    sampleReceivedOn,
    sampleType,
    sampleDetail,
    analysisSet,
    requestedBy,
    sampleCondOrQty,
    samplingBy,
    name,
    address,
    contactNo,
    farmName,
    surveyNo,
    prevCrop,
    nextCrop,
  } = request.body;
  if (!analysisSet || !analysisSet.length) {
    return response.status(400).json({ message: "Analysis Set not included" });
  }
  try {
    const newSample = await Sample.create({
      sampleReceivedOn,
      sampleType,
      sampleDetail,
      analysisSet,
      requestedBy,
      sampleCondOrQty,
      samplingBy,
      name,
      address,
      contactNo,
      farmName,
      surveyNo,
      prevCrop,
      nextCrop,
      isReported: false,
    });
    try {
      await NABLData.updateOne(
        { currentId: newSample.sampleId - 1 },
        {
          currentId: newSample.sampleId,
        }
      );
    } catch (error) {
      throw new Error(error);
    }
    response.status(201).json({ newSample: newSample });
  } catch (error) {
    throw new Error(error);
  }
});

// PUT /updateSample
// Authorised only
export const updateSample = expressAsyncHandler(async (request, response) => {
  const { sampleCode, updateData } = request.body;
  try {
    await Sample.updateOne({ sampleCode: sampleCode }, updateData);
    response.status(200).json({ message: "Updated" });
  } catch (error) {
    throw new Error(error);
  }
});

// GET /getSamples
// Authorised only
export const getSamples = expressAsyncHandler(async (request, response) => {
  try {
    const samples = await Sample.find({}).select("-_id -__v");
    response.status(200).json({ nablSamples: samples });
  } catch (error) {
    throw new Error(error);
  }
});

// GET /evaluateTestData
// Authorised only
export const evaluateTestData = expressAsyncHandler(
  async (request, response) => {
    const { paramId, paramType, values } = request.body;
    const coll = paramType === "S" ? NABLSoilParameters : NABLWaterParameters;
    try {
      const { paramFormula } = await coll.findOne({
        paramId: paramId,
      });
      const testResult = evaluateData(paramFormula, values);
      response.status(200).json({ testResult: testResult });
    } catch (error) {
      throw new Error(error);
    }
  }
);

// POST /createReport
// Authorised only
export const createReport = expressAsyncHandler(async (request, response) => {
  const { sampleCode, reportData, analysisStartedOn, analysisEndedOn } =
    request.body;
  const keys = Object.keys(reportData);
  const reports = [];
  for (let index = 0; index < keys.length; index++) {
    const set = keys[index];
    try {
      const testResults = await evaluateData(
        sampleCode[2],
        set,
        reportData[set]
      );
      const report = await Report.create({
        sampleCode,
        analysisSet: set,
        testResults,
        isAuthorised: false,
        analysisStartedOn,
        analysisEndedOn,
      });
      reports.push(report);
      try {
        const sample = await Sample.findOne({ sampleCode: sampleCode });
        const remainingSets = sample.analysisSet
          .filter((ele) => !ele.isReported)
          .map((ele) => ele.name);
        console.log(remainingSets);
        console.log(keys);
        var isSampleReported = remainingSets.every(
          (val, index) => val === keys[index]
        );
        console.log(isSampleReported);
        var analysisSet = sample.analysisSet;
        const idx = analysisSet.findIndex((ele) => ele.name === set);
        analysisSet[idx] = { name: set, isReported: true };
      } catch (error) {
        throw new Error(error);
      }
      try {
        if (isSampleReported) {
          await Sample.updateOne(
            { sampleCode: sampleCode },
            { isReported: true, analysisSet: analysisSet }
          );
        } else {
          await Sample.updateOne(
            { sampleCode: sampleCode },
            { analysisSet: analysisSet }
          );
        }
      } catch (error) {
        throw new Error(error);
      }
    } catch (error) {
      throw new Error(error);
    }
  }
  response.status(200).json({
    reports: reports,
    analysisSet: analysisSet,
    isSampleReported: isSampleReported,
  });
});

// GET /getReports
// Authorised only
export const getReports = expressAsyncHandler(async (request, response) => {
  try {
    const reports = await Report.find({}).select("-__v");
    response.status(200).json({ nablReports: reports });
  } catch (error) {
    throw new Error(error);
  }
});

// PUT /updateReport
// Authorised only
export const updateReport = expressAsyncHandler(async (request, response) => {
  const { sampleCode, analysisSet, reportData } = request.body;
  try {
    const testResults = await evaluateData(
      sampleCode[2],
      analysisSet,
      reportData
    );
    const currReport = await Report.findOne({
      sampleCode: sampleCode,
      analysisSet: analysisSet,
    });
    if (!currReport) {
      response.status(404).json({ message: "Not found" });
    } else if (currReport.isAuthorised) {
      response
        .status(300)
        .json({ message: "Report authorised, can't update." });
    } else {
      await Report.updateOne(
        {
          sampleCode: sampleCode,
          analysisSet: analysisSet,
          isAuthorised: false,
        },
        { testResults: testResults }
      );
      response.status(200).json({ testResults: testResults });
    }
  } catch (error) {
    throw new Error(error);
  }
});

// PUT /authoriseReport
// Admin only
export const authoriseReport = expressAsyncHandler(
  async (request, response) => {
    const { sampleCode, analysisSet } = request.body;
    try {
      await Report.updateOne(
        {
          sampleCode: sampleCode,
          analysisSet: analysisSet,
        },
        { isAuthorised: true }
      );
      response.status(200).json({ message: "Authorised" });
    } catch (error) {
      throw new Error(error);
    }
  }
);

// POST /createParam
// Admin only
export const createParameter = expressAsyncHandler(
  async (request, response) => {
    const {
      paramName,
      paramUnit,
      paramType,
      paramVariables,
      paramFormula,
      paramTestMethod,
    } = request.body;
    var coll, updateField;
    if (paramType === "soil") {
      coll = NABLSoilParameters;
      updateField = "currentSoilParamId";
    } else {
      coll = NABLWaterParameters;
      updateField = "currentWaterParamId";
    }
    try {
      const newParam = await coll.create({
        paramName,
        paramUnit,
        paramVariables,
        paramFormula,
        paramTestMethod,
      });
      if (newParam) {
        try {
          await NABLData.updateOne(
            {
              [updateField]: newParam.paramId - 1,
            },
            {
              [updateField]: newParam.paramId,
            }
          );
          response.status(200).json({
            message: `Parameter created with paramId ${newParam.paramId}`,
          });
        } catch (error) {
          throw new Error(error);
        }
      }
    } catch (error) {
      throw new Error(error);
    }
  }
);

// GET /getParams
// Authorised only
export const getParams = expressAsyncHandler(async (request, response) => {
  try {
    const soilParameters = await NABLSoilParameters.find({}).select(
      "-_id -__v"
    );
    const waterParameters = await NABLWaterParameters.find({}).select(
      "-_id -__v"
    );
    const parameterSets = await NABLParameterSets.find({}).select("-__v");
    response.status(200).json({
      nablParameters: {
        soilParameters: soilParameters,
        waterParameters: waterParameters,
      },
      parameterSets: parameterSets,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// POST /setId
// Admin only
export const setId = expressAsyncHandler(async (request, response) => {
  const { newId } = request.body;
  const todayYear = new Date().getFullYear();
  try {
    await NABLData.updateOne(
      { currentYear: todayYear },
      {
        currentId: newId,
        currentYear: todayYear,
      }
    );
    response.status(200).json({ message: `ID set to ${newId}` });
  } catch (error) {
    throw new Error(error);
  }
});
