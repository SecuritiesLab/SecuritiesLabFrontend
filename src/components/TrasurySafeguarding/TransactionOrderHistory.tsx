import React from 'react';
import { Box, Typography, Button, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import { jsPDF } from 'jspdf';

interface OrderHistoryProps {
  data: Array<{ id: number; date: string; fundName: string; action: string; amount: string }>;
}

const TransactionOrderHistory: React.FC<OrderHistoryProps> = ({ data }) => {
  const downloadCSV = (data: Array<{ [key: string]: string | number }>, filename: string) => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, filename);
  };

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
    <Box sx={{ border: '1px solid #4a4a4a', borderRadius: 2, padding: 2 }}>
      <Typography
        variant="h6"
        sx={{
          color: 'lightblue',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 1,
        }}
      >
        Order History
        <Box>
          <Button onClick={() => downloadCSV(data, 'Order_history.csv')}>CSV</Button>
          <Button onClick={() => downloadPDF('Order History', data)}>PDF</Button>
        </Box>
      </Typography>
      <Divider sx={{ my: 1, backgroundColor: 'lightblue' }} />
      <TableContainer
        component={Paper}
        sx={{
          maxHeight: 300,
          overflow: 'auto',
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Fund</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((txn) => (
              <TableRow key={txn.id}>
                <TableCell>{txn.date}</TableCell>
                <TableCell>{txn.fundName}</TableCell>
                <TableCell>{txn.action}</TableCell>
                <TableCell>{txn.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TransactionOrderHistory;