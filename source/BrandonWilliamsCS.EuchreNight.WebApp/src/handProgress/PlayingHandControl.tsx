import React from "react";

import { PrimaryButton } from "common/PrimaryButton";
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
  );
};
