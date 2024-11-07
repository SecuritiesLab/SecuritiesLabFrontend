import React from 'react';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Card, Grid, Divider } from '@mui/material';
import { SectionProps } from '../../screens/TreasurySafeguarding/TreasurySafeguardingPage';

const analyticsData = 
  {  totalAmountAvailable: "1,000,000€",
    totalAmountInvested: "500,000€",
    totalAmountRedeemed: "200,000€",
    totalYieldEarned: "20,000€"}

    // Dummy data for orders and yield history (separate for Treasury and Safeguarding)
const orderHistory = [
    { id: 1, date: '2024-10-10', fundName: 'Fidelity ILF - The Euro Fund', action: 'Invested', amount: '€100000' },
    { id: 2, date: '2024-10-12', fundName: 'BlackRock ICS US Treasury Fund', action: 'Redeemed', amount: '€30000' },
  ];

  const yieldHistory = [
    { id: 1, date: '2024-10-15', fundName: 'abrdn Liquidity Fund (Lux) - US Dollar Fund', yield: '3.8%' },
    { id: 2, date: '2024-10-17', fundName: 'Fidelity ILF - The Euro Fund', yield: '4.5%' },
  ];
  

const TreasurySection: React.FC<SectionProps> = ({ funds, handleInvestClick, handleRedeemClick }) => {
    console.log(funds)
    return (
    <Box>
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
     {funds.map((fund, index) => (
  <Card
    key={fund.id}
    sx={{
      marginBottom: 2,
      padding: 2,
      height: 'auto',
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      {/* Left side: Logo and text */}
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

      {/* Right side: Buttons */}
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
            </Grid>
          </Box>
        </Grid>
      </Grid>

      {/* Order and Yield History */}
      <Grid container spacing={2} sx={{ marginTop: 3 }}>
        <Grid item xs={12} md={6}>
          <Box sx={{ border: '1px solid #4a4a4a', borderRadius: 2, padding: 2 }}>
            <Typography variant="h6" sx={{ color: 'lightblue', marginBottom: 1 }}>Order History</Typography>
            <Divider sx={{ my: 1, backgroundColor: 'lightblue' }} />
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Fund</TableCell>
                    <TableCell>Action</TableCell>
                    <TableCell>Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderHistory.map((txn) => (
                    <TableRow key={txn.id}>
                      <TableCell>{txn.date}</TableCell>
                      <TableCell>{txn.fundName}</TableCell>
                      <TableCell>{txn.action}</TableCell>
                      <TableCell>{txn.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ border: '1px solid #4a4a4a', borderRadius: 2, padding: 2 }}>
            <Typography variant="h6" sx={{ color: 'lightblue', marginBottom: 1 }}>Yield History</Typography>
            <Divider sx={{ my: 1, backgroundColor: 'lightblue' }} />
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Fund</TableCell>
                    <TableCell>Yield</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {yieldHistory.map((yieldData) => (
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

export default TreasurySection;