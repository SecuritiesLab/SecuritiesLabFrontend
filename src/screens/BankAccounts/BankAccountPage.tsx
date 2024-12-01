import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TextField, MenuItem, Dialog, DialogTitle, DialogContent, Button, CircularProgress, Modal, FormControl,
  InputLabel,Select, InputAdornment, Divider, DialogActions, ButtonGroup,
  SelectChangeEvent
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
import TransactionTable from '../../components/Accounts/AccountTransactionTable';
import BankAccountList from '../../components/Accounts/BankAccountList';
import SendMoneyForm from '../../components/Accounts/SendMoneyModal';


const initialBeneficiaries = [
  { id: 1, name: 'John Doe', iban: 'DE89370400440532013000' },
  { id: 2, name: 'Jane Smith', iban: 'GB29NWBK60161331926819' },
];

const bankAccountsData = {
  EUR: [
    { id: 1, name: 'LHV Checking', balance: 120000, accountNumber: '0011223344', accountType: 'Checking', logo: 'https://cdn-logos.gocardless.com/ais/LHV_LHVBEE22.png' },
  { id: 2, name: 'Swedbank Savings', balance: 305000, accountNumber: '9988776655', accountType: 'Savings', logo: 'https://cdn-logos.gocardless.com/ais/SWEDBANK_SWEDNOKK.png' },
  { id: 3, name: 'Revolut Business', balance: 822817, accountNumber: '5566778899', accountType: 'Business', logo: 'https://storage.googleapis.com/gc-prd-institution_icons-production/UK/PNG/revolut.png' },
  { id: 4, name: 'Wise Startup', balance: 500000, accountNumber: '7766554433', accountType: 'Business', logo: 'https://storage.googleapis.com/gc-prd-institution_icons-production/UK/PNG/wise.png' },
  { id: 5, name: 'N26 Personal Vault', balance: 300000, accountNumber: '0099887766', accountType: 'Savings', logo: 'https://storage.googleapis.com/gc-prd-institution_icons-production/DE/PNG/n26.png' }, ],
  USD: [
    { id: 3, name: 'HSBC Business', balance: 150000, accountNumber: '1122334455', accountType: 'Business', logo: 'https://storage.googleapis.com/gc-prd-institution_icons-production/UK/PNG/hsbcpersonal.png' },
    { id: 4, name: 'Wise Startup', balance: 50000, accountNumber: '6677889900', accountType: 'Personal', logo: 'https://storage.googleapis.com/gc-prd-institution_icons-production/UK/PNG/wise.png' },
  ],
  GBP: [
    { id: 5, name: 'HSBC Current', balance: 80000, accountNumber: '5566778899', accountType: 'Current', logo: 'https://storage.googleapis.com/gc-prd-institution_icons-production/UK/PNG/hsbcpersonal.png' },
    { id: 6, name: 'Barclays Savings', balance: 120000, accountNumber: '0099887766', accountType: 'Savings', logo: 'https://storage.googleapis.com/gc-prd-institution_icons-production/UK/PNG/barclayscorporate.png' },
  ],
};

// Dummy data for transactions in EUR, USD, GBP
const transactionsData = {
  EUR: [
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
  ],
  USD: [
    { id: 3, bankId: 3, date: '2024-10-03', description: 'Investment in Stocks', amount: '-$10,000', type: 'Debit' },
    { id: 4, bankId: 4, date: '2024-10-04', description: 'Client Payment Received', amount: '$25,000', type: 'Credit' },
  ],
  GBP: [
    { id: 5, bankId: 5, date: '2024-10-05', description: 'Investment in Mutual Fund', amount: '-£15,000', type: 'Debit' },
    { id: 6, bankId: 6, date: '2024-10-06', description: 'Salary Payment Received', amount: '£40,000', type: 'Credit' },
  ],
};

const receivingCurrencies = ['EUR', 'USD', 'GBP'];

const BankAccountsPage = () => {
  const [selectedBankId, setSelectedBankId] = useState<number | null>(null);  // Allows both null and number
  const [openBankDialog, setOpenBankDialog] = useState(false); // State for bank selection dialog
  const [selectedBank, setSelectedBank] = useState<string | null>(null); // Selected bank institution
  const [sortField, setSortField] = useState<'date' | 'amount'>('date');  // Sorting state
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc'); 
  const [amount, setAmount] = useState(''); 
  const [selectedBeneficiary, setSelectedBeneficiary] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('');
  const [reference, setReference] = useState('');
  const todayDate = new Date().toISOString().split('T')[0];
  const [beneficiaries, setBeneficiaries] = useState(initialBeneficiaries);
  const [openAddBeneficiaryDialog, setOpenAddBeneficiaryDialog] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<'EUR' | 'USD' | 'GBP'>('EUR');


  // Masked account number
  const maskAccountNumber = (accountNumber: string) => {
    return `****${accountNumber.slice(-4)}`;
  };
    const handleAddAccountClick = () => {
      setOpenBankDialog(true); // Open the AddBankAccount dialog
    };


    const handleCurrencyChange = (event: SelectChangeEvent<'EUR' | 'USD' | 'GBP'>) => {
      setSelectedCurrency(event.target.value as 'EUR' | 'USD' | 'GBP');
    };

    const getDisplayedBalance = () => {
      const accounts = bankAccountsData[selectedCurrency];
      if (selectedBankId) {
        const account = accounts.find((acc) => acc.id === selectedBankId);
        return account ? account.balance : 0;
      }
      return accounts.reduce((acc, bank) => acc + bank.balance, 0);
    };

    const symbols: Record<string, string> = {
      EUR: '€',
      USD: '$',
      GBP: '£',
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
  <FormControl fullWidth variant="outlined" sx={{ marginBottom: 3 }}>
        <InputLabel>Currency</InputLabel>
        <Select value={selectedCurrency} onChange={handleCurrencyChange} label="Currency">
          <MenuItem value="EUR">Euro (€)</MenuItem>
          <MenuItem value="USD">US Dollar ($)</MenuItem>
          <MenuItem value="GBP">British Pound (£)</MenuItem>
        </Select>
      </FormControl>
</Box>

<BankAccountList
  bankAccounts={bankAccountsData[selectedCurrency]}
  selectedBankId={selectedBankId}
  onSelectBank={(bankId) => setSelectedBankId(bankId)}
  onAddAccount={handleAddAccountClick}
  selectedCurrency={selectedCurrency}
/>

      <Box sx={{ flex: 1 }}>
  <TransactionTable transactions={transactionsData[selectedCurrency]} bankAccounts={bankAccountsData[selectedCurrency]} />
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
            Balance: {symbols[selectedCurrency]} {getDisplayedBalance().toLocaleString()}
          </Typography>
          {selectedBankId && (
            <>
  <Typography variant="body2">
  Account: {bankAccountsData[selectedCurrency].find((acc) => acc.id === selectedBankId)?.name}
</Typography>
<Typography variant="body2">
  Account Number: ****
  {bankAccountsData[selectedCurrency]
    .find((acc) => acc.id === selectedBankId)
    ?.accountNumber.slice(-4)}
</Typography>
            </>
          )}
        </Box>

        <SendMoneyForm
  bankAccounts={bankAccountsData[selectedCurrency]}
  beneficiaries={beneficiaries}
  receivingCurrencies={receivingCurrencies}
  selectedCurrency = {selectedCurrency}
  onAddBeneficiary={(name, iban) => {
    setBeneficiaries([...beneficiaries, { id: beneficiaries.length + 1, name, iban }]);
  }}
  onConfirmTransfer={(data) => {
    console.log('Transfer Data:', data);
  }}
/>
    </Box>
      </Box>
  );
};

export default BankAccountsPage;