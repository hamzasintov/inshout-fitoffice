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
  GridValidRowModel,
} from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import TableCellItem from "../../atoms/TableCellItem";
import StatusChip from "../../atoms/StatusChip";
import TableCellHeader from "../../atoms/TableCellHeader";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  addPackage,
  getPackageToBeAdded,
} from "@/app/features/dashboard/packageSlice";
import { useDispatch, useSelector } from "react-redux";
import { IPackage } from "./DashboardDataTable";
import { Box } from "@mui/material";

interface ITableContent {
  rows: IPackage[];
  setRows: React.Dispatch<React.SetStateAction<IPackage[]>>; //(row: IPackage[]) => void;
  currentPage: number;
  rowsPerPage: number;
  handleRowEditStop: GridEventListener<"rowEditStop">;
  processRowUpdate: (
    newRow: GridRowModel,
    oldRow: GridValidRowModel
  ) =>
    | IPackage
    | {
        id: number;
        trackingNo: string;
        carrier: string;
        status: string;
        condition: string;
        sender: string;
        recipient: string;
        comments: string;
        urgent: number;
        editing?: boolean;
        isNew: boolean;
      }
    | undefined;
  handleDeleteClick: (id: GridRowId) => void;
  rowModesModel: GridRowModesModel;
  setRowModesModel: (rowModes: GridRowModesModel) => void;
  updatedRows: React.RefObject<IPackage[]>;
  setUpdatedRows: (row: IPackage) => void;
}

const TableContent: React.FC<ITableContent> = ({
  rows,
  setRows,
  currentPage,
  rowsPerPage,
  handleRowEditStop,
  processRowUpdate,
  handleDeleteClick,
  rowModesModel,
  setRowModesModel,
  updatedRows,
  setUpdatedRows,
}) => {
  const dispatch = useDispatch();

  const [activeRow, setActiveRow] = useState<Number | null>(null);

  const handleEditClick = (id: GridRowId) => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleCancelClick = (id: GridRowId) => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleStateChange = (
    onStateChange?: any //GridEventListener<"stateChange"> | undefined
  ) => {
    if (onStateChange?.tabIndex?.cell !== null) {
      let updatedRow =
        onStateChange?.editRows[onStateChange?.tabIndex?.cell?.id];
      if (updatedRow != null) {
        setUpdatedRows({
          id: onStateChange?.tabIndex?.cell?.id,
          carrier: updatedRow.carrier.value,
          comments: updatedRow.comments.value,
          condition: updatedRow.condition.value,
          recipient: updatedRow.recipient.value,
          sender: updatedRow.sender.value,
          status: updatedRow.status.value,
          trackingNo: updatedRow.trackingNo.value,
          urgent: 1,
        });
      }
    }
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
              onClick={() => handleSaveClick(id)}
            />,
            <GridActionsCellItem
              key={1}
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={() => handleCancelClick(id)}
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
            onClick={() => {
              handleEditClick(id);
            }}
            color="inherit"
          />,
          <GridActionsCellItem
            key={1}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => {
              handleDeleteClick(id);
            }}
            color="inherit"
          />,
        ];
      },
    },
  ];

  let packageToBeAdded = useSelector(getPackageToBeAdded);

  useEffect(() => {
    // let id = -1; //Math.ceil(Math.random() * 10);

    if (packageToBeAdded !== "") {
      setRows((prev: IPackage[]) => {
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
            urgent: 0,
            // isDeleted: false,
          },
          ...prev,
        ];
      });
      //   setTabValue(4);
      handleEditClick(-1);
      dispatch(addPackage({ barcode: "" }));
      // setTempId(id);
    }
  }, [packageToBeAdded, dispatch]);

  return (
    <Box sx={{ display: "grid" }}>
      <DataGrid
        editMode="row"
        sx={{ border: 0, width: "100%" }}
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
        processRowUpdate={(newRow, oldRow) => processRowUpdate(newRow, oldRow)}
        onRowSelectionModelChange={(selectionModel) => {
          const tempRowsModel = { ...rowModesModel };
          selectionModel.forEach((id) => {
            tempRowsModel[id] = { mode: GridRowModes.Edit };
          });
          setRowModesModel(tempRowsModel);
        }}
        onStateChange={handleStateChange}
      />
    </Box>
  );
};

export default TableContent;
