import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  styled,
  Theme,
  Typography,
} from "@mui/material";

import { Table } from "data/Table";
import { SxProps } from "@mui/system";

export interface TableDetailDialogProps {
  onClose: () => void;
  table: Table;
}

export const TableDetailDialog: React.FC<TableDetailDialogProps> = ({
  onClose,
  table,
}) => {
  return (
    <Dialog onClose={onClose} open={true}>
      <DialogTitle>
        {table.name.toLowerCase().includes("table") ? "" : "Table: "}
        {table.name}
      </DialogTitle>
      <DialogContent>
        <Typography variant="h3" sx={sectiontitleSx}>
          Location
        </Typography>
        <Typography>{table.location}</Typography>
        <Typography variant="h3" sx={sectiontitleSx}>
          Special Rules
        </Typography>
        {table.specialRules.length > 0 ? (
          <SpecialRulesList>
            {table.specialRules.map((specialRule) => (
              <SpecialRulesListItem key={specialRule}>
                {specialRule}
              </SpecialRulesListItem>
            ))}
          </SpecialRulesList>
        ) : (
          <Typography>No special rules.</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

const SpecialRulesList = styled("ul")(({ theme }) => ({
  margin: 0,
  paddingLeft: theme.spacing(2),
}));
const SpecialRulesListItem = styled("li")({ listStyleType: "none" });

const sectiontitleSx: SxProps<Theme> = {
  fontSize: "1rem",
  fontWeight: 500,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  mt: 1,
};
