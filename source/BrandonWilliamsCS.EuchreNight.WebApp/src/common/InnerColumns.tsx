import React from "react";
import { Grid } from "@mui/material";

export const InnerColumns: React.FC = ({ children }) => {
  return (
    <Grid container columns={6} columnSpacing={2} justifyContent="center">
      <Grid item xs={4}>
        {children}
      </Grid>
    </Grid>
  );
};
