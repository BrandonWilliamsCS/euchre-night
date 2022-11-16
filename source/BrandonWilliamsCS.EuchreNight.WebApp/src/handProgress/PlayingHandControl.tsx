import React from "react";
import { Stack } from "@mui/material";

import { InnerColumns } from "common/InnerColumns";
import { PrimaryButton } from "common/PrimaryButton";
import { CurrentTrumpDisplay } from "displays/CurrentTrumpDisplay";
import { PlayingHandStatus, SelectingWinnerHandStatus } from "./HandStatus";

export interface PlayingHandControlProps {
  currentStatus: PlayingHandStatus;
  onStatusChange: (status: SelectingWinnerHandStatus) => void;
}

export const PlayingHandControl: React.FC<PlayingHandControlProps> = ({
  currentStatus,
  onStatusChange,
}) => {
  return (
    <Stack>
      <CurrentTrumpDisplay
        trump={currentStatus.trump}
        caller={currentStatus.caller}
      />
      <InnerColumns>
        <PrimaryButton
          onClick={() => {
            onStatusChange({
              ...currentStatus,
              status: "selectingWinner",
            });
          }}
        >
          The Hand is Over
        </PrimaryButton>
      </InnerColumns>
    </Stack>
  );
};
