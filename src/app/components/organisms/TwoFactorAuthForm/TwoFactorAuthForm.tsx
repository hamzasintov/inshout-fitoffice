"use client";

import { Box } from "@mui/material";
import InputEmail from "../../molecules/InputEmail";
import OnboardingFormWrapper from "../OnboardingFormsWrapper";
import PrimarySwitch from "../../atoms/PrimarySwitch";
import PrimaryButton from "../../atoms/PrimaryButton";

const TwoFactorAuthForm = () => {
  const handleAuthenticate = () => {
    console.log("authentication clicked");
  };
  return (
    <OnboardingFormWrapper
      title="Welcome"
      description="We have sent an email to your associated
        address: name@youremail.com. Please
        check your email for an authentication code. "
    >
      <Box sx={{ width: "100%" }}>
        <InputEmail />
        <PrimarySwitch text="Remember this device?" />
        <PrimaryButton
          label="Authenticate"
          variant="contained"
          handleOnClick={handleAuthenticate}
          fullWidth
          fontSize="24px"
          marginTop={6}
          height="56px"
          textTransform="capitalize"
          textColor="white"
        />
      </Box>
    </OnboardingFormWrapper>
  );
};
export default TwoFactorAuthForm;
