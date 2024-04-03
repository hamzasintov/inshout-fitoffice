import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { FC } from "react";

interface DataTablesProps {
  rows: {}[];
  columns: GridColDef[];
}

const DataTable: FC<DataTablesProps> = ({ rows, columns }) => {
  return (
    <div style={{ height: 368, width: "100%" }}>
      <DataGrid
        sx={{ border: 0 }}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </div>
  );
};

export default DataTable;
