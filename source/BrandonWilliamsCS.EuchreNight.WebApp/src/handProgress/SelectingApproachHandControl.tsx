import React from "react";
import { Stack, Typography } from "@mui/material";

import { SelectionButtonSet } from "common/SelectionButtonSet";
import { Player } from "data/Player";
import { CurrentTrumpDisplay } from "displays/CurrentTrumpDisplay";
import { SelectingApproachHandStatus, PlayingHandStatus } from "./HandStatus";

export interface SelectingApproachHandControlProps {
  currentPlayer: Player;
  currentStatus: SelectingApproachHandStatus;
  onStatusChange: (status: PlayingHandStatus) => void;
}

export const SelectingApproachHandControl: React.FC<
  SelectingApproachHandControlProps
> = ({ currentPlayer, currentStatus, onStatusChange }) => {
  const callerName = currentStatus.caller === currentPlayer ? "you" : "they";
  return (
    <Stack>
      <CurrentTrumpDisplay
        trump={currentStatus.trump}
        caller={currentStatus.caller}
      />
      <Typography textAlign="center">Did {callerName} go alone?</Typography>
      <SelectionButtonSet<boolean>
        onSelect={(wentAlone) => {
          onStatusChange({
            ...currentStatus,
            status: "playing",
            wentAlone,
          });
        }}
        items={[true, false].map((wentAlone) => ({
          value: wentAlone,
          display: <Typography>{wentAlone ? "Alone" : "Not Alone"}</Typography>,
        }))}
      />
    </Stack>
  );
};
