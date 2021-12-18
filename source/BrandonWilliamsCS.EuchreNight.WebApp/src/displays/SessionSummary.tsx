import React from "react";
import { Box, Typography } from "@mui/material";

import { Player } from "data/Player";
import { ScoreTally } from "data/ScoreTally";
import { PlayerDisplay } from "./PlayerDisplay";
import { ScoreDisplay } from "./ScoreDisplay";

export interface SessionSummaryProps {
  player: Player;
  scoreTally: ScoreTally;
  sessionName: string;
}

export const SessionSummary: React.FC<SessionSummaryProps> = ({
  player,
  scoreTally,
  sessionName,
}) => {
  return (
    <Box display="flex">
      <Box flexGrow={1}>
        <Typography>{sessionName}</Typography>
        <PlayerDisplay player={player} />
      </Box>
      <Box flexShrink={0}>
        <ScoreDisplay scoreTally={scoreTally} />
      </Box>
    </Box>
  );
};
