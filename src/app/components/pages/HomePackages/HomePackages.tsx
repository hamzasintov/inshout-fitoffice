"use client";

import { Divider, Grid, Typography } from "@mui/material";
import ContentCard from "../../atoms/ContentCard";
import DateSelector from "../../atoms/DateSelector";
import { Box } from "@mui/system";
import PrimaryButton from "../../atoms/PrimaryButton";
import SelectItem from "../../atoms/SelectItem";
import DashboardDataTable from "../../organisms/DashboardDataTable";
import PackageProcessingCard from "../../organisms/PackageProcessingCard";

const HomePackages = () => {
  const handleExportToXLSX = () => {
    console.log("export button is clicked");
  };

  const handleClear = () => {
    console.log("clear button is clicked");
  };

  const handlePrint = () => {
    console.log("print button is clicked");
  };

  const handleView = () => {
    console.log("view button is clicked");
  };
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item md={8} xs={12}>
          <ContentCard height={200}>
            <Box sx={{ display: "flex" }}>
              <DateSelector label="From" placeholder="Select Date" />
              <DateSelector label="To" placeholder="Select Date" />
              <SelectItem
                label="Carrier"
                menuItems={["TCS", "LCS", "DHL", "FEDEX"]}
              />
              <DateSelector label="Package Status" placeholder="Select Date" />
            </Box>
            <Box sx={{ marginTop: "16px" }}>
              <PrimaryButton
                label="Export to XLSX"
                variant="outlined"
                handleOnClick={handleExportToXLSX}
                disabled={false}
                marginLeft={0.5}
                marginRight={0.5}
              />
              <PrimaryButton
                label="Clear"
                variant="outlined"
                handleOnClick={handleClear}
                disabled={false}
                marginLeft={0.5}
                marginRight={0.5}
              />
              <PrimaryButton
                label="Print"
                variant="outlined"
                handleOnClick={handlePrint}
                disabled={false}
                marginLeft={0.5}
                marginRight={0.5}
              />
              <PrimaryButton
                label="View"
                variant="contained"
                textColor="white"
                handleOnClick={handleView}
                disabled={false}
                marginLeft={0.5}
                marginRight={0.5}
              />
            </Box>
          </ContentCard>
        </Grid>
        <Grid item md={4} xs={12}>
          <PackageProcessingCard />
        </Grid>
      </Grid>
      <DashboardDataTable />
      <Divider />
      <Grid container spacing={2}>
        <Grid item md={4} xs={12}>
          <ContentCard height={400} flex flexColumn alignCenter>
            <Typography
              sx={{
                fontSize: "128px",
                fontWeight: "bold",
                color: `primary.main`,
              }}
            >
              21
            </Typography>
            <Typography
              sx={{
                fontSize: "48px",
                fontWeight: "bold",
                color: "#606060",
                textTransform: "uppercase",
              }}
            >
              Packages
            </Typography>
            <Typography
              sx={{
                fontSize: "28px",
                fontWeight: "bold",
                color: "#606060",
                textTransform: "uppercase",
              }}
            >
              Requiring Delivery
            </Typography>
          </ContentCard>
        </Grid>
        <Grid item md={4} xs={12}>
          <ContentCard height={400}>second card</ContentCard>
        </Grid>
        <Grid item md={4} xs={12}>
          <ContentCard height={400}>third card</ContentCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePackages;
