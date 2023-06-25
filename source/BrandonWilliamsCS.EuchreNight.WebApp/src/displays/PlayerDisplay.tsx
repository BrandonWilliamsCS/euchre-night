import React from "react";
import { Typography } from "@mui/material";

import { Player } from "data/Player";

export interface PlayerDisplayProps {
  player: Player;
}

export const PlayerDisplay: React.FC<PlayerDisplayProps> = ({ player }) => {
  return (
    <Typography component="span">
      {player.displayName}
      <Typography component="span" variant="body2">
        {" "}
        (Player {player.number})
      </Typography>
    </Typography>
  );
};
