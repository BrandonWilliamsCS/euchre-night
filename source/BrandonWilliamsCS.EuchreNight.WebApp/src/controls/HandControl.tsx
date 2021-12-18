import React from "react";
import { Button, IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import { BidEditControl } from "controls/BidEditControl";
import { TricksTakenSelectControl } from "controls/TricksTakenSelectControl";
import { Bid } from "data/Bid";
import { BidDisplay } from "displays/BidDisplay";

export const HandControl: React.FC = () => {
  const [submittedBid, setSubmittedBid] = React.useState<Bid>();
  const [isEditingBid, setIsEditingBid] = React.useState(true);
  const [selectedTricksTaken, setSelectedTricksTaken] =
    React.useState<string>();
  return isEditingBid ? (
    <BidEditControl
      previousValue={submittedBid}
      onSet={(bid) => {
        setSubmittedBid(bid);
        setIsEditingBid(false);
      }}
    />
  ) : (
    <>
      <Typography variant="h3" sx={{ fontSize: "2rem" }}>
        Current Bid
        <IconButton
          color="primary"
          aria-label="edit bid"
          onClick={() => {
            setIsEditingBid(true);
          }}
          sx={{ display: "inline" }}
        >
          <EditIcon />
        </IconButton>
      </Typography>
      <BidDisplay bid={submittedBid!} />
      <TricksTakenSelectControl
        onSelect={setSelectedTricksTaken}
        selectedTricksTaken={selectedTricksTaken}
      />
      {selectedTricksTaken && (
        <Button
          variant="contained"
          onClick={() => {
            setSubmittedBid(undefined);
            setSelectedTricksTaken(undefined);
            setIsEditingBid(true);
          }}
        >
          Confirm Hand Results
        </Button>
      )}
    </>
  );
};
