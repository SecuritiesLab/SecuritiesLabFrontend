import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Modal, Snackbar, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination } from '@mui/material';
import { useLocation } from 'react-router-dom';

// Dummy total users invested value
const TOTAL_USERS_INVESTED = 10000;

// Generate random 6-digit user ID
const generateRandomUserId = () => Math.floor(100000 + Math.random() * 900000);

// Generate random date within the last year
const generateRandomDate = () => {
  const today = new Date();
  const lastYear = new Date(today);
  lastYear.setFullYear(today.getFullYear() - 1);

  const randomTime = lastYear.getTime() + Math.random() * (today.getTime() - lastYear.getTime());
  return new Date(randomTime).toISOString().split('T')[0];  // Format as 'YYYY-MM-DD'
};

// Dummy transaction data (50 transactions)
const dummyTransactions = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  user: generateRandomUserId(),  // Assign random 6-digit user ID
  action: index % 2 === 0 ? 'Deposited' : 'Withdrew',
  amount: `${(Math.random() * 10000 + 1000).toFixed(0)} €`,
  date: generateRandomDate(),  // Generate a random date in the last year
}));

const ITEMS_PER_PAGE = 10;  // Items per page for pagination

const DepositDetailsPage = () => {
  const location = useLocation();  // To retrieve the deposit passed via state
  const { deposit } = location.state;  // Access the deposit data passed from the previous page

  const [freeYield, setFreeYield] = useState(deposit.pricingPlans.Free);  // Yield for Free user type
  const [plusYield, setPlusYield] = useState(deposit.pricingPlans.Plus);  // Yield for Plus user type
  const [proYield, setProYield] = useState(deposit.pricingPlans.Pro);     // Yield for Pro user type

  const [manager, setManager] = useState(deposit.manager);          // Manage the manager
  const [amountInvested, setAmountInvested] = useState(deposit.amountInvested);  // Manage the invested amount
  const [totalEarnings, setTotalEarnings] = useState(deposit.totalEarnings);     // Manage the total earnings

  const [showSuccess, setShowSuccess] = useState(false);  // To show success message after managing
  const [manageModalOpen, setManageModalOpen] = useState(false);  // Manage modal open/close
  const [currentPage, setCurrentPage] = useState(1);  // Current page for pagination

  // Handle updating the deposit information, including yields
  const handleUpdateDeposit = () => {
    // You can make API calls or logic to update deposit details
    deposit.pricingPlans.Free = freeYield;
    deposit.pricingPlans.Plus = plusYield;
    deposit.pricingPlans.Pro = proYield;
    deposit.manager = manager;
    deposit.amountInvested = amountInvested;
    deposit.totalEarnings = totalEarnings;

    setShowSuccess(true);
    setManageModalOpen(false);
  };

  // Calculate pagination slice for transactions
  const currentTransactions = dummyTransactions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <Box sx={{ padding: 4 }}>
      {/* Deposit Information */}
      <Typography variant="h4" gutterBottom>{deposit.name}</Typography>
      <Typography variant="h6" gutterBottom>Manager: {deposit.manager}</Typography>
      <Typography variant="h6" gutterBottom>Deposit Amount: {deposit.amountInvested}</Typography>
      <Typography variant="h6" gutterBottom>Yield for Free Users: {deposit.pricingPlans.Free}%</Typography>
      <Typography variant="h6" gutterBottom>Yield for Plus Users: {deposit.pricingPlans.Plus}%</Typography>
      <Typography variant="h6" gutterBottom>Yield for Pro Users: {deposit.pricingPlans.Pro}%</Typography>
      <Typography variant="h6" gutterBottom>Yield Generated so far: {deposit.totalEarnings}</Typography>
      <Typography variant="h6" gutterBottom>Total Users Invested: {TOTAL_USERS_INVESTED}</Typography>

      {/* Button to open the Manage modal */}
      <Button variant="contained" onClick={() => setManageModalOpen(true)} sx={{ mt: 2 }}>
        Manage Deposit
      </Button>

      {/* Transactions Table */}
      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>Transaction History</Typography>
      <TableContainer component={Paper}>
        <Table>
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

      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Pagination
          count={Math.ceil(dummyTransactions.length / ITEMS_PER_PAGE)}
          page={currentPage}
          onChange={(e, page) => setCurrentPage(page)}
          color="primary"
        />
      </Box>

      {/* Manage Deposit Modal */}
      <Modal open={manageModalOpen} onClose={() => setManageModalOpen(false)}>
        <Box sx={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography variant="h6" mb={2}>Manage {deposit.name}</Typography>

          {/* Free Yield Field */}
          <TextField
            fullWidth
            label="Yield for Free Users (%)"
            value={freeYield}
            onChange={(e) => setFreeYield(e.target.value)}
            sx={{ mb: 2 }}
          />

          {/* Plus Yield Field */}
          <TextField
            fullWidth
            label="Yield for Plus Users (%)"
            value={plusYield}
            onChange={(e) => setPlusYield(e.target.value)}
            sx={{ mb: 2 }}
          />

          {/* Pro Yield Field */}
          <TextField
            fullWidth
            label="Yield for Pro Users (%)"
            value={proYield}
            onChange={(e) => setProYield(e.target.value)}
            sx={{ mb: 2 }}
          />

          {/* Manager Field */}
          <TextField
            fullWidth
            label="Manager"
            value={manager}
            onChange={(e) => setManager(e.target.value)}
            sx={{ mb: 2 }}
          />

          {/* Amount Invested Field */}
          <TextField
            fullWidth
            label="Amount Invested (€)"
            value={amountInvested}
            onChange={(e) => setAmountInvested(e.target.value)}
            sx={{ mb: 2 }}
          />

          {/* Total Earnings Field */}
          <TextField
            fullWidth
            label="Total Earnings (€)"
            value={totalEarnings}
            onChange={(e) => setTotalEarnings(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Button variant="contained" fullWidth onClick={handleUpdateDeposit}>
            Update Deposit
          </Button>
        </Box>
      </Modal>

      {/* Success Snackbar */}
      <Snackbar open={showSuccess} autoHideDuration={3000} onClose={() => setShowSuccess(false)}>
        <Alert onClose={() => setShowSuccess(false)} severity="success">
          Deposit details updated successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DepositDetailsPage;