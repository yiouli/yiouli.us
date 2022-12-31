import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { AxiosError } from 'axios';
import { ProjectData } from '../data/interfaces';
import { getProjects } from '../data/fetchers';
import DataRenderer from './data-renderer';
import { fetchData } from '../data/utils';
import React, { useCallback, useEffect } from 'react';
import { Card, Box } from '@mui/material';
import Carousel from './carousel';

interface ProjectCardProps {
  projectData: ProjectData,
}

const ProjectCard: React.FC<ProjectCardProps> = (props) => {
  const { projectData } = props;
  return <Card elevation={7} sx={{
    // display: 'flex',
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    // gap: 2,
    m: 2,
    p: 3,
  }}>
    <Box
      component='img'
      src={projectData.coverPath}
      alt={projectData.title}
      sx={{ maxWidth: '100%', float: 'left', mr: 3 }}
    />
    <Typography variant='h6' sx={{ wordWrap: 'break-word', pb: 1 }}>{projectData.title}</Typography>
    <Typography variant='body2' sx={{ wordWrap: 'break-word' }}>{projectData.description}</Typography>
  </Card>
}

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export interface HighlightsProps {
  individualId: number;
}

const Highlights: React.FC<HighlightsProps> = (props) => {
  const [error, setError] = React.useState<AxiosError | undefined>(undefined);
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
  const [data, setData] = React.useState<ProjectData[]>([]);

  useEffect(() => {
    // https://www.robinwieruch.de/react-hooks-fetch-data
    (async () => await fetchData(
      getProjects(props.individualId),
      setData,
      () => setIsLoaded(true),
      setError,
    ))();
  }, []);

  const getContent = useCallback(() => {
    return <Carousel>
      {data.map((d, idx) => <ProjectCard projectData={d} key={`project-card-${idx}`} />)}
    </Carousel>
  }, [data]);

  return <DataRenderer isLoaded={isLoaded} error={error} getContent={getContent} />;
}

export default Highlights;

