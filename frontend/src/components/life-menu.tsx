import React, { useCallback, useEffect, useState } from 'react';
import { LifeData } from '../data/interfaces';
import { AxiosError } from 'axios';
import BlockMenu from '../components/block-menu';
import DataRenderer from '../components/data-renderer';
import { getLifes } from '../data/fetchers';
import { fetchData } from '../data/utils';
import Typography from '@mui/material/Typography';

export interface LifeMenuProps {
  individualId: number;
}

export default function LifeMenu(props: LifeMenuProps): React.ReactElement {
  const [error, setError] = useState<AxiosError | null>(null);
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
