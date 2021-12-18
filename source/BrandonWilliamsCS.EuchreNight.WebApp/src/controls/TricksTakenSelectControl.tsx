import React from "react";
import { Stack, Typography } from "@mui/material";

import { SelectButtonList } from "./SelectButtonList";

export interface TricksTakenSelectControlProps {
  onSelect: (tricksTaken: string) => void;
  selectedTricksTaken: string | undefined;
}

export const TricksTakenSelectControl: React.FC<TricksTakenSelectControlProps> =
  ({ onSelect, selectedTricksTaken }) => {
    return (
      <>
        <Typography>How many tricks did (player) take?</Typography>
        <SelectButtonList<string>
          onSelect={onSelect}
          currentValue={selectedTricksTaken}
          items={[
            {
              value: "all",
              display: "5",
            },
            {
              value: "majority",
              display: "3-4",
            },
            {
              value: "minority",
              display: "0-2",
            },
          ]}
        />
      </>
    );
  };
