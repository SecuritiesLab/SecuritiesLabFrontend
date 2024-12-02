import React from 'react';
import { Box, Typography, Divider, Button } from '@mui/material';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import { jsPDF } from 'jspdf';

interface HistoricalEarningsProps {
  data: Array<{ Label: string; Value: string }>;
}

const TreasuryHistoricalEarnings: React.FC<HistoricalEarningsProps> = ({ data }) => {
  const downloadCSV = (data: Array<{ [key: string]: string }>, filename: string) => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, filename);
  };

  const downloadPDF = (title: string, data: Array<{ [key: string]: string }>) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(title, 10, 10);
    doc.setFontSize(12);

    data.forEach((item, index) => {
      const y = 20 + index * 10;
      doc.text(`${item.Label}: ${item.Value}`, 10, y);
    });

    doc.save(`${title}.pdf`);
  };

  return (
    <Box sx={{ border: '1px solid #4a4a4a', borderRadius: 2, padding: 3, backgroundColor: '#1e1e1e', mt: 3, mb: 3 }}>
      <Typography variant="h6" sx={{ color: 'lightblue', display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        Historical Earnings
        <Box>
          <Button onClick={() => downloadCSV(data, 'HistoricalEarnings.csv')}>CSV</Button>
          <Button onClick={() => downloadPDF('Historical Earnings', data)}>PDF</Button>
        </Box>
      </Typography>
      <Divider sx={{ my: 1, backgroundColor: 'lightblue' }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 2 }}>
        {data.map((item, index) => (
          <Box key={index} sx={{ textAlign: 'center' }}>
            <Typography variant="subtitle1" color="lightgray">
              {item.Label}
            </Typography>
            <Typography variant="h6" sx={{ color: 'lightblue' }}>
              {item.Value}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TreasuryHistoricalEarnings;