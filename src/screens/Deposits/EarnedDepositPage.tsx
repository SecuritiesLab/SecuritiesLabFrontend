import React, { useState } from 'react';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal, TextField, Snackbar, Alert, MenuItem, Select, FormControl, InputLabel,
  Grid, Divider
 } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Reusing the MMF funds as asset managers
const assetManagers = [
  { id: 1, name: 'Fidelity ILF - The Euro Fund', sector: 'Money Market', defaultYield: '4.5%' },
  { id: 2, name: 'Fidelity ILF - The United States Dollar Fund', sector: 'Money Market', defaultYield: '4.3%' },
  { id: 3, name: 'Fidelity ILF - The Sterling Fund', sector: 'Money Market', defaultYield: '4.1%' },
  { id: 4, name: 'abrdn Liquidity Fund (Lux) - US Dollar Fund', sector: 'Money Market', defaultYield: '3.8%' },
  { id: 5, name: 'abrdn Liquidity Fund (Lux) - Sterling Fund', sector: 'Money Market', defaultYield: '3.6%' },
  { id: 6, name: 'abrdn Liquidity Fund (Lux) - Euro Fund', sector: 'Money Market', defaultYield: '3.9%' },
  { id: 7, name: 'BlackRock ICS US Treasury Fund', sector: 'Money Market', defaultYield: '4.2%' },
  { id: 8, name: 'BlackRock ICS Euro Government Liquidity Fund', sector: 'Money Market', defaultYield: '4.0%' },
  { id: 9, name: 'BlackRock ICS Sterling Government Liquidity Fund', sector: 'Money Market', defaultYield: '3.7%' },
];

// Example existing deposit products offered by the business
const initialDeposits = [
  {
    id: 1,
    name: 'Business Euro Savings Plan',
    amountInvested: '€45,000,000',
    totalEarnings: '€100,000',
    manager: 'Fidelity ILF - The Euro Fund',
    userType: 'Retail',
    yield: '4.5%',  // Direct yield value
    pricingPlans: { Free: '50%', Plus: '60%', Pro: '80%' },
  },
  {
    id: 2,
    name: 'US Dollar Growth Fund',
    amountInvested: '€27,000,000', // $30,000,000 * 0.90
    totalEarnings: '€108,000',     // $120,000 * 0.90
    manager: 'BlackRock ICS US Treasury Fund',
    userType: 'Institutional',
    yield: '4.2%',
    pricingPlans: { Free: '55%', Plus: '65%', Pro: '85%' },
  },
  {
    id: 3,
    name: 'Sterling High Yield Account',
    amountInvested: '€23,200,000', // £20,000,000 * 1.16
    totalEarnings: '€98,600',      // £85,000 * 1.16
    manager: 'Fidelity ILF - The Sterling Fund',
    userType: 'Retail',
    yield: '4.1%',
    pricingPlans: { Free: '50%', Plus: '70%', Pro: '90%' },
  },
  {
    id: 4,
    name: 'Euro Corporate Liquidity Pool',
    amountInvested: '€60,000,000',
    totalEarnings: '€150,000',
    manager: 'abrdn Liquidity Fund (Lux) - Euro Fund',
    userType: 'Institutional',
    yield: '4.0%',
    pricingPlans: { Free: '52%', Plus: '68%', Pro: '88%' },
  },
  {
    id: 5,
    name: 'USD Institutional Treasury Reserve',
    amountInvested: '€45,000,000', // $50,000,000 * 0.90
    totalEarnings: '€117,000',     // $130,000 * 0.90
    manager: 'BlackRock ICS US Treasury Fund',
    userType: 'Institutional',
    yield: '4.3%',
    pricingPlans: { Free: '58%', Plus: '70%', Pro: '90%' },
  }
];

interface Deposit {
  id: number;
  name: string;
  amountInvested: string;
  totalEarnings: string;
  manager: string;
  userType: string;
  yield: string; // Yield field for each deposit
  pricingPlans: Record<string, string>; // Yield for each user type
}

const userTypes = ['Free', 'Plus', 'Pro']; // Available user types

const BusinessDepositsPage = () => {
  const [deposits, setDeposits] = useState(initialDeposits);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const totalDepositAmount = deposits.reduce((acc, deposit) => {
    const amount = parseFloat(deposit.amountInvested.replace(/[^0-9.-]+/g, ''));
    return acc + amount;
  }, 0);

  const averageYield = (deposits.reduce((acc, deposit) => acc + parseFloat(deposit.yield), 0) / deposits.length).toFixed(2);
  const expectedEarnings = deposits.reduce((acc, deposit) => {
    const earnings = parseFloat(deposit.totalEarnings.replace(/[^0-9.-]+/g, ''));
    return acc + earnings;
  }, 0);

  const viewDocumentation = () => {
    navigate("/documentation");
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>DaaS Dashboard</Typography>

      <Grid container spacing={3}>
        {/* Deposit Table */}
        <Grid item xs={12} md={8}>
          <Box sx={{ border: '1px solid #4a4a4a', borderRadius: 2, padding: 2, backgroundColor: '#1e1e1e', height: 500, overflowY: 'auto' }}>
            <Typography variant="h6" sx={{ color: 'lightblue', marginBottom: 1 }}>Your DaaS Offerings</Typography>
            <Divider sx={{ my: 1, backgroundColor: 'lightblue' }} />
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Amount Invested</TableCell>
                    <TableCell>Total Earnings</TableCell>
                    <TableCell>Manager</TableCell>
                    <TableCell>Yield</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {deposits.map((deposit) => (
                    <TableRow key={deposit.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/deposit/${deposit.id}`, { state: { deposit } })}>
                      <TableCell>{deposit.name}</TableCell>
                      <TableCell>{deposit.amountInvested}</TableCell>
                      <TableCell>{deposit.totalEarnings}</TableCell>
                      <TableCell>{deposit.manager}</TableCell>
                      <TableCell>{deposit.yield}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>

        {/* Analytics Box */}
        <Grid item xs={12} md={4}>
          <Box sx={{ border: '1px solid #4a4a4a', borderRadius: 2, padding: 2, backgroundColor: '#1e1e1e', height: 500 }}>
            <Typography variant="h6" sx={{ color: 'lightblue', marginBottom: 1 }}>Analytics</Typography>
            <Divider sx={{ my: 1, backgroundColor: 'lightblue' }} />
            <Grid container spacing={2} sx={{ marginTop: 2 }}>
              <Grid item xs={12}>
                <Box sx={{ padding: 2, backgroundColor: '#2e2e2e', borderRadius: 1 }}>
                  <Typography variant="subtitle1" color="lightgray">Total Deposit Amount</Typography>
                  <Typography variant="h6" sx={{ color: 'lightblue' }}>{`€${totalDepositAmount.toLocaleString()}`}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ padding: 2, backgroundColor: '#2e2e2e', borderRadius: 1 }}>
                  <Typography variant="subtitle1" color="lightgray">Average Yield</Typography>
                  <Typography variant="h6" sx={{ color: 'lightblue' }}>{averageYield}%</Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ padding: 2, backgroundColor: '#2e2e2e', borderRadius: 1 }}>
                  <Typography variant="subtitle1" color="lightgray">Expected Earnings</Typography>
                  <Typography variant="h6" sx={{ color: 'lightblue' }}>{`€${expectedEarnings.toLocaleString()}`}</Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>

      {/* API Access Section */}
      <Box sx={{ marginTop: 4, padding: 2, border: '1px solid #4a4a4a', borderRadius: 2, backgroundColor: '#1e1e1e' }}>
        <Typography variant="h6" sx={{ color: 'lightblue', marginBottom: 1 }}>API Access</Typography>
        <Divider sx={{ my: 1, backgroundColor: 'lightblue' }} />
        <Typography variant="body2" color="lightgray" sx={{ marginBottom: 2 }}>
          Use our API to create and manage deposit products programmatically. This feature is useful for fintechs or
          businesses automating their treasury management and safeguarding earnings.
        </Typography>
        <Button variant="contained" onClick={viewDocumentation}>View API Documentation</Button>
      </Box>

      {/* Success Snackbar */}
      <Snackbar open={showSuccess} autoHideDuration={3000} onClose={() => setShowSuccess(false)}>
        <Alert onClose={() => setShowSuccess(false)} severity="success">
          Deposit product updated successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BusinessDepositsPage;