import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';

const Search = styled(Box)(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
  flexGrow: 1,
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
  },
}));

function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>, callback: (query: string) => void) {
  if(event.key === 'Enter'){
    const inputElem = event.target as HTMLInputElement;
    callback(inputElem.value);
    inputElem.value = '';
  }
}

export interface SearchInputProps {
  searchCallback: (query: string) => void,
  query?: string,
  disabled?: boolean,
}

function SearchInput(props: SearchInputProps) {
  const {searchCallback, query, disabled} = props;
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Explore more..."
        disabled={disabled || false}
        value={query}
        inputProps={{ 'aria-label': 'search' }}
        onKeyPress={(e) => handleKeyPress(e as React.KeyboardEvent<HTMLInputElement>, searchCallback)}
      />
    </Search>
  );
}

export default SearchInput;