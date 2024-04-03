import { GridColDef } from "@mui/x-data-grid";
import ContentCard from "../../atoms/ContentCard";
import DataTable from "../../molecules/DataTable";
import TableCellItem from "../../atoms/TableCellItem";
import StatusChip from "../../atoms/StatusChip";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import TableCellHeader from "../../atoms/TableCellHeader";
import { useState } from "react";
import Image from "next/image";

import dotsIcon from "../../../../../public/dotsIcon.svg";
import EditButton from "../../atoms/EditButton";

const columns: GridColDef[] = [
  {
    field: "carrier",
    flex: 0.75,
    renderHeader: () => {
      return <TableCellHeader text="Carrier" />;
    },
    renderCell: (params) => {
      return <TableCellItem text={params.value} />;
    },
  },
  {
    field: "trackingNo",
    flex: 1.5,
    renderHeader: () => {
      return <TableCellHeader text="Tracking #" />;
    },
    renderCell: (params) => {
      return <TableCellItem text={params.value} />;
    },
  },
  {
    field: "status",
    flex: 1,
    renderHeader: () => {
      return <TableCellHeader text="Status" />;
    },
    renderCell: (params) => {
      return (
        <StatusChip
          text={params.value}
          backgroundColor={
            params.value === "Incoming"
              ? "#ABE5C3"
              : params.value === "Outgoing"
              ? "#E5CEAB"
              : "red"
          }
        />
      );
    },
  },
  {
    field: "condition",
    flex: 1,
    renderHeader: () => {
      return <TableCellHeader text="Condition" />;
    },
    renderCell: (params) => {
      return <TableCellItem text={params.value} />;
    },
  },
  {
    field: "sender",
    flex: 1,
    renderHeader: () => {
      return <TableCellHeader text="Sender" />;
    },
    renderCell: (params) => {
      return <TableCellItem text={params.value} />;
    },
  },
  {
    field: "recipient",
    flex: 1,
    renderHeader: () => {
      return <TableCellHeader text="Recipient" />;
    },
    renderCell: (params) => {
      return <TableCellItem text={params.value} />;
    },
  },
  {
    field: "comments",
    flex: 1,
    renderHeader: () => {
      return <TableCellHeader text="Comments" />;
    },
    renderCell: (params) => {
      return <TableCellItem text={params.value} />;
    },
  },
  {
    field: "actions",
    flex: 1,
    renderHeader: () => {
      return <TableCellHeader text="Actions" />;
    },
    renderCell: (params) => {
      return (
        <Box
          onClick={() => handleOptionsClick(Number(params.id))}
          sx={{ width: "24px", ":hover": { cursor: "pointer" } }}
        >
          <Image src={dotsIcon} width={4} alt="options-icon" />
        </Box>
      );
    },
  },
];

const rows = [
  {
    id: 0,
    carrier: "UPS",
    trackingNo: "1Z8152430368220883",
    status: "Outgoing",
    condition: "Good",
    sender: "Clancey, Cliff",
    recipient: "Forde, Tony",
    comments: "Lorem Ipsum",
    actions: "i",
  },
  {
    id: 1,
    carrier: "UPS",
    trackingNo: "1Z8152430368220883",
    status: "Incoming",
    condition: "Good",
    sender: "Clancey, Cliff",
    recipient: "Forde, Tony",
    comments: "Lorem Ipsum",
    actions: "i",
  },
  {
    id: 2,
    carrier: "UPS",
    trackingNo: "1Z8152430368220883",
    status: "Outgoing",
    condition: "Good",
    sender: "Clancey, Cliff",
    recipient: "Forde, Tony",
    comments: "Lorem Ipsum",
    actions: "i",
  },
  {
    id: 3,
    carrier: "UPS",
    trackingNo: "1Z8152430368220883",
    status: "Outgoing",
    condition: "Good",
    sender: "Clancey, Cliff",
    recipient: "Forde, Tony",
    comments: "Lorem Ipsum",
    actions: "i",
  },
  {
    id: 4,
    carrier: "UPS",
    trackingNo: "1Z8152430368220883",
    status: "Incoming",
    condition: "Good",
    sender: "Clancey, Cliff",
    recipient: "Forde, Tony",
    comments: "Lorem Ipsum",
    actions: "i",
  },
  {
    id: 5,
    carrier: "UPS",
    trackingNo: "1Z8152430368220883",
    status: "Outgoing",
    condition: "Good",
    sender: "Clancey, Cliff",
    recipient: "Forde, Tony",
    comments: "Lorem Ipsum",
    actions: "i",
  },
  {
    id: 6,
    carrier: "UPS",
    trackingNo: "1Z8152430368220883",
    status: "Incoming",
    condition: "Good",
    sender: "Clancey, Cliff",
    recipient: "Forde, Tony",
    comments: "Lorem Ipsum",
    actions: "i",
  },
];

const handleOptionsClick = (id: number) => {
  console.log("options button clicked", id);
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

const DashboardDataTable = () => {
  const [tabValue, setTabValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log("new value is", newValue);
    setTabValue(newValue);
  };

  return (
    <ContentCard padding={0}>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.15)",
            paddingLeft: "20px",
            borderRadius: "36px 36px 0px 0px",
          }}
        >
          <Tabs
            value={tabValue}
            onChange={handleChange}
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: "#007A35",
                height: "4px",
              },
              "& .Mui-selected": {
                fontWeight: "bold",
                color: "#007A35",
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
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            sx={{
              paddingTop: "24px",
              paddingBottom: "16px",
              fontSize: "12px",
              letterSpacing: "1.2px",
              paddingLeft: "16px",
            }}
          >
            EDIT SCANNED PACKAGES
          </Typography>
          <EditButton
            handleOnClick={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </Box>
        <CustomTabPanel value={tabValue} index={0}>
          <DataTable rows={rows} columns={columns} />
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={1}>
          Table 2
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={2}>
          Table 3
        </CustomTabPanel>
      </Box>
    </ContentCard>
  );
};

export default DashboardDataTable;
