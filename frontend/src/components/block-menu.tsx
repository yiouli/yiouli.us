import React, { useCallback, useState } from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

function BlockMenuItem({item}): React.ReactElement {
  const [highlight, setHighlight] = useState<boolean>(false);

  return (
    <Paper
      onMouseOver={useCallback(() => setHighlight(true), [highlight])}
      onMouseOut={useCallback(() => setHighlight(false), [highlight])}
      elevation={highlight? 10: 0}
      sx={{
        p: 2,
        flexGrow: 1,
        flexBasis: 1,
        cursor: 'pointer',
        bgcolor: 'background.default',
        '&:hover': {
          color: 'primary.contrastText',
          bgcolor: 'primary.main',
        }
      }}
    >
      {item}
    </Paper>
  );
}

export interface BlockMenuProps {
    items: React.ReactElement[];
    keyPrefix: string;
}

const BlockMenu: React.FC<BlockMenuProps> = (props) => {
  return (
    <Stack
      direction="row"
      sx={{
        justifyContent: 'space-evenly',
        alignItems: 'stretch',
        flexWrap: 'wrap',
        gap: 1
      }}>
      {props.items.map((item ,idx) => {
        return <BlockMenuItem item={item} key={`${props.keyPrefix}-${idx}`} />
      })}
    </Stack>
  );
}

export default BlockMenu;
