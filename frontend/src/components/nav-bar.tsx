import { PaletteMode } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';
import SearchDrawer from './search-drawer';

export interface NavBarProps {
  mode: PaletteMode,
  onToggleMode: () => void,
}

export default function NavBar(props: NavBarProps): React.ReactElement {
  const { mode, onToggleMode } = props;
  return <>
    <AppBar position="fixed" color='transparent' elevation={0}>
      <Toolbar>
        <Stack spacing={2} direction="row">
          <Button variant="text">Home</Button>
          <Button variant="text">Contact</Button>
          <SearchDrawer isOpen={false} />
          <FormGroup>
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
