import { Box, TextField, Typography } from "@mui/material";
import { FC } from "react";

interface TextInputProps {
  label: string;
  type: string;
  fullWidth?: boolean;
}

const TextInput: FC<TextInputProps> = ({ label, type, fullWidth }) => {
  return (
    <Box sx={{ marginRight: "4px", marginLeft: "4px" }}>
      <Typography
        sx={{
          color: "#47494B",
          fontSize: "12px",
          fontWeight: "bold",
          marginBottom: "8px",
        }}
      >
        {label}
      </Typography>
      <TextField
        variant="outlined"
        placeholder="Booking Number"
        type={type}
        size="small"
        fullWidth={fullWidth}
      />
    </Box>
  );
};

export default TextInput;
