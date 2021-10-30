import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Typography from '@mui/material/Typography';
import React from 'react';

import { SiteTree } from '../data/interfaces';

interface TreeMenuProps {
  tree: SiteTree;
  currentPageId: number;
  level: number;
}


function TreeMenu(props: TreeMenuProps) {
  const { tree, currentPageId, level } = props;
  return (
    <List component="div" sx={{ p: 0, m: 0 }}>
      <ListItemButton selected={currentPageId == tree.id} >
        <ListItemText
          sx={{ pl: level * 2 }}
          primary={tree.page.title}
          primaryTypographyProps={{ variant: 'subtitle2' }}
        />
      </ListItemButton>
      <List component="div" sx={{ p: 0, m: 0 }}>
        {tree.children.map((t) => {
          return <TreeMenu
            tree={t}
            currentPageId={currentPageId}
            level={level + 1}
            key={`site-menu-${t.id}`}
          />
        })}
      </List>
    </List>
  );
}

export interface SitemapMenuProps {
  currentPageId: number;
  siteTrees: SiteTree[];
}

export default function SitemapMenu(props: SitemapMenuProps): React.ReactElement {
  const { currentPageId, siteTrees } = props;
  return (
    <List subheader={<ListSubheader>Sitemap</ListSubheader>}>
      {siteTrees.map((t) => {
        return <TreeMenu
          tree={t}
          currentPageId={currentPageId}
          level={0}
          key={`site-menu-${t.id}`}
        />
      })}
    </List>
  );
}
