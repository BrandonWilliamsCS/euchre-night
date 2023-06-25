import { Button, ButtonProps, styled } from "@mui/material";
import { colors } from "appTheme";

export type SelectionButtonProps = ButtonProps;

export const SelectionButton = styled(Button)({
  backgroundColor: colors.white,
  color: colors.pepper,
  boxShadow: "0px 7px 10px rgba(13, 28, 12, .5)",
  ":hover, :focus, :active": {
    backgroundColor: colors.morningMist,
    boxShadow: "0px 2px 5px rgba(13, 28, 12, .8)",
  },
});
