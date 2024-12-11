import React from 'react';
import { Box, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';

interface AnalyticsPieChartProps {
  totalAmountAvailable: number;
  totalAmountInvested: number;
  paymentsMade: number | string;
}

interface DataItem {
  id: string;
  value: number;
  label: string;
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

  
  const available = totalAmountAvailable - totalAmountInvested;

  const data = [
    { id: 'Amount Invested', value: totalAmountInvested, label: `Invested: €${totalAmountInvested.toLocaleString()}` },
    { id: 'Banking Circle', value: totalAmountAvailable, label: `Banking Circle: €${totalAmountAvailable.toLocaleString()}` },
  ];

  const calculatePercentages = (data: DataItem[]): DataItem[] => {
    // Calculate the total value
    const total = data.reduce((sum, item) => sum + item.value, 0);
  
    // Map through the data and calculate percentage for each item
    return data.map((item) => {
      const percentage = ((item.value / total) * 100).toFixed(2); // Calculate percentage and fix to 2 decimal places
      return {
        ...item,
        label: `${item.label} (${percentage}%)`, // Append the percentage to the label
      };
    });
  };

  const updatedData = calculatePercentages(data);

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
              data: updatedData.map(({ id, value, label }) => ({
                id,
                value,
                label,
              })),
              innerRadius: 30,
              outerRadius: 100,
              paddingAngle: 5,
              cornerRadius: 5,
              startAngle: -45,
              endAngle: 360,
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