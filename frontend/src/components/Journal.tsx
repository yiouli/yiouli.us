import React, { useCallback, useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import BlockMenu from './block-menu';
import DataRenderer from './data-renderer';
import { fetchData } from '../data/utils';
import {
  Timeline,
  TimelineConnector,
  TimelineContent, TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  timelineOppositeContentClasses,
  TimelineSeparator,
} from '@mui/lab';
import Typography from '@mui/material/Typography';
import { ArticleData, TopicData } from '../data/interfaces';
import { getArticles, getTopics } from '../data/fetchers';
import Box from '@mui/material/Box';
import nullthrows from 'nullthrows';
import ArticleCard from './article-card';

interface JournalTimelineProps {
  topicId: number | undefined,
}

function JournalTimeline(props: JournalTimelineProps): React.ReactElement {
  const [error, setError] = React.useState<AxiosError | undefined>(undefined);
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
  const [data, setData] = React.useState<ArticleData[]>([]);

  useEffect(() => {
    // https://www.robinwieruch.de/react-hooks-fetch-data
    (async () => await fetchData(
      getArticles(props.topicId),
      setData,
      () => setIsLoaded(true),
      setError,
    ))();
  }, [props]);

  const getContent = useCallback(() => {
    const articles = nullthrows(data);
    // @ts-ignore TS complains about missing properies of onResize & onResizeCapture, which is not part of API
    return <Timeline
      sx={{
        [`& .${timelineOppositeContentClasses.root}`]: {
          flex: 0.1,
        },
      }}>
      {articles.map(article =>
        <TimelineItem key={'article-' + article.id}>
          <TimelineOppositeContent color="text.secondary">
            {article.date_display}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent><ArticleCard article={article} /></TimelineContent>
        </TimelineItem>
        )}
    </Timeline>
  }, [data]);

  return <DataRenderer isLoaded={isLoaded} error={error} getContent={getContent} />;
}

export interface JournalProps {
}

export default function Journal(props: JournalProps): React.ReactElement {
  const [error, setError] = useState<AxiosError | undefined>(undefined);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [data, setData] = useState<TopicData[]>([]);
  const [topicId, setTopicId] = useState<number | undefined>(undefined);

  useEffect(() => {
    // https://www.robinwieruch.de/react-hooks-fetch-data
    (async () => await fetchData(
      getTopics(),
      setData,
      () => setIsLoaded(true),
      setError,
    ))();
  }, []);

  const getContent = useCallback(() => {
    return <>
      <BlockMenu keyPrefix='topics' items={data.map(item => {
        return <Box component='div' sx={{p: 2}} onClick={useCallback(() => {
          console.log(`button clicked for topic ${item.title}`);
          if(item.id == topicId) {
            setTopicId(undefined);
          }
          else
            setTopicId(item.id);
        }, [topicId, item])}>
        <Typography variant="h6">#{item.title}</Typography>
        <Typography variant="body2">{item.description}</Typography>
      </Box>;
      })} />
      <JournalTimeline topicId={topicId} />
    </>
  }, [data, topicId]);

  return <DataRenderer isLoaded={isLoaded} error={error} getContent={getContent} />;
}
