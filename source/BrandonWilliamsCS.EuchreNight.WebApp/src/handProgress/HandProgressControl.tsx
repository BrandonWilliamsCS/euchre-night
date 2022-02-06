import React from "react";
import { Typography } from "@mui/material";

import { Player } from "data/Player";
import { Team } from "data/Team";
import { CompleteHandStatus, HandStatus } from "./HandStatus";
import { CompleteHandControl } from "./CompleteHandControl";
import { InitialHandControl } from "./InitialHandControl";
import { PlayingHandControl } from "./PlayingHandControl";
import { SelectingApproachHandControl } from "./SelectingApproachHandControl";
import { SelectingCallerHandControl } from "./SelectingCallerHandControl";
import { SelectingScoreHandControl } from "./SelectingScoreHandControl";
import { SelectingTrumpHandControl } from "./SelectingTrumpHandControl";
import { SelectingWinnerHandControl } from "./SelectingWinnerHandControl";

export interface HandProgressControlProps {
  currentPlayer: Player;
  currentStatus: HandStatus;
  onHandComplete: (status: CompleteHandStatus) => void;
  onStatusChange: (status: HandStatus) => void;
  teams: Team[];
}

export const HandProgressControl: React.FC<HandProgressControlProps> = ({
  currentPlayer,
  currentStatus,
  onHandComplete,
  onStatusChange,
  teams,
}) => {
  switch (currentStatus.status) {
    case "initital":
      return (
        <InitialHandControl
          currentPlayer={currentPlayer}
          currentStatus={currentStatus}
          onStatusChange={onStatusChange}
          teams={teams}
        />
      );
    case "selectingTrump":
      return (
        <SelectingTrumpHandControl
          currentStatus={currentStatus}
          onStatusChange={onStatusChange}
        />
      );
    case "selectingCaller":
      return (
        <SelectingCallerHandControl
          currentStatus={currentStatus}
          onStatusChange={onStatusChange}
          teams={teams}
        />
      );
    case "selectingApproach":
      return (
        <SelectingApproachHandControl
          currentPlayer={currentPlayer}
          currentStatus={currentStatus}
          onStatusChange={onStatusChange}
        />
      );
    case "playing":
      return (
        <PlayingHandControl
          currentStatus={currentStatus}
          onStatusChange={onStatusChange}
        />
      );
    case "selectingWinner":
      return (
        <SelectingWinnerHandControl
          currentPlayer={currentPlayer}
          currentStatus={currentStatus}
          onStatusChange={onStatusChange}
          teams={teams}
        />
      );
    case "selectingScore":
      return (
        <SelectingScoreHandControl
          currentPlayer={currentPlayer}
          currentStatus={currentStatus}
          onStatusChange={onStatusChange}
        />
      );
    case "complete":
      return (
        <CompleteHandControl
          currentPlayer={currentPlayer}
          currentStatus={currentStatus}
          onHandComplete={onHandComplete}
        />
      );
    default:
      return (
        <Typography color="error">Unrecognized Hand Progress State</Typography>
      );
  }
};
