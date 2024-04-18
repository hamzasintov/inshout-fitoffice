import {
  GridEventListener,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
} from "@mui/x-data-grid";
import ContentCard from "../../atoms/ContentCard";
import { Box, Typography } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { useEffect, useRef, useState } from "react";

import EditButton from "../../atoms/EditButton";
import {
  useDeletePackagesDeleteMutation,
  useGetPackagesViewPaginatedQuery,
  usePatchPackagesUpdateMutation,
  usePostPackagesAddMutation,
} from "@/app/store/fitOf";
import CustomTabPanel from "./CustomTabPanel";
import TableTabs from "./TableTabs";
import TableContent from "./TableContent";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export interface IPackage {
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
}

const DashboardDataTable = () => {
  const [tabValue, setTabValue] = useState(4);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [bulkEditMode, setBulkEditMode] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const [rows, setRows] = useState<IPackage[]>([]);
  const updatedRows = useRef<IPackage[]>([]);
  const setUpdatedRows = (update: IPackage) => {
    if (bulkEditMode) {
      if (updatedRows.current.length > 0) {
        if (updatedRows.current.find((r) => r.id === update.id)) {
          updatedRows.current = updatedRows.current.map(
            (row: IPackage, index) =>
              row.id === update.id ? { ...update } : row
          );
        } else {
          updatedRows.current.push(update);
        }
      } else {
        updatedRows.current = [update];
      }
    }
  };

  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { isLoading, data, error, status } = useGetPackagesViewPaginatedQuery({
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
    if (updateError && "data" in updateError) {
      alert((updateError.data as FetchBaseQueryError).data);
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
    if (addData && addData.package) {
      setRows((prev: IPackage[]) =>
        prev.map((row) =>
          row.id === -1 ? { ...row, id: addData.package!.id } : row
        )
      );
    }
  }, [addData]);

  useEffect(() => {
    if (addError && "data" in addError) {
      alert((addError.data as FetchBaseQueryError).data);
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
    if (deleteError && "data" in deleteError) {
      alert((deleteError.data as FetchBaseQueryError).data);
    }
  }, [deleteError]);

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
    setRows(
      rows.filter((row) =>
        row.id === params.row.id
          ? { ...row, editing: true }
          : { ...row, editing: false }
      )
    );
  };

  const handleDeleteClick = (id: GridRowId) => {
    deletePackage({ requestDeletePackage: { id: Number(id) } });
    setRows(rows.filter((row) => row.id !== id));
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    if (!bulkEditMode) {
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
        const updatedRow: IPackage = {
          id: newRow.id,
          trackingNo: newRow.trackingNo,
          carrier: newRow.carrier,
          status: newRow.status,
          condition: newRow.condition,
          sender: newRow.sender,
          recipient: newRow.recipient,
          comments: newRow.comments,
          urgent: newRow.urgent,
        };
        updatePackage({ requestUpdatePackage: { packages: [newRow] } });
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
      }
    } else {
      setBulkEditMode(false);
      if (updatedRows.current.length > 0) {
        updatePackage({
          requestUpdatePackage: {
            packages: updatedRows.current.map((row) => ({
              id: row.id,
              trackingNumber: row.trackingNo,
              carrier: row.carrier,
              status: row.status,
              condition: row.condition,
              sender: row.sender,
              recipientName: row.recipient,
              comment: row.comments,
              urgent: true,
            })),
          },
        });
        updatedRows.current = [];
        const tempRowsModel = { ...rowModesModel };
        rows.forEach((row) => {
          tempRowsModel[row.id] = {
            mode: GridRowModes.View,
            ignoreModifications: false,
          };
        });
        setRowModesModel(tempRowsModel);
      }
    }
  };

  useEffect(() => {
    if (data) {
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
          editing: false,
        })) || []
      );
    }
  }, [data, isLoading]);

  if (isLoading) return <h1>Loading...</h1>;

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
          <TableTabs tabValue={tabValue} handleChange={handleChange} />
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
          {bulkEditMode ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "16px",
                margin: "16px",
                height: "40px",
              }}
            >
              <Box
                onClick={() => {
                  const tempRowsModel = { ...rowModesModel };
                  rows.forEach((row) => {
                    tempRowsModel[row.id] = {
                      mode: GridRowModes.View,
                      ignoreModifications: false,
                    };
                    // setRowModesModel((prev) => ({
                    //   ...prev,
                    //   [row.id]: {
                    //     mode: GridRowModes.View,
                    //   },
                    // }));
                  });
                  setRowModesModel({ ...tempRowsModel });
                  setBulkEditMode(false);
                }}
              >
                <SaveIcon />
              </Box>
              <Box
                onClick={() => {
                  const tempRowsModel = { ...rowModesModel };
                  rows.forEach((row) => {
                    tempRowsModel[row.id] = {
                      mode: GridRowModes.View,
                      ignoreModifications: true,
                    };
                  });
                  setRowModesModel(tempRowsModel);
                  setBulkEditMode(false);
                }}
              >
                <CancelIcon />
              </Box>
            </Box>
          ) : (
            <EditButton
              handleOnClick={function (): void {
                setBulkEditMode(true);
                const tempRowsModel = { ...rowModesModel };
                rows.forEach((row) => {
                  tempRowsModel[row.id] = { mode: GridRowModes.Edit };
                });
                setRowModesModel(tempRowsModel);
                // throw new Error("Function not implemented.");
              }}
            />
          )}
        </Box>
        <CustomTabPanel value={tabValue} index={0}>
          <TableContent
            rows={rows.filter((row) => row.status.toLowerCase() === "pending")}
            setRows={setRows}
            currentPage={currentPage}
            rowsPerPage={rowsPerPage}
            handleRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            handleDeleteClick={handleDeleteClick}
            rowModesModel={rowModesModel}
            setRowModesModel={setRowModesModel}
            updatedRows={updatedRows}
            setUpdatedRows={setUpdatedRows}
          />
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={1}>
          <TableContent
            rows={rows.filter((row) => row.status.toLowerCase() === "outgoing")}
            setRows={setRows}
            currentPage={currentPage}
            rowsPerPage={rowsPerPage}
            handleRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            handleDeleteClick={handleDeleteClick}
            rowModesModel={rowModesModel}
            setRowModesModel={setRowModesModel}
            updatedRows={updatedRows}
            setUpdatedRows={setUpdatedRows}
          />
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={2}>
          <TableContent
            rows={rows.filter(
              (row) => row.status.toLowerCase() === "intransit"
            )}
            setRows={setRows}
            currentPage={currentPage}
            rowsPerPage={rowsPerPage}
            handleRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            handleDeleteClick={handleDeleteClick}
            rowModesModel={rowModesModel}
            setRowModesModel={setRowModesModel}
            updatedRows={updatedRows}
            setUpdatedRows={setUpdatedRows}
          />
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={3}>
          <TableContent
            rows={rows.filter(
              (row) => row.status.toLowerCase() === "delivered"
            )}
            setRows={setRows}
            currentPage={currentPage}
            rowsPerPage={rowsPerPage}
            handleRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            handleDeleteClick={handleDeleteClick}
            rowModesModel={rowModesModel}
            setRowModesModel={setRowModesModel}
            updatedRows={updatedRows}
            setUpdatedRows={setUpdatedRows}
          />
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={4}>
          <TableContent
            rows={rows}
            setRows={setRows}
            currentPage={currentPage}
            rowsPerPage={rowsPerPage}
            handleRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            handleDeleteClick={handleDeleteClick}
            rowModesModel={rowModesModel}
            setRowModesModel={setRowModesModel}
            updatedRows={updatedRows}
            setUpdatedRows={setUpdatedRows}
          />
        </CustomTabPanel>
      </Box>
    </ContentCard>
  );
};

export default DashboardDataTable;
