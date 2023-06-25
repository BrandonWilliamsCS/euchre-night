import React from "react";
import { Stack, Typography } from "@mui/material";

import { ScoreTally } from "data/ScoreTally";

export interface ScoreTallyDisplayProps {
  scoreTally: ScoreTally;
  teamName: string;
}

export const ScoreTallyDisplay: React.FC<ScoreTallyDisplayProps> = ({
  scoreTally,
  teamName,
}) => {
  return (
    <Stack
      p={1}
      spacing={1}
    >
      <Typography textAlign="center">
        {teamName}
      </Typography>
      <Typography variant="pop" textAlign="center">
        {scoreTally.points}
      </Typography>
    </Stack>
  );
};
