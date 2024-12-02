import React from 'react';
import { Box, Typography, Grid, Divider, Paper } from '@mui/material';
import EuroFundsPieChart from '../Dashboard/EuroFundsPieChart';

interface AnalyticsProps {
  analyticsData: {
    totalAmountAvailable: string;
    totalAmountInvested: string;
    totalAmountRedeemed: string;
    totalYieldEarned: string;
  },
  currency: 'EUR' | 'USD' | 'GBP';
}

const TreasuryAnalytics: React.FC<AnalyticsProps> = ({ analyticsData, currency }) => {
  return (
    <Box
      sx={{
        border: '1px solid #4a4a4a',
        borderRadius: 2,
        padding: 2,
        backgroundColor: '#1e1e1e',
        height: 500,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflowY: 'auto',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: 'lightblue',
          mb: 1,
        }}
      >
        Analytics
      </Typography>
      <Divider sx={{ my: 1, backgroundColor: 'lightblue', width: '100%' }} />
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        <Grid item xs={12}>
          <Box
            sx={{
              padding: 2,
              backgroundColor: '#2e2e2e',
              borderRadius: 1,
              textAlign: 'center',
              width: '100%',
            }}
          >
            <Typography variant="subtitle1" color="lightgray">
              Total Amount Available
            </Typography>
            <Typography variant="h4" sx={{ color: 'lightblue' }}>
              {analyticsData.totalAmountAvailable}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Paper
        sx={{
          paddingTop: 2,
          display: 'flex',
          flexDirection: 'column',
          width: '70%',
          height: '70%',
        }}
      >
        <EuroFundsPieChart currency={currency} />
      </Paper>
    </Box>
  );
};

export default TreasuryAnalytics;