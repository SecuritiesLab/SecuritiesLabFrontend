import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, axisClasses } from '@mui/x-charts';
import { ChartsTextStyle } from '@mui/x-charts/ChartsText';
import Title from './Title';
import { useTranslation } from 'react-i18next';

interface MonthlyRevenueProps {
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
  createData('01.09.2023', 0.1),
  createData('01.10.2023', 3900.1),
  createData('01.11.2023', 7815.31),
  createData('01.12.2023', 11745.79),
  createData('01.01.2024', 15691.6),
  createData('01.02.2024', 19652.8),
  createData('01.03.2024', 23629.45),
  createData('01.04.2024', 27621.6),
  createData('01.05.2024', 31629.32),
  createData('01.06.2024', 35652.67),
  createData('01.07.2024', 39691.72),
  createData('01.08.2024', 43746.52),
  createData('01.09.2024', 47817.13),
  createData('01.10.2024',56410.54),
  createData('01.11.2024',65021.83),
  createData('01.12.2024',73649.59),
];

const currencySymbols = {
  EUR: '€',
  USD: '$',
  GBP: '£',
};

export default function MonthlyRevenue({ currency }: MonthlyRevenueProps) {
  const theme = useTheme();
  const { t } = useTranslation();
  const symbol = currencySymbols[currency];
  const currencyLabel = {
    EUR: 'Euros (€)',
    USD: 'Dollars ($)',
    GBP: 'Pounds (£)',
  }[currency];

  return (
    <React.Fragment>
      <Title>{t('monthlyRevenue.title', 'Monthly Revenue')} ({currency})</Title>
      <div style={{ width: '100%', flexGrow: 1, overflow: 'hidden' }}>
        <LineChart
          dataset={data}
          margin={{
            top: 16,
            right: 40,
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
              label: `${currencyLabel}`,
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
              color: 'lightblue',
              showMark: ({ index }) => index % 2 === 0,
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