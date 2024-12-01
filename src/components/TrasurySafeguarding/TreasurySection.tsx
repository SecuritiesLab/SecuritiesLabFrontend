import React, {useState} from 'react';
import { Box, Grid, FormControl,InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
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

const currencyData = {
  EUR: {
    analytics: {
      totalAmountAvailable: '1,000,000€',
      totalAmountInvested: '500,000€',
      totalAmountRedeemed: '200,000€',
      totalYieldEarned: '20,000€',
    },
    orderHistory: [
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
    ],
    yieldHistory: [
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
    ],
  },
  USD: {
    analytics: {
      totalAmountAvailable: '$1,000,000',
      totalAmountInvested: '$600,000',
      totalAmountRedeemed: '$250,000',
      totalYieldEarned: '$24,000',
    },
    orderHistory: [
      { id: 1, date: '2024-10-01', fundName: 'Vanguard USD Liquidity Fund', action: 'Invested', amount: '$200000' },
      { id: 2, date: '2024-10-02', fundName: 'Schwab USD Fund', action: 'Redeemed', amount: '$75000' },
      // Add more USD data...
    ],
    yieldHistory: [
      { id: 1, date: '2024-10-01', fundName: 'Vanguard USD Liquidity Fund', yield: '$3000' },
      { id: 2, date: '2024-10-02', fundName: 'Schwab USD Fund', yield: '$1500' },
      // Add more USD data...
    ],
  },
  GBP: {
    analytics: {
      totalAmountAvailable: '£1,000,000',
      totalAmountInvested: '£450,000',
      totalAmountRedeemed: '£180,000',
      totalYieldEarned: '£18,000',
    },
    orderHistory: [
      { id: 1, date: '2024-10-01', fundName: 'Fidelity GBP Liquidity Fund', action: 'Invested', amount: '£100000' },
      { id: 2, date: '2024-10-02', fundName: 'BlackRock GBP Fund', action: 'Redeemed', amount: '£50000' },
      // Add more GBP data...
    ],
    yieldHistory: [
      { id: 1, date: '2024-10-01', fundName: 'Fidelity GBP Liquidity Fund', yield: '£1500' },
      { id: 2, date: '2024-10-02', fundName: 'BlackRock GBP Fund', yield: '£1200' },
      // Add more GBP data...
    ],
  },
};

const currencyEarningsData = {
  EUR: {
    yieldGeneratedSoFar: '€47,817',
    earningsSinceInception: '€47,817',
    earningsThisYear: '€32,069',
    earningsThisMonth: '€4,070',
    earningsToday: '€135',
  },
  USD: {
    yieldGeneratedSoFar: '$50,000',
    earningsSinceInception: '$50,000',
    earningsThisYear: '$33,500',
    earningsThisMonth: '$4,500',
    earningsToday: '$150',
  },
  GBP: {
    yieldGeneratedSoFar: '£42,500',
    earningsSinceInception: '£42,500',
    earningsThisYear: '£30,000',
    earningsThisMonth: '£3,800',
    earningsToday: '£120',
  },
};

const TreasurySection: React.FC<SectionProps> = ({ funds, handleInvestClick, handleRedeemClick }) => {

  const [selectedCurrency, setSelectedCurrency] = useState<'EUR' | 'USD' | 'GBP'>('EUR');

  const yieldGeneratedSoFar = currencyEarningsData[selectedCurrency].yieldGeneratedSoFar;
  const earningsSinceInception = yieldGeneratedSoFar;
  const earningsThisYear = currencyEarningsData[selectedCurrency].earningsThisYear;        
  const earningsThisMonth = currencyEarningsData[selectedCurrency].earningsThisMonth;         
  const earningsToday = currencyEarningsData[selectedCurrency].earningsToday;  



  const historicalEarningsData = [
    { Label: 'Earnings Since Inception', Value: earningsSinceInception },
    { Label: 'Earnings This Year', Value: earningsThisYear },
    { Label: 'Earnings This Month', Value: earningsThisMonth },
    { Label: 'Earnings Today', Value: earningsToday },
  ];


  
  const euroFunds = funds.filter((fund) => fund.currency === 'EUR');

  const handleCurrencyChange = (event: SelectChangeEvent<'EUR' | 'USD' | 'GBP'>) => {
    setSelectedCurrency(event.target.value as 'EUR' | 'USD' | 'GBP');
  };

  const currentData = currencyData[selectedCurrency];

    return (
    <Box>

<FormControl fullWidth variant="outlined" sx={{ marginBottom: 3 }}>
        <InputLabel>Currency</InputLabel>
        <Select value={selectedCurrency} onChange={handleCurrencyChange} label="Currency">
          <MenuItem value="EUR">Euro (€)</MenuItem>
          <MenuItem value="USD">US Dollar ($)</MenuItem>
          <MenuItem value="GBP">British Pound (£)</MenuItem>
        </Select>
      </FormControl>
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
        <TreasuryAnalytics analyticsData={currentData.analytics} />
</Grid>
      </Grid>

      <Box>
  <TreasuryHistoricalEarnings data={historicalEarningsData} />
</Box>

      {/* Order and Yield History */}
      <Grid container spacing={2} sx={{ marginTop: 3 }}>
  <Grid item xs={12} md={6}>
    <TransactionOrderHistory data={currentData.orderHistory} />
  </Grid>
  <Grid item xs={12} md={6}>
    <TransactionYieldHistory data={currentData.yieldHistory} />
  </Grid>
</Grid>
    </Box>
  );
};

export default TreasurySection;