import React, { useState } from 'react';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Card, Grid, Divider, CardContent, TextField, MenuItem } from '@mui/material';
import { SectionProps } from '../../screens/TreasurySafeguarding/TreasurySafeguardingPage';

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
    { name: 'Banking Circle Master EURO', balance: '€3,000,000', currency : "EUR", account: '****3344', logo: 'https://cdn-logos.gocardless.com/ais/LHV_LHVBEE22.png' },
    { name: 'Banking Circle Master USD', balance: '$1,000,000', currency : "USD", account: '****6655', logo: 'https://cdn-logos.gocardless.com/ais/LHV_LHVBEE22.png' },
    { name: 'Banking Circle Master GBP', balance: '£1,500,000', currency: "GBP", account: '****8899', logo: 'https://cdn-logos.gocardless.com/ais/LHV_LHVBEE22.png' },
]

const SafeguardingSection: React.FC<SectionProps> = ({ funds, handleInvestClick, handleRedeemClick }) => {
  const [selectedCurrency, setSelectedCurrency] = useState('EUR');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

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
    { id: 1, date: '2023-08-18', fundName: 'BlackRock ICS Euro Government Liquidity Fund', yield: '4.0%', currency: 'EUR' },
    { id: 2, date: '2023-09-14', fundName: 'Fidelity ILF - The United States Dollar Fund', yield: '4.2%', currency: 'USD' },
    { id: 3, date: '2023-10-20', fundName: 'Fidelity ILF - The Sterling Fund', yield: '3.9%', currency: 'GBP' },
    { id: 4, date: '2023-11-10', fundName: 'abrdn Liquidity Fund (Lux) - Euro Fund', yield: '3.8%', currency: 'EUR' },
    { id: 5, date: '2023-12-24', fundName: 'BlackRock ICS US Treasury Fund', yield: '4.1%', currency: 'USD' },
    { id: 6, date: '2024-01-15', fundName: 'Fidelity ILF - The Euro Fund', yield: '4.5%', currency: 'EUR' },
    { id: 7, date: '2024-02-12', fundName: 'Fidelity ILF - The United States Dollar Fund', yield: '4.3%', currency: 'USD' },
    { id: 8, date: '2024-03-18', fundName: 'Fidelity ILF - The Sterling Fund', yield: '4.1%', currency: 'GBP' },
    { id: 9, date: '2024-04-08', fundName: 'abrdn Liquidity Fund (Lux) - US Dollar Fund', yield: '3.8%', currency: 'USD' },
    { id: 10, date: '2024-05-14', fundName: 'abrdn Liquidity Fund (Lux) - Sterling Fund', yield: '3.6%', currency: 'GBP' },
    { id: 11, date: '2024-06-21', fundName: 'abrdn Liquidity Fund (Lux) - Euro Fund', yield: '3.9%', currency: 'EUR' },
    { id: 12, date: '2024-07-27', fundName: 'BlackRock ICS US Treasury Fund', yield: '4.2%', currency: 'USD' },
    { id: 13, date: '2024-08-22', fundName: 'BlackRock ICS Euro Government Liquidity Fund', yield: '4.0%', currency: 'EUR' },
    { id: 14, date: '2024-09-13', fundName: 'BlackRock ICS Sterling Government Liquidity Fund', yield: '3.7%', currency: 'GBP' },
    { id: 15, date: '2024-10-06', fundName: 'abrdn Liquidity Fund (Lux) - Euro Fund', yield: '3.8%', currency: 'EUR' },
    { id: 16, date: '2024-11-10', fundName: 'Fidelity ILF - The Euro Fund', yield: '4.5%', currency: 'EUR' },
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

    const totalYieldEarned = totalAmountInvested * 0.02

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

  return (
    <Box>
      {/* Account Cards at Top */}
      <Box
        sx={{
          display: 'flex',
          overflowX: 'auto',
          border: '1px solid #4a4a4a',
          borderRadius: 2,
          padding: 2,
          backgroundColor: '#1e1e1e',
          marginBottom: 3,
        }}
      >
        <Card
          sx={{
            minWidth: 200,
            minHeight: 160,
            marginRight: 2,
            cursor: 'pointer',
            backgroundColor: 'lightblue',
            color: '#000000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
          }}
        >
          <Typography variant="h6" color="black" textAlign='center'>+ Add Account</Typography>
        </Card>

        {/* Dummy Accounts */}
        {banks.map((account, index) => (
          <Card
            key={account.name}
            sx={{
              minWidth: 200,
              minHeight: 160,
              marginRight: 2,
              backgroundColor: '#ffffff',
              color: '#000000',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: 2,
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
            }}
          >
            <Box sx={{ marginBottom: 2 }}>
              <img src={account.logo} alt={`${account.name} logo`} style={{ width: 60, height: 60 }} />
            </Box>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h6">{account.name}</Typography>
              <Typography variant="body2">Balance: {account.balance}</Typography>
              <Typography variant="body2">Account: {account.account}</Typography>
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
                    <Button variant="contained" sx={{ marginRight: 1 }} onClick={() => handleInvestClick(fund)}>Invest</Button>
                    <Button variant="outlined" onClick={() => handleRedeemClick(fund)}>Redeem</Button>
                  </Box>
                </Box>
              </Card>
            ))}
          </Box>
        </Grid>

        {/* Analytics */}
        <Grid item xs={12} md={6}>
          <Box sx={{ border: '1px solid #4a4a4a', borderRadius: 2, padding: 2, backgroundColor: '#1e1e1e', height: 500 }}>
            <Typography variant="h6" sx={{ color: 'lightblue', marginBottom: 1 }}>Analytics</Typography>
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
                  <Typography variant="subtitle1" color="lightgray">Total Amount Redeemed</Typography>
                  <Typography variant="h6" sx={{ color: 'lightblue' }}>{analyticsData.totalAmountRedeemed}</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ padding: 2, backgroundColor: '#2e2e2e', borderRadius: 1 }}>
                  <Typography variant="subtitle1" color="lightgray">Total Yield Earned</Typography>
                  <Typography variant="h6" sx={{ color: 'lightblue' }}>{analyticsData.totalYieldEarned}</Typography>
                </Box>
              </Grid>

              <Grid item xs={6}>
                <Box sx={{ padding: 2, backgroundColor: '#2e2e2e', borderRadius: 1 }}>
                  <Typography variant="subtitle1" color="lightgray">Total Amount that can be safeguarded</Typography>
                  <Typography variant="h6" sx={{ color: 'lightblue' }}>{analyticsData.totalAmountSafeguarded}</Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>

      {/* Order and Yield History */}
      <Grid container spacing={2} sx={{ marginTop: 3 }}>
  {/* Order History */}
  <Grid item xs={12} md={6}>
    <Box sx={{ border: '1px solid #4a4a4a', borderRadius: 2, padding: 2 }}>
      <Typography variant="h6" sx={{ color: 'lightblue', marginBottom: 1 }}>Order History</Typography>
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
      <Typography variant="h6" sx={{ color: 'lightblue', marginBottom: 1 }}>Yield History</Typography>
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
                <TableCell>{yieldData.yield}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  </Grid>
</Grid>
    </Box>
  );
};

export default SafeguardingSection;