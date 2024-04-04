import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
} from "@mui/x-data-grid";
import ContentCard from "../../atoms/ContentCard";
import DataTable from "../../molecules/DataTable";
import TableCellItem from "../../atoms/TableCellItem";
import StatusChip from "../../atoms/StatusChip";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import TableCellHeader from "../../atoms/TableCellHeader";
import { useEffect, useState } from "react";
import Image from "next/image";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";

import dotsIcon from "../../../../../public/dotsIcon.svg";
import EditButton from "../../atoms/EditButton";
import {
  useDeletePackagesDeleteMutation,
  useGetPackagesAllQuery,
  usePatchPackagesUpdateMutation,
  usePostPackagesAddMutation,
} from "@/app/store/fitOf";
import {
  addPackage,
  getPackageToBeAdded,
  getPackages,
} from "@/app/features/dashboard/packageSlice";
import { useDispatch, useSelector } from "react-redux";

const initialRows = [
  {
    id: 0,
    carrier: "UPS",
    trackingNo: "1Z8152430368220883",
    status: "Outgoing",
    condition: "Good",
    sender: "Clancey, Cliff",
    recipient: "Forde, Tony",
    comments: "Lorem Ipsum",
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
    <Box
      role="tabpanel"
      sx={{
        display: value !== index ? "none" : undefined,
        width: "100",
        maxWidth: "100%",
        // border: "1px solid red",
      }}
    >
      {value === index && <Box>{children}</Box>}
    </Box>
  );
}

const DashboardDataTable = () => {
  const dispatch = useDispatch();
  const [tabValue, setTabValue] = useState(4);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log("new value is", newValue);
    setTabValue(newValue);
  };

  const columns: GridColDef[] = [
    {
      field: "carrier",
      flex: 0.75,
      type: "singleSelect",
      valueOptions: ["UPS", "DHL", "FedEx", "TCS"],
      renderHeader: () => {
        return <TableCellHeader text="Carrier" />;
      },
      renderCell: (params) => {
        return <TableCellItem text={params.value} />;
      },
      editable: true,
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
      editable: true,
    },
    {
      field: "status",
      flex: 1,
      renderHeader: () => {
        return <TableCellHeader text="Status" />;
      },
      type: "singleSelect",
      valueOptions: ["Incoming", "Outgoing"],
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
      editable: true,
    },
    {
      field: "condition",
      flex: 1,
      type: "singleSelect",
      valueOptions: ["Good", "Moderate", "Damaged"],
      editable: true,
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
      editable: true,
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
      editable: true,
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
      editable: true,
    },
    {
      field: "actions",
      flex: 1,
      type: "actions",
      renderHeader: () => {
        return <TableCellHeader text="Actions" />;
      },
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key={0}
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              key={1}
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            key={0}
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            key={1}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
      // renderCell: (params) => {
      //   return (
      //     <Box
      //       onClick={() => handleOptionsClick(Number(params.id))}
      //       sx={{ width: "24px", ":hover": { cursor: "pointer" } }}
      //     >
      //       <Image src={dotsIcon} width={4} alt="options-icon" />
      //     </Box>
      //   );
      // },
    },
  ];

  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { isLoading, data, error, status } = useGetPackagesAllQuery({
    page: currentPage,
    limit: rowsPerPage,
  });

  const [
    updatePackage,
    {
      isLoading: updateLoading,
      data: updateData,
      error: updateError,
      status: updateStatus,
    },
  ] = usePatchPackagesUpdateMutation();
  useEffect(() => {
    if (updateError) {
      console.log(updateError, "Add error");
      alert(updateError.data.errorMessage);
    }
  }, [updateError]);

  const [
    addPackageFunc,
    {
      isLoading: addLoading,
      data: addData,
      error: addError,
      status: addStatus,
    },
  ] = usePostPackagesAddMutation();

  useEffect(() => {
    if (addData) {
      console.log(addData, "add data");
      setRows((prev) =>
        prev.map((row) =>
          row.id === -1 ? { ...row, id: addData.package.id } : row
        )
      );
    }
  }, [addData]);

  useEffect(() => {
    if (addError) {
      console.log(addError, "Add error");
      alert(addError.data.errorMessage);
    }
  }, [addError]);

  const [
    deletePackage,
    {
      isLoading: deleteLoading,
      data: deleteData,
      error: deleteError,
      status: deleteStatus,
    },
  ] = useDeletePackagesDeleteMutation();

  useEffect(() => {
    if (deleteError) {
      console.log(deleteError, "delete error");
      alert(deleteError.data.errorMessage);
    }
  }, [deleteError]);

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    deletePackage({ requestDeletePackage: { id: Number(id) } });
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    console.log("update", newRow);
    if (newRow.id === -1) {
      addPackageFunc({
        requestAddPackage: {
          newPackage: {
            trackingNumber: newRow.trackingNo,
            carrier: newRow.carrier,
            status: newRow.status,
            condition: newRow.condition,
            sender: newRow.sender,
            recipientName: newRow.recipient,
            comment: newRow.comments,
            urgent: 1,
          },
        },
      });
      let updatedRow = {
        id: newRow.id,
        trackingNo: newRow.trackingNo,
        carrier: newRow.carrier,
        status: newRow.status,
        condition: newRow.condition,
        sender: newRow.sender,
        recipient: newRow.recipient,
        comments: newRow.comments,
        urgent: 1,
        isNew: false,
      };
      setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
      return updatedRow;
    } else {
      const updatedRow = { ...newRow, isNew: false };
      updatePackage({ requestUpdatePackage: { packages: [newRow] } });
      setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
      return updatedRow;
    }
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  useEffect(() => {
    if (data) {
      // console.log(data);
      const { page, limit, total, totalPages, packages } = data;

      setRows(
        packages?.map((pckg) => ({
          id: pckg.id,
          trackingNo: pckg.trackingNumber,
          carrier: pckg.carrier,
          status: pckg.status,
          condition: pckg.condition,
          sender: pckg.sender,
          recipient: pckg.recipientName, // Add recipient property
          comments: pckg.comment, // Add comments property
          urgent: pckg.urgent,
          isDeleted: pckg.isDeleted,
        })) || []
      );
    }
  }, [data, isLoading]);

  let packageToBeAdded = useSelector(getPackageToBeAdded);
  console.log(packageToBeAdded, "package to be added");
  // const [tempId, setTempId] = useState(-1);

  useEffect(() => {
    // let id = -1; //Math.ceil(Math.random() * 10);

    if (packageToBeAdded !== "") {
      console.log(packageToBeAdded, "package to be added data");
      setRows((prev) => {
        return [
          {
            id: -1,
            trackingNo: packageToBeAdded + "" || "",
            carrier: "",
            status: "",
            condition: "",
            sender: "",
            recipient: "",
            comments: "",
            urgent: "",
            isDeleted: false,
          },
          ...prev,
        ];
      });
      setTabValue(4);
      handleEditClick(-1);
      dispatch(addPackage({ barcode: "" }));
      // setTempId(id);
    }
  }, [packageToBeAdded, dispatch]);

  if (isLoading) return <h1>Loading...</h1>;

  // if (error) {
  //   // return <h1>An Error Occurred while fetching data</h1>;
  // }

  return (
    <ContentCard padding={0}>
      <Box
        sx={{
          width: "100%",
          maxWidth: "100%",
          overflow: "hidden",
          // border: "1px solid green",
        }}
      >
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
          <DataGrid
            editMode="row"
            sx={{ border: 0 }}
            rows={rows.filter((row) => row.status.toLowerCase() === "pending")}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: currentPage, pageSize: rowsPerPage },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            disableRowSelectionOnClick
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            // slots={{
            //   toolbar: EditToolbar,
            // }}
            // slotProps={{
            //   toolbar: { setRows, setRowModesModel },
            // }}
          />
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={1}>
          <DataGrid
            editMode="row"
            sx={{ border: 0 }}
            rows={rows.filter((row) => row.status.toLowerCase() === "outgoing")}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: currentPage, pageSize: rowsPerPage },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            disableRowSelectionOnClick
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            // slots={{
            //   toolbar: EditToolbar,
            // }}
            // slotProps={{
            //   toolbar: { setRows, setRowModesModel },
            // }}
          />
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={2}>
          <DataGrid
            editMode="row"
            sx={{ border: 0 }}
            rows={rows.filter(
              (row) => row.status.toLowerCase() === "intransit"
            )}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: currentPage, pageSize: rowsPerPage },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            disableRowSelectionOnClick
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            // slots={{
            //   toolbar: EditToolbar,
            // }}
            // slotProps={{
            //   toolbar: { setRows, setRowModesModel },
            // }}
          />
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={3}>
          <DataGrid
            editMode="row"
            sx={{ border: 0 }}
            rows={rows.filter(
              (row) => row.status.toLowerCase() === "delivered"
            )}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: currentPage, pageSize: rowsPerPage },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            disableRowSelectionOnClick
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            // slots={{
            //   toolbar: EditToolbar,
            // }}
            // slotProps={{
            //   toolbar: { setRows, setRowModesModel },
            // }}
          />
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={4}>
          <DataGrid
            editMode="row"
            sx={{ border: 0 }}
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: currentPage, pageSize: rowsPerPage },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            disableRowSelectionOnClick
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            // onPageSizeChange={handlePageSizeChange}

            // slots={{
            //   toolbar: EditToolbar,
            // }}
            // slotProps={{
            //   toolbar: { setRows, setRowModesModel },
            // }}
          />
        </CustomTabPanel>
      </Box>
    </ContentCard>
  );
};

export default DashboardDataTable;
