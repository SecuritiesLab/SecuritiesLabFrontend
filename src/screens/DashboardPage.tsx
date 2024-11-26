import React, { useState } from 'react';
import { Grid, Paper, MenuItem, Select, Typography, Box, SelectChangeEvent } from '@mui/material';
import Balances from '../components/Dashboard/Balances';
import Balance from '../components/Dashboard/Balance';
import Orders from '../components/Dashboard/Orders';
import Yield from '../components/Dashboard/Yield';
import Revenue from '../components/Dashboard/Revenue';
import MonthlyRevenue from '../components/Dashboard/MonthlyRevenue';
import Investment from '../components/Dashboard/Investment';
import CashDistributionPieChart from '../components/Dashboard/CashDistribution';
import BankBalancesPieChart from '../components/Dashboard/BankBalancesPieChart';
import EuroFundsPieChart from '../components/Dashboard/EuroFundsPieChart';

export default function DashboardPage() {
  const [currency, setCurrency] = useState<'EUR' | 'USD' | 'GBP'>('EUR');

  const handleCurrencyChange = (event: SelectChangeEvent<'EUR' | 'USD' | 'GBP'>) => {
    setCurrency(event.target.value as 'EUR' | 'USD' | 'GBP');
  };

  return (
    <React.Fragment>
      {/* Currency Selector */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mb: 2 }}>
        <Select
          value={currency}
          onChange={handleCurrencyChange}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="EUR">Euro (€)</MenuItem>
          <MenuItem value="USD">US Dollar ($)</MenuItem>
          <MenuItem value="GBP">British Pound (£)</MenuItem>
        </Select>
      </Box>

      <Grid container spacing={3}>
        {/* Balance */}
        <Grid item xs={8} md={3} lg={2}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240 }}>
            <Balance currency={currency} />
          </Paper>
        </Grid>

        {/* Investment */}
        <Grid item xs={8} md={3} lg={2}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240 }}>
            <Investment currency={currency} />
          </Paper>
        </Grid>

        {/* Yield */}
        <Grid item xs={8} md={3} lg={2}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240 }}>
            <Yield currency={currency} />
          </Paper>
        </Grid>

        {/* Revenue */}
        <Grid item xs={8} md={3} lg={2}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240 }}>
            <Revenue currency={currency} />
          </Paper>
        </Grid>

        {/* Balances */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240 }}>
            <Balances currency={currency} />
          </Paper>
        </Grid>

        {/* Pie Charts */}
        <Grid container spacing={3} sx={{ marginTop: 1, marginLeft: 1 }}>
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CashDistributionPieChart currency={currency} />
            </Paper>
          </Grid>

          <Grid item xs={12} md={4} lg={3}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240 }}>
              <EuroFundsPieChart currency={currency} />
            </Paper>
          </Grid>

          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <BankBalancesPieChart currency={currency} />
            </Paper>
          </Grid>
        </Grid>

        {/* Monthly Revenue */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240 }}>
            <MonthlyRevenue currency={currency} />
          </Paper>
        </Grid>

        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Orders currency={currency} />
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}