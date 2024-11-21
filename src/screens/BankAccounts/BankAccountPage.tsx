import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TextField, MenuItem, Dialog, DialogTitle, DialogContent, Button, CircularProgress, Modal, FormControl,
  InputLabel,Select, InputAdornment, Divider, DialogActions
 } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import AddBankAccount from '../../components/Accounts/AddBankAccount';
import PersonIcon from '@mui/icons-material/Person';
import EuroIcon from '@mui/icons-material/Euro';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AddBeneficiaryModal from '../../components/Accounts/AddBeneficiaryModal';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import { jsPDF } from 'jspdf';

// Dummy data for bank accounts
const bankAccounts = [
  { id: 1, name: 'LHV Checking', balance: 120000, accountNumber: '0011223344', accountType: 'Checking', logo: 'https://cdn-logos.gocardless.com/ais/LHV_LHVBEE22.png' },
  { id: 2, name: 'Swedbank Savings', balance: 305000, accountNumber: '9988776655', accountType: 'Savings', logo: 'https://cdn-logos.gocardless.com/ais/SWEDBANK_SWEDNOKK.png' },
  { id: 3, name: 'Revolut Business', balance: 822817, accountNumber: '5566778899', accountType: 'Business', logo: 'https://storage.googleapis.com/gc-prd-institution_icons-production/UK/PNG/revolut.png' },
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

const initialBeneficiaries = [
  { id: 1, name: 'John Doe', iban: 'DE89370400440532013000' },
  { id: 2, name: 'Jane Smith', iban: 'GB29NWBK60161331926819' },
];

const receivingCurrencies = ['EUR', 'USD', 'GBP'];

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
  const [selectedBeneficiary, setSelectedBeneficiary] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('EUR');
  const [reference, setReference] = useState('');
  const todayDate = new Date().toISOString().split('T')[0];
  const [beneficiaries, setBeneficiaries] = useState(initialBeneficiaries);
  const [newBeneficiaryName, setNewBeneficiaryName] = useState('');
  const [newBeneficiaryIBAN, setNewBeneficiaryIBAN] = useState('');
  const [openAddBeneficiaryDialog, setOpenAddBeneficiaryDialog] = useState(false);
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

    const getDisplayedBalance = () => {
      if (selectedBankId) {
        const account = bankAccounts.find((acc) => acc.id === selectedBankId);
        return account ? account.balance : 0;
      }
      return bankAccounts.reduce((acc, bank) => acc + bank.balance, 0);
    };

    const handleAddBeneficiary = () => {
      const newBeneficiary = {
        id: beneficiaries.length + 1,
        name: newBeneficiaryName,
        iban: newBeneficiaryIBAN,
      };
      setBeneficiaries([...beneficiaries, newBeneficiary]);
      setOpenAddBeneficiaryDialog(false);
      setNewBeneficiaryName('');
      setNewBeneficiaryIBAN('');
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
    <Box sx={{ display: 'flex', minHeight: '50vh',flexDirection: { xs: 'column', lg: 'row' }, }}>
    <Box sx={{ flex: 1, padding: 2, marginRight: { lg: '320px' }, mb: { xs: 3, lg: 0 }, width:'60vw'}}>
    <Box sx={{ mb: 3 }}>
  <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
    <AccountBalanceIcon sx={{ color: 'lightblue', fontSize: 32, mr: 1 }} />
    <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'lightblue' }}>
      XYZ Payments UAB
    </Typography>
  </Box>
  <Typography variant="subtitle1" sx={{ color: 'gray' }}>
    Company Bank Accounts
  </Typography>
  <Divider sx={{ my: 2, backgroundColor: 'lightblue' }} />
</Box>

      {/* Horizontally scrollable list of bank accounts */}
      <Box sx={{  border: '1px solid #4a4a4a', borderRadius:2,  borderWidth:2, padding:3 ,display: 'flex', overflowX: 'auto', marginBottom: 4}}>
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
    backgroundColor: 'lightblue',
    borderRadius: 2, // Optional, for a rounded look
  }}
  onClick={handleAddAccountClick}
>
  <CardContent
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <IconButton>
        <AddIcon fontSize="large" />
      </IconButton>
      <Typography variant="body1" align="center">
        Add Account
      </Typography>
    </Box>
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
      boxShadow: selectedBankId === account.id ? '0 4px 10px rgba(0, 0, 0, 0.1)' : ''
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

      <Box sx={{ border: '1px solid #4a4a4a', borderWidth:2, borderRadius: 2, boxShadow: 3, padding: 3 }}>
        <Typography variant="h6" sx={{ color: 'lightblue', display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>Transaction History
        <Box>
                <Button onClick={() => downloadCSV(sortedTransactions, 'transactions.csv')}>CSV</Button>
                <Button onClick={() => downloadPDF('Transactions', sortedTransactions)}>PDF</Button>
              </Box>
        </Typography>
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
    </Box>
    <Box
 sx={{
  width: { xs: '100%', lg: '300px' },
  padding: 1,
  borderRadius: 2,
  position: { lg: 'fixed' }, // Only fixed on large screens
  top: { lg: '10%' },
  right: { lg: '20px' },
  backgroundColor: '#1e1e1e',
  overflowY: { lg: 'auto' },
  maxHeight: { lg: '80vh' },
  marginTop: { xs: 3, lg: 0 },
}}
    >

<Box sx={{ border: '1px solid #4a4a4a', borderRadius: 2, padding: 2, marginBottom: 3 }}>
          <Typography variant="h6" sx={{ color: 'lightblue', marginBottom: 2 }}>Account Details</Typography>
          <Typography variant="body2">
            Balance: €{getDisplayedBalance().toLocaleString()}
          </Typography>
          {selectedBankId && (
            <>
              <Typography variant="body2">Account:  {bankAccounts.find((acc) => acc.id === selectedBankId)?.name}</Typography>
              <Typography variant="body2">
                Account Number: ****
                {bankAccounts.find((acc) => acc.id === selectedBankId)?.accountNumber.slice(-4)}
              </Typography>
            </>
          )}
        </Box>

        <Box sx={{ border: '1px solid #4a4a4a', borderRadius: 2, padding: 2, marginBottom: 3 }}>
      <Typography variant="h6" sx={{ color: 'lightblue', marginBottom: 2 }}>Send Money</Typography>

      {/* Payment Details Section */}
      <Typography variant="subtitle1" sx={{ color: 'lightgray', marginBottom: 2 }}>Payment Details</Typography>
      
      <Box sx={{ marginBottom: 2 }}>
        <TextField
          fullWidth
          select
          label="From Account"
          value={selectedAccount}
          onChange={(e) => setSelectedAccount(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountBalanceIcon  sx={{color: 'lightblue'}} />
              </InputAdornment>
            ),
          }}
        >
          {bankAccounts.map((account) => (
            <MenuItem key={account.id} value={account.name}>
              {account.name}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <Box sx={{ marginBottom: 2 }}>
        <TextField
          fullWidth
          label="Amount (€)"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EuroIcon  sx={{color: 'lightblue'}}/>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Receiver Section */}
      <Typography variant="subtitle1" sx={{ color: 'lightgray', marginBottom: 2 }}>Receiver</Typography>
      <Box sx={{ marginBottom: 2 }}>
        <TextField
          fullWidth
          select
          label="Beneficiary"
          value={selectedBeneficiary}
          onChange={(e) => setSelectedBeneficiary(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon sx={{ color: 'lightblue' }} />
              </InputAdornment>
            ),
          }}
        >
          {beneficiaries.map((beneficiary) => (
            <MenuItem key={beneficiary.id} value={beneficiary.name}>
              {beneficiary.name} - {beneficiary.iban}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {/* Separate "Add Beneficiary" Button */}
      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={() => setOpenAddBeneficiaryDialog(true)}
        sx={{ marginBottom: 3, color: 'lightblue', borderColor: 'lightblue' }}
      >
        Add Beneficiary
      </Button>

      <AddBeneficiaryModal open={openAddBeneficiaryDialog} onClose={() => setOpenAddBeneficiaryDialog(false)} />


      <Box sx={{ marginBottom: 2 }}>
        <TextField
          fullWidth
          select
          label="Receiving Currency"
          value={selectedCurrency}
          onChange={(e) => setSelectedCurrency(e.target.value)}
        >
          {receivingCurrencies.map((currency) => (
            <MenuItem key={currency} value={currency}>
              {currency}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {/* Additional Details Section */}
      <Typography variant="subtitle1" sx={{ color: 'lightgray', marginBottom: 2 }}>Additional Details</Typography>
      
      <Box sx={{ marginBottom: 2 }}>
        <TextField
          fullWidth
          label="Reference"
          value={reference}
          onChange={(e) => setReference(e.target.value)}
        />
      </Box>

      <Box sx={{ marginBottom: 3 }}>
        <TextField
          fullWidth
          label="Payment Date"
          value={todayDate}
          disabled
        />
      </Box>

      <Button variant="contained" fullWidth sx={{ backgroundColor: 'lightblue', color: '#000' }}>
        Confirm Transfer
      </Button>
    </Box>
    </Box>
      </Box>
  );
};

export default BankAccountsPage;