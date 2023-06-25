import React from "react";
import { Stack, Typography } from "@mui/material";

import { SelectionButtonSet } from "common/SelectionButtonSet";
import { Player } from "data/Player";
import { Team } from "data/Team";
import { CurrentTrumpDisplay } from "displays/CurrentTrumpDisplay";
import {
  SelectingApproachHandStatus,
  SelectingCallerHandStatus,
} from "./HandStatus";

export interface SelectingCallerHandControlProps {
  currentStatus: SelectingCallerHandStatus;
  onStatusChange: (status: SelectingApproachHandStatus) => void;
  teams: Team[];
}

export const SelectingCallerHandControl: React.FC<
  SelectingCallerHandControlProps
> = ({ currentStatus, onStatusChange, teams }) => {
  const players = flattenTeams(teams);
  return (
    <Stack>
      <CurrentTrumpDisplay trump={currentStatus.trump} />
      <Typography textAlign="center">Who called trump?</Typography>
      <SelectionButtonSet<Player>
        onSelect={(caller) => {
          onStatusChange({
            ...currentStatus,
            status: "selectingApproach",
            caller,
          });
        }}
        items={players.map((player) => ({
          value: player,
          display: player.displayName,
        }))}
      />
    </Stack>
  );
};

function flattenTeams(teams: Team[]): Player[] {
  if (teams.length === 0) {
    return [];
  }
  const players: Player[] = [];
  for (let i = 0; i < teams[0].players.length; ++i) {
    teams.forEach((team) => {
      players.push(team.players[i]);
    });
  }
  return players;
}
