import React from "react";
import { Box, Stack, Typography } from "@mui/material";

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
    <Stack>
      <Typography>You are playing against:</Typography>
      {teams.map(
        (team, i) =>
          !team.hasPlayer(currentPlayer) && (
            <Box key={i}>
              {team.players.map((opposingTeamPlayer) => (
                <PlayerDisplay
                  key={opposingTeamPlayer.name}
                  player={opposingTeamPlayer}
                />
              ))}
            </Box>
          ),
      )}
      <PrimaryButton
        onClick={() => {
          onStatusChange({
            ...currentStatus,
            status: "selectingTrump",
          });
        }}
      >
        Start the Hand
      </PrimaryButton>
    </Stack>
  );
};
