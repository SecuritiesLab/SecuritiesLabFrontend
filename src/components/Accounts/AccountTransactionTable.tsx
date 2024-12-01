import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Box } from '@mui/material';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';

interface Transaction {
  id: number;
  bankId: number;
  date: string;
  description: string;
  amount: string;
  type: string;
}

interface BankAccount {
    id: number;
    name: string;
    balance: number;
    accountNumber: string;
    accountType: string;
    logo: string;
  }

interface TransactionTableProps {
  transactions: Transaction[];
  bankAccounts: BankAccount[]
}

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions, bankAccounts }) => {
  const [sortField, setSortField] = useState<'date' | 'amount'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: 'date' | 'amount') => {
    const isSameField = sortField === field;
    setSortDirection(isSameField ? (sortDirection === 'asc' ? 'desc' : 'asc') : 'asc');
    setSortField(field);
  };

  const sortedTransactions = [...transactions].sort((a, b) => {
    const fieldA = sortField === 'date' ? new Date(a.date).getTime() : parseFloat(a.amount.replace(/[^\d.-]/g, ''));
    const fieldB = sortField === 'date' ? new Date(b.date).getTime() : parseFloat(b.amount.replace(/[^\d.-]/g, ''));
    return sortDirection === 'asc' ? fieldA - fieldB : fieldB - fieldA;
  });

  return (
    <Box sx={{ border: '1px solid #4a4a4a', borderRadius: 2, boxShadow: 3, padding: 3 }}>
      <Typography variant="h6" sx={{ color: 'lightblue', mb: 1 }}>
        Transaction History
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography
                  variant="button"
                  onClick={() => handleSort('date')}
                  sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                >
                  Date {sortField === 'date' && (sortDirection === 'asc' ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />)}
                </Typography>
              </TableCell>
              <TableCell>Description</TableCell>
              <TableCell>
                <Typography
                  variant="button"
                  onClick={() => handleSort('amount')}
                  sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                >
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

export default TransactionTable;