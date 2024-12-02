import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { useTranslation } from 'react-i18next';

interface RevenueProps {
  currency: 'EUR' | 'USD' | 'GBP'; // Currency type
}

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

// Function to format today's date in "10 October 2024" format
function getFormattedDate() {
  const today = new Date();
  return today.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

// Function to get revenue details based on currency
function getRevenueDetails(currency: 'EUR' | 'USD' | 'GBP') {
  const revenue = 47817; // Fixed revenue for all currencies
  const symbols = {
    EUR: '€',
    USD: '$',
    GBP: '£',
  };

  return {
    amount: revenue,
    symbol: symbols[currency],
  };
}

export default function Revenue({ currency }: RevenueProps) {
  const { t } = useTranslation();
  const { amount, symbol } = getRevenueDetails(currency);

  return (
    <React.Fragment>
      <Title>{t('revenue.title', 'Revenue')}</Title>
      <Typography component="p" variant="h4">
        {symbol}
        {amount.toLocaleString('en-GB')}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on {getFormattedDate()}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          {t('revenue.details', 'View Details')}
        </Link>
      </div>
    </React.Fragment>
  );
}