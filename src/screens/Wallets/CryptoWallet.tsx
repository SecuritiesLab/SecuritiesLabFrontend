import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// Dummy data for wallet balances
const wallets = [
  {
    id: 1,
    name: 'Security Lab Wallet',
    balance: '€5,000',
    address: '0x1234...abcd',
    logo: `${process.env.PUBLIC_URL}/logo.png`, // Replace with actual logo URL
  },
];

const transactions = [
    { date: '2024-10-01', type: 'Send', currency: 'USDT', amount: '100 USDT', fiatEquivalent: '€100', status: 'Completed' },
    { date: '2024-10-02', type: 'Receive', currency: 'USDC', amount: '50 USDC', fiatEquivalent: '€50', status: 'Completed' },
    { date: '2024-10-03', type: 'Invest', currency: 'USDT', amount: '500 USDT', fiatEquivalent: '€500', status: 'Completed' },
    { date: '2024-10-04', type: 'Send', currency: 'DAI', amount: '200 DAI', fiatEquivalent: '€200', status: 'Completed' },
    { date: '2024-10-05', type: 'Receive', currency: 'USDT', amount: '150 USDT', fiatEquivalent: '€150', status: 'Completed' },
    { date: '2024-10-06', type: 'Investment Payout', currency: 'USDC', amount: '300 USDC', fiatEquivalent: '€300', status: 'Completed' },
  ];

const Wallet = () => {
  const handleAddWallet = () => {
    console.log('Add Wallet clicked');
    // Implement wallet addition logic here
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ marginBottom: '20px' }}>Securities Lab Wallet</Typography>

      <Typography variant="h6" sx={{ marginBottom: '20px' }}>Combined Balance: €5,000</Typography>

      <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', marginBottom: 3 }}>
        {/* Add Wallet Card */}
        <Card
          sx={{
            minWidth: 200,
            minHeight: 160,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#1E1E1E',
            color: '#FFFFFF',
            cursor: 'pointer',
            boxShadow: 3,
          }}
          onClick={handleAddWallet}
        >
          <IconButton sx={{ color: '#FFFFFF', fontSize: '2rem' }}>
            <AddIcon fontSize="large" />
          </IconButton>
          <Typography variant="body1" align="center">
            Add Wallet
          </Typography>
        </Card>

        {wallets.map(wallet => (
          <Card
            key={wallet.id}
            sx={{
              minWidth: 200,
              minHeight: 160,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#1E1E1E',
              color: '#FFFFFF',
              padding: 2,
              boxShadow: 3,
            }}
          >
            <img src={wallet.logo} alt={`${wallet.name} logo`} style={{ width: 50, height: 50, marginBottom: 10 }} />
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h6">{wallet.name}</Typography>
              <Typography variant="body2">Balance: {wallet.balance}</Typography>
              <Typography variant="body2">Account: {wallet.address}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Typography variant="h6" sx={{ marginBottom: '10px' }}>Transaction History</Typography>
      <TableContainer component={Paper} sx={{ backgroundColor: '#1E1E1E', color: '#FFFFFF' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#FFFFFF' }}>Date</TableCell>
              <TableCell sx={{ color: '#FFFFFF' }}>Type</TableCell>
              <TableCell sx={{ color: '#FFFFFF' }}>Currency</TableCell>
              <TableCell sx={{ color: '#FFFFFF' }}>Amount</TableCell>
              <TableCell sx={{ color: '#FFFFFF' }}>Fiat Equivalent</TableCell>
              <TableCell sx={{ color: '#FFFFFF' }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((txn, index) => (
              <TableRow key={index}>
                <TableCell sx={{ color: '#FFFFFF' }}>{txn.date}</TableCell>
                <TableCell sx={{ color: '#FFFFFF' }}>{txn.type}</TableCell>
                <TableCell sx={{ color: '#FFFFFF' }}>{txn.currency}</TableCell>
                <TableCell sx={{ color: '#FFFFFF' }}>{txn.amount}</TableCell>
                <TableCell sx={{ color: '#FFFFFF' }}>{txn.fiatEquivalent}</TableCell>
                <TableCell sx={{ color: '#FFFFFF' }}>{txn.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Wallet;