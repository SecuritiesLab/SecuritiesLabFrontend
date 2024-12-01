import React from 'react';
import { Box, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';

interface AnalyticsPieChartProps {
  totalAmountAvailable: number;
  totalAmountInvested: number;
  paymentsMade: number | string;
}

const AnalyticsPieChart: React.FC<AnalyticsPieChartProps> = ({
  totalAmountAvailable,
  totalAmountInvested,
  paymentsMade,
}) => {

  const parseAmount = (value: number | string): number => {
    if (typeof value === 'string') {
      return parseFloat(value.replace(/,/g, '')); // Remove commas and parse as float
    }
    return value;
  };

  const paymentsMadeNumber = parseAmount(paymentsMade)

  
  const difference = totalAmountAvailable - paymentsMadeNumber - totalAmountInvested;

  const data = [
    { id: 'Amount Invested', value: totalAmountInvested, label: `Invested: €${totalAmountInvested.toLocaleString()}` },
    { id: 'Payments Made', value: paymentsMadeNumber, label: `Payments: €${paymentsMadeNumber.toLocaleString()}` },
    { id: 'Unused', value: difference, label: `Unused: €${difference.toLocaleString()}` },
  ];

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
        Financial Overview
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          marginLeft:10,
        }}
      >
        <PieChart
          series={[
            {
              data: data.map(({ id, value, label }) => ({
                id,
                value,
                label,
              })),
              innerRadius: 0.5, // Donut-style chart
            },
          ]}
          width={250} // Consistent chart width
          height={250} // Consistent chart height
          tooltip={{
            trigger: 'item',
          }}
          slotProps={{
            legend: {
              hidden: true, // Hide the legend
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default AnalyticsPieChart;