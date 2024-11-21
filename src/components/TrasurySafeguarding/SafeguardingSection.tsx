import React, { useState } from 'react';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Card, Grid, Divider, CardContent, TextField, MenuItem } from '@mui/material';
import { SectionProps } from '../../screens/TreasurySafeguarding/TreasurySafeguardingPage';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import { jsPDF } from 'jspdf';
import AnalyticsPieChart from '../Dashboard/SafeguardingAnalyticsPieChart';

const currencyOptions = ['EUR', 'USD', 'GBP'];
const monthOptions = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
  ];
const yearOptions = ['2023', '2024']; // Add more years as needed

const banks = [
    { name: 'Banking Circle Master EURO', balance: '€3,000,000', currency : "EUR", account: '****3344', logo: `${process.env.PUBLIC_URL}/logo/BankingCircle.png` },
    { name: 'Banking Circle Master USD', balance: '$1,000,000', currency : "USD", account: '****6655', logo: `${process.env.PUBLIC_URL}/logo/BankingCircle.png` },
    { name: 'Banking Circle Master GBP', balance: '£1,500,000', currency: "GBP", account: '****8899', logo: `${process.env.PUBLIC_URL}/logo/BankingCircle.png` },
]

const SafeguardingSection: React.FC<SectionProps> = ({ funds, handleInvestClick, handleRedeemClick }) => {
  const [selectedCurrency, setSelectedCurrency] = useState('EUR');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const downloadCSV = (data: Array<{ [key: string]: string | number }>, filename: string) => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, filename);
  };
  
  // PDF Download
  const downloadPDF = (title: string, data: Array<{ [key: string]: string | number }>) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(title, 10, 10);
    doc.setFontSize(12);
  
    data.forEach((item, index) => {
      const y = 20 + index * 10;
      doc.text(`${Object.values(item).join(' | ')}`, 10, y);
    });
  
    doc.save(`${title}.pdf`);
  };

  const orderHistory = [
    { id: 1, date: '2023-08-15', fundName: 'BlackRock ICS Euro Government Liquidity Fund', action: 'Invested', amount: 100000, currency: 'EUR' },
    { id: 2, date: '2023-09-10', fundName: 'Fidelity ILF - The United States Dollar Fund', action: 'Redeemed', amount: 200000, currency: 'USD' },
    { id: 3, date: '2023-10-12', fundName: 'Fidelity ILF - The Sterling Fund', action: 'Invested', amount: 300000, currency: 'GBP' },
    { id: 4, date: '2023-11-05', fundName: 'abrdn Liquidity Fund (Lux) - Euro Fund', action: 'Invested', amount: 200000, currency: 'EUR' },
    { id: 5, date: '2023-12-20', fundName: 'BlackRock ICS US Treasury Fund', action: 'Redeemed', amount: 350000, currency: 'USD' },
    { id: 6, date: '2024-01-10', fundName: 'Fidelity ILF - The Euro Fund', action: 'Invested', amount: 300000, currency: 'EUR' },
    { id: 7, date: '2024-02-15', fundName: 'Fidelity ILF - The United States Dollar Fund', action: 'Redeemed', amount: 300000, currency: 'USD' },
    { id: 8, date: '2024-03-20', fundName: 'Fidelity ILF - The Sterling Fund', action: 'Invested', amount: 400000, currency: 'GBP' },
    { id: 9, date: '2024-04-05', fundName: 'abrdn Liquidity Fund (Lux) - US Dollar Fund', action: 'Invested', amount: 200000, currency: 'USD' },
    { id: 10, date: '2024-05-12', fundName: 'abrdn Liquidity Fund (Lux) - Sterling Fund', action: 'Redeemed', amount: 150000, currency: 'GBP' },
    { id: 11, date: '2024-06-18', fundName: 'abrdn Liquidity Fund (Lux) - Euro Fund', action: 'Invested', amount: 600000, currency: 'EUR' },
    { id: 12, date: '2024-07-25', fundName: 'BlackRock ICS US Treasury Fund', action: 'Invested', amount: 300000, currency: 'USD' },
    { id: 13, date: '2024-08-30', fundName: 'BlackRock ICS Euro Government Liquidity Fund', action: 'Redeemed', amount: 400000, currency: 'EUR' },
    { id: 14, date: '2024-09-14', fundName: 'BlackRock ICS Sterling Government Liquidity Fund', action: 'Invested', amount: 350000, currency: 'GBP' },
    { id: 15, date: '2024-10-02', fundName: 'Fidelity ILF - The United States Dollar Fund', action: 'Redeemed', amount: 150000, currency: 'USD' },
    { id: 16, date: '2024-11-05', fundName: 'Fidelity ILF - The Euro Fund', action: 'Invested', amount: 250000, currency: 'EUR' },
  ];
  
 
  const yieldHistory = [
    { id: 1, date: '2023-08-18', fundName: 'BlackRock ICS Euro Government Liquidity Fund', yieldAmount: '4,200 EUR', currency: 'EUR' },
    { id: 2, date: '2023-09-14', fundName: 'Fidelity ILF - The United States Dollar Fund', yieldAmount: '6,500 USD', currency: 'USD' },
    { id: 3, date: '2023-10-20', fundName: 'Fidelity ILF - The Sterling Fund', yieldAmount: '3,800 GBP', currency: 'GBP' },
    { id: 4, date: '2023-11-10', fundName: 'abrdn Liquidity Fund (Lux) - Euro Fund', yieldAmount: '4,700 EUR', currency: 'EUR' },
    { id: 5, date: '2023-12-24', fundName: 'BlackRock ICS US Treasury Fund', yieldAmount: '5,900 USD', currency: 'USD' },
    { id: 6, date: '2024-01-15', fundName: 'Fidelity ILF - The Euro Fund', yieldAmount: '7,100 EUR', currency: 'EUR' },
    { id: 7, date: '2024-02-12', fundName: 'Fidelity ILF - The United States Dollar Fund', yieldAmount: '6,200 USD', currency: 'USD' },
    { id: 8, date: '2024-03-18', fundName: 'Fidelity ILF - The Sterling Fund', yieldAmount: '4,300 GBP', currency: 'GBP' },
    { id: 9, date: '2024-04-08', fundName: 'abrdn Liquidity Fund (Lux) - US Dollar Fund', yieldAmount: '5,800 USD', currency: 'USD' },
    { id: 10, date: '2024-05-14', fundName: 'abrdn Liquidity Fund (Lux) - Sterling Fund', yieldAmount: '3,600 GBP', currency: 'GBP' },
    { id: 11, date: '2024-06-21', fundName: 'abrdn Liquidity Fund (Lux) - Euro Fund', yieldAmount: '4,500 EUR', currency: 'EUR' },
    { id: 12, date: '2024-07-27', fundName: 'BlackRock ICS US Treasury Fund', yieldAmount: '6,300 USD', currency: 'USD' },
    { id: 13, date: '2024-08-22', fundName: 'BlackRock ICS Euro Government Liquidity Fund', yieldAmount: '4,800 EUR', currency: 'EUR' },
    { id: 14, date: '2024-09-13', fundName: 'BlackRock ICS Sterling Government Liquidity Fund', yieldAmount: '3,700 GBP', currency: 'GBP' },
    { id: 15, date: '2024-10-06', fundName: 'abrdn Liquidity Fund (Lux) - Euro Fund', yieldAmount: '4,100 EUR', currency: 'EUR' },
    { id: 16, date: '2024-11-10', fundName: 'Fidelity ILF - The Euro Fund', yieldAmount: '7,200 EUR', currency: 'EUR' },
  ];

  // Filtered data based on currency, month, and year
  const filteredOrderHistory = orderHistory.filter((entry) => {
    return (
      (selectedCurrency === '' || entry.currency === selectedCurrency) &&
      (selectedMonth === '' || entry.date.slice(5, 7) === selectedMonth) &&
      (selectedYear === '' || entry.date.slice(0, 4) === selectedYear)
    );
  });

  const filteredYieldHistory = yieldHistory.filter((entry) => {
    return (
      (selectedCurrency === '' || entry.currency === selectedCurrency) &&
      (selectedMonth === '' || entry.date.slice(5, 7) === selectedMonth) &&
      (selectedYear === '' || entry.date.slice(0, 4) === selectedYear)
    );
  });

  const filterFunds = funds.filter(fund =>{ return (selectedCurrency === '' || fund.currency === selectedCurrency)})

  const calculateAnalyticsData = () => {
    const filteredData = orderHistory.filter((entry) => {
      return (
        (selectedCurrency === '' || entry.currency === selectedCurrency) &&
        (selectedMonth === '' || entry.date.slice(5, 7) === selectedMonth) &&
        (selectedYear === '' || entry.date.slice(0, 4) === selectedYear)
      );
    });

    const bankForCurrency = banks.find(bank => bank.currency === selectedCurrency);
    const totalAmountAvailable = bankForCurrency ? parseFloat(bankForCurrency.balance.replace(/[^0-9.-]+/g, "")) : 0;

    const totalAmountInvested = filteredData
      .filter((entry) => entry.action === 'Invested')
      .reduce((acc, entry) => acc + entry.amount, 0);

    const totalAmountRedeemed = filteredData
      .filter((entry) => entry.action === 'Redeemed')
      .reduce((acc, entry) => acc + entry.amount, 0);

    const totalYieldEarned = filteredYieldHistory
    .filter((entry) => entry.currency === selectedCurrency)
    .reduce((total, entry) => total + parseFloat(entry.yieldAmount.replace(/[^0-9.]/g, '')), 0);

    const totalAmountSafeguarded = totalAmountInvested + (totalAmountAvailable - totalAmountInvested)/2


    return {
      totalAmountAvailable: `${totalAmountAvailable.toLocaleString()} ${selectedCurrency}`,
      totalAmountInvested: `${totalAmountInvested.toLocaleString()} ${selectedCurrency}`,
      totalAmountRedeemed: `${totalAmountRedeemed.toLocaleString()} ${selectedCurrency}`,
      totalYieldEarned: `${totalYieldEarned.toLocaleString()} ${selectedCurrency}`,
      totalAmountSafeguarded:`${totalAmountSafeguarded.toLocaleString()} ${selectedCurrency}`
    };
  };


  const analyticsData = calculateAnalyticsData();

  const calculateEarnings = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1; // Months are 0-based in JavaScript
    const currentDate = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD
  
    const earningsSinceInception = yieldHistory
      .filter((entry) => entry.currency === selectedCurrency)
      .reduce((total, entry) => total + parseFloat(entry.yieldAmount.replace(/[^0-9.]/g, '')), 0);
  
    const earningsThisYear = yieldHistory
      .filter((entry) => {
        const entryYear = new Date(entry.date).getFullYear();
        return entry.currency === selectedCurrency && entryYear === currentYear;
      })
      .reduce((total, entry) => total + parseFloat(entry.yieldAmount.replace(/[^0-9.]/g, '')), 0);
  
    const earningsThisMonth = yieldHistory
      .filter((entry) => {
        const entryDate = new Date(entry.date);
        const entryYear = entryDate.getFullYear();
        const entryMonth = entryDate.getMonth() + 1;
        return (
          entry.currency === selectedCurrency &&
          entryYear === currentYear &&
          entryMonth === currentMonth
        );
      })
      .reduce((total, entry) => total + parseFloat(entry.yieldAmount.replace(/[^0-9.]/g, '')), 0);
  
    const earningsToday = yieldHistory
      .filter((entry) => entry.currency === selectedCurrency && entry.date === currentDate)
      .reduce((total, entry) => total + parseFloat(entry.yieldAmount.replace(/[^0-9.]/g, '')), 0);
  
    // Return data in the required format
    return [
      { Label: 'Earnings Since Inception', Value: earningsSinceInception },
      { Label: 'Earnings This Year', Value: earningsThisYear },
      { Label: 'Earnings This Month', Value: earningsThisMonth },
      { Label: 'Earnings Today', Value: earningsToday },
    ];
  };
  
  const historicalEarningsData = calculateEarnings();

  const paymentsDone = () => {
    const bankForCurrency = banks.find(bank => bank.currency === selectedCurrency);
    const totalAmountAvailable = bankForCurrency ? parseFloat(bankForCurrency.balance.replace(/[^0-9.-]+/g, "")) : 0;

    return {
      paymentsThisYear : Math.round(totalAmountAvailable * 0.33),
      paymentsThisMonth: Math.round(totalAmountAvailable/12 * 0.33 ),
      paymentsThisWeek: Math.round(totalAmountAvailable/84) ,
      paymentsToday: Math.round(totalAmountAvailable/365 )
    };
  }

  const paymentsDoneData = paymentsDone();

  
  return (
    <Box sx={{ display: 'flex', minHeight: '50vh',flexDirection: { xs: 'column', lg: 'row' }, }}>
    <Box sx={{ flex: 1, padding: 2, marginRight: { lg: '320px' }, mb: { xs: 3, lg: 0 }}}>
    <Box
  sx={{
    border: '1px solid #4a4a4a',
    borderRadius: 2,
    borderWidth: 2,
    padding: 3,
    display: 'flex',
    overflowX: 'auto', // Enables horizontal scroll
    marginBottom: 4,
    minWidth: 200,
      minHeight: 200, // Ensure consistent height
  }}
>
  {/* Add Account Card */}
  <Card
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 2,
      cursor: 'pointer',
      backgroundColor: 'lightblue',
      borderRadius: 2,
      minWidth: 200,
      minHeight: 200, // Ensure consistent height
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    }}
  >
    <Typography variant="h6" color="black" textAlign="center">
      + Add Account
    </Typography>
  </Card>

  {/* Bank Accounts */}
  {banks.map((account) => (
    <Card
      key={account.name}
      sx={{
        minWidth: 200,
        minHeight: 200, // Ensure consistent height
        marginRight: 2,
        cursor: 'pointer',
        backgroundColor: '#ffffff',
        color: '#000000',
        display: 'flex',
        flexDirection: 'column', // Stack logo on top of text
        alignItems: 'center', // Center both logo and text
        padding: 2,
        borderRadius: 2,
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Consistent shadow
      }}
    >
      <Box sx={{ marginBottom: 1 }}>
        <img
          src={account.logo}
          alt={`${account.name} logo`}
          style={{
            width: 60,
            height: 60,
            objectFit: 'contain',
          }}
        />
      </Box>
      <CardContent sx={{ textAlign: 'center', padding: 0 }}>
        <Typography variant="h6" noWrap>
          {account.name}
        </Typography>
        <Typography variant="body2">
          Balance: {account.balance}
        </Typography>
        <Typography variant="body2">
          Account: {account.account}
        </Typography>
      </CardContent>
    </Card>
  ))}
</Box>

      {/* Currency and Date Filters */}
      <Grid container spacing={2} sx={{ marginBottom: 2 }}>
        <Grid item xs={4}>
          <TextField
            select
            label="Currency"
            fullWidth
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
          >
            {currencyOptions.map((currency) => (
              <MenuItem key={currency} value={currency}>
                {currency}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={4}>
          <TextField
            select
            label="Month"
            fullWidth
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {monthOptions.map((month) => (
              <MenuItem key={month.value} value={month.value}>
                {month.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={4}>
          <TextField
            select
            label="Year"
            fullWidth
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {yearOptions.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>

      {/* Funds List */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              border: '1px solid #4a4a4a',
              borderRadius: 2,
              padding: 2,
              backgroundColor: '#1e1e1e',
              height: 500,
              overflowY: 'auto'
            }}
          >
            {filterFunds.map((fund) => (
              <Card key={fund.id} sx={{ marginBottom: 2, padding: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', minWidth: '70%' }}>
                    <img
                      src={fund.logo}
                      alt={`${fund.name} logo`}
                      style={{ width: '80px', height: '80px', marginRight: '24px', objectFit: 'contain' }}
                    />
                    <Box>
                      <Typography variant="h6">{fund.name}</Typography>
                      <Typography variant="body2">
                        Sector: {fund.sector} | Yield: {fund.yield} | Minimum Investment: €{fund.minInvestment}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ minWidth: '30%' }}>
                    <Button variant="contained" sx={{ marginRight: 1, marginBottom:1 }} onClick={() => handleInvestClick(fund)}>Invest</Button>
                    <Button variant="outlined" onClick={() => handleRedeemClick(fund)}>Redeem</Button>
                  </Box>
                </Box>
              </Card>
            ))}
          </Box>
        </Grid>

        {/* Analytics */}
        <Grid item xs={12} md={6}>
          <Box sx={{ border: '1px solid #4a4a4a', borderRadius: 2, padding: 2, backgroundColor: '#1e1e1e', height: 500, overflowY: 'auto' }}>
            <Typography variant="h6" sx={{ color: 'lightblue', display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              Analytics
              <Box>
              <Button onClick={() => downloadCSV([analyticsData], 'Analytics.csv')}>CSV</Button>
              <Button onClick={() => downloadPDF('Analytics', [analyticsData])}>PDF</Button>
              </Box>
              </Typography>
              
            <Divider sx={{ my: 1, backgroundColor: 'lightblue' }} />
            <Grid container spacing={2} sx={{ marginTop: 2 }}>
              <Grid item xs={6}>
                <Box sx={{ padding: 2, backgroundColor: '#2e2e2e', borderRadius: 1 }}>
                  <Typography variant="subtitle1" color="lightgray">Total Amount Available</Typography>
                  <Typography variant="h6" sx={{ color: 'lightblue' }}>{analyticsData.totalAmountAvailable}</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ padding: 2, backgroundColor: '#2e2e2e', borderRadius: 1 }}>
                  <Typography variant="subtitle1" color="lightgray">Total Amount Invested</Typography>
                  <Typography variant="h6" sx={{ color: 'lightblue' }}>{analyticsData.totalAmountInvested}</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ padding: 2, backgroundColor: '#2e2e2e', borderRadius: 1 }}>
                  <Typography variant="subtitle1" color="lightgray">Total Yield Earned</Typography>
                  <Typography variant="h6" sx={{ color: 'lightblue' }}>{analyticsData.totalYieldEarned}</Typography>
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6} sx={{paddingTop: 5}}>
  <AnalyticsPieChart
    totalAmountAvailable={parseFloat(analyticsData.totalAmountAvailable.replace(/[^0-9.-]+/g, ''))}
    totalAmountInvested={parseFloat(analyticsData.totalAmountInvested.replace(/[^0-9.-]+/g, ''))}
    paymentsMade={paymentsDoneData.paymentsThisYear}
  />
</Grid>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ border: '1px solid #4a4a4a', borderRadius: 2, padding: 3, backgroundColor: '#1e1e1e', mt: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ color: 'lightblue', display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          Payments Done
        <Box>
                <Button onClick={() => downloadCSV(historicalEarningsData, 'historicalEarningsData.csv')}>CSV</Button>
                <Button onClick={() => downloadPDF('historicalEarningsData', historicalEarningsData)}>PDF</Button>
              </Box>
        </Typography>
        <Divider sx={{ my: 1, backgroundColor: 'lightblue' }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 2 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="subtitle1" color="lightgray">Payments This Year</Typography>
              <Typography variant="h6" sx={{ color: 'lightblue' }}>{paymentsDoneData.paymentsThisYear}</Typography>
            </Box>
            <Box  sx={{ textAlign: 'center' }}>
            <Typography variant="subtitle1" color="lightgray">Payments This Month</Typography>
            <Typography variant="h6" sx={{ color: 'lightblue' }}>{paymentsDoneData.paymentsThisMonth}</Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
          <Typography variant="subtitle1" color="lightgray">Payments This Week</Typography>
          <Typography variant="h6" sx={{ color: 'lightblue' }}>{paymentsDoneData.paymentsThisWeek}</Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="subtitle1" color="lightgray">Payments Today</Typography>
          <Typography variant="h6" sx={{ color: 'lightblue' }}>{paymentsDoneData.paymentsToday}</Typography>
        </Box>
        </Box>
      </Box>

      <Box sx={{ border: '1px solid #4a4a4a', borderRadius: 2, padding: 3, backgroundColor: '#1e1e1e', mt: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ color: 'lightblue', display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          Historical Earnings
        <Box>
                <Button onClick={() => downloadCSV(historicalEarningsData, 'historicalEarningsData.csv')}>CSV</Button>
                <Button onClick={() => downloadPDF('historicalEarningsData', historicalEarningsData)}>PDF</Button>
              </Box>
        </Typography>
        <Divider sx={{ my: 1, backgroundColor: 'lightblue' }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 2 }}>
          {historicalEarningsData.map((item, index) => (
            <Box key={index} sx={{ textAlign: 'center' }}>
              <Typography variant="subtitle1" color="lightgray">{item.Label}</Typography>
              <Typography variant="h6" sx={{ color: 'lightblue' }}>{item.Value} {selectedCurrency }</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Order and Yield History */}
      <Grid container spacing={2} sx={{ marginTop: 3 }}>
  {/* Order History */}
  <Grid item xs={12} md={6}>
    <Box sx={{ border: '1px solid #4a4a4a', borderRadius: 2, padding: 2 }}>
      <Typography variant="h6" sx={{ color: 'lightblue', display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>Order History
      <Box>
      <Button onClick={() => downloadCSV(filteredOrderHistory, 'Order_history.csv')}>CSV</Button>
      <Button onClick={() => downloadPDF('Order_history', filteredOrderHistory)}>PDF</Button>
      </Box>
      </Typography>
      <Divider sx={{ my: 1, backgroundColor: 'lightblue' }} />
      <TableContainer component={Paper} sx={{ maxHeight: 300, overflowY: 'auto' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Fund</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrderHistory.map((txn) => (
              <TableRow key={txn.id}>
                <TableCell>{txn.date}</TableCell>
                <TableCell>{txn.fundName}</TableCell>
                <TableCell>{txn.action}</TableCell>
                <TableCell>{txn.amount} {txn.currency}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  </Grid>

  {/* Yield History */}
  <Grid item xs={12} md={6}>
    <Box sx={{ border: '1px solid #4a4a4a', borderRadius: 2, padding: 2 }}>
      <Typography variant="h6" sx={{ color: 'lightblue', display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        Yield History
        <Box>
      <Button onClick={() => downloadCSV(filteredYieldHistory, 'Yeild_history.csv')}>CSV</Button>
      <Button onClick={() => downloadPDF('Yeild_history', filteredYieldHistory)}>PDF</Button>
      </Box>
      </Typography>
      <Divider sx={{ my: 1, backgroundColor: 'lightblue' }} />
      <TableContainer component={Paper} sx={{ maxHeight: 300, overflowY: 'auto' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Fund</TableCell>
              <TableCell>Yield</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredYieldHistory.map((yieldData) => (
              <TableRow key={yieldData.id}>
                <TableCell>{yieldData.date}</TableCell>
                <TableCell>{yieldData.fundName}</TableCell>
                <TableCell>{yieldData.yieldAmount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  </Grid>
</Grid>
</Box>
    </Box>
  
  );
};

export default SafeguardingSection;