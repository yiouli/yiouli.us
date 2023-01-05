import React, { useCallback, useState } from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

function BlockMenuItem({item, onHighlight, onLowlight, isHighlighted}): React.ReactElement {

  return (
    <Paper
      onClick={isHighlighted? onLowlight: onHighlight}
      elevation={isHighlighted? 10: 0}
      sx={isHighlighted
        ? {
          flexGrow: 1,
          flexBasis: 1,
          cursor: 'pointer',
          color: 'primary.contrastText',
          bgcolor: 'primary.main',
        }
        : {
          flexGrow: 1,
          flexBasis: 1,
          cursor: 'pointer',
          color: 'primary.main',
          bgcolor: 'background.default',
        }
      }
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
  const [highlighted, setHighlighted] = useState<number | undefined>(undefined);

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
        return <BlockMenuItem
          item={item} key={`${props.keyPrefix}-${idx}`}
          onHighlight={useCallback(() => {console.log(`switch to highlight for ${idx}`); setHighlighted(idx); }, [])}
          onLowlight={useCallback(() => {console.log(`switch to highlight for ${idx}`); setHighlighted(undefined); }, [])}
          isHighlighted={idx == highlighted}
        />
      })}
    </Stack>
  );
}

export default BlockMenu;
