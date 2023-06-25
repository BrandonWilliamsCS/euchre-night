import React from "react";
import { Stack, Typography } from "@mui/material";

import { SelectionButtonSet } from "common/SelectionButtonSet";
import { Player } from "data/Player";
import { Team } from "data/Team";
import {
  SelectingScoreHandStatus,
  SelectingWinnerHandStatus,
} from "./HandStatus";

export interface SelectingWinnerHandControlProps {
  currentPlayer: Player;
  currentStatus: SelectingWinnerHandStatus;
  onStatusChange: (status: SelectingScoreHandStatus) => void;
  teams: Team[];
}

export const SelectingWinnerHandControl: React.FC<
  SelectingWinnerHandControlProps
> = ({ currentPlayer, currentStatus, onStatusChange, teams }) => {
  const splitTeams = splitTeamsByPlayer(teams, currentPlayer);
  return (
    <Stack>
      <Typography textAlign="center">Who won?</Typography>
      <SelectionButtonSet<Team>
        onSelect={(winner) => {
          onStatusChange({
            ...currentStatus,
            status: "selectingScore",
            winner,
          });
        }}
        items={splitTeams.map((team) => ({
          value: team,
          display: (
            <Typography>
              {team.hasPlayer(currentPlayer) ? "My Team" : "Their Team"}
            </Typography>
          ),
        }))}
      />
    </Stack>
  );
};

function splitTeamsByPlayer(teams: Team[], player: Player): [Team, Team] {
  const result: [Team, Team] = [undefined!, undefined!];
  teams.forEach((team) => {
    const resultIndex = team.hasPlayer(player) ? 0 : 1;
    result[resultIndex] = team;
  });
  return result;
}
