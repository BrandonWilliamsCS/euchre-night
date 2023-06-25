import React from "react";
import { Box, Divider, Typography } from "@mui/material";

import { Player } from "data/Player";
import { ScoreTally } from "data/ScoreTally";
import { Table } from "data/Table";
import { ScoreDisplay } from "./ScoreDisplay";
import { TableDisplay } from "./TableDisplay";
import { PlayerDisplay } from "./PlayerDisplay";

export interface RoundSummaryProps {
  opponentScoreTally: ScoreTally;
  partner: Player;
  roundNumber: number;
  scoreTally: ScoreTally;
  table: Table;
}

export const RoundSummary: React.FC<RoundSummaryProps> = ({
  opponentScoreTally,
  partner,
  roundNumber,
  scoreTally,
  table,
}) => {
  return (
    <Box display="flex" flexDirection="column" px={4}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        height={40}
      >
        <Typography component="span" variant="body2">
          Round {roundNumber}
        </Typography>
        <Box>
          <TableDisplay table={table} />
        </Box>
      </Box>
      <Divider sx={{ borderBottomWidth: 2, mb: 2 }} />
      <ScoreDisplay
        scoreTally={scoreTally}
        opponentScoreTally={opponentScoreTally}
      />
      <Typography component="span" variant="body1" textAlign="center">
        Your partner is <PlayerDisplay player={partner} />
      </Typography>
    </Box>
  );
};
