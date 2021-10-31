import {
  Box,
  Card,
  Stack,
  Typography,
} from '@mui/material';
import {
  Timeline,
  TimelineConnector,
  TimelineContent, TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from '@mui/lab';
import React from 'react';
import Carousel from './carousel';
import NavBar from './nav-bar';
import PageContainer, { Section } from './page-container';

interface LifeTimelineProps {

}

function LifeTimeline(props: LifeTimelineProps): React.ReactElement {
  return (
    <Timeline>
      <TimelineItem>
        <TimelineOppositeContent color="text.secondary">
          09:30 am
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Eat</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent color="text.secondary">
          10:00 am
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Code</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent color="text.secondary">
          12:00 am
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Sleep</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent color="text.secondary">
          9:00 am
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Repeat</TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}

function getCard<T>(items: T[], endIdx) {
  return (
    <Card key={`life-card-${endIdx}`}>
      <Stack direction='row' gap={1}>
        {items.map((d, idx) =>
          <Card
            elevation={3}
            key={`life-card-item-${endIdx}-${idx}`}
            sx={{ m: 1, p: 2, flexGrow: 1 }}
          >{d}</Card>)
        }
      </Stack>
    </Card>
  );
}

function getCards<T>(data: T[], itemPerCard: number) {
  itemPerCard = Math.max(itemPerCard, 1);
  var items = [];
  const ret = [];
  data.forEach((item, idx) => {
    items.push(item);
    if ((idx + 1) % itemPerCard == 0) {
      ret.push(getCard(items, idx));
      items = [];
    }
  });
  if (items.length > 0) ret.push(getCard(items, data.length - 1));
  return ret;
}

interface LifeProps {
  pageId: number;
}

const Life: React.FC<LifeProps> = (props) => {
  return (
    <PageContainer>
      <NavBar />
      <Box sx={{ width: '100%', textAlign: 'center', p: 2 }}>
        <Typography variant='h4'>Life data title</Typography>
        <Typography variant='body1'>Life data description</Typography>
      </Box>
      <Section title='Thoughts'>
        <Carousel>
          {getCards([
            'sdfsdfds',
            'sdfsdag',
            'sdfsdfds',
            'sdfsdag',
            'sdfjdsgiaiaiaia',
            'sdfsdfds',
            'sdfsdag',
            'sdfjdsgiaiaiaia',
            'sdfsdfds',
            'sdfjdsgiaiaiaia',
            'sdfsdfds',
            'sdfsdfds',
            'sdfsdag',
            'sdfsdfds',
            'sdfsdag',
          ], 3)}
        </Carousel>
      </Section>
      <Section title='Timeline'>
        <LifeTimeline />
      </Section>
    </PageContainer>
  );
}

export default Life;
