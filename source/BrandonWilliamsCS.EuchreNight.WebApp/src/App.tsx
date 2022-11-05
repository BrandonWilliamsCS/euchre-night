import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

import { appTheme } from "appTheme";
import { ScreenRoutes } from "./ScreenRoutes";

function App() {
  return (
    <>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <ScreenRoutes />
      </ThemeProvider>
    </>
  );
}

export default App;
