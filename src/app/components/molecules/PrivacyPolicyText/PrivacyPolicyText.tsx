import { Box, Typography } from "@mui/material";

const PrivacyPolicyText = () => {
  const handleTermsofConditions = () => {
    console.log("terms of conditions clicked");
  };

  const handlePrivacyPolicy = () => {
    console.log("privacy policy clicked");
  };

  return (
    <Box sx={{ display: "flex", marginTop: 1, justifyContent: "center" }}>
      <Box sx={{ display: "flex" }}>
        <Typography sx={{ fontSize: "16px", color: "#1F1E1E" }}>
          By continuing, you agree to the&nbsp;
        </Typography>
        <Typography
          onClick={handleTermsofConditions}
          sx={{
            fontSize: "16px",
            fontWeight: "bold",
            color: "#1F1E1E",
            textDecoration: "underline",
            "&:hover": { cursor: "pointer" },
          }}
        >
          Terms of use
        </Typography>
        <Typography sx={{ fontSize: "16px", color: "#1F1E1E" }}>
          &nbsp;and&nbsp;
        </Typography>
        <Typography
          onClick={handlePrivacyPolicy}
          sx={{
            fontSize: "16px",
            fontWeight: "bold",
            color: "#1F1E1E",
            textDecoration: "underline",
            "&:hover": { cursor: "pointer" },
          }}
        >
          Privacy Policy.
        </Typography>
      </Box>
    </Box>
  );
};

export default PrivacyPolicyText;
