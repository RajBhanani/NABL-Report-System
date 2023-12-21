import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, styled } from "@mui/material";

import {
  useLoginMutation,
  useVerifyUserMutation,
} from "../redux/slices/api slices/usersApiSlice";
import { setCredentials } from "../redux/slices/authSlice";

import WhiteTextField from "../components/stickers/WhiteTextField";
import PasswordTextField from "../components/stickers/PasswordTextField";
import CustomButton from "../components/stickers/CustomButton";

import theme from "../constants/theme";


const bgLink =
  "https://cdn.pixabay.com/photo/2018/02/27/14/58/crystal-grid-3185671_1280.png";

const LoginBackgroundBox = styled(Box)({
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

const LoginBox = styled(Box)({
  width: "25%",
  height: "65%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "30px 10px",
  gap: "4vh",
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

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login] = useLoginMutation();
  const [verifyUser] = useVerifyUserMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const verifyUserToken = async () => {
      try {
        const response = await verifyUser();
        response?.data?.message === "valid token"
          ? navigate("/home")
          : navigate("/");
      } catch (error) {
        console.log(error);
      }
    };
    if (userInfo) verifyUserToken();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...response }));
      navigate("/home");
    } catch (error) {
      console.log(error?.data?.message || error.error);
    }
  };

  return (
    <LoginBackgroundBox>
      <LoginBox>
        {/* Logo and heading */}

        <Typography
          variant="h6"
          color="white"
          style={{ textShadow: "0px 0px 10px white" }}
        >
          NABL
        </Typography>
        <WhiteTextField
          label="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required={true}
          width="80%"
        />
        <PasswordTextField
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          width="80%"
        />
        {/* <Box style={{ width: "80%", marginTop: "-1%" }}>
          <Typography>Forgot Password?</Typography>
        </Box> */}
        <CustomButton
          text="Login"
          color="white"
          borderColor="white"
          hoverBackground="rgba(255,255,255,0.3)"
          hoverborderColor="white"
          onClick={handleSubmit}
        />
      </LoginBox>
    </LoginBackgroundBox>
  );
};

export default Login;
