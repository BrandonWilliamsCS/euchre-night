import React from "react";
import { Stack } from "@mui/material";

import { SelectButtonList } from "./SelectButtonList";

export interface WentAloneSelectControlProps {
  onSelect: (player: boolean) => void;
  wentAlone: boolean | undefined;
}

export const WentAloneSelectControl: React.FC<WentAloneSelectControlProps> = ({
  onSelect,
  wentAlone,
}) => {
  return (
    <Stack direction="row" flexWrap="wrap" gap={1}>
      <SelectButtonList<boolean>
        onSelect={onSelect}
        currentValue={wentAlone}
        items={[
          {
            buttonSx: { flexGrow: 1 },
            value: true,
            display: "Went Alone",
          },
          {
            buttonSx: { flexGrow: 1 },
            value: false,
            display: "Didn't Go Alone",
          },
        ]}
      />
    </Stack>
  );
};
