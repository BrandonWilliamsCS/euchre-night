import React from "react";
import { Divider, Stack } from "@mui/material";

import { ScoreTally } from "data/ScoreTally";
import { ScoreTallyDisplay } from "./ScoreTallyDisplay";
import { colors } from "appTheme";

export interface ScoreDisplayProps {
  scoreTally: ScoreTally;
  opponentScoreTally: ScoreTally;
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({
  scoreTally,
  opponentScoreTally,
}) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-around"
      divider={<Divider orientation="vertical" flexItem color={colors.white} />}
    >
      <ScoreTallyDisplay teamName="Your Team" scoreTally={scoreTally} />
      <ScoreTallyDisplay teamName="Opponents" scoreTally={opponentScoreTally} />
    </Stack>
  );
};
