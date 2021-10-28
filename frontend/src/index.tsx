import { CssBaseline, PaletteMode } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import React, { useCallback, useState } from 'react';
import ReactDOM from 'react-dom';

import Individual from './components/individual';
import NavBar from './components/nav-bar';
import coolTheme, { coolDarkTheme } from './themes/cool-theme';

declare global {
  var pageId: number;
}

function App() {
  const [mode, setMode] = useState<PaletteMode>('light');

  const toggleMode = useCallback(() => {
    mode == 'light' ? setMode('dark') : setMode('light');
  }, [mode]);

  return mode == 'light'
  ? (
    <ThemeProvider theme={coolTheme}>
      <CssBaseline />
      <NavBar mode={mode} onToggleMode={toggleMode} />
      <Individual pageId={window.pageId} />
    </ThemeProvider>
  )
  : (
    <ThemeProvider theme={coolDarkTheme}>
      <CssBaseline />
      <NavBar mode={mode} onToggleMode={toggleMode} />
      <Individual pageId={window.pageId} />
    </ThemeProvider>
  )
}

ReactDOM.render(
  <App />,
  document.querySelector('#root'),
);