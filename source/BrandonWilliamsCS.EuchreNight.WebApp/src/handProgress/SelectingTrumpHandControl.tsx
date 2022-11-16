import React from "react";
import { Stack, Typography } from "@mui/material";

import { SelectionButtonSet } from "common/SelectionButtonSet";
import { SuitDisplay } from "displays/SuitDisplay";
import {
  SelectingCallerHandStatus,
  SelectingTrumpHandStatus,
} from "./HandStatus";

export interface SelectingTrumpHandControlProps {
  currentStatus: SelectingTrumpHandStatus;
  onStatusChange: (status: SelectingCallerHandStatus) => void;
}

export const SelectingTrumpHandControl: React.FC<
  SelectingTrumpHandControlProps
> = ({ currentStatus, onStatusChange }) => {
  return (
    <Stack>
      <Typography textAlign="center" mb={1}>
        What is trump?
      </Typography>
      <SelectionButtonSet<string>
        onSelect={(trump) => {
          onStatusChange({
            ...currentStatus,
            status: "selectingCaller",
            trump,
          });
        }}
        items={[
          ...["clubs", "diamonds", "hearts", "spades"].map((suit) => ({
            value: suit,
            display: <SuitDisplay suit={suit} />,
          })),
          {
            value: "notrump",
            display: "No Trump",
          },
        ]}
      />
    </Stack>
  );
};
