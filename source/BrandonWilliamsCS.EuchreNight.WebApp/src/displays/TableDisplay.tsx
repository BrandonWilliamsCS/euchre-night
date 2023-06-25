import React from "react";
import { Button, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/InfoOutlined";

import { Table } from "data/Table";
import { TableDetailDialog } from "./TableDetailDialog";

export interface TableDisplayProps {
  table: Table;
}

export const TableDisplay: React.FC<TableDisplayProps> = ({ table }) => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  return (
    <>
      <Button
        color="inherit"
        variant="text"
        type="button"
        endIcon={<InfoIcon />}
        onClick={() => {
          setDialogOpen(true);
        }}
      >
        <Typography component="span" variant="body2">
          {table.name}
        </Typography>
      </Button>
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
