import { Box, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { FC, useState } from "react";

interface DateSelectorProps {
  label: string;
  placeholder: string;
}

const DateSelector: FC<DateSelectorProps> = ({ label, placeholder }) => {
  const [value, setValue] = useState<Dayjs | null>();

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
      <DatePicker
        slotProps={{
          textField: { size: "small", placeholder: `${placeholder}` },
        }}
        value={value}
        onChange={(newValue) => setValue(newValue)}
      />
    </Box>
  );
};

export default DateSelector;
