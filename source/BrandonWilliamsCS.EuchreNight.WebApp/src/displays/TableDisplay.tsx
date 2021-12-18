import React from "react";
import { Button, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

import { Table } from "data/Table";
import { TableDetailDialog } from "./TableDetailDialog";

export interface TableDisplayProps {
  table: Table;
}

export const TableDisplay: React.FC<TableDisplayProps> = ({ table }) => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  return (
    <>
      <Typography>
        <Button
          variant="outlined"
          type="button"
          endIcon={<InfoIcon />}
          onClick={() => {
            setDialogOpen(true);
          }}
        >
          {table.name}
        </Button>
      </Typography>
      {dialogOpen && (
        <TableDetailDialog
          table={table}
          onClose={() => {
            setDialogOpen(false);
          }}
        />
      )}
    </>
  );
};
