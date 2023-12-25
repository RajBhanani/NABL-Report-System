import { Box, styled } from "@mui/material";
import Navbar from "../../components/Navbar";
import theme from "../../constants/theme";
import { Route, Routes } from "react-router-dom";
import NABLDataHome from "./NABLDataHome";
import AddParameter from "./AddParameter";
import AddParameterSet from "./AddParameterSet";
import EditParameters from "./EditParameters";

const NABLDataBackgroundBox = styled(Box)({
  background:
    "url(https://images.unsplash.com/photo-1545486332-ae6c3bf92201?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D) center",
  padding: "15vh 9vh 0vh 9vh",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  [theme.breakpoints.down("sm")]: {
    padding: "15vh 4vh 0vh 4vh",
  },
});

const NABLData = () => {
  return (
    <>
      <Navbar />
      <NABLDataBackgroundBox>
        <Routes>
          <Route path="/" element={<NABLDataHome />} />
          <Route path="/addParameter" element={<AddParameter />} />
          <Route path="/addParameterSet" element={<AddParameterSet />} />
          <Route path="/editParameters" element={<EditParameters />} />
        </Routes>
      </NABLDataBackgroundBox>
    </>
  );
};

export default NABLData;