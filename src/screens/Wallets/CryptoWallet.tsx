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
  Divider,
  Button
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import { jsPDF } from 'jspdf';

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
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" sx={{ color: 'lightblue', mb: 3 }}>
        Securities Lab Wallet
      </Typography>

      <Typography variant="h6" sx={{ color: 'lightblue', mb: 3 }}>
        Combined Balance: €5,000
      </Typography>

      <Box sx={{  border: '1px solid #4a4a4a', borderRadius:2,  borderWidth:2, padding:3 ,display: 'flex', overflowX: 'auto', marginBottom: 4}}>
        {/* Add Wallet Card */}
        <Card
    sx={{
      minWidth: 150,
      minHeight: 100,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 2,
      cursor: 'pointer',
      backgroundColor: 'lightblue',
      borderRadius: 2, // Optional, for a rounded look
    }}
  >
    <Typography variant="h6" color="black" textAlign="center">
      + Add Wallet
    </Typography>
  </Card>
        {wallets.map((wallet) => (
         <Card
         key={wallet.id}
         sx={{
          width: 200,
          height: 300,
          marginRight: 2,
          cursor: 'pointer',
          backgroundColor: '#ffffff',
          color: '#000000',
          display: 'flex',
          flexDirection: 'column', // Stack logo on top of text
          alignItems: 'center', // Center both logo and text
          padding: '8px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' 
        }}
       >
                <Box sx={{ marginBottom: 2 }}>
      <img
        src={wallet.logo}
        alt={`${wallet.name} logo`}
        style={{
          width: 100,
          height: 60,
        }}
      />
    </Box>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h6">{wallet.name}</Typography>
              <Typography variant="body2">Balance: {wallet.balance}</Typography>
              <Typography variant="body2">Account: {wallet.address}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Box sx={{ border: '1px solid #4a4a4a', borderRadius: 2, padding: 3, backgroundColor: '#1e1e1e', mb: 4 }}>
        <Typography variant="h6" sx={{ color: 'lightblue', display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          Transaction History
          <Box>
                <Button onClick={() => downloadCSV(transactions, 'transactions.csv')}>CSV</Button>
                <Button onClick={() => downloadPDF('Transactions', transactions)}>PDF</Button>
              </Box>
        </Typography>
        <Divider sx={{ my: 1, backgroundColor: 'lightblue' }} />
        <TableContainer component={Paper} sx={{ backgroundColor: '#2e2e2e' }}>
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
    </Box>
  );
};

export default Wallet;