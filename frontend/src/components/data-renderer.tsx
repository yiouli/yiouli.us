import React from 'react';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';
import { AxiosError } from 'axios';

export interface DataRendererProps {
  isLoaded: boolean,
  getContent: () => React.ReactElement,
  error?: AxiosError,
}

export default function DataRenderer(props: DataRendererProps): React.ReactElement {
  const {isLoaded, error} = props;
  if (!isLoaded) {
    return <LinearProgress />;
  } else if (error) {
    return <Alert severity="error">Error loading data - {error.message}.</Alert>
  } else {
    return props.getContent();
  }
}
