import * as React from 'react';
import { Grid, Paper } from '@mui/material';
import Balances from '../components/Dashboard/Balances';
import Balance from '../components/Dashboard/Balance';
import Orders from '../components/Dashboard/Orders';
import Yield from '../components/Dashboard/Yield';
import Revenue from '../components/Dashboard/Revenue';
import MonthlyRevenue from '../components/Dashboard/MonthlyRevenue';

export default function DashboardPage() {
  return (
    <Grid container spacing={3}>
      {/* Balance */}
      <Grid item xs={12} md={4} lg={3}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240 }}>
          <Balance />
        </Paper>
      </Grid>

      {/* Yield */}
      <Grid item xs={12} md={4} lg={3}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240 }}>
          <Yield />
        </Paper>
      </Grid>

      {/* Revenue */}
      <Grid item xs={12} md={4} lg={3}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240 }}>
          <Revenue />
        </Paper>
      </Grid>

      {/* Balances */}
      <Grid item xs={12} md={8} lg={9}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240 }}>
          <Balances />
        </Paper>
      </Grid>

      {/* Monthly Revenue */}
      <Grid item xs={12} md={8} lg={9}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240 }}>
          <MonthlyRevenue />
        </Paper>
      </Grid>

      {/* Recent Orders */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Orders />
        </Paper>
      </Grid>
    </Grid>
  );
}