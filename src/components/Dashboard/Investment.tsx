import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { useTranslation } from 'react-i18next';

interface InvestmentProps {
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

// Function to get investment details based on currency
function getInvestmentDetails(currency: 'EUR' | 'USD' | 'GBP') {
  const symbols = {
    EUR: '€',
    USD: '$',
    GBP: '£',
  };

  return {
    amount: 1000000, // Fixed 1,000,000 investment amount for all currencies
    symbol: symbols[currency],
  };
}

export default function Investment({ currency }: InvestmentProps) {
  const { t } = useTranslation();
  const { amount, symbol } = getInvestmentDetails(currency);

  return (
    <React.Fragment>
      <Title>{t('investment.title', 'Investment')}</Title>
      <Typography component="p" variant="h4">
        {symbol}
        {amount.toLocaleString('en-GB')}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on {getFormattedDate()}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          {t('investment.viewInvestments', 'View Investments')}
        </Link>
      </div>
    </React.Fragment>
  );
}