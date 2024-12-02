import React from 'react';
import { Box, Card, CardContent, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface BankAccount {
  id: number;
  name: string;
  balance: number;
  accountNumber: string;
  accountType: string;
  logo: string;
}

interface BankAccountListProps {
  bankAccounts: BankAccount[];
  selectedBankId: number | null;
  onSelectBank: (bankId: number | null) => void;
  onAddAccount: () => void;
  selectedCurrency: string;
}

const BankAccountList: React.FC<BankAccountListProps> = ({
  bankAccounts,
  selectedBankId,
  onSelectBank,
  onAddAccount,
  selectedCurrency
}) => {
  // Mask account numbers for display
  const maskAccountNumber = (accountNumber: string) => {
    return `****${accountNumber.slice(-4)}`;
  };

  const symbols: Record<string, string> = {
    EUR: '€',
    USD: '$',
    GBP: '£',
  };
  

  return (
    <Box
      sx={{
        border: '1px solid #4a4a4a',
        borderRadius: 2,
        borderWidth: 2,
        padding: 3,
        display: 'flex',
        overflowX: 'auto',
        marginBottom: 4,
      }}
    >
      {/* Add Account Card */}
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
          borderRadius: 2,
        }}
        onClick={onAddAccount}
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

      {/* List of Bank Accounts */}
      {bankAccounts.map((account) => (
        <Card
          key={account.id}
          sx={{
            minWidth: 200,
            maxWidth: 200,
            height: 300,
            marginRight: 2,
            cursor: 'pointer',
            backgroundColor: selectedBankId === account.id ? 'lightblue' : '#ffffff',
            color: '#000000',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 2,
            boxShadow:
              selectedBankId === account.id
                ? '0 4px 10px rgba(0, 0, 0, 0.1)'
                : '',
          }}
          onClick={() =>
            onSelectBank(selectedBankId === account.id ? null : account.id)
          }
        >
          {/* Logo */}
          <Box sx={{ marginBottom: 1 }}>
            <img
              src={account.logo}
              alt={`${account.name} logo`}
              style={{ width: 60, height: 60 }}
            />
          </Box>

          {/* Account Info */}
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h6">{account.name}</Typography>
            <Typography variant="body2">
              Balance: {symbols[selectedCurrency]}{account.balance.toLocaleString()}
            </Typography>
            <Typography variant="body2">
              Account: {maskAccountNumber(account.accountNumber)}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default BankAccountList;