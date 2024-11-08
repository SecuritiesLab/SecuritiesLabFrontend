import React, { useState } from 'react';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Divider, Grid, Pagination, TextField, Modal } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import ManageDepositModal from '../../components/Deposits/ManageDepositModal';

const TOTAL_USERS_INVESTED = 10000;
const generateRandomUserId = () => Math.floor(100000 + Math.random() * 900000);
const generateRandomDate = () => {
  const today = new Date();
  const lastYear = new Date(today);
  lastYear.setFullYear(today.getFullYear() - 1);

  const randomTime = lastYear.getTime() + Math.random() * (today.getTime() - lastYear.getTime());
  return new Date(randomTime).toISOString().split('T')[0];
};

const dummyTransactions = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  user: generateRandomUserId(),
  action: index % 2 === 0 ? 'Deposited' : 'Withdrew',
  amount: `${(Math.random() * 10000 + 1000).toFixed(0)} €`,
  date: generateRandomDate(),
}));

interface ManageDepositModalProps {
  open: boolean;
  onClose: () => void;
  deposit: {
    name: string;
    amountInvested: string;
    manager: string;
    pricingPlans: {
      Free: number;
      Plus: number;
      Pro: number;
    };
  };
}

const ITEMS_PER_PAGE = 10;

const DepositDetailsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showManageModal, setShowManageModal] = useState(false);
  const location = useLocation();
  const { deposit } = location.state;
  const averageYield = '4.22%';
  const expectedEarnings = '€373,600';
  const totalUsersInvested = '10,000';
  const yieldGeneratedSoFar = '€100,000';
  const earningsSinceInception = yieldGeneratedSoFar;
  const earningsThisYear = '€150,000';        
  const earningsThisMonth = '€20,000';         
  const earningsToday = '€1,000';             

  const currentTransactions = dummyTransactions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Download as CSV
  const downloadCSV = (data: unknown[] | Papa.UnparseObject<unknown>, filename: string | undefined) => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, filename);
  };

  // Download as PDF
  const downloadPDF = (title: string | string[], data: any[]) => {
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

  // Prepare data for Analytics, Historical Analytics, and Transaction Table downloads
  const analyticsData = [
    { Label: 'Average Yield', Value: averageYield },
    { Label: 'Expected Earnings', Value: expectedEarnings },
    { Label: 'Total Users Invested', Value: totalUsersInvested },
    { Label: 'Yield Generated So Far', Value: yieldGeneratedSoFar },
  ];

  const historicalEarningsData = [
    { Label: 'Earnings Since Inception', Value: earningsSinceInception },
    { Label: 'Earnings This Year', Value: earningsThisYear },
    { Label: 'Earnings This Month', Value: earningsThisMonth },
    { Label: 'Earnings Today', Value: earningsToday },
  ];
  


  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>{deposit.name}</Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box sx={{ border: '1px solid #4a4a4a', borderRadius: 2, padding: 3, backgroundColor: '#1e1e1e' }}>
            <Typography variant="h6" sx={{ color: 'lightblue', mb: 1 }}>Deposit Details</Typography>
            <Divider sx={{ my: 1, backgroundColor: 'lightblue' }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography>Manager: {deposit.manager}</Typography>
              <Typography>Deposit Amount: {deposit.amountInvested}</Typography>
              <Typography>Yield for Free Users: {deposit.pricingPlans.Free}%</Typography>
              <Typography>Yield for Plus Users: {deposit.pricingPlans.Plus}%</Typography>
              <Typography>Yield for Pro Users: {deposit.pricingPlans.Pro}%</Typography>
            </Box>
            <Button variant="contained" onClick={() => setShowManageModal(true)} sx={{ mt: 2 }}>
              Manage Deposit
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ border: '1px solid #4a4a4a', borderRadius: 2, padding: 3, backgroundColor: '#1e1e1e', maxHeight: 300, overflowY: 'auto' }}>
            <Typography variant="h6" sx={{ color: 'lightblue', display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              Analytics
              <Box>
                <Button onClick={() => downloadCSV(analyticsData, 'Analytics.csv')}>CSV</Button>
                <Button onClick={() => downloadPDF('Analytics', analyticsData)}>PDF</Button>
              </Box>
            </Typography>
            <Divider sx={{ my: 1, backgroundColor: 'lightblue' }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {analyticsData.map((item, index) => (
                <Box key={index} sx={{ padding: 2, backgroundColor: '#2e2e2e', borderRadius: 1 }}>
                  <Typography variant="subtitle1" color="lightgray">{item.Label}</Typography>
                  <Typography variant="h6" sx={{ color: 'lightblue' }}>{item.Value}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ border: '1px solid #4a4a4a', borderRadius: 2, padding: 3, backgroundColor: '#1e1e1e', mt: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ color: 'lightblue', display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          Historical Earnings
        <Box>
                <Button onClick={() => downloadCSV(historicalEarningsData, 'historicalEarningsData.csv')}>CSV</Button>
                <Button onClick={() => downloadPDF('historicalEarningsData', historicalEarningsData)}>PDF</Button>
              </Box>
        </Typography>
        <Divider sx={{ my: 1, backgroundColor: 'lightblue' }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 2 }}>
          {historicalEarningsData.map((item, index) => (
            <Box key={index} sx={{ textAlign: 'center' }}>
              <Typography variant="subtitle1" color="lightgray">{item.Label}</Typography>
              <Typography variant="h6" sx={{ color: 'lightblue' }}>{item.Value}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Box sx={{ border: '1px solid #4a4a4a', borderRadius: 2, padding: 3, backgroundColor: '#1e1e1e', mt: 3 }}>
      <Typography variant="h6" sx={{ color: 'lightblue', display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        Transaction History
        <Box>
                <Button onClick={() => downloadCSV(dummyTransactions, 'Transactions.csv')}>CSV</Button>
                <Button onClick={() => downloadPDF('Transactions', dummyTransactions)}>PDF</Button>
              </Box>
              </Typography>
        <Divider sx={{ my: 1, backgroundColor: 'lightblue' }} />
        <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>User ID</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentTransactions.map((txn) => (
                <TableRow key={txn.id}>
                  <TableCell>{txn.user}</TableCell>
                  <TableCell>{txn.action}</TableCell>
                  <TableCell>{txn.amount}</TableCell>
                  <TableCell>{txn.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Pagination count={Math.ceil(dummyTransactions.length / ITEMS_PER_PAGE)} page={currentPage} onChange={(e, page) => setCurrentPage(page)} color="primary" />
        </Box>
      </Box>
      <ManageDepositModal
        open={showManageModal}
        onClose={() => setShowManageModal(false)}
        deposit={deposit}
      />
    </Box>
  );
};

export default DepositDetailsPage;