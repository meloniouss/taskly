import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ColorModeContext, useMode } from './theme';
import{CssBaseline, ThemeProvider} from "@mui/material";
import Topbar from "./Topbar";
function App() {
  const [theme, colorMode] = useMode();
  return(
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Topbar/> {/* just for testing so far.*/}
        <div className="app">
          <main className="content"></main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
