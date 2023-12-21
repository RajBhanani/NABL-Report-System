import { Box, Grid, Paper, Typography, styled } from "@mui/material";
import ListBox from "../../../components/stickers/ListBox.jsx";
import { useSelector } from "react-redux";

import theme from "../../../constants/theme.js";
import StyledLink from "../../../components/stickers/StyledLink.jsx";
import CustomButton from "../../../components/stickers/CustomButton.jsx";
import { useState } from "react";

const AnalysisTypeBox = styled(Paper)({
  display: "flex",
  flexDirection: "column",
  gap: "1.5vh",
  overflowY: "auto",
  padding: "20px",
  backgroundColor: "rgba(255, 255, 255, 0.3)",
  [theme.breakpoints.down("sm")]: {
    height: "45vh",
    marginBottom: "5vh",
  },
});

const SamplesList = () => {
  const { samples } = useSelector((state) => state.nabl);
  const [seeReported, setSeeReported] = useState(false);

  return (
    <Box style={{ width: "100%" }}>
      <CustomButton
        text={seeReported ? "See Unreported Reports" : "See Reported Results"}
        color="white"
        borderColor="white"
        hoverBackground="rgba(255,255,255,0.3)"
        hoverborderColor="white"
        onClick={() => setSeeReported(!seeReported)}
      />
      <Grid container spacing={3}>
        <Grid item lg={6} md={12} sm={12} xs={12}>
          <Typography
            variant="h5"
            textAlign="center"
            style={{ color: "white", marginBottom: "20px" }}
          >
            Soil Samples
          </Typography>
          <AnalysisTypeBox>
            {samples
              .filter(
                (sample) =>
                  sample.sampleType === "Soil" &&
                  (seeReported ? sample.isReported : !sample.isReported)
              )
              .map((sample) => (
                <StyledLink key={sample.sampleCode} to={`${sample.sampleCode}`}>
                  <ListBox label={sample.sampleCode} />
                </StyledLink>
              ))}
          </AnalysisTypeBox>
        </Grid>
        <Grid item lg={6} md={12} sm={12} xs={12}>
          <Typography
            variant="h5"
            textAlign="center"
            style={{ color: "white", marginBottom: "20px" }}
          >
            Water Samples
          </Typography>
          <AnalysisTypeBox>
            {samples
              .filter(
                (sample) => sample.sampleType === "Water" && !sample.isReported
              )
              .map((sample) => (
                <StyledLink key={sample.sampleCode} to={`${sample.sampleCode}`}>
                  <ListBox label={sample.sampleCode} />
                </StyledLink>
              ))}
          </AnalysisTypeBox>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SamplesList;
