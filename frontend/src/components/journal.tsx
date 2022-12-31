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
import React, { useCallback, useEffect } from 'react';
import { AxiosError } from 'axios';
import { fetchData } from '../data/utils';
import { ArticleData } from '../data/interfaces';
import { getArticles } from '../data/fetchers';
import nullthrows from 'nullthrows';
import DataRenderer from './data-renderer';
import ArticleCard from './article-card';

interface JournalTimelineProps {
}

function JournalTimeline(props: JournalTimelineProps): React.ReactElement {
  const [error, setError] = React.useState<AxiosError | undefined>(undefined);
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
  const [data, setData] = React.useState<ArticleData[]>([]);

  useEffect(() => {
    // https://www.robinwieruch.de/react-hooks-fetch-data
    (async () => await fetchData(
      getArticles(),
      setData,
      () => setIsLoaded(true),
      setError,
    ))();
  }, []);

  const getContent = useCallback(() => {
    const articles = nullthrows(data);
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

export default JournalTimeline;
