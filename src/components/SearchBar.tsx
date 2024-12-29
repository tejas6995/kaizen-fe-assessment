import React from 'react';
import { TextField } from '@mui/material';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <TextField
      label="Search by name"
      variant="outlined"
      value={searchQuery}
      onChange={onSearchChange}
      fullWidth
      sx={{
        maxWidth: 400,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        marginBottom: 2,
      }}
    />
  );
};

export default SearchBar;
