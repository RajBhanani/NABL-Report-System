import { Grid } from "@mui/material";
import StyledLink from "../../components/stickers/StyledLink";
import MenuBox from "../../components/MenuBox";

const AdminMenu = () => {
  return (
    <Grid
      container
      spacing={7}
      style={{ color: "white", display: "flex", justifyContent: "center" }}
    >
      <Grid item lg={4} md={4} sm={8} xs={12}>
        <StyledLink to="/register">
          <MenuBox text="Register" />
        </StyledLink>
      </Grid>
      <Grid item lg={4} md={4} sm={8} xs={12}>
        <StyledLink to="/nablData">
          <MenuBox text="NABL Data" />
        </StyledLink>
      </Grid>
    </Grid>
  );
};

export default AdminMenu;
