import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react';
import Biography from './biography';

export interface IndividualProps {
  pageId: number,
}

export default function Individual(props: IndividualProps) {
  return <Grid>
    <Biography pageId={props.pageId} />
  </Grid>;
}