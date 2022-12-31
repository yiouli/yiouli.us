import Typography from '@mui/material/Typography';
import React from 'react';
import { Card } from '@mui/material';
import { ArticleData } from '../data/interfaces';

interface ArticleCardProps {
  article: ArticleData,
}

const ArticleCard: React.FC<ArticleCardProps> = (props) => {
  const { article } = props;
  return <Card elevation={3} sx={{
    // display: 'flex',
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    // gap: 2,
    m: 2,
    p: 3,
  }}>
    {/* <Box
      component='img'
      src={projectData.coverPath}
      alt={projectData.title}
      sx={{ maxWidth: '100%', float: 'left', mr: 3 }}
    /> */}
    <Typography variant='h5' sx={{ wordWrap: 'break-word', pb: 1 }}>{article.title}</Typography>
    <Typography variant='body2' sx={{ wordWrap: 'break-word' }}>{article.body}</Typography>
    {article.topics.map(t =>
      <Typography
        variant='body1'
        sx={{
          display: 'inline',
          wordWrap: 'break-word',
          pr: 1,
        }}>
          {'#' + t.title}
      </Typography>
    )}
  </Card>
}

export default ArticleCard;

