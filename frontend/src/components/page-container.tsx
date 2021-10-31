import { Theme } from '@emotion/react';
import { Divider, Stack, Typography } from '@mui/material';
import { Box, SxProps } from '@mui/system';
import React from 'react';

interface SectionProps {
  title?: string,
}

export const Section: React.FC<SectionProps> = ({title, children}) => {
  return (
    <Box>
      <Divider sx={{mb:1}}>
        {title ? <Typography variant="h5">
          {title}
        </Typography> : <></>}
      </Divider>
      {children}
    </Box>
  );
}

interface PageContainerProps {
  sx?: SxProps<Theme>;
}

const PageContainer: React.FC<PageContainerProps> = ({ sx, children }) => {
  const sxBase = { width: '80%' }
  sx = sx ? { ...sxBase, ...sx } : sxBase;
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Stack
        spacing={2}
        sx={sx}
      >
        {children}
      </Stack>
    </Box>
  );
}

export default PageContainer;
