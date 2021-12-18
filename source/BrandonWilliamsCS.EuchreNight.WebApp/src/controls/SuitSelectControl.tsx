import React from "react";
import { Stack, styled } from "@mui/material";

import { SuitDisplay } from "displays/SuitDisplay";
import { SelectButtonList } from "./SelectButtonList";

export interface SuitSelectControlProps {
  onSelect: (suit: string) => void;
  selectedSuit: string | undefined;
}

export const SuitSelectControl: React.FC<SuitSelectControlProps> = ({
  onSelect,
  selectedSuit,
}) => {
  return (
    <Stack direction="row" flexWrap="wrap" gap={1}>
      <SelectButtonList<string>
        onSelect={onSelect}
        currentValue={selectedSuit}
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
