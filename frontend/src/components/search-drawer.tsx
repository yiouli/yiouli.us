import React, { useCallback, useEffect, useState } from 'react';
import SearchInput from './search-input';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';

// TODO define search result data structure
export interface SearchResult {
  id: number,
  link: string,
}

export interface SearchDrawerProps {
  isOpen: boolean,
}

function SearchDrawer(props: SearchDrawerProps): React.ReactElement {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string | null>(null);
  const [page, setPage] = useState<number | null>(null);
  const [results, setResults] = useState<SearchResult[]>([]);
  const anchor = "top";

  const openDrawer = useCallback((newQuery?: string) => {
    if (newQuery) {
      setQuery(newQuery);
    }
    setIsOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setIsOpen(false);
  }, []);

  // TODO fetch from search backend
  useEffect(() => {
    if (query != null && query != '') {
      const newEntry: SearchResult = {
        'id': results.length,
        'link': `${query}?page=${page}`,
      };
      setResults(results.concat([newEntry]));
    }
  }, [query, page]);

  return <>
    <SearchInput searchCallback={openDrawer} />
    <SwipeableDrawer
      anchor={anchor}
      open={isOpen}
      onOpen={() => { openDrawer(null) }}
      onClose={closeDrawer}
      disableDiscovery={true}
      disableSwipeToOpen={true}
    >
      <Box>
        <SearchInput disabled={true} query={query} searchCallback={openDrawer} />
        <Stack >
        {
          results.map((res) => {
            return <Paper key={`search-result-${res.id}`}>{res.link}</Paper>
          })
        }
        </Stack>
        <Pagination count={5} color="secondary" />
      </Box>
    </SwipeableDrawer>
  </>;
}

export default SearchDrawer;