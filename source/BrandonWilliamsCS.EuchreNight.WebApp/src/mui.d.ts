import "@mui/material/styles";
import "@mui/material/Typography";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    pop: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    pop?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    pop: true;
  }
}
