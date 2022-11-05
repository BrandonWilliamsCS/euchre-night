import React from "react";
import { Stack, Typography } from "@mui/material";

import { SelectButtonList } from "controls/SelectButtonList";
import { Player } from "data/Player";
import { CompleteHandStatus, SelectingScoreHandStatus } from "./HandStatus";

export interface SelectingScoreHandControlProps {
  currentPlayer: Player;
  currentStatus: SelectingScoreHandStatus;
  onStatusChange: (status: CompleteHandStatus) => void;
}

export const SelectingScoreHandControl: React.FC<SelectingScoreHandControlProps> =
  ({ currentPlayer, currentStatus, onStatusChange }) => {
    const winnerName = currentStatus.winner.hasPlayer(currentPlayer)
      ? "you"
      : "they";
    return (
      <Stack>
        <Typography>Did {winnerName} win all 5 tricks?</Typography>
        <SelectButtonList<boolean>
          onSelect={(wonAllTricks) => {
            onStatusChange({
              ...currentStatus,
              status: "complete",
              wonAllTricks,
            });
          }}
          currentValue={undefined}
          items={[true, false].map((wonAllTricks) => ({
            value: wonAllTricks,
            display: <Typography>{wonAllTricks ? "Yes" : "No"}</Typography>,
          }))}
        />
      </Stack>
    );
  };
