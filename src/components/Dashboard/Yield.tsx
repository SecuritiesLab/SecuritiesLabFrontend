import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { useTranslation } from 'react-i18next';

interface YieldProps {
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

// Function to get yield details based on currency
function getYieldDetails(currency: 'EUR' | 'USD' | 'GBP') {
  const yields = {
    EUR: 58903,
    USD: 53130,
    GBP: 53130,
  };

  const symbols = {
    EUR: '€',
    USD: '$',
    GBP: '£',
  };

  return {
    amount: yields[currency],
    symbol: symbols[currency],
  };
}

export default function Yield({ currency }: YieldProps) {
  const { t } = useTranslation();
  const { amount, symbol } = getYieldDetails(currency);

  return (
    <React.Fragment>
      <Title>{t('yieldGenerated.title', 'Yield Generated')}</Title>
      <Typography component="p" variant="h4">
        {symbol}
        {amount.toLocaleString('en-GB')}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on {getFormattedDate()}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          {t('yieldGenerated.viewDetails', 'View Details')}
        </Link>
      </div>
    </React.Fragment>
  );
}