import React, { useState } from 'react';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal, TextField, Snackbar, Alert, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Reusing the MMF funds as asset managers
const assetManagers = [
  { id: 1, name: 'Fidelity ILF - The Euro Fund', sector: 'Money Market', defaultYield: '4.5%' },
  { id: 2, name: 'Fidelity ILF - The United States Dollar Fund', sector: 'Money Market', defaultYield: '4.3%' },
  { id: 3, name: 'Fidelity ILF - The Sterling Fund', sector: 'Money Market', defaultYield: '4.1%' },
  { id: 4, name: 'abrdn Liquidity Fund (Lux) - US Dollar Fund', sector: 'Money Market', defaultYield: '3.8%' },
  { id: 5, name: 'abrdn Liquidity Fund (Lux) - Sterling Fund', sector: 'Money Market', defaultYield: '3.6%' },
  { id: 6, name: 'abrdn Liquidity Fund (Lux) - Euro Fund', sector: 'Money Market', defaultYield: '3.9%' },
  { id: 7, name: 'BlackRock ICS US Treasury Fund', sector: 'Money Market', defaultYield: '4.2%' },
  { id: 8, name: 'BlackRock ICS Euro Government Liquidity Fund', sector: 'Money Market', defaultYield: '4.0%' },
  { id: 9, name: 'BlackRock ICS Sterling Government Liquidity Fund', sector: 'Money Market', defaultYield: '3.7%' },
];

// Example existing deposit products offered by the business
const initialDeposits = [
  {
    id: 1,
    name: 'Business Euro Savings Plan',
    amountInvested: '€45,000,000',
    totalEarnings: '€100,000',
    manager: 'Fidelity ILF - The Euro Fund',
    userType: 'Retail',
    yield: '4.5%',  // Direct yield value
    pricingPlans: { Free: '50%', Plus: '60%', Pro: '80%' }, // Yield for each pricing plan
  },
];

interface Deposit {
  id: number;
  name: string;
  amountInvested: string;
  totalEarnings: string;
  manager: string;
  userType: string;
  yield: string; // Yield field for each deposit
  pricingPlans: Record<string, string>; // Yield for each user type
}

const userTypes = ['Free', 'Plus', 'Pro']; // Available user types

const BusinessDepositsPage = () => {
  const [deposits, setDeposits] = useState<Deposit[]>(initialDeposits);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newDeposit, setNewDeposit] = useState({
    name: '',
    manager: '',
    userType: '',
    pricingPlans: {} as Record<string, string>, // Mapping of user types to yields
  });
  const [amountInvested, setAmountInvested] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [manageDeposit, setManageDeposit] = useState<Deposit | null>(null); // For managing existing deposits
  const navigate = useNavigate();

  // Handle creating a new deposit product
  const handleCreateDeposit = () => {
    const managerDetails = assetManagers.find((am) => am.name === newDeposit.manager);
    const newDepositEntry: Deposit = {
      id: deposits.length + 1,
      name: newDeposit.name,
      amountInvested,
      totalEarnings: '€0', // Initial earnings are zero
      manager: newDeposit.manager,
      userType: newDeposit.userType,
      yield: managerDetails?.defaultYield || '',  // Use the default yield of the selected manager
      pricingPlans: newDeposit.pricingPlans,  // Include the yield for each user type
    };

    setDeposits((prev) => [...prev, newDepositEntry]);
    setCreateModalOpen(false);
    setShowSuccess(true);
  };

  // Handle managing an existing deposit product
  const handleManageDeposit = () => {
    if (manageDeposit) {
      setDeposits((prev) =>
        prev.map((deposit) =>
          deposit.id === manageDeposit.id ? { ...manageDeposit } : deposit
        )
      );
      setManageDeposit(null);
      setShowSuccess(true);
    }
  };

  const viewDocumentation = () => {
    navigate("/documentation");
  };

  const handleRowClick = (deposit: { id: any; }) => {
    // Navigate to a new page and pass the deposit data
    navigate(`/deposit/${deposit.id}`, { state: { deposit } });
  };
  
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>Business Deposit Products</Typography>

      {/* Existing deposit products offered by the business */}
      <Typography variant="h6" gutterBottom>Your Deposit Offerings</Typography>
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Deposit Product Name</TableCell>
              <TableCell>Total Amount Invested</TableCell>
              <TableCell>Total Earnings</TableCell>
              <TableCell>Asset Manager</TableCell>
              <TableCell>Yield</TableCell>  {/* Changed to just Yield */}
   
            </TableRow>
          </TableHead>
          <TableBody>
            {deposits.map((deposit) => (
               <TableRow key={deposit.id} onClick={() => handleRowClick(deposit)} style={{ cursor: 'pointer' }}>
                <TableCell>{deposit.name}</TableCell>
                <TableCell>{deposit.amountInvested}</TableCell>
                <TableCell>{deposit.totalEarnings}</TableCell>
                <TableCell>{deposit.manager}</TableCell>
                <TableCell>{deposit.yield}</TableCell> {/* Show single yield */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Button to create new deposit product */}
      <Button variant="contained" onClick={() => setCreateModalOpen(true)}>Create New Deposit Product</Button>

      {/* Create Deposit Modal */}
      <Modal open={createModalOpen} onClose={() => setCreateModalOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" mb={2}>Create New Deposit Product</Typography>

          {/* Deposit Product Name */}
          <TextField
            fullWidth
            label="Deposit Product Name"
            value={newDeposit.name}
            onChange={(e) => setNewDeposit({ ...newDeposit, name: e.target.value })}
            sx={{ mb: 2 }}
          />

          {/* Asset Manager Selection */}
          <TextField
            select
            fullWidth
            label="Asset Manager"
            value={newDeposit.manager}
            onChange={(e) => setNewDeposit({ ...newDeposit, manager: e.target.value })}
            sx={{ mb: 2 }}
          >
            {assetManagers.map((manager) => (
              <MenuItem key={manager.id} value={manager.name}>
                {manager.name} (Default Yield: {manager.defaultYield})
              </MenuItem>
            ))}
          </TextField>

          {/* User Type and Yield */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>User Types and Yields</InputLabel>
            <Select
              multiple
              value={Object.keys(newDeposit.pricingPlans)}
              onChange={(e) => {
                const selectedPlans = e.target.value as string[];
                const updatedPlans = { ...newDeposit.pricingPlans };

                // Add or remove user types as selected
                userTypes.forEach((type) => {
                  if (selectedPlans.includes(type)) {
                    if (!updatedPlans[type]) updatedPlans[type] = ''; // Initialize yield field
                  } else {
                    delete updatedPlans[type];
                  }
                });
                setNewDeposit({ ...newDeposit, pricingPlans: updatedPlans });
              }}
            >
              {userTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Yield Input for each Pricing Plan */}
          {Object.keys(newDeposit.pricingPlans).map((plan) => (
            <TextField
              key={plan}
              fullWidth
              label={`${plan} Yield (%)`}
              value={newDeposit.pricingPlans[plan]}
              onChange={(e) =>
                setNewDeposit({
                  ...newDeposit,
                  pricingPlans: { ...newDeposit.pricingPlans, [plan]: e.target.value },
                })
              }
              sx={{ mb: 2 }}
            />
          ))}

          {/* Investment Amount (optional, for tracking total amount invested) */}
          <TextField
            fullWidth
            label="Initial Total Investment (optional)"
            value={amountInvested}
            onChange={(e) => setAmountInvested(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Button variant="contained" fullWidth onClick={handleCreateDeposit}>
            Confirm Deposit Product
          </Button>
        </Box>
      </Modal>

      {/* Manage Deposit Modal */}
      {manageDeposit && (
        <Modal open={!!manageDeposit} onClose={() => setManageDeposit(null)}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 500,
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h6" mb={2}>Manage Deposit Product</Typography>

            {/* Deposit Product Name (Readonly) */}
            <TextField
              fullWidth
              label="Deposit Product Name"
              value={manageDeposit.name}
              InputProps={{
                readOnly: true,
              }}
              sx={{ mb: 2 }}
            />

            {/* Yield Input for each Pricing Plan */}
            {Object.keys(manageDeposit.pricingPlans).map((plan) => (
              <TextField
                key={plan}
                fullWidth
                label={`${plan} Yield (%)`}
                value={manageDeposit.pricingPlans[plan]}
                onChange={(e) =>
                  setManageDeposit({
                    ...manageDeposit,
                    pricingPlans: { ...manageDeposit.pricingPlans, [plan]: e.target.value },
                  })
                }
                sx={{ mb: 2 }}
              />
            ))}

            <Button variant="contained" fullWidth onClick={handleManageDeposit}>
              Update Deposit Product
            </Button>
          </Box>
        </Modal>
      )}

      {/* Success Snackbar */}
      <Snackbar open={showSuccess} autoHideDuration={3000} onClose={() => setShowSuccess(false)}>
        <Alert onClose={() => setShowSuccess(false)} severity="success">
          Deposit product updated successfully!
        </Alert>
      </Snackbar>

      {/* API Access Section */}
      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        API Access
      </Typography>
      <Typography variant="body2">
        Use our API to create and manage deposit products programmatically. This feature is useful for fintechs or
        businesses automating their treasury management and safeguarding earnings.
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" onClick={viewDocumentation}>View API Documentation</Button>
      </Box>
    </Box>
  );
};

export default BusinessDepositsPage;