import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface CustomAccordionProps {
  title: string;
  count: string;
  children: React.ReactNode;
  expanded: boolean;
  onChange: (event: React.SyntheticEvent, isExpanded: boolean) => void;
  onClick?: () => void;
  mode: string; // Add mode prop
}

const CustomAccordion: React.FC<CustomAccordionProps> = ({
  title,
  count,
  children,
  expanded,
  onChange,
  onClick,
  mode, // Destructure mode prop
}) => {
  return (
    <Accordion expanded={expanded} onChange={onChange} className={`accordion ${title}-accordion`} onClick={onClick}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel-content"
        id="panel-header"
      >
        <Typography className="title">
          <span>
            {count}
          </span>
          {mode === 'google' ? title : `Result - Mostly ${title}`} {/* Conditional rendering based on mode */}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

export default CustomAccordion;