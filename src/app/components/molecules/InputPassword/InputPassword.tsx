"use client";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { FC, SetStateAction, useState } from "react";
import Image from "next/image";

import lock from "../../../../../public/lock.svg";

interface InputPasswordProps {
  password: string;
  handleSetPassword: (e: { target: { value: SetStateAction<string> } }) => void;
  label?: string;
  placeholder?: string;
}

const InputPassword: FC<InputPasswordProps> = ({
  password,
  handleSetPassword,
  label = "Password",
  placeholder = "Enter Password",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography
        sx={{
          fontSize: "16px",
          fontWeight: "medium",
          color: "#1F1E1E",
          marginBottom: 1,
        }}
      >
        {label}
      </Typography>
      <OutlinedInput
        fullWidth
        placeholder={placeholder}
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={handleSetPassword}
        startAdornment={
          <InputAdornment
            position="start"
            sx={{ marginLeft: 1, marginRight: 2 }}
          >
            <Image src={lock} width={22} alt="lock" />
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
    </Box>
  );
};

export default InputPassword;
