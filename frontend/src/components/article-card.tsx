import Typography from '@mui/material/Typography';
import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardContent, CardMedia } from '@mui/material';
import { ArticleData, BlockData, BlockType, ImageWithCaptionBlock } from '../data/interfaces';
import ReactMarkdown from "react-markdown";
import { AxiosError } from 'axios';
import { getImageUrl } from '../data/fetchers';
import { fetchData } from '../data/utils';
import DataRenderer from './data-renderer';

interface ContentBlockProps {
  content: BlockData
}

function ContentBlock(props: ContentBlockProps): React.ReactElement {
  const { content } = props;

  const [error, setError] = useState<AxiosError | undefined>(undefined);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);


  const getContent = useCallback(() => {
    switch(content.type) {
      case BlockType.Markdown: return <ReactMarkdown>{content.value as string}</ReactMarkdown>;
      case BlockType.ImageWithCaption:
        const caption = (content.value as ImageWithCaptionBlock).caption;
        return imageUrl
          ? <Card elevation={0} sx={{cursor: 'pointer'}}>
            <CardMedia component='img' height='300' src={imageUrl} alt={caption} />
            <CardContent sx={{borderBottom: 1}}><Typography variant='subtitle2'>{caption}</Typography></CardContent>
          </Card>
          : <></>
    }
  }, [content, imageUrl]);

  if (props.content.type == BlockType.ImageWithCaption) {
    const imageContentBlock = props.content.value as ImageWithCaptionBlock;
    useEffect(() => {
      // https://www.robinwieruch.de/react-hooks-fetch-data
      (async () => await fetchData(
        getImageUrl(imageContentBlock.image),
        setImageUrl,
        () => setIsLoaded(true),
        setError,
      ))();
    }, []);
    return <DataRenderer isLoaded={isLoaded} error={error} getContent={getContent} />;
  }
  else {
    return getContent();
  }
}

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
    <Typography variant='h5' sx={{ wordWrap: 'break-word', pb: 1, fontWeight: 'bold' }}>{article.title}</Typography>
    <Typography component='div' variant='body2' sx={{ wordWrap: 'break-word' }}>
      {article.content.map((content, idx) => {
        return <ContentBlock key={idx} content={content} /> 
      })}
    </Typography>
    {article.topics.map(t =>
      <Typography
        key={'topic-' + t.id}
        variant='body1'
        sx={{
          display: 'inline',
          wordWrap: 'break-word',
          fontWeight: 'bold',
          pr: 1,
        }}>
          {'#' + t.title}
      </Typography>
    )}
  </Card>
}

export default ArticleCard;

