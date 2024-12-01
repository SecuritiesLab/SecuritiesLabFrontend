import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { useTranslation } from 'react-i18next';

interface BalanceProps {
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

// Function to get dummy balance based on currency
function getBalance(currency: 'EUR' | 'USD' | 'GBP') {
  const balances = {
    EUR: 3047817,
    USD: 2097817,
    GBP: 1547817,
  };

  const symbols = {
    EUR: '€',
    USD: '$',
    GBP: '£',
  };

  return {
    balance: balances[currency],
    symbol: symbols[currency],
  };
}

export default function Balance({ currency }: BalanceProps) {
  const { t } = useTranslation();
  const { balance, symbol } = getBalance(currency);

  return (
    <React.Fragment>
      <Title>{t('balance.title')}</Title>
      <Typography component="p" variant="h4">
        {symbol}
        {balance.toLocaleString('en-GB')}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on {getFormattedDate()}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          {t('balance.viewBalance')}
        </Link>
      </div>
    </React.Fragment>
  );
}