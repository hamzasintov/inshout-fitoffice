import { Typography } from "@mui/material";
import { FC } from "react";

interface TableCellItemProps {
  text: string;
}

const TableCellItem: FC<TableCellItemProps> = ({ text }) => {
  return (
    <Typography sx={{ fontSize: "11px", fontWeight: "bold" }}>
      {text}
    </Typography>
  );
};

export default TableCellItem;
