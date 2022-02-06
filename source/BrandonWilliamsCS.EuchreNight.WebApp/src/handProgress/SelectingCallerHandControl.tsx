import React from "react";
import { Stack, Typography } from "@mui/material";

import { SelectButtonList } from "controls/SelectButtonList";
import { Player } from "data/Player";
import { Team } from "data/Team";
import { PlayerDisplay } from "displays/PlayerDisplay";
import {
  SelectingApproachHandStatus,
  SelectingCallerHandStatus,
} from "./HandStatus";

export interface SelectingCallerHandControlProps {
  currentStatus: SelectingCallerHandStatus;
  onStatusChange: (status: SelectingApproachHandStatus) => void;
  teams: Team[];
}

export const SelectingCallerHandControl: React.FC<SelectingCallerHandControlProps> =
  ({ currentStatus, onStatusChange, teams }) => {
    const players = flattenTeams(teams);
    return (
      <Stack>
        <Typography>Who called trump?</Typography>
        <SelectButtonList<Player>
          onSelect={(caller) => {
            onStatusChange({
              ...currentStatus,
              status: "selectingApproach",
              caller,
            });
          }}
          currentValue={undefined}
          items={players.map((player) => ({
            buttonSx: { flexGrow: 1 },
            value: player,
            display: <PlayerDisplay player={player} />,
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
