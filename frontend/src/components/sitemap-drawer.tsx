import React, { useEffect } from 'react';
import { PageData, Sitemap } from '../data/interfaces';
import { getSiteTrees } from '../data/fetchers';
import { IconButton, SwipeableDrawer, Tooltip } from '@mui/material';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { useCallback, useState } from 'react';

export function SitemapIcon({ onClick }): React.ReactElement {
  return (
    <Tooltip title='Sitemap'>
      <IconButton onClick={onClick}>
        <AccountTreeIcon />
      </IconButton>
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

  useEffect(() => {
    (async () => {
      const siteTrees = await getSiteTrees();
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
      sitemap
    </SwipeableDrawer>
  </>;
}
