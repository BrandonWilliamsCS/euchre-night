import React from "react";
import { Stack, styled, Typography } from "@mui/material";

import { SelectButtonList } from "controls/SelectButtonList";
import { SuitDisplay } from "displays/SuitDisplay";
import {
  SelectingCallerHandStatus,
  SelectingTrumpHandStatus,
} from "./HandStatus";

export interface SelectingTrumpHandControlProps {
  currentStatus: SelectingTrumpHandStatus;
  onStatusChange: (status: SelectingCallerHandStatus) => void;
}

export const SelectingTrumpHandControl: React.FC<SelectingTrumpHandControlProps> =
  ({ currentStatus, onStatusChange }) => {
    return (
      <Stack>
        <Typography>What is trump?</Typography>
        <SelectButtonList<string>
          onSelect={(trump) => {
            onStatusChange({
              ...currentStatus,
              status: "selectingCaller",
              trump,
            });
          }}
          currentValue={undefined}
          items={["clubs", "diamonds", "hearts", "spades", "notrump"].map(
            (suit) => ({
              value: suit,
              display: <SuitButtonIcon suit={suit} />,
              buttonSx: { flexGrow: 1 },
            }),
          )}
        />
      </Stack>
    );
  };

const SuitButtonIcon = styled(SuitDisplay)({ height: 50 });
