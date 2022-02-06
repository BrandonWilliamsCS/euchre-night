import React from "react";
import { Stack, Typography } from "@mui/material";

import { SelectButtonList } from "controls/SelectButtonList";
import { Player } from "data/Player";
import { SelectingApproachHandStatus, PlayingHandStatus } from "./HandStatus";

export interface SelectingApproachHandControlProps {
  currentPlayer: Player;
  currentStatus: SelectingApproachHandStatus;
  onStatusChange: (status: PlayingHandStatus) => void;
}

export const SelectingApproachHandControl: React.FC<SelectingApproachHandControlProps> =
  ({ currentPlayer, currentStatus, onStatusChange }) => {
    const callerName = currentStatus.caller === currentPlayer ? "you" : "they";
    return (
      <Stack>
        <Typography>Did {callerName} go alone?</Typography>
        <SelectButtonList<boolean>
          onSelect={(wentAlone) => {
            onStatusChange({
              ...currentStatus,
              status: "playing",
              wentAlone,
            });
          }}
          currentValue={undefined}
          items={[true, false].map((wentAlone) => ({
            value: wentAlone,
            display: (
              <Typography>{wentAlone ? "Alone" : "Not Alone"}</Typography>
            ),
          }))}
        />
      </Stack>
    );
  };
