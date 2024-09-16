import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, axisClasses } from '@mui/x-charts';
import { ChartsTextStyle } from '@mui/x-charts/ChartsText';
import Title from './Title';

// Generate Sales Data
function createData(
  time: string,
  amount?: number,
): { time: string; amount: number | null } {
  return { time, amount: amount ?? null };
}

const data = [
  createData('01.08.2023', 0),
  createData('01.09.2023', 0.1),
  createData('01.10.2023', 3900.1),
  createData('01.11.2023', 7815.31),
  createData('01.12.2023', 11745.79),
  createData('01.01.2024', 15691.60),
  createData('01.02.2024', 19652.80),
  createData('01.03.2024', 23629.45),
  createData('01.04.2024', 27621.60),
  createData('01.05.2024', 31629.32),
  createData('01.06.2024', 35652.67),
  createData('01.07.2024', 39691.72),
  createData('01.08.2024', 43746.52),
  createData('01.09.2024', 47817.13),
  createData('01.10.2024'),
];

export default function MonthlyRevenue() {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>Monthly Revenue</Title>
      <div style={{ width: '100%', flexGrow: 1, overflow: 'hidden' }}>
        <LineChart
          dataset={data}
          margin={{
            top: 16,
            right: 20,
            left: 70,
            bottom: 30,
          }}
          xAxis={[
            {
              scaleType: 'point',
              dataKey: 'time',
              tickNumber: 2,
              tickLabelStyle: theme.typography.body2 as ChartsTextStyle,
            },
          ]}
          yAxis={[
            {
              label: 'Euros',
              labelStyle: {
                ...(theme.typography.body1 as ChartsTextStyle),
                fill: theme.palette.text.primary,
              },
              tickLabelStyle: theme.typography.body2 as ChartsTextStyle,
              max: 50000,
              tickNumber: 3,
            },
          ]}
          series={[
            {
              dataKey: 'amount',
              showMark: false,
              color: theme.palette.primary.light,
            },
          ]}
          sx={{
            [`.${axisClasses.root} line`]: { stroke: theme.palette.text.secondary },
            [`.${axisClasses.root} text`]: { fill: theme.palette.text.secondary },
            [`& .${axisClasses.left} .${axisClasses.label}`]: {
              transform: 'translateX(-25px)',
            },
          }}
        />
      </div>
    </React.Fragment>
  );
}