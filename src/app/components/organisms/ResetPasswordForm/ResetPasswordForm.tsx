"use client";

import {
  Box,
  CircularProgress,
  Link,
  Snackbar,
  Typography,
} from "@mui/material";
import OnboardingFormWrapper from "../OnboardingFormsWrapper";
import InputPassword from "../../molecules/InputPassword";
import PrimaryButton from "../../atoms/PrimaryButton";
import { SetStateAction, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { usePostUsersResetPasswordMutation } from "@/app/store/fitOf";
import { useRouter } from "next/navigation";

const ResetPasswordForm = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [disableButton, setDisableButton] = useState(true);
  const [passwordError, setPasswordError] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [apiError, setApiError] = useState("");

  const router = useRouter();

  const [postUsersResetPassword, { data, isLoading, error }] =
    usePostUsersResetPasswordMutation();

  const params = useSearchParams();

  const handleSetPassword = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setPassword(e.target.value);
    if (confirmPassword === e.target.value) {
      setDisableButton(false);
      setPasswordError("");
      setApiError("");
    } else {
      setDisableButton(true);
      setPasswordError("Password Mismatch");
    }
  };

  const handleSetConfirmPassword = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setConfirmPassword(e.target.value);
    if (password === e.target.value) {
      setDisableButton(false);
      setPasswordError("");
      setApiError("");
    } else {
      setDisableButton(true);
      setPasswordError("Password Mismatch");
    }
  };

  const handleReset = async () => {
    console.log("reset clicked");
    console.log("token is", password, confirmPassword, params.get("token"));

    const token = params.get("token") || "";

    if (password === confirmPassword) {
      await postUsersResetPassword({
        resetPasswordRequest: {
          newPassword: password,
          resetToken: token,
        },
      });
    }
  };

  useEffect(() => {
    if (data) {
      console.log("data is", data);
      setShowSnackbar(true);
      // router.push("/on-boarding/login");
    }
    if (error && "data" in error) {
      const data = JSON.stringify(error.data);
      const parsedData = JSON.parse(data);
      console.log("error message", parsedData.errorMessage);
      setApiError(parsedData.errorMessage);
    }
  }, [data, error, router]);

  console.log("data is", data);

  return (
    <OnboardingFormWrapper
      title="Reset Your Password"
      description="Please enter your password "
    >
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={showSnackbar}
        message={
          <span>
            Password reset successfully. Please{" "}
            <Link
              href="/on-boarding/login"
              sx={{ color: "white", textDecoration: "underline" }}
            >
              Login
            </Link>{" "}
            to your account&nbsp;
          </span>
        }
      />
      <Box sx={{ width: "100%" }}>
        <InputPassword
          password={password}
          handleSetPassword={handleSetPassword}
        />
        <InputPassword
          password={confirmPassword}
          handleSetPassword={handleSetConfirmPassword}
          label="Confirm Password"
          placeholder="Confirm Password"
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CircularProgress
            sx={{
              marginTop: 2,
              visibility: !isLoading ? "hidden" : "",
            }}
          />
        </Box>
        <Typography sx={{ color: "red" }}>
          {passwordError || apiError}
          <span>&nbsp;</span>
        </Typography>
        <PrimaryButton
          label="Reset Password"
          variant="contained"
          handleOnClick={handleReset}
          fullWidth
          fontSize="24px"
          marginTop={1}
          height="56px"
          textTransform="capitalize"
          textColor="white"
          disabled={disableButton}
        />
      </Box>
    </OnboardingFormWrapper>
  );
};

export default ResetPasswordForm;
