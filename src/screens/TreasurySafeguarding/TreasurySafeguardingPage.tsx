import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal, TextField, Card, Snackbar, Alert, MenuItem, Tabs, Tab } from '@mui/material';
import { useLocation } from 'react-router-dom';

// Dummy MMF data (9 funds)
const mmfFunds = [
    { id: 1, name: 'Fidelity ILF - The Euro Fund', sector: 'Money Market', yield: '4.5%', minInvestment: 5000, type: 'Fund', currency: 'EUR', logo: `${process.env.PUBLIC_URL}/logo/fidelityColor.png` },
    { id: 2, name: 'Fidelity ILF - The United States Dollar Fund', sector: 'Money Market', yield: '4.3%', minInvestment: 5000, type: 'Fund', currency: 'USD', logo: `${process.env.PUBLIC_URL}/logo/fidelityColor.png` },
    { id: 3, name: 'Fidelity ILF - The Sterling Fund', sector: 'Money Market', yield: '4.1%', minInvestment: 5000, type: 'Fund', currency: 'GBP', logo: `${process.env.PUBLIC_URL}/logo/fidelityColor.png` },
    { id: 4, name: 'abrdn Liquidity Fund (Lux) - US Dollar Fund', sector: 'Money Market', yield: '3.8%', minInvestment: 5000, type: 'Fund', currency: 'USD', logo: `${process.env.PUBLIC_URL}/logo/abrdn.png` },
    { id: 5, name: 'abrdn Liquidity Fund (Lux) - Sterling Fund', sector: 'Money Market', yield: '3.6%', minInvestment: 5000, type: 'Fund', currency: 'GBP', logo: `${process.env.PUBLIC_URL}/logo/abrdn.png` },
    { id: 6, name: 'abrdn Liquidity Fund (Lux) - Euro Fund', sector: 'Money Market', yield: '3.9%', minInvestment: 5000, type: 'Fund', currency: 'EUR', logo: `${process.env.PUBLIC_URL}/logo/abrdn.png` },
    { id: 7, name: 'BlackRock ICS US Treasury Fund', sector: 'Money Market', yield: '4.2%', minInvestment: 5000, type: 'Fund', currency: 'USD', logo: `${process.env.PUBLIC_URL}/logo/blackrock1.png` },
    { id: 8, name: 'BlackRock ICS Euro Government Liquidity Fund', sector: 'Money Market', yield: '4.0%', minInvestment: 5000, type: 'Fund', currency: 'EUR', logo: `${process.env.PUBLIC_URL}/logo/blackrock1.png` },
    { id: 9, name: 'BlackRock ICS Sterling Government Liquidity Fund', sector: 'Money Market', yield: '3.7%', minInvestment: 5000, type: 'Fund', currency: 'GBP', logo: `${process.env.PUBLIC_URL}/logo/blackrock1.png` },
  ];

// Dummy data for orders and yield history (separate for Treasury and Safeguarding)
const initialTreasuryOrderHistory = [
  { id: 1, date: '2024-10-10', fundName: 'Fidelity ILF - The Euro Fund', action: 'Invested', amount: '€100000' },
  { id: 2, date: '2024-10-12', fundName: 'BlackRock ICS US Treasury Fund', action: 'Redeemed', amount: '€30000' },
];

const initialSafeguardingOrderHistory = [
  { id: 1, date: '2024-10-14', fundName: 'Fidelity ILF - The Euro Fund', action: 'Invested', amount: '€500000' },
  { id: 2, date: '2024-10-15', fundName: 'BlackRock ICS Euro Government Liquidity Fund', action: 'Redeemed', amount: '€250000' },
];

const initialTreasuryYieldHistory = [
  { id: 1, date: '2024-10-15', fundName: 'abrdn Liquidity Fund (Lux) - US Dollar Fund', yield: '3.8%' },
  { id: 2, date: '2024-10-17', fundName: 'Fidelity ILF - The Euro Fund', yield: '4.5%' },
];

const initialSafeguardingYieldHistory = [
  { id: 1, date: '2024-10-18', fundName: 'BlackRock ICS Euro Government Liquidity Fund', yield: '4.0%' },
  { id: 2, date: '2024-10-19', fundName: 'Fidelity ILF - The Euro Fund', yield: '4.5%' },
];

// Dummy bank accounts from the banking page
const bankAccounts = [
    { id: 1, name: 'LHV Checking', balance: 120000, currency: 'EUR',accountNumber: '0011223344', accountType: 'Checking', logo: 'https://cdn-logos.gocardless.com/ais/LHV_LHVBEE22.png' },
    { id: 2, name: 'Swedbank Savings', balance: 325000, currency: 'EUR' ,accountNumber: '9988776655', accountType: 'Savings', logo: 'https://cdn-logos.gocardless.com/ais/SWEDBANK_SWEDNOKK.png' },
    { id: 3, name: 'Revolut Business', balance: 850000, currency: 'EUR', accountNumber: '5566778899', accountType: 'Business', logo: 'https://storage.googleapis.com/gc-prd-institution_icons-production/UK/PNG/revolut.png' },
    { id: 4, name: 'Wise Startup', balance: 500000, currency: 'EUR',accountNumber: '7766554433', accountType: 'Business', logo: 'https://storage.googleapis.com/gc-prd-institution_icons-production/UK/PNG/wise.png' },
    { id: 5, name: 'N26 Personal Vault', balance: 300000, currency: 'EUR',accountNumber: '0099887766', accountType: 'Savings', logo: 'https://storage.googleapis.com/gc-prd-institution_icons-production/DE/PNG/n26.png' },
  ];

interface OrderHistoryEntry {
  id: number;
  date: string;
  fundName: string;
  action: string;
  amount: string;
}

interface ModalProps {
  open: boolean;
  handleClose: () => void;
  selectedFund: any;
}

const InvestModal: React.FC<ModalProps> = ({ open, handleClose, selectedFund }) => {
  const [selectedBank, setSelectedBank] = useState('');
  const [investmentAmount, setInvestmentAmount] = useState('');

  if (!selectedFund) {
    return null;
  }

  const handleConfirmInvest = () => {
    console.log(`Investing ${investmentAmount} in ${selectedFund.name} from ${selectedBank}`);
    handleClose(); // Close modal after confirming
  };

  return (
<Modal open={open} onClose={handleClose}>
  <Box 
    sx={{ 
      position: 'absolute', 
      top: '50%', 
      left: '50%', 
      transform: 'translate(-50%, -50%)', 
      width: 600,  // Increased the modal width
      bgcolor: 'background.paper', 
      border: '2px solid #000', 
      boxShadow: 24, 
      p: 4 
    }}
  >
    <Typography variant="h6" mb={2}>Invest in {selectedFund.name}</Typography>
    
    {/* Select a bank account with logo */}
    <TextField 
      select 
      fullWidth 
      label="Select a bank account" 
      value={selectedBank} 
      onChange={(e) => setSelectedBank(e.target.value)} 
      sx={{ mb: 2 }}
    >
      <MenuItem value="" disabled>Select a bank account</MenuItem>
      {bankAccounts.map((account) => (
        <MenuItem key={account.id} value={account.name}>
          {/* Container for logo and bank name */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img 
              src={account.logo}  // Assuming account.logo contains the logo path
              alt={`${account.name} logo`} 
              style={{ width: 24, height: 24, marginRight: 8 }} 
            />
            {account.name} ({account.accountNumber} - {account.currency})
          </Box>
        </MenuItem>
      ))}
    </TextField>
    
    {/* Investment Amount */}
    <TextField 
      fullWidth 
      label="Investment Amount (€)" 
      value={investmentAmount} 
      onChange={(e) => setInvestmentAmount(e.target.value)} 
      margin="normal" 
      sx={{ mb: 2 }} 
    />

    {/* Confirm button */}
    <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleConfirmInvest}>
      Confirm Invest
    </Button>
  </Box>
</Modal>
  );
};

const RedeemModal: React.FC<ModalProps> = ({ open, handleClose, selectedFund }) => {
  const [redeemAmount, setRedeemAmount] = useState('');

  if (!selectedFund) {
    return null;
  }

  const handleConfirmRedeem = () => {
    console.log(`Redeeming ${redeemAmount} from ${selectedFund.name}`);
    handleClose(); // Close modal after confirming
  };

  return (
<Modal open={open} onClose={handleClose}>
  <Box 
    sx={{ 
      position: 'absolute', 
      top: '50%', 
      left: '50%', 
      transform: 'translate(-50%, -50%)', 
      width: 600,  // Match the modal width to 600px
      bgcolor: 'background.paper', 
      border: '2px solid #000', 
      boxShadow: 24, 
      p: 4 
    }}
  >
    <Typography variant="h6" mb={2}>Redeem from {selectedFund.name}</Typography>
    
    {/* Amount to Redeem */}
    <TextField 
      fullWidth 
      label="Amount to Redeem (€)" 
      value={redeemAmount} 
      onChange={(e) => setRedeemAmount(e.target.value)} 
      margin="normal" 
    />

    {/* Confirm button */}
    <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleConfirmRedeem}>
      Confirm Redeem
    </Button>
  </Box>
</Modal>
  );
};

const TreasurySafeguardingPage = () => {
    const location = useLocation(); 
  const [selectedTab, setSelectedTab] = useState(0); // Track selected tab
  const [selectedFund, setSelectedFund] = useState<any>(null);
  const [investModalOpen, setInvestModalOpen] = useState(false);
  const [redeemModalOpen, setRedeemModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [treasuryOrderHistory, setTreasuryOrderHistory] = useState<OrderHistoryEntry[]>(initialTreasuryOrderHistory);
  const [safeguardingOrderHistory, setSafeguardingOrderHistory] = useState<OrderHistoryEntry[]>(initialSafeguardingOrderHistory);

  const [treasuryYieldHistory, setTreasuryYieldHistory] = useState(initialTreasuryYieldHistory);
  const [safeguardingYieldHistory, setSafeguardingYieldHistory] = useState(initialSafeguardingYieldHistory);

    // Handle URL query to redirect to a specific tab
    useEffect(() => {
        const params = new URLSearchParams(location.search);  // Parse query params from URL
        const tabParam = params.get('tab');  // e.g. `?tab=1` for Safeguarding tab
        if (tabParam) {
          setSelectedTab(Number(tabParam));  // Set the tab programmatically based on the param
        }
      }, [location]);
      
  const handleInvestClick = (fund: any) => {
    setSelectedFund(fund);
    setInvestModalOpen(true);
  };

  const handleRedeemClick = (fund: any) => {
    setSelectedFund(fund);
    setRedeemModalOpen(true);
  };

  const filteredFunds = selectedTab === 0 ? mmfFunds : mmfFunds.filter(fund => fund.currency === 'EUR');
  const orderHistory = selectedTab === 0 ? treasuryOrderHistory : safeguardingOrderHistory;
  const yieldHistory = selectedTab === 0 ? treasuryYieldHistory : safeguardingYieldHistory;

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>Treasury & Safeguarding Section</Typography>
      
      {/* Tabs */}
      <Tabs value={selectedTab} onChange={(e, newValue) => setSelectedTab(newValue)} centered>
        <Tab label="Treasury" />
        <Tab label="Safeguarding" />
      </Tabs>
{/* List of funds */}
<Box
  sx={{
    maxHeight: 400,  // Adjust the height to show 3 items (depending on the height of each item)
    overflowY: 'auto',  // Enable vertical scroll
    paddingRight: 2,  // Add padding for better scroll visibility
  }}
>
  {filteredFunds.map((fund) => (
    <Card key={fund.id} sx={{ marginBottom: 2, padding: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Left side: Logo and text */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={fund.logo}
            alt={`${fund.name} logo`}
            style={{ width: '80px', height: '80px', marginRight: '24px', objectFit: 'contain' }} // Increased logo size and margin
          />
          <Box>
            <Typography variant="h6">{fund.name}</Typography>
            <Typography variant="body2">Sector: {fund.sector} | Yield: {fund.yield} | Minimum Investment: €{fund.minInvestment}</Typography>
          </Box>
        </Box>

        {/* Right side: Buttons */}
        <Box>
          <Button variant="contained" sx={{ marginRight: 1 }} onClick={() => handleInvestClick(fund)}>Invest</Button>
          <Button variant="outlined" onClick={() => handleRedeemClick(fund)}>Redeem</Button>
        </Box>
      </Box>
    </Card>
  ))}
</Box>

      {/* Order History */}
      <Typography variant="h6" gutterBottom>Order History</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Fund</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderHistory.map((txn) => (
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

      {/* Yield History */}
      <Typography variant="h6" gutterBottom sx={{ marginTop: 2 }}>Yield History</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Fund</TableCell>
              <TableCell>Yield</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {yieldHistory.map((yieldData) => (
              <TableRow key={yieldData.id}>
                <TableCell>{yieldData.date}</TableCell>
                <TableCell>{yieldData.fundName}</TableCell>
                <TableCell>{yieldData.yield}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modals */}
      <InvestModal open={investModalOpen} handleClose={() => setInvestModalOpen(false)} selectedFund={selectedFund} />
      <RedeemModal open={redeemModalOpen} handleClose={() => setRedeemModalOpen(false)} selectedFund={selectedFund} />

      {/* Success Snackbar */}
      <Snackbar open={showSuccess} autoHideDuration={3000} onClose={() => setShowSuccess(false)}>
        <Alert onClose={() => setShowSuccess(false)} severity="success">
          Transaction completed successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TreasurySafeguardingPage;