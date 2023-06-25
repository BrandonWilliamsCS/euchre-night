import React from "react";
import { Stack, Typography } from "@mui/material";

import { InnerColumns } from "common/InnerColumns";
import { PrimaryButton } from "common/PrimaryButton";
import { Player } from "data/Player";
import { Team } from "data/Team";
import { PlayerDisplay } from "displays/PlayerDisplay";
import { InitialHandStatus, SelectingTrumpHandStatus } from "./HandStatus";

export interface InitialHandControlProps {
  currentPlayer: Player;
  currentStatus: InitialHandStatus;
  onStatusChange: (status: SelectingTrumpHandStatus) => void;
  teams: Team[];
}

export const InitialHandControl: React.FC<InitialHandControlProps> = ({
  currentPlayer,
  currentStatus,
  teams,
  onStatusChange,
}) => {
  return (
    <Stack textAlign="center">
      <Typography>You are playing against:</Typography>
      {teams.map(
        (team, i) =>
          !team.hasPlayer(currentPlayer) &&
          team.players.map((opposingTeamPlayer) => (
            <PlayerDisplay
              key={opposingTeamPlayer.displayName}
              player={opposingTeamPlayer}
            />
          )),
      )}
      <InnerColumns>
        <PrimaryButton
          sx={{ mt: 1 }}
          onClick={() => {
            onStatusChange({
              ...currentStatus,
              status: "selectingTrump",
            });
          }}
        >
          Start the Hand
        </PrimaryButton>
      </InnerColumns>
    </Stack>
  );
};
