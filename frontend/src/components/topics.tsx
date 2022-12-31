import React, { useCallback, useEffect, useState } from 'react';
import { LifeData } from '../data/interfaces';
import { AxiosError } from 'axios';
import BlockMenu from './block-menu';
import DataRenderer from './data-renderer';
import { getLifes } from '../data/fetchers';
import { fetchData } from '../data/utils';
import Typography from '@mui/material/Typography';

export interface TopicsProps {
  individualId: number;
}

export default function Topics(props: TopicsProps): React.ReactElement {
  const [error, setError] = useState<AxiosError | undefined>(undefined);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [data, setData] = useState<LifeData[]>([]);

  useEffect(() => {
    // https://www.robinwieruch.de/react-hooks-fetch-data
    (async () => await fetchData(
      getLifes(props.individualId),
      setData,
      () => setIsLoaded(true),
      setError,
    ))();
  }, []);

  const getContent = useCallback(() => {
    return <BlockMenu keyPrefix='life' items={data.map((item) => {
        return <>
          <Typography variant="h6">{item.name}</Typography>
          <Typography variant="body2">{item.description}</Typography>
        </>;
      })} />
  }, [data]);

  return <DataRenderer isLoaded={isLoaded} error={error} getContent={getContent} />;
}
