"use client";

import { Box, CircularProgress, Snackbar, Typography } from "@mui/material";
import OnboardingFormWrapper from "../OnboardingFormsWrapper";
import InputEmail from "../../molecules/InputEmail";
import PrimaryButton from "../../atoms/PrimaryButton";
import { SetStateAction, useEffect, useState } from "react";
import { usePostUsersForgotPasswordMutation } from "@/app/store/fitOf";

const ForgotPassEnterEmailForm = () => {
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [disableButton, setDisableButton] = useState(true);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [apiError, setApiError] = useState("");

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  const [postUsersForgotPassword, { data, isLoading, error, status }] =
    usePostUsersForgotPasswordMutation();

  const handleSetRecoveryEmail = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setRecoveryEmail(e.target.value);
    setEmailError("Email is invalid");
    setApiError("");
    setDisableButton(true);
    if (emailRegex.test(e.target.value.toString())) {
      console.log("email is valid");
      setEmailError("");
      setDisableButton(false);
    }
  };

  const sendRecoveryEmail = async () => {
    console.log("send recovery email clicked");
    await postUsersForgotPassword({
      forgotPasswordRequest: { email: recoveryEmail },
    });
  };

  useEffect(() => {
    if (data) {
      console.log("data is", data, status);
      if (status === "fulfilled") {
        console.log("fullfiled");
        setShowSnackbar(true);
      }
    }
    if (error && "data" in error) {
      const data = JSON.stringify(error.data);
      const parsedData = JSON.parse(data);
      console.log("error message", parsedData.errorMessage);
      setApiError(parsedData.errorMessage);
    }
  }, [data, status, error]);

  console.log("error is", error);

  return (
    <OnboardingFormWrapper
      title="Forgot Password?"
      description="We will send you a reset password email."
    >
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={showSnackbar}
        message="Recovery email sent to your email address"
      />
      <Box sx={{ width: "100%" }}>
        <InputEmail
          email={recoveryEmail}
          handleSetEmail={handleSetRecoveryEmail}
          errorMessage={emailError}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CircularProgress
            sx={{
              marginTop: 1,
              visibility: !isLoading ? "hidden" : "",
            }}
          />
        </Box>
        <Typography sx={{ color: "red" }}>
          {apiError}
          <span>&nbsp;</span>
        </Typography>
        <PrimaryButton
          label="Send Recovery Email"
          variant="contained"
          handleOnClick={sendRecoveryEmail}
          fullWidth
          fontSize="24px"
          marginTop={1}
          height="56px"
          textTransform="capitalize"
          textColor="white"
          disabled={isLoading || disableButton}
        />
      </Box>
    </OnboardingFormWrapper>
  );
};

export default ForgotPassEnterEmailForm;
