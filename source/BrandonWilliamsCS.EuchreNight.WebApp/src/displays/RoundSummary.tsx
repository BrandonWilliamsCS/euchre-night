import React from "react";
import { Box, Typography } from "@mui/material";

import { ScoreTally } from "data/ScoreTally";
import { Table } from "data/Table";
import { ScoreDisplay } from "./ScoreDisplay";
import { TableDisplay } from "./TableDisplay";

export interface RoundSummaryProps {
  roundNumber: number;
  table: Table;
  scoreTally: ScoreTally;
}

export const RoundSummary: React.FC<RoundSummaryProps> = ({
  roundNumber,
  table,
  scoreTally,
}) => {
  return (
    <Box display="flex">
      <Box flexGrow={1}>
        <Typography>Round {roundNumber}</Typography>
        <TableDisplay table={table} />
      </Box>
      <Box flexShrink={0}>
        <ScoreDisplay scoreTally={scoreTally} />
      </Box>
    </Box>
  );
};
