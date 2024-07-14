import React from 'react';
import Typography from '@mui/material/Typography';

interface EvidenceProps {
  premise: {
    premise: string;
    relationship: string;
    url: string;
  };
}

const Evidence: React.FC<EvidenceProps> = ({ premise }) => {
  return (
    <div>
      <Typography variant="body2">
        <strong>Premise:</strong> {premise.premise}
      </Typography>
      <Typography variant="body2">
        <strong>Relationship:</strong> {premise.relationship}
      </Typography>
      <Typography variant="body2">
        <strong>URL:</strong>{' '}
        <a href={premise.url} target="_blank" rel="noopener noreferrer">
          {premise.url}
        </a>
      </Typography>
      <hr />
    </div>
  );
};

export default Evidence;