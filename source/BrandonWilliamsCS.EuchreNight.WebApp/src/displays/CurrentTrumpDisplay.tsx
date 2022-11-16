import React from "react";
import { Stack, Typography } from "@mui/material";

import { Player } from "data/Player";
import { SuitDisplay } from "./SuitDisplay";

export interface CurrentTrumpDisplayProps {
  trump: string;
  caller?: Player;
}

export const CurrentTrumpDisplay: React.FC<CurrentTrumpDisplayProps> = ({
  trump,
  caller,
}) => {
  return (
    <Stack textAlign="center">
      {caller ? (
        <Typography>{caller.displayName} called</Typography>
      ) : (
        <Typography visibility="hidden">Unknown called</Typography>
      )}
      <SuitDisplay suit={trump} />
      <Typography>is trump.</Typography>
    </Stack>
  );
};
