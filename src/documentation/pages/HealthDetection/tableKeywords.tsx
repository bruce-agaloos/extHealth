// SearchableTable.tsx
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Paper } from '@mui/material';

// Import allKeywords from the relevant file
import allKeywords from './../../../utils/health_keywords'; // Adjust the path based on your project structure

const SearchableTable: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredData, setFilteredData] = useState<Array<string>>(allKeywords);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter the data based on the search query
    const filtered = allKeywords.filter(item => item.toLowerCase().includes(query));
    setFilteredData(filtered);
  };

  return (
    <div>
      {/* Search input */}
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearch}
        style={{ marginBottom: '20px' }}
      />

      {/* Table with scrollable body */}
      <TableContainer component={Paper} sx={{ maxHeight: '400px', overflowY: 'auto' }}>
        <Table aria-label="searchable table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1976d2', color: '#fff' }}> {/* Blue background */}
              <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>Term</TableCell> {/* Bold header text */}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Display filtered data */}
            {filteredData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SearchableTable;
