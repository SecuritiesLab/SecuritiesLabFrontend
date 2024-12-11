import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface InvestmentDistributionPieChartProps {
  currency: 'EUR' | 'USD' | 'GBP';
}

const InvestmentDistributionPieChart: React.FC<InvestmentDistributionPieChartProps> = ({ currency }) => {
  // Funds Data
  const fundsData = {
    EUR: [
      {
        id: 1,
        name: 'Fidelity ILF - The Euro Fund (30%)',
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
        name: 'abrdn Liquidity Fund (Lux) - Euro Fund (50%)',
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
        name: 'BlackRock ICS Euro Government Liquidity Fund (20%)',
        sector: 'Money Market',
        yield: '4.0%',
        minInvestment: 5000,
        type: 'Fund',
        currency: 'EUR',
        logo: `${process.env.PUBLIC_URL}/logo/blackrock1.png`,
        investment: 200000,
      },
    ],
    USD: [
      {
        id: 1,
        name: 'Fidelity ILF - The United States Dollar Fund (40%)',
        sector: 'Money Market',
        yield: '5.1%',
        minInvestment: 5000,
        type: 'Fund',
        currency: 'USD',
        logo: `${process.env.PUBLIC_URL}/logo/fidelityColor.png`,
        investment: 400000,
      },
      {
        id: 2,
        name: 'abrdn Liquidity Fund (Lux) - US Dollar Fund (30%)',
        sector: 'Money Market',
        yield: '4.8%',
        minInvestment: 5000,
        type: 'Fund',
        currency: 'USD',
        logo: `${process.env.PUBLIC_URL}/logo/abrdn.png`,
        investment: 300000,
      },
      {
        id: 3,
        name: 'BlackRock ICS US Treasury Fund (30%)',
        sector: 'Money Market',
        yield: '5.0%',
        minInvestment: 5000,
        type: 'Fund',
        currency: 'USD',
        logo: `${process.env.PUBLIC_URL}/logo/blackrock1.png`,
        investment: 300000,
      },
    ],
    GBP: [
      {
        id: 1,
        name: 'Fidelity ILF - The Sterling Fund (35%)',
        sector: 'Money Market',
        yield: '4.3%',
        minInvestment: 5000,
        type: 'Fund',
        currency: 'GBP',
        logo: `${process.env.PUBLIC_URL}/logo/fidelityColor.png`,
        investment: 350000,
      },
      {
        id: 2,
        name: 'abrdn Liquidity Fund (Lux) - Sterling Fund (40%)',
        sector: 'Money Market',
        yield: '3.7%',
        minInvestment: 5000,
        type: 'Fund',
        currency: 'GBP',
        logo: `${process.env.PUBLIC_URL}/logo/abrdn.png`,
        investment: 400000,
      },
      {
        id: 3,
        name: 'BlackRock ICS Sterling Government Liquidity Fund (25%)',
        sector: 'Money Market',
        yield: '4.1%',
        minInvestment: 5000,
        type: 'Fund',
        currency: 'GBP',
        logo: `${process.env.PUBLIC_URL}/logo/blackrock1.png`,
        investment: 250000,
      },
    ],
  };

  const funds = fundsData[currency];

  // Map data for the pie chart
  const data = funds.map((fund) => ({
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
        Investment Distribution ({currency})
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
              innerRadius: 30,
              outerRadius: 100,
              paddingAngle: 5,
              cornerRadius: 5,
              startAngle: -45,
              endAngle: 360,
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

export default InvestmentDistributionPieChart;