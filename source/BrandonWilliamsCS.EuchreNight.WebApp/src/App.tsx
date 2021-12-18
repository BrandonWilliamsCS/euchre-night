import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

import { appTheme } from "appTheme";
import { ScreenRoutes } from "./ScreenRoutes";

function App() {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={appTheme}>
        <ScreenRoutes />
      </ThemeProvider>
    </>
  );
}

export default App;
