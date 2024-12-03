import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface CashDistributionPieChartProps {
  currency: 'EUR' | 'USD' | 'GBP';
}

const CashDistributionPieChart: React.FC<CashDistributionPieChartProps> = ({ currency }) => {
  // Currency symbols
  const currencySymbols = {
    EUR: '€',
    USD: '$',
    GBP: '£',
  };

  const symbol = currencySymbols[currency];

  // Data for the pie chart
  const data = {
    EUR:[
    { id: 'Cash Unused', value: 2000000, label: `Cash Unused (${symbol}2,000,000)`, color: '#4caf50' },
    { id: 'Investment', value: 1000000, label: `Investment (${symbol}1,000,000)`, color: '#2196f3' },
    { id: 'Yield', value: 47817, label: `Yield (${symbol}47,817)`, color: '#ff5722' },
  ],
    USD:[
      { id: 'Cash Unused', value: 1050000, label: `Cash Unused (${symbol}1,000,000)`, color: '#4caf50' },
      { id: 'Investment', value: 1000000, label: `Investment (${symbol}1,000,000)`, color: '#2196f3' },
      { id: 'Yield', value: 47817, label: `Yield (${symbol}47,817)`, color: '#ff5722' },
    ],
    GBP:[
      { id: 'Cash Unused', value: 500000, label: `Cash Unused (${symbol}1,000,000)`, color: '#4caf50' },
      { id: 'Investment', value: 1000000, label: `Investment (${symbol}1,000,000)`, color: '#2196f3' },
      { id: 'Yield', value: 47817, label: `Yield (${symbol}47,817)`, color: '#ff5722' },
    ]};

    const filteredData = data[currency]

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
        Cash Distribution ({currency})
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
              data: filteredData.map(({ id, value, label, color }) => ({
                id,
                value,
                label,
                color, // Individual colors for each slice
              })),
              innerRadius: 30,
              outerRadius: 100,
              paddingAngle: 5,
              cornerRadius: 5,
              startAngle: -45,
              endAngle: 360,
            },
          ]}
          width={window.innerWidth > 400 ? 300 : 200} // Adjust width based on screen size
          height={window.innerWidth > 400 ? 300 : 200} // Properly size the chart height
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

export default CashDistributionPieChart;