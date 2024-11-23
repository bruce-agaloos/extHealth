import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Paper, FormControlLabel, Checkbox } from '@mui/material';
import allKeywordsRaw from './../../../utils/health_keywords';
import topicsSupported from './../../../utils/health_keywords/keyword_module/topicsOfOnlineDatabase';

const SearchableTable: React.FC = () => {
  // Preprocess: Convert all keywords to lowercase and remove duplicates
  const allKeywords = Array.from(new Set(allKeywordsRaw.map(keyword => keyword.toLowerCase())));
  const extraWords = Array.from(new Set(topicsSupported.map(keyword => keyword.toLowerCase())));

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showOnlyODS, setShowOnlyODS] = useState<boolean>(false);
  const [filteredData, setFilteredData] = useState<Array<string>>(allKeywords);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter data based on search query and ODS filter
    const filtered = allKeywords.filter(item => item.includes(query));
    setFilteredData(filtered);
  };

  const handleODSFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowOnlyODS(event.target.checked);
  };

  // Apply the ODS filter if it's active
  const displayedData = filteredData.filter(item => (showOnlyODS ? extraWords.includes(item) : true));

  return (
    <div>
      {/* Search Field */}
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearch}
        style={{ marginBottom: '20px' }}
      />

      {/* ODS Filter Checkbox */}
      <FormControlLabel
        control={<Checkbox checked={showOnlyODS} onChange={handleODSFilterChange} />}
        label="Show only ODS keywords"
        style={{ marginBottom: '20px' }}
      />

      {/* Table */}
      <TableContainer component={Paper} sx={{ maxHeight: '400px', overflowY: 'auto' }}>
        <Table aria-label="searchable table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1976d2', color: '#fff' }}>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>Term</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff', textAlign: 'center' }}>Indicator</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedData.map((row, index) => (
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
