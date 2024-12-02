import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  InputAdornment,
  Button,
} from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import EuroIcon from '@mui/icons-material/Euro';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import AddBeneficiaryModal from './AddBeneficiaryModal';
import CurrencyPoundIcon from '@mui/icons-material/CurrencyPound';
import PaymentsIcon from '@mui/icons-material/Payments';

interface Beneficiary {
  id: number;
  name: string;
  iban: string;
}

interface BankAccount {
  id: number;
  name: string;
}

interface SendMoneyFormProps {
  bankAccounts: BankAccount[];
  beneficiaries: Beneficiary[];
  receivingCurrencies: string[];
  selectedCurrency: string;
  onAddBeneficiary: (name: string, iban: string) => void;
  onConfirmTransfer: (data: {
    fromAccount: string;
    amount: string;
    beneficiary: string;
    currency: string;
    reference: string;
  }) => void;
}

const SendMoneyForm: React.FC<SendMoneyFormProps> = ({
  bankAccounts,
  beneficiaries,
  receivingCurrencies,
  selectedCurrency,
  onAddBeneficiary,
  onConfirmTransfer,
}) => {
  const [selectedAccount, setSelectedAccount] = useState('');
  const [selectedBeneficiary, setSelectedBeneficiary] = useState('');
  const [selectedReceivingCurrency, setSelectedReceivingCurrency] = useState('EUR');
  const [amount, setAmount] = useState('');
  const [reference, setReference] = useState('');
  const todayDate = new Date().toISOString().split('T')[0];
  const [openAddBeneficiaryDialog, setOpenAddBeneficiaryDialog] = useState(false);

  const handleConfirm = () => {
    onConfirmTransfer({
      fromAccount: selectedAccount,
      amount,
      beneficiary: selectedBeneficiary,
      currency: selectedReceivingCurrency,
      reference,
    });
  };

  const symbols: Record<string, string> = {
    EUR: '€',
    USD: '$',
    GBP: '£',
  };

  return (
    <Box sx={{ border: '1px solid #4a4a4a', borderRadius: 2, padding: 2, marginBottom: 3 }}>
      <Typography variant="h6" sx={{ color: 'lightblue', marginBottom: 2 }}>
        Send Money
      </Typography>

      {/* Payment Details Section */}
      <Typography variant="subtitle1" sx={{ color: 'lightgray', marginBottom: 2 }}>
        Payment Details
      </Typography>

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
                <AccountBalanceIcon sx={{ color: 'lightblue' }} />
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
          label={`Amount (${symbols[selectedCurrency] || selectedCurrency})`}
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PaymentsIcon sx={{ color: 'lightblue' }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Receiver Section */}
      <Typography variant="subtitle1" sx={{ color: 'lightgray', marginBottom: 2 }}>
        Receiver
      </Typography>
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
          value={selectedReceivingCurrency}
          onChange={(e) => setSelectedReceivingCurrency(e.target.value)}
        >
          {receivingCurrencies.map((currency) => (
            <MenuItem key={currency} value={currency}>
              {currency}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {/* Additional Details Section */}
      <Typography variant="subtitle1" sx={{ color: 'lightgray', marginBottom: 2 }}>
        Additional Details
      </Typography>

      <Box sx={{ marginBottom: 2 }}>
        <TextField
          fullWidth
          label="Reference"
          value={reference}
          onChange={(e) => setReference(e.target.value)}
        />
      </Box>

      <Box sx={{ marginBottom: 3 }}>
        <TextField fullWidth label="Payment Date" value={todayDate} disabled />
      </Box>

      <Button
        variant="contained"
        fullWidth
        sx={{ backgroundColor: 'lightblue', color: '#000' }}
        onClick={handleConfirm}
      >
        Confirm Transfer
      </Button>
    </Box>
  );
};

export default SendMoneyForm;