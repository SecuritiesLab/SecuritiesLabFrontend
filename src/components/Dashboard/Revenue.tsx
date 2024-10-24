import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title'
import { useTranslation } from 'react-i18next';

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Revenue() {
  const { t } = useTranslation();

  // Function to format today's date in "10 October 2024" format
function getFormattedDate() {
  const today = new Date();
  return today.toLocaleDateString('en-GB', { // Adjust locale if needed
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

  return (
    <React.Fragment>
      <Title>{t('revenue.title')}</Title>
      <Typography component="p" variant="h4">{t('revenue.amount')}</Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}> on {getFormattedDate()}</Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>{t('revenue.details')}</Link>
      </div>
    </React.Fragment>
  );
}