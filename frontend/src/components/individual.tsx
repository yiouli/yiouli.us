import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import Biography from './biography';
import LifeMenu from './life-menu';
import MomentGrid from './moment-grid';
import ProjectCarousel from './project-carousel';

function Section(props) {
  return (
    <Box>
      <Divider sx={{mb:1}}>
        <Typography variant="h5">
          {props.title}
        </Typography>
      </Divider>
      {props.children}
    </Box>
  );
}

export interface IndividualProps {
  pageId: number;
}

export default function Individual(props: IndividualProps) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Stack
        spacing={2}
        sx={{ width: '80%' }}
      >
        <Biography pageId={props.pageId} />
        <Section title='About Me'>
          <LifeMenu individualId={props.pageId} />
        </Section>
        <Section title='Projects'>
          <ProjectCarousel individualId={props.pageId} />
        </Section>
        <Section title='Moments'>
          <MomentGrid individualId={props.pageId} />
        </Section>
      </Stack>
    </Box>
  );
}