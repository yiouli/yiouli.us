import React, { useEffect } from 'react';
import { PageData, Sitemap, SiteTree } from '../data/interfaces';
import { getSiteTrees } from '../data/fetchers';
import { Button, SwipeableDrawer, Tooltip } from '@mui/material';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { useCallback, useState } from 'react';
import SitemapMenu from './sitemap-menu';

export function SitemapIcon({ onClick }): React.ReactElement {
  return (
    <Tooltip title='Sitemap'>
      <Button onClick={onClick}>
        <AccountTreeIcon />
      </Button>
    </Tooltip >
  );
}

export interface SitemapDrawerProps {
  isOpen: boolean;
  currentPageId: number;
  onNavigate: (pageId: number, url: string, pageData: PageData) => void;
}

export default function SitemapDrawer(props: SitemapDrawerProps): React.ReactElement {
  const [isOpen, setIsOpen] = useState<boolean>(props.isOpen);
  const [siteTrees, setSiteTrees] = useState<SiteTree[]>([]);

  useEffect(() => {
    (async () => {
      const sts = await getSiteTrees();
      setSiteTrees(sts);
    })();
  }, []);

  const toggleDrawer = useCallback((e) => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return <>
    <SitemapIcon onClick={toggleDrawer} />
    <SwipeableDrawer
      open={isOpen}
      onOpen={toggleDrawer}
      onClose={toggleDrawer}
    >
      <SitemapMenu currentPageId={props.currentPageId} siteTrees={siteTrees} />
    </SwipeableDrawer>
  </>;
}
