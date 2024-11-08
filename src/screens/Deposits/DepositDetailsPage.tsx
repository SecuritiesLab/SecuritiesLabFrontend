import React, { useState } from 'react';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Divider, Grid, MenuItem, Select, FormControl, InputLabel, Pagination } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { SelectChangeEvent } from '@mui/material';


const TOTAL_USERS_INVESTED = 10000;
const generateRandomUserId = () => Math.floor(100000 + Math.random() * 900000);
const generateRandomDate = () => {
  const today = new Date();
  const lastYear = new Date(today);
  lastYear.setFullYear(today.getFullYear() - 1);

  const randomTime = lastYear.getTime() + Math.random() * (today.getTime() - lastYear.getTime());
  return new Date(randomTime).toISOString().split('T')[0];
};

const dummyTransactions = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  user: generateRandomUserId(),
  action: index % 2 === 0 ? 'Deposited' : 'Withdrew',
  amount: `${(Math.random() * 10000 + 1000).toFixed(0)} €`,
  date: generateRandomDate(),
}));

const ITEMS_PER_PAGE = 10;

const DepositDetailsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showManageModal, setShowManageModal] = useState(false);
  const location = useLocation();
  const { deposit } = location.state;
  const averageYield = '4.22%';
  const expectedEarnings = '€373,600';
  const totalUsersInvested = '10,000';
  const yieldGeneratedSoFar = '€100,000';
  const earningsSinceInception = yieldGeneratedSoFar
  const earningsThisYear = '€150,000';        
  const earningsThisMonth = '€20,000';         
  const earningsToday = '€1,000';             

  const currentTransactions = dummyTransactions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>{deposit.name}</Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box sx={{ border: '1px solid #4a4a4a', borderRadius: 2, padding: 3, backgroundColor: '#1e1e1e' }}>
            <Typography variant="h6" sx={{ color: 'lightblue', mb: 1 }}>Deposit Details</Typography>
            <Divider sx={{ my: 1, backgroundColor: 'lightblue' }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography>Manager: {deposit.manager}</Typography>
              <Typography>Deposit Amount: {deposit.amountInvested}</Typography>
              <Typography>Yield for Free Users: {deposit.pricingPlans.Free}%</Typography>
              <Typography>Yield for Plus Users: {deposit.pricingPlans.Plus}%</Typography>
              <Typography>Yield for Pro Users: {deposit.pricingPlans.Pro}%</Typography>
            </Box>
            <Button variant="contained" onClick={() => setShowManageModal(true)} sx={{ mt: 2 }}>
              Manage Deposit
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box
            sx={{
              border: '1px solid #4a4a4a',
              borderRadius: 2,
              padding: 3,
              backgroundColor: '#1e1e1e',
              height: 300,
              overflowY: 'auto'
            }}
          >
            <Typography variant="h6" sx={{ color: 'lightblue', mb: 1 }}>Analytics</Typography>
            <Divider sx={{ my: 1, backgroundColor: 'lightblue' }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ padding: 2, backgroundColor: '#2e2e2e', borderRadius: 1 }}>
                <Typography variant="subtitle1" color="lightgray">Average Yield</Typography>
                <Typography variant="h6" sx={{ color: 'lightblue' }}>{averageYield}</Typography>
              </Box>
              <Box sx={{ padding: 2, backgroundColor: '#2e2e2e', borderRadius: 1 }}>
                <Typography variant="subtitle1" color="lightgray">Expected Earnings</Typography>
                <Typography variant="h6" sx={{ color: 'lightblue' }}>{expectedEarnings}</Typography>
              </Box>
              <Box sx={{ padding: 2, backgroundColor: '#2e2e2e', borderRadius: 1 }}>
                <Typography variant="subtitle1" color="lightgray">Total Users Invested</Typography>
                <Typography variant="h6" sx={{ color: 'lightblue' }}>{totalUsersInvested}</Typography>
              </Box>
              <Box sx={{ padding: 2, backgroundColor: '#2e2e2e', borderRadius: 1 }}>
                <Typography variant="subtitle1" color="lightgray">Yield Generated So Far</Typography>
                <Typography variant="h6" sx={{ color: 'lightblue' }}>{yieldGeneratedSoFar}</Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Historical Analytics Box */}
      <Box
        sx={{
          border: '1px solid #4a4a4a',
          borderRadius: 2,
          padding: 3,
          backgroundColor: '#1e1e1e',
          mt: 3,
          mb: 3
        }}
      >
        <Typography variant="h6" sx={{ color: 'lightblue', mb: 1 }}>Historical Earnings</Typography>
        <Divider sx={{ my: 1, backgroundColor: 'lightblue' }} />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: 2
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="subtitle1" color="lightgray">Earnings Since Inception</Typography>
            <Typography variant="h6" sx={{ color: 'lightblue' }}>{earningsSinceInception}</Typography>
          </Box>
          <Divider orientation="vertical" flexItem sx={{ backgroundColor: '#4a4a4a' }} />
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="subtitle1" color="lightgray">Earnings This Year</Typography>
            <Typography variant="h6" sx={{ color: 'lightblue' }}>{earningsThisYear}</Typography>
          </Box>
          <Divider orientation="vertical" flexItem sx={{ backgroundColor: '#4a4a4a' }} />
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="subtitle1" color="lightgray">Earnings This Month</Typography>
            <Typography variant="h6" sx={{ color: 'lightblue' }}>{earningsThisMonth}</Typography>
          </Box>
          <Divider orientation="vertical" flexItem sx={{ backgroundColor: '#4a4a4a' }} />
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="subtitle1" color="lightgray">Earnings Today</Typography>
            <Typography variant="h6" sx={{ color: 'lightblue' }}>{earningsToday}</Typography>
          </Box>
        </Box>
      </Box>

      {/* Transaction History */}
      <Box sx={{ border: '1px solid #4a4a4a', borderRadius: 2, padding: 3, backgroundColor: '#1e1e1e', mt: 3 }}>
        <Typography variant="h6" sx={{ color: 'lightblue', mb: 1 }}>Transaction History</Typography>
        <Divider sx={{ my: 1, backgroundColor: 'lightblue' }} />
        <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>User ID</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentTransactions.map((txn) => (
                <TableRow key={txn.id}>
                  <TableCell>{txn.user}</TableCell>
                  <TableCell>{txn.action}</TableCell>
                  <TableCell>{txn.amount}</TableCell>
                  <TableCell>{txn.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Pagination
            count={Math.ceil(dummyTransactions.length / ITEMS_PER_PAGE)}
            page={currentPage}
            onChange={(e, page) => setCurrentPage(page)}
            color="primary"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default DepositDetailsPage;