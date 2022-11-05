import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import UserIcon from "@mui/icons-material/Person";

import { Player } from "data/Player";
import { ScoreTally } from "data/ScoreTally";

export interface SessionSummaryProps {
  player: Player;
  scoreTally: ScoreTally;
}

export const SessionSummary: React.FC<SessionSummaryProps> = ({
  player,
  scoreTally,
}) => {
  return (
    <Paper>
      <Box
        display="flex"
        justifyContent="space-between"
        height={40}
        alignItems="center"
        px={2}
      >
        <UserIcon sx={{ height: 36, width: 36 }} />
        <Typography component="span">Score: {scoreTally.points}</Typography>
        <Typography component="span">Euchres: {scoreTally.euchres}</Typography>
        <Typography component="span">Loners: {scoreTally.loners}</Typography>
      </Box>
    </Paper>
  );
};
