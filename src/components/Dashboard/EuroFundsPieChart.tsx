import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const EuroFundsPieChart = () => {
  // MMF Funds Data
  const mmfFunds = [
    {
      id: 1,
      name: 'Fidelity ILF',
      sector: 'Money Market',
      yield: '4.5%',
      minInvestment: 5000,
      type: 'Fund',
      currency: 'EUR',
      logo: `${process.env.PUBLIC_URL}/logo/fidelityColor.png`,
      investment: 300000,
    },
    {
      id: 2,
      name: 'abrdn Liquidity Fund (Lux)',
      sector: 'Money Market',
      yield: '3.9%',
      minInvestment: 5000,
      type: 'Fund',
      currency: 'EUR',
      logo: `${process.env.PUBLIC_URL}/logo/abrdn.png`,
      investment: 500000,
    },
    {
      id: 3,
      name: 'BlackRock ICS Euro Government Liquidity Fund',
      sector: 'Money Market',
      yield: '4.0%',
      minInvestment: 5000,
      type: 'Fund',
      currency: 'EUR',
      logo: `${process.env.PUBLIC_URL}/logo/blackrock1.png`,
      investment: 200000,
    },
  ];

  // Map data for the pie chart
  const data = mmfFunds.map((fund) => ({
    id: fund.name,
    value: fund.investment,
    label: `${fund.name}`,
    logo: fund.logo,
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
       Investment Distribution
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          marginLeft: 5
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

export default EuroFundsPieChart;