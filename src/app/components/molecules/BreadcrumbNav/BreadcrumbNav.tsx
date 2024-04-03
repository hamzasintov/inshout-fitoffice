import { Box, Breadcrumbs, Link, Typography } from "@mui/material";

const BreadcrumbNav = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",

        alignItems: "center",
      }}
    >
      <Breadcrumbs aria-label="breadcrumb" sx={{ color: "white" }}>
        <Link underline="hover" color="white" href="/">
          Tracking
        </Link>
        <Link underline="hover" color="white" href="/">
          Dashboard
        </Link>
      </Breadcrumbs>
      <Typography sx={{ color: "white", fontSize: "24px", fontWeight: "bold" }}>
        Dasboard
      </Typography>
    </Box>
  );
};

export default BreadcrumbNav;
