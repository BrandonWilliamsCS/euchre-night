import React from "react";
import { Button } from "@mui/material";

export interface PrimaryButtonProps {
  onClick: () => void;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  onClick,
}) => {
  return (
    <Button color="primary" variant="contained" onClick={onClick}>
      {children}
    </Button>
  );
};
