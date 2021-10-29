import { PaletteMode } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';
import { PageData } from '../data/interfaces';
import SearchDrawer from './search-drawer';
import SitemapDrawer from './sitemap-drawer';

export interface UtilBarProps {
  currentPageId: number,
  mode: PaletteMode,
  onToggleMode: () => void,
  onNavigate: (pageId: number, url: string, pageData: PageData) => void;
}

export default function UtilBar(props: UtilBarProps): React.ReactElement {
  const { currentPageId, mode, onToggleMode, onNavigate } = props;
  return <>
    <AppBar position="fixed" color='inherit' elevation={0}>
      <Toolbar>
        <Stack spacing={1} direction="row" sx={{width: '100%'}}>
          <SitemapDrawer currentPageId={currentPageId} onNavigate={onNavigate} isOpen={false} />
          <Button variant="text">Contact</Button>
          <SearchDrawer isOpen={false} />
          <FormGroup sx={{ order: 100 }}>
            <FormControlLabel
              control={<Switch color='secondary' onChange={onToggleMode} defaultChecked={false} />}
              label={mode}
            />
          </FormGroup>
        </Stack>
      </Toolbar>
    </AppBar>
    <Toolbar />
  </>
}
