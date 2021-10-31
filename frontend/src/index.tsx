import { Box, CssBaseline, PaletteMode } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AxiosError } from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import DataRenderer from './components/data-renderer';

import Individual from './components/individual';
import Life from './components/life';
import UtilBar from './components/util-bar';
import { getSiteTree } from './data/fetchers';
import { PageType, SiteTree } from './data/interfaces';
import { fetchData, getPageType } from './data/utils';
import coolTheme, { coolDarkTheme } from './themes/cool-theme';

declare global {
  var pageId: number;
}

function ContentPage({ pageNode }): React.ReactElement {
  switch (getPageType(pageNode.page)) {
    case PageType.Individual: return <Individual pageId={pageNode.id} />;
    case PageType.Life: return <Life pageId={pageNode.Id} />;
    case PageType.Perspective: return <div>perspective</div>;
    default: return <></>;
  }
}

function RouteSwitch({ tree }): React.ReactElement {
  function dfs(node: SiteTree, arr: SiteTree[]) {
    arr.push(node);
    for (const t of node.children) {
      dfs(t, arr);
    }
  }

  if (tree) {
    const arr = [];
    dfs(tree, arr);
    return (
      <Switch>
        {arr.map((t) => {
          // Note that if the path is '' it will always match and no other options would render
          // so if the router is not working, check whether root relativePath is wrongly set to '' instead of '/'
          // relative path needs to have leading splash and no trailing splash to work as well
          return <Route exact path={t.relativePath} key={`page-route-${t.id}`}>
            <ContentPage pageNode={t} />
          </Route>
        })}
      </Switch>
    );
  }
  else { return <></> };
}

function App(): React.ReactElement {
  const [mode, setMode] = useState<PaletteMode>('light');
  const [currentPageId, setCurrentPageId] = useState<number>(window.pageId);
  const [siteTree, setSiteTree] = useState<SiteTree>(undefined);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);

  // We only want to load siteTree every window load, instead of every page navigation
  useEffect(() => {
    (async () => fetchData(
      getSiteTree(window.pageId),
      setSiteTree,
      () => setIsLoaded(true),
      setError,
    ))();
  }, []);

  const toggleMode = useCallback(() => {
    mode == 'light' ? setMode('dark') : setMode('light');
  }, [mode]);

  const route = useCallback((treeNode: SiteTree) => {
    setCurrentPageId(treeNode.id);
  }, []);

  const getContent = useCallback(() => {
    return <>
      <CssBaseline />
      <UtilBar
        currentPageId={currentPageId}
        mode={mode}
        onToggleMode={toggleMode}
        onNavigate={route}
        siteTree={siteTree}
      />
      <RouteSwitch tree={siteTree} />

    </>;
  }, [currentPageId, mode, siteTree]);

  const content = <DataRenderer isLoaded={isLoaded} error={error} getContent={getContent} />;

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
  <BrowserRouter><App /></BrowserRouter>,
  document.querySelector('#root'),
);