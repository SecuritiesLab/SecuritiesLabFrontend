import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { useTranslation } from 'react-i18next';

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

// Function to format today's date in "10 October 2024" format
function getFormattedDate() {
  const today = new Date();
  return today.toLocaleDateString('en-GB', { // Adjust locale if needed
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function Investment() {
  const { t } = useTranslation();
  
  return (
    <React.Fragment>
      <Title>Investment</Title>
      <Typography component="p" variant="h4">€1,000,000</Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on {getFormattedDate()}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View Investments
        </Link>
      </div>
    </React.Fragment>
  );
}