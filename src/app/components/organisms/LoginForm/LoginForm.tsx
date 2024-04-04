"use client";

import { Box, CircularProgress, Typography } from "@mui/material";
import InputEmail from "../../molecules/InputEmail";
import InputPassword from "../../molecules/InputPassword";
import PrimaryButton from "../../atoms/PrimaryButton";

import PrimarySwitch from "../../atoms/PrimarySwitch";
import PrivacyPolicyText from "../../molecules/PrivacyPolicyText";
import ForgotPasswordButton from "../../atoms/ForgotPasswordButton";
import OnboardingFormWrapper from "../OnboardingFormsWrapper";

import { useRouter } from "next/navigation";

import { usePostUsersLoginMutation } from "@/app/store/fitOf";
import { SetStateAction, useEffect, useState } from "react";
import { setUser } from "@/app/features/auth/authSlice";
import { useDispatch } from "react-redux";

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [disableButton, setDisableButton] = useState(true);
  const [emailError, setEmailError] = useState("");
  const [apiError, setApiError] = useState("");

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  const [postUsersLogin, { isLoading, data, error, status }] =
    usePostUsersLoginMutation();

  const handleSetEmail = (e: { target: { value: SetStateAction<string> } }) => {
    setEmail(e.target.value);
    setEmailError("Email is invalid");
    setDisableButton(true);
    setApiError("");
    if (emailRegex.test(e.target.value.toString())) {
      console.log("email is valid");
      setEmailError("");
      if (password) setDisableButton(false);
    }
  };

  const handleSetPassword = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setPassword(e.target.value);
    setApiError("");
    if (emailRegex.test(email.toString())) setDisableButton(false);
  };

  const handleLogin = async () => {
    console.log("login clicked");
    await postUsersLogin({ loginUserRequest: { email, password } });
  };

  useEffect(() => {
    if (data) {
      console.log("data is", data);
      dispatch(setUser({ user: data, accessToken: data.accessToken }));
      router.push("/admin-panel/tracking");
    }
    if (error && "data" in error) {
      const data = JSON.stringify(error.data);
      const parsedData = JSON.parse(data);
      console.log("error message", parsedData.errorMessage);
      setApiError(parsedData.errorMessage);
    }
  }, [data, dispatch, error, router]);

  return (
    <>
      <OnboardingFormWrapper
        // title="Welcome Back"
        description="Login into your account"
      >
        <Box>
          <InputEmail
            email={email}
            handleSetEmail={handleSetEmail}
            errorMessage={emailError}
          />
          <InputPassword
            password={password}
            handleSetPassword={handleSetPassword}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <PrimarySwitch text="Remember me" />
            <ForgotPasswordButton />
          </Box>
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
            {apiError}
            <span>&nbsp;</span>
          </Typography>

          <PrimaryButton
            label="Login"
            handleOnClick={handleLogin}
            fullWidth
            fontSize="24px"
            marginTop={1}
            height="56px"
            variant="contained"
            textTransform="capitalize"
            textColor="white"
            disabled={isLoading || disableButton}
          />
          <PrivacyPolicyText />
        </Box>
      </OnboardingFormWrapper>
    </>
  );
};

export default LoginForm;
