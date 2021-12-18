import React from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

import { Player } from "data/Player";

export interface PlayerDisplayProps {
  player: Player;
}

export const PlayerDisplay: React.FC<PlayerDisplayProps> = ({ player }) => {
  return (
    <Box
      component={Typography}
      borderLeft={`4px solid ${player.color}`}
      p={1}
      color="text.primary"
      sx={{ textTransform: "initial" }}
    >
      {player.displayName}
      {player.displayName !== player.name && (
        <Typography component="span" variant="body2">
          {" "}
          ({player.name})
        </Typography>
      )}
    </Box>
  );
};
