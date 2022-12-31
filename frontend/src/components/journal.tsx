import {
  Card,
  Stack,
} from '@mui/material';
import {
  Timeline,
  TimelineConnector,
  TimelineContent, TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  timelineOppositeContentClasses,
  TimelineSeparator,
} from '@mui/lab';
import React from 'react';

interface JournalTimelineProps {
  individualId: number;
}

function JournalTimeline(props: JournalTimelineProps): React.ReactElement {
  return (
    <Timeline 
      sx={{
        [`& .${timelineOppositeContentClasses.root}`]: {
          flex: 0.1,
        },
      }}>
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
    </Timeline>
  );
}

function getCard<T>(items: T[], endIdx: number) {
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
  var items: T[] = [];
  const ret: JSX.Element[] = [];
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

export default JournalTimeline;
