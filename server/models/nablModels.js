import mongoose, { set } from "mongoose";
import { generateSampleCode, generateULR } from "../utils/generateNABLCodes.js";

const nablDataSchema = mongoose.Schema({
  currentId: { type: Number, required: true },
  currentYear: { type: Number, required: true },
  currentSoilParamId: { type: Number, required: true },
  currentWaterParamId: { type: Number, required: true },
  currentCertificationNumber: { type: Number, required: true },
  currentRevision: { type: String, required: true },
});

export const NABLData = mongoose.model("nabl data", nablDataSchema);

const nablSoilParameterSchema = mongoose.Schema({
  paramId: { type: Number },
  paramName: { type: String, required: true },
  paramVariables: { type: [String] },
  paramFormula: { type: String },
  paramUnit: { type: String, required: true },
  paramTestMethod: { type: String, required: true },
});

nablSoilParameterSchema.pre("save", async function (next) {
  if (this.paramId) next();
  const { currentSoilParamId } = (await NABLData.find())[0];
  this.paramId = currentSoilParamId + 1;
});

export const NABLSoilParameters = mongoose.model(
  "nabl soil params",
  nablSoilParameterSchema
);

const nablWaterParameterSchema = mongoose.Schema({
  paramId: { type: Number },
  paramName: { type: String, required: true },
  paramVariables: { type: [String] },
  paramFormula: { type: String },
  paramUnit: { type: String, required: true },
  paramTestMethod: { type: String, required: true },
});

nablWaterParameterSchema.pre("save", async function (next) {
  if (this.paramId) next();
  const { currentWaterParamId } = (await NABLData.find())[0];
  this.paramId = currentWaterParamId + 1;
});

export const NABLWaterParameters = mongoose.model(
  "nabl water params",
  nablWaterParameterSchema
);

const nablParameterSetsSchema = mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  parameters: { type: [Number], required: true },
});

export const NABLParameterSets = mongoose.model(
  "nabl parameter sets",
  nablParameterSetsSchema
);

const sampleSchema = mongoose.Schema({
  sampleId: { type: Number },
  sampleCode: { type: String },
  sampleReceivedOn: { type: Date },
  sampleType: { type: String },
  sampleDetail: { type: String },
  analysisSet: {
    type: [Object],
    validate: {
      validator: async function (value) {
        const parameterSets = await NABLParameterSets.find({
          type: this.sampleType,
        }).select("name");
        const setNames = parameterSets.map((set) => set.name);
        return !Boolean(
          value.filter((set) => !setNames.includes(set.name) || set.isReported)
            .length
        );
      },
      message:
        "One or more analysis sets not found or don't match the sample type, or the server is receiving a request to mark the analysis set as reported by default",
    },
    required: true,
  },
  requestedBy: { type: String },
  sampleCondOrQty: { type: String },
  samplingBy: { type: String },
  name: { type: String },
  address: { type: String },
  contactNo: { type: Number },
  farmName: { type: String },
  surveyNo: { type: Number },
  prevCrop: { type: String },
  nextCrop: { type: String },
  isReported: { type: Boolean, required: true },
});

sampleSchema.pre("save", async function (next) {
  if (this.sampleId) {
    next();
  }
  this.sampleReceivedOn = !this.sampleReceivedOn
    ? new Date()
    : this.sampleReceivedOn;
  let { currentId, currentYear } = (await NABLData.find())[0];
  const todayYear = new Date().getFullYear();
  if (currentYear !== todayYear) {
    if (currentYear + 1 === todayYear) {
      try {
        await NABLData.updateOne(
          { currentId: currentId },
          {
            currentId: 0,
            currentYear: todayYear,
          }
        );
        currentId = 0;
        currentYear = todayYear;
        console.log("Year updated and ID reset to 0");
      } catch (error) {
        throw new Error(error);
      }
    } else {
      throw new Error("Error in years");
    }
  }
  this.sampleId = currentId + 1;
  this.sampleCode = generateSampleCode(this.sampleType, this.sampleId);
});

export const Sample = mongoose.model("samples", sampleSchema);

const reportSchema = mongoose.Schema({
  ulr: { type: String },
  sampleCode: { type: String, required: true },
  analysisSet: {
    type: String,
    required: true,
    validate: {
      validator: async function (value) {
        // const parameterSets = await NABLParameterSets.find({}).select("name");
        const sampleSets = await Sample.findOne({
          sampleCode: this.sampleCode,
        }).select("analysisSet");
        const remainingSets = sampleSets.analysisSet
          .filter((set) => !set.isReported)
          .map((set) => set.name);
        return remainingSets.includes(value);
      },
    },
  },
  testResults: { type: Object, required: true },
  isAuthorised: { type: Boolean, required: true },
  analysisStartedOn: { type: Date, required: true },
  analysisEndedOn: { type: Date, required: true },
});

reportSchema.pre("save", async function () {
  const value = await Sample.findOne({
    sampleCode: this.sampleCode,
  });
  const { sampleId } = value;
  const { currentCertificationNumber } = (await NABLData.find({}))[0];
  this.ulr = generateULR(
    currentCertificationNumber,
    sampleId,
    this.analysisSet
  );
});

export const Report = mongoose.model("reports", reportSchema);
