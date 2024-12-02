import React from 'react';
import { Box, Typography, Button, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import { jsPDF } from 'jspdf';

interface YieldHistoryProps {
  data: Array<{ id: number; date: string; fundName: string; yield: string }>;
}

const TransactionYieldHistory: React.FC<YieldHistoryProps> = ({ data }) => {
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
        Yield History
        <Box>
          <Button onClick={() => downloadCSV(data, 'Yield_history.csv')}>CSV</Button>
          <Button onClick={() => downloadPDF('Yield History', data)}>PDF</Button>
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
              <TableCell>Yield</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((yieldData) => (
              <TableRow key={yieldData.id}>
                <TableCell>{yieldData.date}</TableCell>
                <TableCell>{yieldData.fundName}</TableCell>
                <TableCell>{yieldData.yield}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TransactionYieldHistory;