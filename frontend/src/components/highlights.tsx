import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { AxiosError } from 'axios';
import DataRenderer from './data-renderer';
import { fetchData } from '../data/utils';
import React, { useCallback, useEffect } from 'react';
import Carousel from './carousel';
import { getArticles } from '../data/fetchers';
import { ArticleData } from '../data/interfaces';
import ArticleCard from './article-card';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export interface HighlightsProps {
}

const Highlights: React.FC<HighlightsProps> = (props) => {
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
    return <Carousel>
      {data.map((d, idx) => <ArticleCard article={d} key={`project-card-${idx}`} />)}
    </Carousel>
  }, [data]);

  return <DataRenderer isLoaded={isLoaded} error={error} getContent={getContent} />;
}

export default Highlights;

