import React from "react";
import { Box } from "@mui/system";
import { Divider, Stack } from "@mui/material";

import { HandControl } from "controls/HandControl";
import { RoundSummary } from "displays/RoundSummary";
import { SessionSummary } from "displays/SessionSummary";

export const CurrentHandScreen: React.FC = () => {
  return (
    <Stack divider={<Divider variant="middle" />}>
      <Box p={1}>
        <SessionSummary
          player={{
            name: "Brandon",
            displayName: "The Great Brandini",
            color: "#FF00FF",
          }}
          sessionName="11/27/2021 Card Night"
          scoreTally={{ points: 18, euchres: 3, loners: 1 }}
        />
      </Box>
      <Box p={1}>
        <RoundSummary
          roundNumber={3}
          table={{
            name: "Table 2",
            location: "in the kitchen",
            specialRules: ["Going Under", "Stick the Dealer (after 1 redeal)"],
          }}
          scoreTally={{ points: 3, euchres: 1, loners: 0 }}
        />
      </Box>
      <Box flexGrow={1} p={1}>
        <HandControl />
      </Box>
    </Stack>
  );
};
