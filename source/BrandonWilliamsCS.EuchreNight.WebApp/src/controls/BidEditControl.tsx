import React from "react";
import { Button, Stack, Typography } from "@mui/material";

import { Bid } from "data/Bid";
import { PlayerSelectControl } from "./PlayerSelectControl";
import { SuitSelectControl } from "./SuitSelectControl";
import { WentAloneSelectControl } from "./WentAloneSelectControl";

export interface BidEditControlProps {
  onSet: (bid: Bid) => void;
  previousValue?: Bid;
}

export const BidEditControl: React.FC<BidEditControlProps> = ({
  onSet,
  previousValue,
}) => {
  //!! put this stuff in model?
  //!! scroll to bottom when first allSelected.
  const [selectedSuit, setSelectedSuit] = React.useState(previousValue?.suit);
  const [selectedCallingPlayer, setCallingPlayer] = React.useState(
    previousValue?.callingPlayer,
  );
  const [selectedWentAlone, setSelectedWentAlone] = React.useState(
    previousValue?.wentAlone,
  );
  const allSelected =
    selectedSuit !== undefined &&
    selectedCallingPlayer !== undefined &&
    selectedWentAlone !== undefined;
  return (
    <Stack>
      <PlayerSelectControl
        onSelect={setCallingPlayer}
        selectedPlayer={selectedCallingPlayer}
      />
      <Typography textAlign="center">called...</Typography>
      <SuitSelectControl
        onSelect={setSelectedSuit}
        selectedSuit={selectedSuit}
      />
      <Typography textAlign="center">and...</Typography>
      <WentAloneSelectControl
        onSelect={setSelectedWentAlone}
        wentAlone={selectedWentAlone}
      />
      {allSelected && (
        <Button
          variant="contained"
          onClick={() => {
            onSet({
              callingPlayer: selectedCallingPlayer,
              suit: selectedSuit,
              wentAlone: selectedWentAlone,
            });
          }}
          sx={{ mt: 1 }}
        >
          Set Bid
        </Button>
      )}
    </Stack>
  );
};
