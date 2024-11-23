import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Paper } from '@mui/material';
import allKeywordsRaw from './../../../utils/health_keywords';
import extraWordsRaw from './../../../utils/health_keywords/keyword_module/extraWords';

const SearchableTable: React.FC = () => {
  // Preprocess: Convert all keywords to lowercase
  const allKeywords = allKeywordsRaw.map(keyword => keyword.toLowerCase());
  const extraWords = extraWordsRaw.map(keyword => keyword.toLowerCase());

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredData, setFilteredData] = useState<Array<string>>(allKeywords);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = allKeywords.filter(item => item.includes(query));
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
              <TableCell sx={{ fontWeight: 'bold', color: '#fff', textAlign: 'center' }}>Indicator</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row, index) => (
              <TableRow key={index}>
                {/* Render the term */}
                <TableCell>{row.trim()}</TableCell>

                {/* Render "ODS" in a separate cell if the term is in extraWords */}
                <TableCell sx={{ textAlign: 'center' }}>
                  {extraWords.includes(row) && (
                    <span style={{ color: 'green', fontWeight: 'bold' }}>ODS</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SearchableTable;
