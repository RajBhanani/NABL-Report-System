import { Box, styled } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import UserMenu from "./UserMenu";
import AdminMenu from "./AdminMenu";

const HomeBackgroundBox = styled(Box)({
  background:
    "url(https://images.unsplash.com/photo-1637004732258-4b792ce8f474?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D) center/100vw",
  padding: "19vh 9vh",
  height: "100vh",
});

const Home = () => {
  const { role } = useSelector((state) => state.auth).userInfo;
  return (
    <>
      <Navbar />
      <HomeBackgroundBox>
        {role === "superadmin" ? <AdminMenu /> : <UserMenu />}
      </HomeBackgroundBox>
    </>
  );
};

export default Home;
