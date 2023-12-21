import PropTypes from "prop-types";
import { Button } from "@mui/material";

const CustomButton = ({
  text,
  color,
  background,
  borderColor,
  hoverColor,
  hoverBackground,
  hoverborderColor,
  onClick,
  width,
}) => {
  CustomButton.propTypes = {
    text: PropTypes.string.isRequired,
    color: PropTypes.string,
    background: PropTypes.string,
    borderColor: PropTypes.string,
    hoverColor: PropTypes.string,
    hoverBackground: PropTypes.string,
    hoverborderColor: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    width: PropTypes.string,
  };

  return (
    <Button
      variant="outlined"
      size="large"
      sx={{
        width: width,
        textTransform: "none",
        borderColor: borderColor,
        color: color,
        background: background,
        "&:hover": {
          color: hoverColor,
          background: hoverBackground,
          borderColor: hoverborderColor,
        },
      }}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default CustomButton;
