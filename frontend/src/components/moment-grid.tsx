import { ImageList, ImageListItem, ImageListItemBar, Typography } from '@mui/material';
import { AxiosError } from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { getMoments } from '../data/fetchers';
import { MomentData } from '../data/interfaces';
import { fetchData } from '../data/utils';
import DataRenderer from './data-renderer';

export interface MomentGridProps {
  individualId: number,
}

const MomentGrid: React.FC<MomentGridProps> = (props) => {
  const [error, setError] = useState<AxiosError | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [data, setData] = useState<MomentData[] | null>(null);

  useEffect(() => {
    // https://www.robinwieruch.de/react-hooks-fetch-data
    (async () => await fetchData(
      getMoments(props.individualId),
      setData,
      () => setIsLoaded(true),
      setError,
    ))();
  }, []);

  const getContent = useCallback(() => {
    return <ImageList variant="masonry" cols={3} gap={8}>
      {data.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={`${item.img}?w=248&fit=crop&auto=format`}
            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar
            title={<Typography variant='subtitle2'>{item.title}</Typography>}
            subtitle={<Typography variant='caption'>{item.author}</Typography>}
          />
        </ImageListItem>
      ))}
    </ImageList>;
  }, [data]);

  return <DataRenderer isLoaded={isLoaded} error={error} getContent={getContent} />;
}

export default MomentGrid;
