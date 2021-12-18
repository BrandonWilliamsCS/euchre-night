import React from "react";
import { SxProps, Theme } from "@mui/system";

import { SelectButton } from "./SelectButton";

export interface SelectButtonListProps<T> {
  currentValue: T | undefined;
  onSelect: (value: T) => void;
  items: Array<{
    value: T;
    display: React.ReactNode;
    buttonSx?: SxProps<Theme>;
  }>;
}

export function SelectButtonList<T>({
  currentValue,
  onSelect,
  items,
}: SelectButtonListProps<T>) {
  return (
    <>
      {items.map((item, i) => (
        <SelectButton
          key={i}
          buttonSx={item.buttonSx}
          isSelected={currentValue === item.value}
          onSelect={onSelect}
          value={item.value}
        >
          {item.display}
        </SelectButton>
      ))}
    </>
  );
}
