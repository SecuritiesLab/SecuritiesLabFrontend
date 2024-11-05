import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TextField, MenuItem, Dialog, DialogTitle, DialogContent, Button, CircularProgress, Modal } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import AddBankAccount from '../../components/Accounts/AddBankAccount';

// Dummy data for bank accounts
const bankAccounts = [
  { id: 1, name: 'LHV Checking', balance: 120000, accountNumber: '0011223344', accountType: 'Checking', logo: 'https://cdn-logos.gocardless.com/ais/LHV_LHVBEE22.png' },
  { id: 2, name: 'Swedbank Savings', balance: 325000, accountNumber: '9988776655', accountType: 'Savings', logo: 'https://cdn-logos.gocardless.com/ais/SWEDBANK_SWEDNOKK.png' },
  { id: 3, name: 'Revolut Business', balance: 850000, accountNumber: '5566778899', accountType: 'Business', logo: 'https://storage.googleapis.com/gc-prd-institution_icons-production/UK/PNG/revolut.png' },
  { id: 4, name: 'Wise Startup', balance: 500000, accountNumber: '7766554433', accountType: 'Business', logo: 'https://storage.googleapis.com/gc-prd-institution_icons-production/UK/PNG/wise.png' },
  { id: 5, name: 'N26 Personal Vault', balance: 300000, accountNumber: '0099887766', accountType: 'Savings', logo: 'https://storage.googleapis.com/gc-prd-institution_icons-production/DE/PNG/n26.png' },
];

// Dummy data for transactions
const transactions = [
  { id: 1, bankId: 1, date: '2024-10-01', description: 'Digital Wallet Transfer', amount: '-€5,000', type: 'Debit' },
  { id: 2, bankId: 1, date: '2024-10-02', description: 'Salary Direct Deposit', amount: '€30,000', type: 'Credit' },
  { id: 3, bankId: 2, date: '2024-10-03', description: 'Investment in Stocks via App', amount: '-€10,000', type: 'Debit' },
  { id: 4, bankId: 3, date: '2024-10-04', description: 'Client Payment Received', amount: '€75,000', type: 'Credit' },
  { id: 5, bankId: 2, date: '2024-10-05', description: 'Investment in Cryptocurrency', amount: '-€15,000', type: 'Debit' },
  { id: 6, bankId: 3, date: '2024-10-06', description: 'Business Expense - Investment in Tech Startup', amount: '-€50,000', type: 'Debit' },
  { id: 7, bankId: 4, date: '2024-10-07', description: 'Startup Capital Investment Received', amount: '€100,000', type: 'Credit' },
  { id: 8, bankId: 5, date: '2024-10-08', description: 'Investment in Mutual Fund', amount: '-€25,000', type: 'Debit' },
  { id: 9, bankId: 1, date: '2024-10-09', description: 'Peer-to-Peer Wallet Transfer', amount: '-€8,000', type: 'Debit' },
  { id: 10, bankId: 2, date: '2024-10-10', description: 'Business Partner Transfer for Investment', amount: '€150,000', type: 'Credit' },
  { id: 11, bankId: 3, date: '2024-10-11', description: 'Crowdfunding Investment Payment', amount: '-€30,000', type: 'Debit' },
  { id: 12, bankId: 1, date: '2024-10-12', description: 'Digital Wallet Transfer', amount: '-€12,000', type: 'Debit' },
  { id: 13, bankId: 1, date: '2024-10-13', description: 'Investment in Real Estate Fund', amount: '-€45,000', type: 'Debit' },
  { id: 14, bankId: 2, date: '2024-10-14', description: 'Angel Investment in Startup', amount: '-€60,000', type: 'Debit' },
  { id: 15, bankId: 2, date: '2024-10-15', description: 'Client Payment Received', amount: '€90,000', type: 'Credit' },
  { id: 16, bankId: 3, date: '2024-10-16', description: 'Investment in Index Funds', amount: '-€22,000', type: 'Debit' },
  { id: 17, bankId: 4, date: '2024-10-17', description: 'Digital Wallet Transfer', amount: '-€18,000', type: 'Debit' },
  { id: 18, bankId: 4, date: '2024-10-18', description: 'Investment Return from Tech Startup', amount: '€60,000', type: 'Credit' },
  { id: 19, bankId: 5, date: '2024-10-19', description: 'Peer-to-Peer Wallet Transfer', amount: '-€20,000', type: 'Debit' },
  { id: 20, bankId: 2, date: '2024-10-20', description: 'Investment in Crypto Fund', amount: '-€40,000', type: 'Debit' },
  { id: 21, bankId: 5, date: '2024-10-21', description: 'Transfer for Joint Venture Investment', amount: '-€75,000', type: 'Debit' },
  { id: 22, bankId: 5, date: '2024-10-22', description: 'Payment Received for Investment Returns', amount: '€85,000', type: 'Credit' },
  { id: 23, bankId: 1, date: '2024-10-23', description: 'Digital Wallet Transfer', amount: '-€10,000', type: 'Debit' },
  { id: 24, bankId: 1, date: '2024-10-24', description: 'Investment in Hedge Fund', amount: '-€35,000', type: 'Debit' },
  { id: 25, bankId: 2, date: '2024-10-25', description: 'Return from Stock Investments', amount: '€50,000', type: 'Credit' }
];

const BankAccountsPage = () => {
  const [selectedBankId, setSelectedBankId] = useState<number | null>(null);  // Allows both null and number
  const [filters, setFilters] = useState({ date: '', amount: '', type: '' }); // State for filters
  const [banks, setBanks] = useState<any[]>([]); // Store available banks
  const [loading, setLoading] = useState(false); // Loading state
  const [openBankDialog, setOpenBankDialog] = useState(false); // State for bank selection dialog
  const [selectedBank, setSelectedBank] = useState<string | null>(null); // Selected bank institution
  const [sortField, setSortField] = useState<'date' | 'amount'>('date');  // Sorting state
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc'); 
  const [sendMoneyModalOpen, setSendMoneyModalOpen] = useState(false);  // Tracks modal visibility
  const [beneficiary, setBeneficiary] = useState('');  // Beneficiary name
  const [amount, setAmount] = useState(''); 

  // Filter transactions based on selected bank account and filters
  const filteredTransactions = transactions
    .filter((txn) => !selectedBankId || txn.bankId === selectedBankId)
    .filter((txn) => {
      return (
        (!filters.date || txn.date.includes(filters.date)) &&
        (!filters.amount || txn.amount.includes(filters.amount)) &&
        (!filters.type || txn.type === filters.type)
      );
    });

    const handleSort = (field: 'date' | 'amount') => {
      const isSameField = sortField === field;
      setSortDirection(isSameField ? (sortDirection === 'asc' ? 'desc' : 'asc') : 'asc');
      setSortField(field);
    };
  
    // Sort transactions based on selected field (date or amount) and direction
    const sortedTransactions = [...transactions]
      .filter((txn) => !selectedBankId || txn.bankId === selectedBankId)
      .sort((a, b) => {
        const fieldA = sortField === 'date' ? new Date(a.date).getTime() : parseFloat(a.amount.replace(/[^\d.-]/g, ''));
        const fieldB = sortField === 'date' ? new Date(b.date).getTime() : parseFloat(b.amount.replace(/[^\d.-]/g, ''));
        return sortDirection === 'asc' ? fieldA - fieldB : fieldB - fieldA;
      });

  // Calculate combined balance
  const combinedBalance = bankAccounts.reduce((acc, bank) => acc + bank.balance, 0);

  // Masked account number
  const maskAccountNumber = (accountNumber: string) => {
    return `****${accountNumber.slice(-4)}`;
  };

    // Function to handle opening the modal
    const handleSendMoneyClick = () => {
      setSendMoneyModalOpen(true); // Open the modal when Send Money is clicked
    };
  
    // Function to handle the modal submission (add logic for sending money here)
    const handleSendMoney = () => {
      console.log(`Sending ${amount} to ${beneficiary} from account ID ${selectedBankId}`);
      setSendMoneyModalOpen(false); // Close the modal after submitting
    };

    const handleAddAccountClick = () => {
      setOpenBankDialog(true); // Open the AddBankAccount dialog
    };
  

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        Bank Accounts
      </Typography>

      {/* Combined balance */}
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Combined Balance: €{combinedBalance.toLocaleString()}
      </Typography>

      {/* Horizontally scrollable list of bank accounts */}
      <Box sx={{ display: 'flex', overflowX: 'auto', marginBottom: 3 }}>
        {/* Card for adding a new account */}
        <Card
          sx={{
            minWidth: 150,
            minHeight: 100,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 2,
            cursor: 'pointer',
          }}
          onClick={handleAddAccountClick}
        >
          <CardContent>
            <IconButton>
              <AddIcon fontSize="large" />
            </IconButton>
            <Typography variant="body1" align="center">
              Add Account
            </Typography>
          </CardContent>
        </Card>
        <AddBankAccount open={openBankDialog} onClose={() => setOpenBankDialog(false)} />
        {bankAccounts.map((account) => (
  <Card
    key={account.id}
    sx={{
      minWidth: 200,
      minHeight: 160,
      marginRight: 2,
      cursor: 'pointer',
      backgroundColor: selectedBankId === account.id ? 'lightblue' : '#ffffff',
      color: '#000000',
      display: 'flex',
      flexDirection: 'column', // Stack logo on top of text
      alignItems: 'center', // Center both logo and text
      padding: 2,
    }}
    onClick={() => setSelectedBankId(selectedBankId === account.id ? null : account.id)}  // Toggle selection
  >
    {/* Add the logo */}
    <Box sx={{ marginBottom: 2 }}>
      <img
        src={account.logo}
        alt={`${account.name} logo`}
        style={{ width: 60, height: 60 }} // Adjust logo size
      />
    </Box>

    {/* Card content */}
    <CardContent sx={{ textAlign: 'center' }}>
      <Typography variant="h6">{account.name}</Typography>
      <Typography variant="body2">Balance: €{account.balance.toLocaleString()}</Typography>
      <Typography variant="body2">Account: {maskAccountNumber(account.accountNumber)}</Typography>
    </CardContent>
  </Card>
))}
      </Box>

      {/* Show selected account details */}
      {selectedBankId && (
        <Box sx={{ marginBottom: 3 }}>
          {bankAccounts
            .filter((account) => account.id === selectedBankId)
            .map((account) => (
              <Box key={account.id}>
                <Typography variant="body1">Account Number: {account.accountNumber}</Typography>
                <Typography variant="body1">Account Type: {account.accountType}</Typography>
                <Typography variant="body1">Balance: €{account.balance.toLocaleString()}</Typography>
                <Button variant="contained" sx={{ mt: 2 }} onClick={handleSendMoneyClick}>
                  Send Money
                </Button>
              </Box>
            ))}
        </Box>
      )}

      {/* Modal for Sending Money */}
      <Modal open={sendMoneyModalOpen} onClose={() => setSendMoneyModalOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          {/* Selected Bank Info */}
          {selectedBankId && bankAccounts.filter((account) => account.id === selectedBankId).map((account) => (
            <Box key={account.id} sx={{ marginBottom: 2 }}>
              <Typography variant="h6">From: {account.name}</Typography>
              <Typography variant="body2">Balance: €{account.balance.toLocaleString()}</Typography>
            </Box>
          ))}

          {/* Beneficiary and Transfer Amount */}
          <TextField
            fullWidth
            label="Beneficiary  IBAN"
            value={beneficiary}
            onChange={(e) => setBeneficiary(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            sx={{ marginBottom: 2 }}
          />

          <Button variant="contained" fullWidth onClick={handleSendMoney}>
            Confirm Transfer
          </Button>
        </Box>
      </Modal>

      {/* Transactions table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="button" onClick={() => handleSort('date')} sx={{ cursor: 'pointer' }}>
                  Date {sortField === 'date' && (sortDirection === 'asc' ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />)}
                </Typography>
              </TableCell>
              <TableCell>Description</TableCell>
              <TableCell>
                <Typography variant="button" onClick={() => handleSort('amount')} sx={{ cursor: 'pointer' }}>
                  Amount {sortField === 'amount' && (sortDirection === 'asc' ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />)}
                </Typography>
              </TableCell>
              <TableCell>Bank</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedTransactions.map((txn) => {
              const bank = bankAccounts.find((acc) => acc.id === txn.bankId);
              return (
                <TableRow key={txn.id}>
                  <TableCell>{txn.date}</TableCell>
                  <TableCell>{txn.description}</TableCell>
                  <TableCell>{txn.amount}</TableCell>
                  <TableCell>{bank?.name}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default BankAccountsPage;