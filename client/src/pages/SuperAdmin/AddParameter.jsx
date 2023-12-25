import React, { useState } from "react";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Typography,
  styled,
} from "@mui/material";
import WhiteTextField from "../../components/stickers/WhiteTextField";
import StyledCheckBox from "../../components/stickers/StyledCheckBox";
import CustomButton from "../../components/stickers/CustomButton";
import theme from "../../constants/theme";
import { useCreateParamMutation } from "../../redux/slices/api slices/nablApiSlice";

const AddParameterBox = styled(Box)({
  height: "70vh",
  width: "70%",
  padding: "5vh 3vh",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  justifyContent: "center",
  alignItems: "center",
  background: "rgba(255,255,255, 0.15)",
  boxShadow: "0px 0px 10px white",
  backdropFilter: "blur(15px)",
  overflowY: "auto",
  [theme.breakpoints.down("md")]: {
    width: "90vw",
    height: "80vh",
  },
});

const WhiteText = styled(Typography)({
  color: "white",
});

const AddParameter = () => {
  const [createParam] = useCreateParamMutation();

  const [paramName, setParamName] = useState();
  const [paramUnit, setParamUnit] = useState();
  const [paramType, setParamType] = useState();
  const [paramVariables, setParamVariables] = useState([]);
  const [paramFormula, setParamFormula] = useState();
  const [paramTestMethod, setParamTestMethod] = useState();

  const handleChange = (index, value) => {
    paramVariables[index] = value;
    setParamVariables(paramVariables);
  };

  const handleSubmit = async () => {
    const filteredVariables = paramVariables.filter(
      (variable) => variable !== ""
    );
    setParamVariables(filteredVariables);
    try {
      const { message } = await createParam({
        paramName: paramName,
        paramUnit: paramUnit,
        paramType: paramType,
        paramVariables: filteredVariables || null,
        paramFormula: paramFormula || null,
        paramTestMethod: paramTestMethod,
      }).unwrap();
      console.log(message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AddParameterBox>
      <Grid container spacing={2}>
        <Grid item lg={4} md={4} sm={12} xs={12}>
          <WhiteTextField
            label="Parameter Name"
            onChange={(e) => setParamName(e.target.value)}
          />
        </Grid>
        <Grid item lg={4} md={4} sm={12} xs={12}>
          <WhiteTextField
            label="Parameter Unit"
            onChange={(e) => setParamUnit(e.target.value)}
          />
        </Grid>
        <Grid item lg={4} md={4} sm={12} xs={12}>
          <FormControl>
            <FormLabel>
              <WhiteText>Parameter Type</WhiteText>
            </FormLabel>
            <FormGroup>
              <FormControlLabel
                label={<WhiteText>Soil</WhiteText>}
                control={
                  <StyledCheckBox
                    checked={paramType === "soil"}
                    onClick={() => setParamType("soil")}
                  />
                }
              />
              <FormControlLabel
                label={<WhiteText>Water</WhiteText>}
                control={
                  <StyledCheckBox
                    checked={paramType === "water"}
                    onClick={() => setParamType("water")}
                  />
                }
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Box
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <WhiteText fontSize="17px">Parameter Variables</WhiteText>
            <Grid container spacing={4}>
              {paramVariables.map((value, index) => (
                <Grid item key={index} lg={3} md={4} sm={12} xs={12}>
                  <WhiteTextField
                    label={value}
                    onChange={(e) => handleChange(index, e.target.value)}
                  />
                </Grid>
              ))}
            </Grid>
            <CustomButton
              text="Add variable"
              color="white"
              background="#27187E"
              borderColor="white"
              hoverBackground="#CC2936"
              hoverborderColor="white"
              onClick={() => setParamVariables([...paramVariables, ""])}
              width="150px"
            />
          </Box>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <WhiteTextField
            label="Parameter Formula"
            onChange={(e) => setParamFormula(e.target.value)}
          />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <WhiteTextField
            label="Parameter Test Method"
            onChange={(e) => setParamTestMethod(e.target.value)}
          />
        </Grid>
      </Grid>
      <CustomButton
        text="Create Parameter"
        color="white"
        background="green"
        borderColor="white"
        hoverColor="green"
        hoverBackground="none"
        hoverborderColor="green"
        onClick={handleSubmit}
        width="200px"
      />
    </AddParameterBox>
  );
};

export default AddParameter;
