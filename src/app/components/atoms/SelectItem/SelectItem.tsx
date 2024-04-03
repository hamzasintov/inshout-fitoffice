import { Box, MenuItem, Select, Typography } from "@mui/material";
import { FC, SetStateAction, useState } from "react";

interface SelectItemProps {
  label: string;
  menuItems: string[];
}

const SelectItem: FC<SelectItemProps> = ({ label, menuItems }) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleOnChange = (e: { target: { value: SetStateAction<string> } }) => {
    setSelectedValue(e.target.value);
  };
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
      <Select
        size="small"
        sx={{ width: "160px" }}
        value={selectedValue}
        onChange={handleOnChange}
        displayEmpty
        renderValue={(selected) => {
          if (!selected) {
            return (
              <Typography sx={{ color: "grey" }}>Select Carrier</Typography>
            );
          }
          return <p>{selectedValue}</p>;
        }}
      >
        {menuItems.map((item, index) => {
          return (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          );
        })}
      </Select>
    </Box>
  );
};

export default SelectItem;
