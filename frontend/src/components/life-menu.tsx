import React, { useCallback, useEffect, useState } from 'react';
import { LifeData } from '../data/interfaces';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export interface LifeMenuItemProps {
  data: LifeData;
}

function LifeMenuItem(props: LifeMenuItemProps): React.ReactElement {
  const [highlight, setHighlight] = useState<boolean>(false);
  const {data} = props;

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
      <Typography variant="h6">{data.name}</Typography>
      <Typography variant="body2">{data.description}</Typography>
    </Paper>
  );
}

export interface LifeMenuProps {
  individualId: number;
}

export default function LifeMenu(props: LifeMenuProps): React.ReactElement {

  const [items, setItems] = useState<LifeData[]>([]);

  // TODO fetch data from server
  useEffect(() => {
    (async () => {
      const data = [
        { 'name': 'Career', 'description': 'career in tech industry, as an engineer & leader.' },
        { 'name': 'Adventures', 'description': 'Exciting journeys, DIY projects, challenges to self.' },
        { 'name': 'Lifestyle', 'description': 'Pursuit of a fuller life.' },
        { 'name': 'Music & Arts', 'description': 'Ocassional fun from making music & arts.' },
      ];
      setItems(data as LifeData[]);
    })();
  }, []);

  return (
    <Stack
      direction="row"
      sx={{
        justifyContent: 'space-evenly',
        alignItems: 'stretch',
        flexWrap: 'wrap',
        gap: 1
      }}>
      {items.map((item) => {
        return <LifeMenuItem data={item} key={`life-item-${item.name}`} />
      })}
    </Stack>
  );
}
