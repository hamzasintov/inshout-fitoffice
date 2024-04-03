import { Typography } from "@mui/material";
import { FC } from "react";

interface TableCellHeaderProps {
  text: string;
}

const TableCellHeader: FC<TableCellHeaderProps> = ({ text }) => {
  return (
    <Typography sx={{ fontSize: "12px", fontWeight: "bold" }}>
      {text}
    </Typography>
  );
};

export default TableCellHeader;
