import { Box } from "@mui/material";
import { FC } from "react";

interface ContentCardProps {
  height?: number;
  width?: number;
  children: React.ReactNode;
  padding?: number;
  flex?: boolean;
  flexColumn?: boolean;
  justifyCenter?: boolean;
  alignCenter?: boolean;
}

const ContentCard: FC<ContentCardProps> = ({
  height,
  width,
  children,
  padding = 4,
  flex,
  flexColumn,
  justifyCenter,
  alignCenter,
}) => {
  return (
    <Box
      height={height}
      width={width ? width : "full"}
      padding={padding}
      sx={{
        borderRadius: 8,
        boxShadow: "0px 2px 12px rgba(0, 0, 0, 0.1)",
        backgroundColor: "white",
        marginTop: "16px",
        marginBottom: "16px",
        display: flex ? "flex" : "",
        flexDirection: flexColumn ? "column" : "",
        justifyContent: justifyCenter ? "center" : "",
        alignItems: alignCenter ? "center" : "",
      }}
    >
      {children}
    </Box>
  );
};

export default ContentCard;
