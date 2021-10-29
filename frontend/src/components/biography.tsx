import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import { AxiosError } from 'axios';
import HTMLReactParser from 'html-react-parser';
import React, { useEffect, useState } from 'react';
import { getIndividual } from '../data/fetchers';
import { IndividualData } from '../data/interfaces';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';

interface BioAvatarProps {
  individualData: IndividualData,
}

function BioAvatar(props: BioAvatarProps): React.ReactElement {
  const data = props.individualData;
  const fn = data.first_name;
  const ln = data.last_name;
  const sx = {
  };
  if (data.avatar){
    return <Avatar alt={fn} src={data.avatar} />;
  }
  else {
    return <Avatar alt={fn}>{fn[0]}{ln[0]}</Avatar>
  }
}

export interface BiographyProps {
  pageId: number,
}

export default function Biography(props: BiographyProps): React.ReactElement {
  const [error, setError] = useState<AxiosError | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [data, setData] = useState<IndividualData | undefined>(undefined);

  useEffect(() => {
    // https://www.robinwieruch.de/react-hooks-fetch-data
    (async () => {
      try {
        const resData = await getIndividual(props.pageId);
        setData(resData);
        setIsLoaded(true);
      }
      catch (err) {
        setError(err);
        setIsLoaded(true);
      }
    })();
  }, []);

  if (error) {
    return <Alert severity="error">Error loading biography - {error.message}.</Alert>
  } else if (!isLoaded) {
    return <LinearProgress />;
  } else {
    return (
      <Stack
        direction="row"
        sx={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'baseline',
          gap: 2,
        }}>
        <Box sx={{width: '33%', display: 'flex', flexDirection: 'row-reverse'}}>
          <BioAvatar individualData={data} />
        </Box>
        <Box sx={{width: '67%', p: 3}}>
          <Typography variant="h3">
            <>Hi! I'm {data.first_name}.</>
          </Typography>
          <Typography variant="body1" component='div'>{HTMLReactParser(data.about)}</Typography>
        </Box>
      </Stack>
    );
  }
}
