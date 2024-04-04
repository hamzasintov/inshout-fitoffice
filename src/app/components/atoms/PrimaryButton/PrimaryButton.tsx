import { Button, LinearProgress, Typography } from "@mui/material";
import { FC } from "react";

interface PrimaryButtonProps {
  label: string;
  variant: "contained" | "outlined";
  backgroundColor?: string;
  textColor?: string;
  handleOnClick: () => void;
  fullWidth?: boolean;
  height?: string;
  marginTop?: number;
  fontSize?: string;
  textTransform?: "uppercase" | "lowercase" | "capitalize";
  disabled: boolean;
  marginLeft?: number;
  marginRight?: number;
}

const PrimaryButton: FC<PrimaryButtonProps> = ({
  label,
  backgroundColor = "#2C3680",
  variant = "contained",
  handleOnClick,
  fullWidth = false,
  height = "36px",
  marginTop = 0,
  fontSize = "10px",
  textTransform = "uppercase",
  textColor,
  disabled,
  marginLeft,
  marginRight,
}) => {
  return (
    <>
      <Button
        fullWidth={fullWidth}
        variant={variant}
        onClick={handleOnClick}
        disabled={disabled}
        sx={{
          height: height,
          marginTop: marginTop,
          backgroundColor: disabled
            ? "grey"
            : variant === "contained"
            ? `${backgroundColor} !important`
            : "",
          marginRight: marginLeft,
          marginLeft: marginRight,
          paddingLeft: "24px",
          paddingRight: "24px",
        }}
      >
        <Typography
          sx={{
            fontSize: fontSize,
            fontWeight: 800,
            textTransform: textTransform,
            color: textColor,
          }}
        >
          {label}
        </Typography>
      </Button>
    </>
  );
};

export default PrimaryButton;
