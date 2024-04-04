import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import Image from "next/image";

import emailIcon from "../../../../../public/emailIcon.svg";
import { Dispatch, FC, SetStateAction, useState } from "react";

interface InputEmailProps {
  email: string;
  handleSetEmail: (e: { target: { value: SetStateAction<string> } }) => void;
  errorMessage?: string;
}

const InputEmail: FC<InputEmailProps> = ({
  email,
  handleSetEmail,
  errorMessage,
}) => {
  return (
    <>
      <Box sx={{ marginTop: 4 }}>
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: "medium",
            color: "#1F1E1E",
            marginBottom: 1,
          }}
        >
          Email
        </Typography>
        <TextField
          placeholder="Enter Email"
          type="email"
          fullWidth
          value={email}
          onChange={handleSetEmail}
          InputProps={{
            startAdornment: (
              <InputAdornment
                position="start"
                sx={{ marginLeft: 1, marginRight: 2 }}
              >
                <Image src={emailIcon} width={22} alt="email" />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Typography sx={{ color: "red", fontSize: "14px" }}>
        {errorMessage}
        <span>&nbsp;</span>
      </Typography>
    </>
  );
};

export default InputEmail;
