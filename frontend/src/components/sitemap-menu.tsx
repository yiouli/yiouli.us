import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WorkIcon from '@mui/icons-material/Work';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import FeedIcon from '@mui/icons-material/Feed';
import InsightsIcon from '@mui/icons-material/Insights';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import CelebrationIcon from '@mui/icons-material/Celebration';
import React, { useCallback } from 'react';

import { PageData, PageType, SiteTree } from '../data/interfaces';
import { getPageType } from '../data/utils';
import { useHistory } from 'react-router-dom';

function compareTrees(tree1: SiteTree, tree2: SiteTree): number {
  const tt1 = getPageType(tree1.page).valueOf();
  const tt2 = getPageType(tree2.page).valueOf();
  if (tt1 === tt2) {
    return tree1.page.title.toLowerCase().localeCompare(tree2.page.title.toLowerCase());
  }
  return tt1 - tt2;
}

interface TreeMenuProps {
  tree: SiteTree;
  currentPageId: number;
  level: number;
  onNavigate: (pageId: number, url: string, pageData: PageData) => void;
}

function TreeMenu(props: TreeMenuProps) {
  const { tree, currentPageId, level, onNavigate } = props;
  // this requires the menu be a child of router
  const routerHistory = useHistory();

  function getIcon(pageType: PageType) {
    switch (pageType) {
      case PageType.Individual: return <AccountCircleIcon />;
      case PageType.Insight: return <LightbulbIcon />;
      case PageType.Life: return <WorkIcon />;
      case PageType.Moment: return <CelebrationIcon />;
      case PageType.Perspective: return <InsightsIcon />;
      case PageType.Project: return <BuildCircleIcon />;
      default: return <FeedIcon />;
    }
  }

  const handleClick = useCallback((e) => {
    routerHistory.push(tree.url);
    onNavigate(tree.id, tree.url, tree.page);
  }, [tree, routerHistory]);

  return (
    <List component="nav" sx={{ p: 0, m: 0 }}>
      <ListItemButton
        selected={currentPageId == tree.id}
        sx={{ pl: level * 4, pr: 4 }}
        onClick={handleClick}
      >
        <ListItemIcon sx={{ pl: 2 }}>{getIcon(getPageType(tree.page))}</ListItemIcon>
        <ListItemText primary={tree.page.title} />
      </ListItemButton>
      <List component="nav" sx={{ p: 0, m: 0 }}>
        {tree.children.sort(compareTrees).map((t) => {
          return <TreeMenu
            tree={t}
            currentPageId={currentPageId}
            level={level + 1}
            key={`site-menu-${t.id}`}
            onNavigate={onNavigate}
          />
        })}
      </List>
    </List >
  );
}

export interface SitemapMenuProps {
  currentPageId: number;
  siteTrees: SiteTree[];
  onNavigate: (pageId: number, url: string, pageData: PageData) => void;
}

export default function SitemapMenu(props: SitemapMenuProps): React.ReactElement {
  const { currentPageId, siteTrees, onNavigate } = props;
  return (
    <List subheader={<ListSubheader>Get Around...</ListSubheader>}>
      {siteTrees.sort(compareTrees).map((t) => {
        return <TreeMenu
          tree={t}
          currentPageId={currentPageId}
          level={0}
          key={`site-menu-${t.id}`}
          onNavigate={onNavigate}
        />
      })}
    </List>
  );
}
