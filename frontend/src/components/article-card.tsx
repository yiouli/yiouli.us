import Typography from '@mui/material/Typography';
import React from 'react';
import { Card } from '@mui/material';
import { ArticleData } from '../data/interfaces';
import ReactMarkdown from "react-markdown";

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
    <Typography component='div' variant='body2' sx={{ wordWrap: 'break-word' }}><ReactMarkdown>{article.body}</ReactMarkdown></Typography>
    {article.topics.map(t =>
      <Typography
        key={'topic-' + t.id}
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

