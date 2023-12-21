import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  styled,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import GeneratePDFComponent from "./GeneratePDFComponent";

const OpenAuthorisedReportBox = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
});

const WhiteText = styled(Typography)({
  color: "white",
});

const OpenAuthorisedReport = () => {
  const { sampleCode } = useParams();
  const [searchParams] = useSearchParams();
  const analysisSet = searchParams.get("analysisSet");

  let { samples, parameters, reports } = useSelector((state) => state.nabl);

  const sample = samples.filter(
    (sample) => sample.sampleCode === sampleCode
  )[0];
  const report = reports.filter(
    (report) =>
      report.sampleCode === sampleCode && report.analysisSet === analysisSet
  )[0];
  parameters =
    sampleCode[2] === "S"
      ? parameters.soilParameters
      : parameters.waterParameters;

  samples = [];
  reports = [];

  return (
    <OpenAuthorisedReportBox>
      <Grid container spacing={4}>
        <Grid item lg={6} md={12} sm={12} xs={12}>
          <WhiteText variant="h6" align="center">
            Customer Details
          </WhiteText>
          <TableContainer
            component={Box}
            style={{
              height: "50vh",
              overflowY: "auto",
              width: "100%",
              overflowX: "hidden",
            }}
          >
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <WhiteText align="center">Sample Received On</WhiteText>
                  </TableCell>
                  <TableCell>
                    <WhiteText align="center">
                      {sample.sampleReceivedOn || "Not Provided"}
                    </WhiteText>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <WhiteText align="center">Sample Type</WhiteText>
                  </TableCell>
                  <TableCell>
                    <WhiteText align="center">
                      {sample.sampleType || "Not Provided"}
                    </WhiteText>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <WhiteText align="center">Sample Detail</WhiteText>
                  </TableCell>
                  <TableCell>
                    <WhiteText align="center">
                      {sample.sampleDetail || "Not Provided"}
                    </WhiteText>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <WhiteText align="center">Requested By</WhiteText>
                  </TableCell>
                  <TableCell>
                    <WhiteText align="center">
                      {sample.requestedBy || "Not Provided"}
                    </WhiteText>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <WhiteText align="center">
                      Sample Condition/Quantity
                    </WhiteText>
                  </TableCell>
                  <TableCell>
                    <WhiteText align="center">
                      {sample.sampleCondOrQty || "Not Provided"}
                    </WhiteText>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <WhiteText align="center">Sampling By</WhiteText>
                  </TableCell>
                  <TableCell>
                    <WhiteText align="center">
                      {sample.samplingBy || "Not Provided"}
                    </WhiteText>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <WhiteText align="center">
                      Name of Farmer/Customer
                    </WhiteText>
                  </TableCell>
                  <TableCell>
                    <WhiteText align="center">
                      {sample.name || "Not Provided"}
                    </WhiteText>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <WhiteText align="center">Address</WhiteText>
                  </TableCell>
                  <TableCell>
                    <WhiteText align="center">
                      {sample.address || "Not Provided"}
                    </WhiteText>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <WhiteText align="center">Contact Number</WhiteText>
                  </TableCell>
                  <TableCell>
                    <WhiteText align="center">
                      {sample.contactNo || "Not Provided"}
                    </WhiteText>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <WhiteText align="center">Farm Name</WhiteText>
                  </TableCell>
                  <TableCell>
                    <WhiteText align="center">
                      {sample.farmName || "Not Provided"}
                    </WhiteText>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <WhiteText align="center">Survey Number</WhiteText>
                  </TableCell>
                  <TableCell>
                    <WhiteText align="center">
                      {sample.surveyNo || "Not Provided"}
                    </WhiteText>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <WhiteText align="center">Previous Crop</WhiteText>
                  </TableCell>
                  <TableCell>
                    <WhiteText align="center">
                      {sample.prevCrop || "Not Provided"}
                    </WhiteText>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <WhiteText align="center">Next Crop</WhiteText>
                  </TableCell>
                  <TableCell>
                    <WhiteText align="center">
                      {sample.nextCrop || "Not Provided"}
                    </WhiteText>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item lg={6} md={12} sm={12} xs={12}>
          <WhiteText variant="h6" align="center">
            Report Details
          </WhiteText>
          <WhiteText fontSize={18}>Sample Code: {sample.sampleCode}</WhiteText>
          <WhiteText fontSize={18}>
            Analysis Set: {analysisSet}, (
            {Object.keys(report.testResults).length} parameters)
          </WhiteText>
          <WhiteText fontSize={18}>ULR: {report.ulr}</WhiteText>
          <TableContainer
            component={Box}
            style={{
              height: "38.5vh",
              overflowY: "auto",
              width: "100%",
              overflowX: "hidden",
            }}
          >
            <Table>
              <TableBody>
                {parameters
                  .filter((param) =>
                    Object.hasOwn(report.testResults, param.paramId)
                  )
                  .map((param) => (
                    <TableRow key={param.paramId}>
                      <TableCell>
                        <WhiteText align="center">{param.paramName}</WhiteText>
                      </TableCell>
                      <TableCell>
                        <WhiteText align="center">
                          {report.testResults[param.paramId]}
                        </WhiteText>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <GeneratePDFComponent sampleCode={sampleCode} analysisSet={analysisSet} />
    </OpenAuthorisedReportBox>
  );
};

export default OpenAuthorisedReport;
