import React from "react";
import { SxProps, Theme } from "@mui/system";
import { Button } from "@mui/material";

export interface SelectButtonProps<T> {
  buttonSx?: SxProps<Theme>;
  isSelected: boolean;
  onSelect: (value: T) => void;
  value: T;
}

export function SelectButton<T>({
  buttonSx,
  children,
  isSelected,
  onSelect,
  value,
}: React.PropsWithChildren<SelectButtonProps<T>>) {
  return (
    <Button
      variant="outlined"
      onClick={() => {
        onSelect(value);
      }}
      sx={{
        ...buttonSx,
        borderColor: isSelected ? "primary.main" : "grey.500",
        borderWidth: 4,
        "&:hover": {
          borderColor: isSelected ? "primary.main" : "grey.500",
          borderWidth: 4,
        },
      }}
    >
      {children}
    </Button>
  );
}
