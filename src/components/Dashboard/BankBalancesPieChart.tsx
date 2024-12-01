import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface BankBalancesPieChartProps {
  currency: 'EUR' | 'USD' | 'GBP';
}

const BankBalancesPieChart: React.FC<BankBalancesPieChartProps> = ({ currency }) => {
  // Currency symbols
  const currencySymbols = {
    EUR: '€',
    USD: '$',
    GBP: '£',
  };

  const symbol = currencySymbols[currency];

  // Bank accounts data
  const bankAccountsData = {
    EUR: [
      { id: 1, name: 'LHV Checking', balance: 120000, accountNumber: '0011223344', accountType: 'Checking', logo: 'https://cdn-logos.gocardless.com/ais/LHV_LHVBEE22.png' },
      { id: 2, name: 'Swedbank Savings', balance: 305000, accountNumber: '9988776655', accountType: 'Savings', logo: 'https://cdn-logos.gocardless.com/ais/SWEDBANK_SWEDNOKK.png' },
      { id: 3, name: 'Revolut Business', balance: 822817, accountNumber: '5566778899', accountType: 'Business', logo: 'https://storage.googleapis.com/gc-prd-institution_icons-production/UK/PNG/revolut.png' },
      { id: 4, name: 'Wise Startup', balance: 500000, accountNumber: '7766554433', accountType: 'Business', logo: 'https://storage.googleapis.com/gc-prd-institution_icons-production/UK/PNG/wise.png' },
      { id: 5, name: 'N26 Personal Vault', balance: 300000, accountNumber: '0099887766', accountType: 'Savings', logo: 'https://storage.googleapis.com/gc-prd-institution_icons-production/DE/PNG/n26.png' },
    ],
    USD: [
      { id: 1, name: 'HSBC Business', balance: 150000, accountNumber: '1122334455', accountType: 'Business', logo: 'https://storage.googleapis.com/gc-prd-institution_icons-production/UK/PNG/hsbcpersonal.png' },
      { id: 2, name: 'Wise Startup', balance: 50000, accountNumber: '6677889900', accountType: 'Personal', logo: 'https://storage.googleapis.com/gc-prd-institution_icons-production/UK/PNG/wise.png' },
    ],
    GBP: [
      { id: 1, name: 'HSBC Current', balance: 80000, accountNumber: '5566778899', accountType: 'Current', logo: 'https://storage.googleapis.com/gc-prd-institution_icons-production/UK/PNG/hsbcpersonal.png' },
      { id: 2, name: 'Barclays Savings', balance: 120000, accountNumber: '0099887766', accountType: 'Savings', logo: 'https://storage.googleapis.com/gc-prd-institution_icons-production/UK/PNG/barclayscorporate.png' },
    ],
  };

  const bankAccounts = bankAccountsData[currency];

  // Map data for the pie chart
  const data = bankAccounts.map((account) => ({
    id: account.name,
    value: account.balance,
    label: `${account.name} (${symbol}${account.balance.toLocaleString()})`,
  }));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: '#1e1e1e',
        borderRadius: 2,
        padding: 2,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: 'lightblue',
          textAlign: 'center',
        }}
      >
        Bank Balance Distribution ({currency})
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          marginLeft: 5,
        }}
      >
        <PieChart
          series={[
            {
              data,
              innerRadius: 0.5, // Donut-style chart
            },
          ]}
          width={window.innerWidth > 400 ? 300 : 200}
          height={window.innerWidth > 400 ? 300 : 200}
          tooltip={{
            trigger: 'item',
          }}
          slotProps={{
            legend: {
              hidden: true,
            },
          }}
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 5,
          }}
        />
      </Box>
    </Box>
  );
};

export default BankBalancesPieChart;