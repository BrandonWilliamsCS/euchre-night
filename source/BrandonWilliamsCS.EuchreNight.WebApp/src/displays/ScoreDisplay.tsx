import React from "react";
import { Paper, Stack, Typography } from "@mui/material";

import { ScoreTally } from "data/ScoreTally";

export interface ScoreDisplayProps {
  scoreTally: ScoreTally;
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ scoreTally }) => {
  return (
    <Stack
      component={Paper}
      direction="row"
      variant="outlined"
      display="inline-flex"
      p={1}
      spacing={1}
    >
      <Stack>
        <Typography fontWeight={500} textAlign="center">
          Points
        </Typography>
        <Typography fontSize="1.5rem" textAlign="center">
          {scoreTally.points}
        </Typography>
      </Stack>
      <Stack justifyContent="space-around">
        <Typography>
          <Typography fontWeight={500} component="span">
            E:{" "}
          </Typography>
          <Typography component="span">{scoreTally.euchres}</Typography>
        </Typography>
        <Typography>
          <Typography fontWeight={500} component="span">
            L:{" "}
          </Typography>
          <Typography component="span">{scoreTally.loners}</Typography>
        </Typography>
      </Stack>
    </Stack>
  );
};
