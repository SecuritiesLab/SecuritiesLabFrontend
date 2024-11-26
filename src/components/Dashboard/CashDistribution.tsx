import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const CashDistributionPieChart = () => {
  // Data for the pie chart
  const data = [
    { id: 'Cash Unused', value: 1000000, label: 'Cash Unused', color: '#4caf50' },
    { id: 'Investment', value: 1000000, label: 'Investment', color: '#2196f3' },
    { id: 'Yield', value: 47817, label: 'Yield', color: '#ff5722' },
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
        Cash Distribution
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
              data: data.map(({ id, value, label, color }) => ({
                id,
                value,
                label,
                color, // Individual colors for each slice
              })),
              innerRadius: 0.5, // Donut-style chart
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