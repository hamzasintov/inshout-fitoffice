"use client";

import { Typography } from "@mui/material";
import { useRouter } from "next/navigation";

const ForgotPasswordButton = () => {
  const router = useRouter();
  const handleForgotPassword = () => {
    console.log("forgot password clicked");
    router.push("/on-boarding/forgot-password-enter-email");
  };

  return (
    <Typography
      onClick={handleForgotPassword}
      sx={{
        color: "#2C3680",
        textDecoration: "underline",
        "&:hover": { cursor: "pointer" },
      }}
    >
      Forgot Password?
    </Typography>
  );
};

export default ForgotPasswordButton;
