import React, { useCallback, useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import BlockMenu from './block-menu';
import DataRenderer from './data-renderer';
import { fetchData } from '../data/utils';
import Typography from '@mui/material/Typography';
import { TopicData } from '../data/interfaces';
import { getTopics } from '../data/fetchers';

export interface TopicsProps {
}

export default function Topics(props: TopicsProps): React.ReactElement {
  const [error, setError] = useState<AxiosError | undefined>(undefined);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [data, setData] = useState<TopicData[]>([]);

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
    return <BlockMenu keyPrefix='life' items={data.map((item) => {
        return <>
          <Typography variant="h6">#{item.title}</Typography>
          <Typography variant="body2">{item.description}</Typography>
        </>;
      })} />
  }, [data]);

  return <DataRenderer isLoaded={isLoaded} error={error} getContent={getContent} />;
}
