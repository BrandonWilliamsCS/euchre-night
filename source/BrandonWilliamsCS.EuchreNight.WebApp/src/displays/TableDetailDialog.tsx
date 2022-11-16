import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  styled,
  Theme,
  Typography,
} from "@mui/material";
import { SxProps } from "@mui/system";

import { colors } from "appTheme";
import { Table } from "data/Table";

export interface TableDetailDialogProps {
  onClose: () => void;
  table: Table;
}

export const TableDetailDialog: React.FC<TableDetailDialogProps> = ({
  onClose,
  table,
}) => {
  return (
    <Dialog
      onClose={onClose}
      open={true}
      PaperProps={{
        sx: {
          borderRadius: "12px",
          margin: "12px",
          padding: "12px",
          boxShadow: "0px 7px 10px rgba(13, 28, 12, .5)",
        },
      }}
      BackdropProps={{
        sx: {
          backdropFilter: "blur(5px)",
          // reduce background to 30% opacity
          backgroundColor: `${colors.honeysuckle}4D`,
        },
      }}
    >
      <DialogTitle sx={{ borderBottom: `1px solid ${colors.field}`, p: 0 }}>
        <Typography
          variant="body2"
          component="span"
          sx={{ verticalAlign: "top" }}
        >
          Round 3 of 13
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: colors.white,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 0 }}>
        <Typography
          variant="body1"
          component="h3"
          textAlign="center"
          sx={{ textTransform: "uppercase" }}
        >
          {table.name.toLowerCase().includes("table") ? "" : "Table: "}
          {table.name}
        </Typography>
        <Typography variant="body2" component="h4" sx={sectiontitleSx}>
          Location
        </Typography>
        <Typography variant="body2">{table.location}</Typography>
        <Typography variant="body2" component="h4" sx={sectiontitleSx}>
          Special Rules
        </Typography>
        {table.specialRules.length > 0 ? (
          <SpecialRulesList>
            {table.specialRules.map((specialRule) => (
              <Typography
                key={specialRule}
                variant="body2"
                component="li"
                sx={{
                  listStyleType: "none",
                }}
              >
                {specialRule}
              </Typography>
            ))}
          </SpecialRulesList>
        ) : (
          <Typography variant="body2">No special rules.</Typography>
        )}
        <Typography variant="body2" component="h4" sx={sectiontitleSx}>
          General Rules
        </Typography>
        <Typography variant="body2">
          Players on the losing team must pay one quarter each.
        </Typography>
        <Typography variant="body2">
          You must pay one quarter for every successful loner played against you
          (all five tricks won).
        </Typography>
        <Typography variant="body2">
          You must pay one quarter for every successful euchre played against
          you (taking fewer than 3 tricks after calling trump).
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

const SpecialRulesList = styled("ul")(({ theme }) => ({
  margin: 0,
  paddingLeft: theme.spacing(2),
}));

const sectiontitleSx: SxProps<Theme> = {
  fontWeight: 500,
  mt: 1,
};
