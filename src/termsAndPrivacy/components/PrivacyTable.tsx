import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso, TableComponents } from 'react-virtuoso';

// Data structure
interface Data {
  category: string;
  examples: string;
  collected: boolean;
}

// Column structure
interface ColumnData {
  dataKey: keyof Data;
  label: string;
  width?: number;
}

// Sample data
const rows: Data[] = [
  { category: 'A. Identifiers', examples: 'Contact details, such as real name, alias, postal address, telephone or mobile contact number, unique personal identifier, online identifier, Internet Protocol address, email address, and account name', collected: false },
  { category: 'B. Personal information categories listed in the California Customer Records statute', examples: 'Name, contact information, education, employment, employment history, and financial information', collected: false },
  { category: 'C. Protected classification characteristics under California or federal law', examples: 'Gender and date of birth', collected: false },
  { category: 'D. Commercial information', examples: 'Transaction information, purchase history, financial details, and payment information', collected: false },
  { category: 'E. Biometric information', examples: 'Fingerprints and voiceprints', collected: false },
  { category: 'F. Internet or other similar network activity', examples: 'Browsing history, search history, online behavior, interest data, and interactions with our and other websites, applications, systems, and advertisements', collected: false },
  { category: 'G. Geolocation data', examples: 'Device location', collected: false },
  { category: 'H. Audio, electronic, visual, thermal, olfactory, or similar information', examples: 'Images and audio, video or call recordings created in connection with our business activities', collected: false },
  { category: 'I. Professional or employment-related information', examples: 'Business contact details in order to provide you our services at a business level or job title, work history, and professional qualifications if you apply for a job with us', collected: false },
  { category: 'J. Education Information', examples: 'Student records and directory information', collected: false },
  { category: 'K. Inferences drawn from other personal information', examples: 'Inferences drawn from any of the collected personal information listed above to create a profile or summary about, for example, an individual’s preferences and characteristics', collected: false },
  { category: 'L. Sensitive personal information', examples: 'Account login information, drivers’ licenses, health data, precise geolocation, racial or ethnic origin, religious or philosophical beliefs, and sex life or sexual orientation', collected: false },
  { category: 'M. Twitter or X Feed', examples: 'Posts you see on your X or Twitter homepage', collected: true },
  { category: 'N. Context Menu Data', examples: 'Texts you submit to us to determine if a text is health related or not', collected: true },
  { category: 'O. Submitted Data', examples: 'Texts you submit either through X feed, context menu, or form submission for fact-checking', collected: true },
];



// Column settings
const columns: ColumnData[] = [
  { dataKey: 'category', label: 'Category', width: 200 },
  { dataKey: 'examples', label: 'Examples', width: 400 },
  { dataKey: 'collected', label: 'Collected', width: 100 },
];

// Virtuoso components configuration
const VirtuosoTableComponents: TableComponents<Data> = {
  Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
  ),
  TableHead: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableHead {...props} ref={ref} />
  )),
  TableRow,
  TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

// Header for table columns
function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          style={{ width: column.width }}
          sx={{ backgroundColor: 'background.paper', fontWeight: 'bold' }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

// Row component displaying "Yes" or "No" based on collected status
const RowContent: React.FC<{ row: Data }> = ({ row }) => (
  <>
    <TableCell>{row.category}</TableCell>
    <TableCell>{row.examples}</TableCell>
    <TableCell align="center">{row.collected ? 'Yes' : 'No'}</TableCell>
  </>
);

// Main table component
export default function InformationTable() {
  return (
    <Paper style={{ height: 500, width: '100%' }}>
      <TableVirtuoso
        data={rows}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={(index, row) => <RowContent row={row} />}
      />
    </Paper>
  );
}




