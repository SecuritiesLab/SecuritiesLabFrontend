import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal, TextField, Card, Snackbar, Alert, MenuItem, Tabs, Tab,Grid,Divider } from '@mui/material';
import { useLocation } from 'react-router-dom';
import TreasurySection from '../../components/TrasurySafeguarding/TreasurySection';
import SafeguardingSection from '../../components/TrasurySafeguarding/SafeguardingSection';

// Dummy MMF data (9 funds)
const mmfFunds = [
    { id: 1, name: 'Fidelity ILF - The Euro Fund', sector: 'Money Market', yield: '4.5%', minInvestment: 5000, type: 'Fund', currency: 'EUR', logo: `${process.env.PUBLIC_URL}/logo/fidelityColor.png`, investment: 300000 },
    { id: 2, name: 'Fidelity ILF - The United States Dollar Fund', sector: 'Money Market', yield: '4.3%', minInvestment: 5000, type: 'Fund', currency: 'USD', logo: `${process.env.PUBLIC_URL}/logo/fidelityColor.png`,investment: 300000 },
    { id: 3, name: 'Fidelity ILF - The Sterling Fund', sector: 'Money Market', yield: '4.1%', minInvestment: 5000, type: 'Fund', currency: 'GBP', logo: `${process.env.PUBLIC_URL}/logo/fidelityColor.png`,investment: 300000 },
    { id: 4, name: 'abrdn Liquidity Fund (Lux) - US Dollar Fund', sector: 'Money Market', yield: '3.8%', minInvestment: 5000, type: 'Fund', currency: 'USD', logo: `${process.env.PUBLIC_URL}/logo/abrdn.png`,investment: 500000 },
    { id: 5, name: 'abrdn Liquidity Fund (Lux) - Sterling Fund', sector: 'Money Market', yield: '3.6%', minInvestment: 5000, type: 'Fund', currency: 'GBP', logo: `${process.env.PUBLIC_URL}/logo/abrdn.png`,investment: 500000 },
    { id: 6, name: 'abrdn Liquidity Fund (Lux) - Euro Fund', sector: 'Money Market', yield: '3.9%', minInvestment: 5000, type: 'Fund', currency: 'EUR', logo: `${process.env.PUBLIC_URL}/logo/abrdn.png`,investment: 500000 },
    { id: 7, name: 'BlackRock ICS US Treasury Fund', sector: 'Money Market', yield: '4.2%', minInvestment: 5000, type: 'Fund', currency: 'USD', logo: `${process.env.PUBLIC_URL}/logo/blackrock1.png`,investment: 200000 },
    { id: 8, name: 'BlackRock ICS Euro Government Liquidity Fund', sector: 'Money Market', yield: '4.0%', minInvestment: 5000, type: 'Fund', currency: 'EUR', logo: `${process.env.PUBLIC_URL}/logo/blackrock1.png`,investment: 200000 },
    { id: 9, name: 'BlackRock ICS Sterling Government Liquidity Fund', sector: 'Money Market', yield: '3.7%', minInvestment: 5000, type: 'Fund', currency: 'GBP', logo: `${process.env.PUBLIC_URL}/logo/blackrock1.png`,investment: 200000 },
  ];

// Dummy bank accounts from the banking page
const bankAccounts = [
    { id: 1, name: 'LHV Checking', balance: 120000, currency: 'EUR',accountNumber: '0011223344', accountType: 'Checking', logo: 'https://cdn-logos.gocardless.com/ais/LHV_LHVBEE22.png' },
    { id: 2, name: 'Swedbank Savings', balance: 325000, currency: 'EUR' ,accountNumber: '9988776655', accountType: 'Savings', logo: 'https://cdn-logos.gocardless.com/ais/SWEDBANK_SWEDNOKK.png' },
    { id: 3, name: 'Revolut Business', balance: 850000, currency: 'EUR', accountNumber: '5566778899', accountType: 'Business', logo: 'https://storage.googleapis.com/gc-prd-institution_icons-production/UK/PNG/revolut.png' },
    { id: 4, name: 'Wise Startup', balance: 500000, currency: 'EUR',accountNumber: '7766554433', accountType: 'Business', logo: 'https://storage.googleapis.com/gc-prd-institution_icons-production/UK/PNG/wise.png' },
    { id: 5, name: 'N26 Personal Vault', balance: 300000, currency: 'EUR',accountNumber: '0099887766', accountType: 'Savings', logo: 'https://storage.googleapis.com/gc-prd-institution_icons-production/DE/PNG/n26.png' },
  ];

  const banksSafeguarding = [
    { id:1,name: 'Banking Circle Master EURO', balance: 3000000, currency : "EUR", accountNumber: '****3344',accountType: 'Master', logo: `${process.env.PUBLIC_URL}/logo/BankingCircle.png` },
    { id:2,name: 'Banking Circle Master USD', balance: 1000000, currency : "USD", accountNumber: '****6655', accountType: 'Master',logo: `${process.env.PUBLIC_URL}/logo/BankingCircle.png` },
    { id: 3,name: 'Banking Circle Master GBP', balance: 1500000, currency: "GBP", accountNumber: '****8899', accountType: 'Master',logo: `${process.env.PUBLIC_URL}/logo/BankingCircle.png` },
]



export interface Fund {
  id: number;
  name: string;
  sector: string;
  yield: string;
  minInvestment: number;
  type: string;
  currency: string;
  logo: string;
}

export interface Bank{
  id: number;
  name:string;
  balance: number;
  currency: string;
  accountNumber: string;
  accountType: string;
  logo: string;
}

export interface YieldHistoryEntry {
  id: number;
  date: string;
  fundName: string;
  yield: string;
}

export interface SectionProps {
  funds: Fund[];
  handleInvestClick: (fund: Fund) => void;
  handleRedeemClick: (fund: Fund) => void;
}

interface ModalProps {
  open: boolean;
  handleClose: () => void;
  selectedFund: any;
  handleSuccess: () => void;
  banks: Bank[];
}


const InvestModal: React.FC<ModalProps> = ({ open, handleClose, selectedFund, handleSuccess,banks }) => {
  const [selectedBank, setSelectedBank] = useState('');
  const [investmentAmount, setInvestmentAmount] = useState('');

  if (!selectedFund) {
    return null;
  }

  const handleConfirmInvest = () => {
    console.log(`Investing ${investmentAmount} in ${selectedFund.name} from ${selectedBank}`);
    handleClose(); // Close modal after confirming
    handleSuccess()
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
      {banks.map((account) => (
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

const RedeemModal: React.FC<ModalProps> = ({ open, handleClose, selectedFund, handleSuccess }) => {
  const [redeemAmount, setRedeemAmount] = useState('');

  if (!selectedFund) {
    return null;
  }

  const handleConfirmRedeem = () => {
    console.log(`Redeeming ${redeemAmount} from ${selectedFund.name}`);
    handleClose(); // Close modal after confirming
    handleSuccess();
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

    <Typography>Redeemable Amount: {selectedFund.investment}€</Typography>
    
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
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedFund, setSelectedFund] = useState<Fund | null>(null);
  const [investModalOpen, setInvestModalOpen] = useState(false);
  const [redeemModalOpen, setRedeemModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tab = searchParams.get('tab');
    setSelectedTab(tab ? parseInt(tab, 10) : 0); // Fallback to 0 if `tab` is not in the URL
  }, [location.search]); 


  const handleInvestClick = (fund: Fund) => {
    setSelectedFund(fund);
    setInvestModalOpen(true);
  };

  const handleRedeemClick = (fund: Fund) => {
    setSelectedFund(fund);
    setRedeemModalOpen(true);
  };

  const handleCloseModal = () => {
    setInvestModalOpen(false);
    setRedeemModalOpen(false);
    setSelectedFund(null);
  };

  const handleSuccess = () => {
    setShowSuccess(true);
    handleCloseModal();
  };
  

  return (
    <Box sx={{ padding: 2 }}>
      <Tabs sx={{
    '& .MuiTab-root': {
      marginX: 5,
    },
  }} value={selectedTab} onChange={(e, newValue) => setSelectedTab(newValue)} centered>
        <Tab 
    label="Operation" />
        <Tab label="Safeguarding" />
      </Tabs>
      <Divider sx={{ my: 2, backgroundColor: 'lightblue' }} />

      {selectedTab === 0 ? (
        <TreasurySection
        funds={mmfFunds}
          handleInvestClick={handleInvestClick}
          handleRedeemClick={handleRedeemClick}
        />
      ) : (
        <SafeguardingSection
        funds={mmfFunds}
          handleInvestClick={handleInvestClick}
          handleRedeemClick={handleRedeemClick}
        />
      )}

      {/* Modals for Investment and Redemption */}
      <InvestModal
        open={investModalOpen}
        handleClose={handleCloseModal}
        selectedFund={selectedFund}
        handleSuccess={handleSuccess}
        banks= {selectedTab === 0? bankAccounts: banksSafeguarding }
      />
      <RedeemModal
        open={redeemModalOpen}
        handleClose={handleCloseModal}
        selectedFund={selectedFund}
        handleSuccess={handleSuccess}
        banks= {selectedTab === 0? bankAccounts: banksSafeguarding }
      />

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