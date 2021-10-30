import React from 'react';
import { SiteTree } from '../data/interfaces';
import { Button, SwipeableDrawer, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useCallback, useState } from 'react';
import SitemapMenu from './sitemap-menu';

export function SitemapIcon({ onClick }): React.ReactElement {
  return (
    <Tooltip title='Sitemap'>
      <Button onClick={onClick}>
        <MenuIcon />
      </Button>
    </Tooltip >
  );
}

export interface SitemapDrawerProps {
  isOpen: boolean;
  currentPageId: number;
  onNavigate: (siteTreeNode: SiteTree) => void;
  siteTree: SiteTree;
}

export default function SitemapDrawer(props: SitemapDrawerProps): React.ReactElement {
  const [isOpen, setIsOpen] = useState<boolean>(props.isOpen);

  const toggleDrawer = useCallback((e) => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const onNavigate = useCallback((t) => {
    props.onNavigate(t);
    setIsOpen(false);
  }, []);

  return <>
    <SitemapIcon onClick={toggleDrawer} />
    <SwipeableDrawer
      open={isOpen}
      onOpen={toggleDrawer}
      onClose={toggleDrawer}
    >
      <SitemapMenu
        currentPageId={props.currentPageId}
        siteTree={props.siteTree}
        onNavigate={onNavigate}
        level={0}
      />
    </SwipeableDrawer>
  </>;
}
