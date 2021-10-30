import { Box, CssBaseline, PaletteMode } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import React, { useCallback, useState } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";

import Individual from './components/individual';
import Life from './components/life';
import UtilBar from './components/util-bar';
import { PageData } from './data/interfaces';
import coolTheme, { coolDarkTheme } from './themes/cool-theme';

declare global {
  var pageId: number;
}

interface MapEntry {
  name: string;
  content: React.ReactElement;
}

function App() {
  const [mode, setMode] = useState<PaletteMode>('light');
  const [currentPageId, setCurrentPageId] = useState<number>(window.pageId);

  const toggleMode = useCallback(() => {
    mode == 'light' ? setMode('dark') : setMode('light');
  }, [mode]);

  const route = useCallback((pageId: number, url: string, page: PageData) => {
    setCurrentPageId(pageId);
  }, []);

  const content = <>
    <CssBaseline />
    <BrowserRouter>
      <UtilBar
        currentPageId={currentPageId}
        mode={mode}
        onToggleMode={toggleMode}
        onNavigate={route}
      />
      <Switch>
        <Route exact path="/">
          <Individual pageId={currentPageId} />
        </Route>
        <Route exact path="/life">
          <Life />
        </Route>
      </Switch>
    </BrowserRouter>
  </>;

  return mode == 'light'
    ? (
      <ThemeProvider theme={coolTheme}>
        {content}
      </ThemeProvider>
    )
    : (
      <ThemeProvider theme={coolDarkTheme}>
        {content}
      </ThemeProvider>
    );
}

ReactDOM.render(
  <App />,
  document.querySelector('#root'),
);