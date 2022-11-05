import React from "react";
import { Box } from "@mui/system";
import { Stack } from "@mui/material";

import { Player } from "data/Player";
import { Team } from "data/Team";
import { RoundSummary } from "displays/RoundSummary";
import { SessionSummary } from "displays/SessionSummary";
import { HandProgressControl } from "handProgress/HandProgressControl";
import { HandStatus } from "handProgress/HandStatus";

export const CurrentHandScreen: React.FC = () => {
  const [currentStatus, setCurrentStatus] = React.useState<HandStatus>({
    status: "initital",
  });
  return (
    <Stack>
      <SessionSummary
        player={players[0]}
        scoreTally={{ points: 18, euchres: 3, loners: 1 }}
      />
      <RoundSummary
        roundNumber={3}
        table={{
          name: "Table 2",
          location: "in the kitchen",
          specialRules: ["Going Under", "Stick the Dealer (after 1 redeal)"],
        }}
        partner={players[2]}
        scoreTally={{ points: 3, euchres: 1, loners: 0 }}
        opponentScoreTally={{ points: 4, euchres: 0, loners: 1 }}
      />
      <Box flexGrow={1} p={1}>
        <HandProgressControl
          currentPlayer={players[0]}
          currentStatus={currentStatus}
          onHandComplete={(completeStauts) => {
            console.warn("Finished hand:", completeStauts);
            setCurrentStatus({
              status: "initital",
            });
          }}
          onStatusChange={setCurrentStatus}
          teams={teams}
        />
      </Box>
    </Stack>
  );
};

const players: Player[] = [
  {
    name: "Brandon",
    displayName: "The Great Brandini",
    color: "#FF00FF",
  },
  {
    name: "Persephone",
    displayName: "Persephone",
    color: "#FF00FF",
  },
  {
    name: "Rupert",
    displayName: "The Pert",
    color: "#FF00FF",
  },
  {
    name: "Angelique",
    displayName: "Angelique",
    color: "#FF00FF",
  },
  {
    name: "Ted",
    displayName: "Ted",
    color: "#FF00FF",
  },
];

const teams: Team[] = [
  new Team([players[0], players[1]]),
  new Team([players[2], players[3]]),
];
