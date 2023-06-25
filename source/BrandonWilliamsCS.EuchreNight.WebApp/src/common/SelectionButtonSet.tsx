import { Grid } from "@mui/material";
import React from "react";

import { SelectionButton } from "common/SelectionButton";
import { InnerColumns } from "./InnerColumns";

export interface SelectionButtonSetProps<T> {
  onSelect: (value: T) => void;
  items: Array<{
    value: T;
    display: React.ReactNode;
  }>;
}

export function SelectionButtonSet<T>({
  onSelect,
  items,
}: SelectionButtonSetProps<T>) {
  return (
    <InnerColumns>
      <Grid container columns={2} columnSpacing={2} rowSpacing={3}>
        {items.map((item, i) => (
          <Grid key={i} item xs={1} flexGrow={1} maxWidth="unset">
            <SelectionButton
              sx={{ height: "100%", width: "100%" }}
              onClick={() => onSelect(item.value)}
            >
              {item.display}
            </SelectionButton>
          </Grid>
        ))}
      </Grid>
    </InnerColumns>
  );
}
