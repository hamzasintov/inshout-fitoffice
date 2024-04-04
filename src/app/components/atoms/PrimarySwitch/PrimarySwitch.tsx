"use client";

import styled from "@emotion/styled";
import { Box, Switch, Typography } from "@mui/material";
import { FC, useState } from "react";

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#2C3680",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: "grey",
    boxSizing: "border-box",
  },
}));

interface PrimarySwitchProps {
  text: string;
}

const PrimarySwitch: FC<PrimarySwitchProps> = ({ text }) => {
  const [checked, setChecked] = useState(false);

  const handleOnChange = (e: {
    target: { checked: boolean | ((prevState: boolean) => boolean) };
  }) => {
    console.log("changed", e.target.checked);
    setChecked(e.target.checked);
  };
  return (
    <Box sx={{ display: "flex", alignItems: "center", marginTop: 1 }}>
      <AntSwitch
        inputProps={{ "aria-label": "ant design" }}
        onChange={handleOnChange}
        checked={checked}
      />
      <Typography sx={{ fontSize: "16px", marginLeft: 1 }}>{text}</Typography>
    </Box>
  );
};

export default PrimarySwitch;
