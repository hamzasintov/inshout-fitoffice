import { Button, Typography } from "@mui/material";
import { FC } from "react";

interface PrimaryButtonProps {
  label: string;
  variant: "contained" | "outlined";
  backgroundColor?: string;
  color?: string;
  handleOnClick: () => void;
}

const PrimaryButton: FC<PrimaryButtonProps> = ({
  label,
  backgroundColor = "#094DAE",
  variant = "contained",
  handleOnClick,
}) => {
  return (
    <Button
      variant={variant}
      onClick={handleOnClick}
      sx={{
        height: "36px",
        backgroundColor:
          variant === "contained" ? `${backgroundColor} !important` : "",
        marginRight: "4px",
        marginLeft: "4px",
        paddingLeft: "24px",
        paddingRight: "24px",
      }}
    >
      <Typography sx={{ fontSize: "10px", fontWeight: 500 }}>
        {label}
      </Typography>
    </Button>
  );
};

export default PrimaryButton;
