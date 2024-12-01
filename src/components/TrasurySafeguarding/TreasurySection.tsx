import React from 'react';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Card, Grid, Divider } from '@mui/material';
import { SectionProps } from '../../screens/TreasurySafeguarding/TreasurySafeguardingPage';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import { jsPDF } from 'jspdf';
import EuroFundsPieChart from '../Dashboard/EuroFundsPieChart';
import FundList from './FundList';
import TreasuryAnalytics from './TreasuryAnalytics';
import TreasuryHistoricalEarnings from './TreasuryHistoricalEarnings';
import TransactionOrderHistory from './TransactionOrderHistory';
import TransactionYieldHistory from './TransactionYieldHistory';

const analyticsData = 
  {  totalAmountAvailable: "1,000,000€",
    totalAmountInvested: "500,000€",
    totalAmountRedeemed: "200,000€",
    totalYieldEarned: "20,000€"}

    // Dummy data for orders and yield history (separate for Treasury and Safeguarding)
    const orderHistory = [
      { id: 1, date: '2024-10-01', fundName: 'Fidelity ILF - The Euro Fund', action: 'Invested', amount: '€150000' },
      { id: 2, date: '2024-10-02', fundName: 'abrdn Liquidity Fund (Lux) - Euro Fund', action: 'Redeemed', amount: '€50000' },
      { id: 3, date: '2024-10-03', fundName: 'BlackRock ICS Euro Government Liquidity Fund', action: 'Invested', amount: '€200000' },
      { id: 4, date: '2024-10-04', fundName: 'Fidelity ILF - The Euro Fund', action: 'Redeemed', amount: '€30000' },
      { id: 5, date: '2024-10-05', fundName: 'abrdn Liquidity Fund (Lux) - Euro Fund', action: 'Invested', amount: '€120000' },
      { id: 6, date: '2024-10-06', fundName: 'BlackRock ICS Euro Government Liquidity Fund', action: 'Invested', amount: '€100000' },
      { id: 7, date: '2024-10-07', fundName: 'Fidelity ILF - The Euro Fund', action: 'Redeemed', amount: '€80000' },
      { id: 8, date: '2024-10-08', fundName: 'abrdn Liquidity Fund (Lux) - Euro Fund', action: 'Invested', amount: '€250000' },
      { id: 9, date: '2024-10-09', fundName: 'BlackRock ICS Euro Government Liquidity Fund', action: 'Redeemed', amount: '€70000' },
      { id: 10, date: '2024-10-10', fundName: 'Fidelity ILF - The Euro Fund', action: 'Invested', amount: '€140000' },
      { id: 11, date: '2024-10-11', fundName: 'abrdn Liquidity Fund (Lux) - Euro Fund', action: 'Invested', amount: '€60000' },
      { id: 12, date: '2024-10-12', fundName: 'BlackRock ICS Euro Government Liquidity Fund', action: 'Redeemed', amount: '€30000' },
      { id: 13, date: '2024-10-13', fundName: 'Fidelity ILF - The Euro Fund', action: 'Redeemed', amount: '€20000' },
      { id: 14, date: '2024-10-14', fundName: 'abrdn Liquidity Fund (Lux) - Euro Fund', action: 'Invested', amount: '€150000' },
      { id: 15, date: '2024-10-15', fundName: 'BlackRock ICS Euro Government Liquidity Fund', action: 'Invested', amount: '€50000' },
      { id: 16, date: '2024-10-16', fundName: 'Fidelity ILF - The Euro Fund', action: 'Redeemed', amount: '€40000' },
      { id: 17, date: '2024-10-17', fundName: 'abrdn Liquidity Fund (Lux) - Euro Fund', action: 'Invested', amount: '€180000' },
      { id: 18, date: '2024-10-18', fundName: 'BlackRock ICS Euro Government Liquidity Fund', action: 'Redeemed', amount: '€20000' },
      { id: 19, date: '2024-10-19', fundName: 'Fidelity ILF - The Euro Fund', action: 'Invested', amount: '€100000' },
      { id: 20, date: '2024-10-20', fundName: 'abrdn Liquidity Fund (Lux) - Euro Fund', action: 'Redeemed', amount: '€90000' },
    ];

    const yieldHistory = [
      { id: 1, date: '2024-10-01', fundName: 'Fidelity ILF - The Euro Fund', yield: '€1500' },
      { id: 2, date: '2024-10-02', fundName: 'abrdn Liquidity Fund (Lux) - Euro Fund', yield: '€2500' },
      { id: 3, date: '2024-10-03', fundName: 'BlackRock ICS Euro Government Liquidity Fund', yield: '€2000' },
      { id: 4, date: '2024-10-04', fundName: 'Fidelity ILF - The Euro Fund', yield: '€1800' },
      { id: 5, date: '2024-10-05', fundName: 'abrdn Liquidity Fund (Lux) - Euro Fund', yield: '€3000' },
      { id: 6, date: '2024-10-06', fundName: 'BlackRock ICS Euro Government Liquidity Fund', yield: '€1000' },
      { id: 7, date: '2024-10-07', fundName: 'Fidelity ILF - The Euro Fund', yield: '€1200' },
      { id: 8, date: '2024-10-08', fundName: 'abrdn Liquidity Fund (Lux) - Euro Fund', yield: '€3500' },
      { id: 9, date: '2024-10-09', fundName: 'BlackRock ICS Euro Government Liquidity Fund', yield: '€1700' },
      { id: 10, date: '2024-10-10', fundName: 'Fidelity ILF - The Euro Fund', yield: '€2000' },
      { id: 11, date: '2024-10-11', fundName: 'abrdn Liquidity Fund (Lux) - Euro Fund', yield: '€2800' },
      { id: 12, date: '2024-10-12', fundName: 'BlackRock ICS Euro Government Liquidity Fund', yield: '€1300' },
      { id: 13, date: '2024-10-13', fundName: 'Fidelity ILF - The Euro Fund', yield: '€1500' },
      { id: 14, date: '2024-10-14', fundName: 'abrdn Liquidity Fund (Lux) - Euro Fund', yield: '€3000' },
      { id: 15, date: '2024-10-15', fundName: 'BlackRock ICS Euro Government Liquidity Fund', yield: '€1600' },
      { id: 16, date: '2024-10-16', fundName: 'Fidelity ILF - The Euro Fund', yield: '€1800' },
      { id: 17, date: '2024-10-17', fundName: 'abrdn Liquidity Fund (Lux) - Euro Fund', yield: '€3200' },
      { id: 18, date: '2024-10-18', fundName: 'BlackRock ICS Euro Government Liquidity Fund', yield: '€1500' },
      { id: 19, date: '2024-10-19', fundName: 'Fidelity ILF - The Euro Fund', yield: '€1900' },
      { id: 20, date: '2024-10-20', fundName: 'abrdn Liquidity Fund (Lux) - Euro Fund', yield: '€2900' },
    ];
  

const TreasurySection: React.FC<SectionProps> = ({ funds, handleInvestClick, handleRedeemClick }) => {

  const yieldGeneratedSoFar = '€47,817';
  const earningsSinceInception = yieldGeneratedSoFar;
  const earningsThisYear = '€32,069';        
  const earningsThisMonth = '€4,070';         
  const earningsToday = '€135';  



  const historicalEarningsData = [
    { Label: 'Earnings Since Inception', Value: earningsSinceInception },
    { Label: 'Earnings This Year', Value: earningsThisYear },
    { Label: 'Earnings This Month', Value: earningsThisMonth },
    { Label: 'Earnings Today', Value: earningsToday },
  ];


  const downloadCSV = (data: Array<{ [key: string]: string | number }>, filename: string) => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, filename);
  };
  
  const euroFunds = funds.filter((fund) => fund.currency === 'EUR');
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
    <Box>
      {/* Funds List */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
        <FundList
            funds={euroFunds}
            handleInvestClick={handleInvestClick}
            handleRedeemClick={handleRedeemClick}
          />
        </Grid>

        {/* Analytics */}
        <Grid item xs={12} md={6}>
        <TreasuryAnalytics analyticsData={analyticsData} />
</Grid>
      </Grid>

      <Box>
  <TreasuryHistoricalEarnings data={historicalEarningsData} />
</Box>

      {/* Order and Yield History */}
      <Grid container spacing={2} sx={{ marginTop: 3 }}>
  <Grid item xs={12} md={6}>
    <TransactionOrderHistory data={orderHistory} />
  </Grid>
  <Grid item xs={12} md={6}>
    <TransactionYieldHistory data={yieldHistory} />
  </Grid>
</Grid>
    </Box>
  );
};

export default TreasurySection;