import { useState } from "react";

import {
  Box,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Typography,
  styled,
} from "@mui/material";
import WhiteTextField from "../components/stickers/WhiteTextField";
import PasswordTextField from "../components/stickers/PasswordTextField";
import CustomButton from "../components/stickers/CustomButton";

import theme from "../constants/theme";
import { Link } from "react-router-dom";
import { useRegisterMutation } from "../redux/slices/api slices/adminApiSlice";
import StyledCheckbox from "../components/stickers/StyledCheckbox";

const bgLink =
  "https://cdn.pixabay.com/photo/2019/11/23/04/53/dopamine-4646236_1280.jpg";

const RegisterBackgroundBox = styled(Box)({
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: `url(${bgLink}) center/100vw`,
  [theme.breakpoints.down("md")]: {
    background: `url(${bgLink}) center/100vh`,
  },
  [theme.breakpoints.down("md")]: {
    background: `url(${bgLink}) center/150vh`,
    minHeight: "100vh",
    height: "max-content",
  },
  [theme.breakpoints.down("xs")]: {
    background: `url(${bgLink}) center/200vh`,
    height: "200vh",
  },
});

const RegisterBox = styled(Box)({
  width: "25%",
  height: "75%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "10px",
  gap: "3vh",
  background: "rgba(255,255,255, 0.15)",
  boxShadow: "0px 0px 10px white",
  backdropFilter: "blur(15px)",
  [theme.breakpoints.down("lg")]: {
    width: "40%",
  },
  [theme.breakpoints.down("md")]: {
    width: "60%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "80%",
  },
  [theme.breakpoints.down("xs")]: {
    width: "90%",
  },
});

const Register = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [role, setRole] = useState();
  const [register] = useRegisterMutation();

  const handleSubmit = async () => {
    try {
      const response = await register({ name, email, password, role }).unwrap();
      console.log(response.message);
    } catch (error) {
      console.log(error?.data?.message || error.error);
    }
  };

  return (
    <RegisterBackgroundBox>
      <RegisterBox>
        {/* Logo and heading */}
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            color="white"
            style={{ textShadow: "0px 0px 10px white" }}
          >
            Register User
          </Typography>
        </Box>
        <WhiteTextField
          label="Name"
          width="75%"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <WhiteTextField
          label="Email"
          width="75%"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <PasswordTextField
          width="75%"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <FormControl>
          <FormLabel>
            <Typography color="white">Role</Typography>
          </FormLabel>
          <FormGroup style={{ display: "flex", flexDirection: "row" }}>
            <FormControlLabel
              control={
                <StyledCheckbox
                  checked={role === "user"}
                  onClick={() => setRole("user")}
                />
              }
              label={<Typography color="white">User</Typography>}
            />
            <FormControlLabel
              control={
                <StyledCheckbox
                  checked={role === "admin"}
                  onClick={() => setRole("admin")}
                />
              }
              label={<Typography color="white">Admin</Typography>}
            />
            <FormControlLabel
              control={
                <StyledCheckbox
                  checked={role === "superadmin"}
                  onClick={() => setRole("superadmin")}
                />
              }
              label={<Typography color="white">Superadmin</Typography>}
            />
          </FormGroup>
        </FormControl>
        <CustomButton
          text="Register"
          color="white"
          borderColor="white"
          hoverBackground="rgba(255,255,255,0.3)"
          hoverborderColor="white"
          onClick={handleSubmit}
        />
        <Link to="/home">
          <CustomButton
            text="Go Back"
            background="rgba(0,0,0,0.7)"
            hoverBackground="rgba(0,0,0,0.9)"
            onClick={() => null}
          />
        </Link>
      </RegisterBox>
    </RegisterBackgroundBox>
  );
};

export default Register;
