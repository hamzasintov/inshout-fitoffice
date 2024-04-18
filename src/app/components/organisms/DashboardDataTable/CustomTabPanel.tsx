import { Box } from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index } = props;

  return (
    <Box
      role="tabpanel"
      sx={{
        display: value !== index ? "none" : undefined,
        width: "100%",
        maxWidth: "100%",
        // border: "3px solid red",
      }}
    >
      {value === index && <Box>{children}</Box>}
    </Box>
  );
};

export default CustomTabPanel;
