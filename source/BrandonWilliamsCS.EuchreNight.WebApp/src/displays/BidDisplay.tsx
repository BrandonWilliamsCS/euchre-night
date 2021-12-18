import React from "react";
import { Box, styled, Typography } from "@mui/material";

import { Bid } from "data/Bid";
import { PlayerDisplay } from "./PlayerDisplay";
import { SuitDisplay } from "./SuitDisplay";

export interface BidDisplayProps {
  bid: Bid;
}

export const BidDisplay: React.FC<BidDisplayProps> = ({ bid }) => {
  return (
    <Box>
      <BigSuitDisplay suit={bid.suit} />
      <Typography variant="body2">called by</Typography>
      <PlayerDisplay player={bid.callingPlayer} />
      {bid.wentAlone && <Typography>Going Alone</Typography>}
    </Box>
  );
};

const BigSuitDisplay = styled(SuitDisplay)({
  width: "90%",
  height: "100%",
  maxHeight: "50vh",
  objectFit: "contain",
  marginLeft: "5%",
  marginRight: "5%",
});
