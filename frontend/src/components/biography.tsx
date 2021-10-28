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
    return <Stack direction="row">
      <Box>
        {data.avatar
          ? <Avatar alt={data.first_name} src={data.avatar} />
          : <Avatar alt={data.first_name}>{data.first_name[0]}{data.last_name[0]}</Avatar>
        }
      </Box>
      <Box>
      <Typography variant="h3">
        <>Hi! I'm {data.first_name} {data.last_name}.</>
      </Typography>
      <Typography variant="body1" component='div'>{HTMLReactParser(data.about)}</Typography>
      </Box>
    </Stack>;
  }
}
