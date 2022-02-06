import React from "react";
import { Stack, Typography } from "@mui/material";

import { PrimaryButton } from "common/PrimaryButton";
import { Player } from "data/Player";
import { CompleteHandStatus } from "./HandStatus";

export interface CompleteHandControlProps {
  currentPlayer: Player;
  currentStatus: CompleteHandStatus;
  onHandComplete: (status: CompleteHandStatus) => void;
}

export const CompleteHandControl: React.FC<CompleteHandControlProps> = ({
  currentPlayer,
  currentStatus,
  onHandComplete,
}) => {
  const winnerName = currentStatus.winner.hasPlayer(currentPlayer)
    ? "You"
    : "They";
  const score = computeScore(currentStatus);
  return (
    <Stack>
      <Typography>
        {winnerName} scored {score} points this hand.
      </Typography>
      <PrimaryButton
        onClick={() => {
          onHandComplete(currentStatus);
        }}
      >
        Next Hand
      </PrimaryButton>
    </Stack>
  );
};

function computeScore(status: CompleteHandStatus) {
  if (!status.winner.hasPlayer(status.caller)) {
    return 2;
  }
  if (!status.wonAllTricks) {
    return 1;
  }
  return status.wentAlone ? 4 : 2;
}
