import * as React from 'react';
import { Button, Link, Table, TableBody, TableCell, TableHead, TableRow, Box } from '@mui/material';
import Title from './Title';
import { useTranslation } from 'react-i18next';

interface CompanyStatementsProps {
  currency: 'EUR' | 'USD' | 'GBP';
}

const currencySymbols = {
  EUR: '€',
  USD: '$',
  GBP: '£',
};

// Generate Company Financial Statement Data
function createData(
  id: number,
  statementDate: string,
  department: number,
  revenue: number,
  expenses: number,
  netProfit: number,
  cashFlow: number,
) {
  return { id, statementDate, department, revenue, expenses, netProfit, cashFlow };
}

// Simulating monthly financial statements for a company
const rows = [
  createData(0, '1 Sep, 2023', 1000000, 0, 0.1, 0, 15000),
  createData(1, '1 Oct, 2023', 1003900, 4333.33, 433.33, 3900, 22000),
  createData(2, '1 Nov, 2023', 1007815.21, 4350.23, 435.02, 3915.21, 18000),
  createData(3, '1 Dec, 2023', 1011745.69, 4367.2, 436.72, 3930.48, 17500),
  createData(4, '1 Jan, 2024', 1015691.5, 4384.23, 438.42, 3945.81, 15000),
  createData(5, '1 Feb, 2024', 1019652.69, 4401.33, 440.13, 3961.2, 22000),
  createData(6, '1 Mar, 2024', 1023629.34, 4418.5, 441.85, 3976.65, 18000),
  createData(7, '1 Apr, 2024', 1027621.49, 4435.73, 443.57, 3992.15, 17500),
  createData(8, '1 May, 2024', 1031629.22, 4453.03, 445.3, 4007.72, 13000),
  createData(9, '1 Jun, 2024', 1035652.57, 4470.39, 447.03, 4023.35, 16000),
  createData(10, '1 Jul, 2024', 1039691.62, 4487.83, 448.78, 4039.05, 38000),
  createData(11, '1 Aug, 2024', 1043746.41, 4505.33, 450.53, 4054.8, 22000),
  createData(12, '1 Sep, 2024', 1047817.03, 4522.9, 452.29, 4070.61, 22000),
];

function exportToCSV(currency: 'EUR' | 'USD' | 'GBP') {
  const symbol = currencySymbols[currency];
  const csvRows = [
    ['Statement Date', 'Department', `Revenue (${symbol})`, `Expenses (${symbol})`, `Net Profit (${symbol})`, `Cash Flow (${symbol})`],
    ...rows.map((row) => [
      row.statementDate,
      row.department,
      row.revenue.toFixed(2),
      row.expenses.toFixed(2),
      row.netProfit.toFixed(2),
      row.cashFlow.toFixed(2),
    ]),
  ];

  const csvContent = csvRows.map((e) => e.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', `financial_statements_${currency}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function CompanyStatements({ currency }: CompanyStatementsProps) {
  const { t } = useTranslation();
  const symbol = currencySymbols[currency];

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Title>{t('companyStatements.title')}</Title>
        <Button variant="contained" color="primary" onClick={() => exportToCSV(currency)}>
          {t('companyStatements.exportCSV')}
        </Button>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>{t('companyStatements.columns.statementDate')}</TableCell>
            <TableCell>{t('companyStatements.columns.balance')} ({symbol})</TableCell>
            <TableCell align="right">{t('companyStatements.columns.yieldGenerated')} ({symbol})</TableCell>
            <TableCell align="right">{t('companyStatements.columns.fees')} ({symbol})</TableCell>
            <TableCell align="right">{t('companyStatements.columns.netYield')} ({symbol})</TableCell>
            <TableCell align="right">{t('companyStatements.columns.yieldPercentage')} ({symbol})</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.statementDate}</TableCell>
              <TableCell>{row.department.toLocaleString()}</TableCell>
              <TableCell align="right">{row.revenue.toLocaleString()}</TableCell>
              <TableCell align="right">{row.expenses.toLocaleString()}</TableCell>
              <TableCell align="right">{row.netProfit.toLocaleString()}</TableCell>
              <TableCell align="right">{row.cashFlow.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        {t('companyStatements.seeMore')}
      </Link>
    </React.Fragment>
  );
}