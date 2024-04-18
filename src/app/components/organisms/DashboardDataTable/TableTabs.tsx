import { Tab, Tabs } from "@mui/material";
import React from "react";

interface ITableTabs {
  tabValue: number;
  handleChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const TableTabs: React.FC<ITableTabs> = ({ tabValue, handleChange }) => {
  return (
    <Tabs
      value={tabValue}
      onChange={handleChange}
      sx={{
        "& .MuiTabs-indicator": {
          backgroundColor: "#2C3680",
          height: "4px",
        },
        "& .Mui-selected": {
          fontWeight: "bold",
          color: "#2C3680",
        },
        "& .MuiButtonBase-root-MuiTab-root": {
          fontSize: "14px",
          color: "black",
          fontWeight: "bold",
        },
      }}
    >
      <Tab sx={{ textTransform: "capitalize" }} label="Pending" />
      <Tab sx={{ textTransform: "capitalize" }} label="Outgoing" />
      <Tab sx={{ textTransform: "capitalize" }} label="In-Transit" />
      <Tab sx={{ textTransform: "capitalize" }} label="Delivered" />
      <Tab sx={{ textTransform: "capitalize" }} label="All" />
    </Tabs>
  );
};

export default TableTabs;
