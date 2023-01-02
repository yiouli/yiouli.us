import { AxiosError } from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { getIndividual } from '../data/fetchers';
import { IndividualData } from '../data/interfaces';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { fetchData } from '../data/utils';
import DataRenderer from './data-renderer';
import nullthrows from 'nullthrows';
import ContactMenu from './contact-menu';
import ReactMarkdown from "react-markdown";
import { textAlign } from '@mui/system';

interface BioAvatarProps {
  individualData: IndividualData,
}

function BioAvatar(props: BioAvatarProps): React.ReactElement {
  const data = props.individualData;
  const fn = data.first_name;
  const ln = data.last_name;
  const sx = {
    height: 200,
    width: 200,
    border: 3,
    display: 'block',
  };
  if (data.avatar) {
    return <Avatar sx ={sx} alt={fn} src={data.avatar.meta.download_url} />;
  }
  else {
    return <Avatar sx ={sx} alt={fn}>{fn[0]}{ln[0]}</Avatar>;
  }
}

export interface BiographyProps {
  pageId: number,
}

export default function Biography(props: BiographyProps): React.ReactElement {
  const [error, setError] = useState<AxiosError | undefined>(undefined);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [data, setData] = useState<IndividualData | null>(null);

  useEffect(() => {
    // https://www.robinwieruch.de/react-hooks-fetch-data
    (async () => await fetchData(
      getIndividual(props.pageId),
      setData,
      () => setIsLoaded(true),
      setError,
    ))();
  }, []);

  const getContent = useCallback(() => {
    const individual = nullthrows(data);
    return <>
      <Stack
        direction="row"
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
          gap: 2,
          flexWrap: 'wrap',
        }}>
        <Box sx={{ flexBasis: '30%', p: 5, display: 'flex', justifyContent: 'right'}}>
          <BioAvatar individualData={individual} />
        </Box>
        <Box sx={{ p: 3, flexBasis: '55%' }}>
          <Typography variant="h3">
            <>Hi! I'm {individual.first_name}.</>
          </Typography>
          <Typography variant="body1" component='div'><ReactMarkdown>{individual.about}</ReactMarkdown></Typography>
        </Box>
      </Stack>
      <ContactMenu />
    </>
  }, [data]);

  return <DataRenderer isLoaded={isLoaded} error={error} getContent={getContent} />;
}
