import { Button, ButtonProps, styled } from "@mui/material";
import { colors } from "appTheme";

export type PrimaryButtonProps = ButtonProps;

export const PrimaryButton = styled(Button)({
  width: "100%",
  fontWeight: "bold",
  backgroundImage: `linear-gradient(135deg, ${colors.honeysuckle} 50%, ${colors.field} 100%)`,
  ":hover, :focus, :active": {
    backgroundImage: "none",
    backgroundColor: colors.field,
  },
});
