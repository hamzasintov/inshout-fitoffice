import { Box } from "@mui/material";
import { FC } from "react";

interface StatusChipProps {
  text: string;
  backgroundColor: string;
}

const StatusChip: FC<StatusChipProps> = ({ text, backgroundColor }) => {
  return (
    <Box
      sx={{
        backgroundColor: backgroundColor,
        textTransform: "uppercase",
        width: "88px",
        height: "24px",
        borderRadius: "8px",
        fontSize: "11px",
        fontWeight: "bold",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {text}
    </Box>
  );
};

export default StatusChip;
