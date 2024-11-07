import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Paper } from '@mui/material';
import allKeywords from './../../../utils/health_keywords';

const SearchableTable: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredData, setFilteredData] = useState<Array<string>>(allKeywords);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = allKeywords.filter(item => item.toLowerCase().includes(query));
    setFilteredData(filtered);
  };

  return (
    <div>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearch}
        style={{ marginBottom: '20px' }}
      />

      <TableContainer component={Paper} sx={{ maxHeight: '400px', overflowY: 'auto' }}>
        <Table aria-label="searchable table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1976d2', color: '#fff' }}>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>Term</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row, index) => (
              <TableRow key={index}>
                {/* Trim each row item when rendering */}
                <TableCell>{row.trim()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SearchableTable;
