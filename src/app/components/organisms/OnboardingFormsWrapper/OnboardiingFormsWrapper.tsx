import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React, { FC } from "react";

import logo from "../../../../../public/fit-of.png";

interface FormWrapperProps {
  title?: string;
  description: string;
  children: React.ReactNode;
}

const OnboardingFormWrapper: FC<FormWrapperProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 6,
          maxWidth: "720px",
          width: "100%",
        }}
      >
        <Box sx={{ margin: 3 }}>
          <Image src={logo} width={216} alt="logo" />
        </Box>
        <Typography
          sx={{
            fontSize: "30px",
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 1,
            fontFamily: "Lulo",
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontSize: "22px",
            fontWeight: "medium",
            textAlign: "center",
            fontFamily: "Bolt",
          }}
        >
          {description}
        </Typography>
        {children}
      </Box>
    </Box>
  );
};

export default OnboardingFormWrapper;
