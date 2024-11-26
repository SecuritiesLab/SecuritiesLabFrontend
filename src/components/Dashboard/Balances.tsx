import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, axisClasses } from '@mui/x-charts';
import { ChartsTextStyle } from '@mui/x-charts/ChartsText';
import Title from './Title';

interface BalancesProps {
  currency: 'EUR' | 'USD' | 'GBP';
}

// Generate Sales Data
function createData(
  time: string,
  amount?: number,
): { time: string; amount: number | null } {
  return { time, amount: amount ?? null };
}

const data = [
  createData('01.08.2023', 0),
  createData('01.09.2023', 1000000.0),
  createData('01.10.2023', 1003900.0),
  createData('01.11.2023', 1007815.21),
  createData('01.12.2023', 1011745.69),
  createData('01.01.2024', 1015691.5),
  createData('01.02.2024', 1019652.69),
  createData('01.03.2024', 1023629.34),
  createData('01.04.2024', 1027621.49),
  createData('01.05.2024', 1031629.22),
  createData('01.06.2024', 1035652.57),
  createData('01.07.2024', 1039691.62),
  createData('01.08.2024', 1043746.41),
  createData('01.09.2024', 1047817.03),
  createData('01.10.2024'),
];

export default function Balances({ currency }: BalancesProps) {
  const theme = useTheme();

  // Determine currency label based on the prop
  const currencyLabel = {
    EUR: 'Euros (€)',
    USD: 'Dollars ($)',
    GBP: 'Pounds (£)',
  }[currency];

  return (
    <React.Fragment>
      <Title>Balances ({currencyLabel})</Title>
      <div style={{ width: '100%', flexGrow: 1, overflow: 'hidden' }}>
        <LineChart
          dataset={data}
          margin={{
            top: 16,
            right: 20,
            left: 90,
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
              label: currencyLabel,
              labelStyle: {
                ...(theme.typography.body1 as ChartsTextStyle),
                fill: theme.palette.text.primary,
                transform: 'rotate(-90deg) translate(-50px, -70%)', 
                textAnchor: 'middle', // Centers the text
              },
              tickLabelStyle: theme.typography.body2 as ChartsTextStyle,
              max: 1100000,
              tickNumber: 3
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