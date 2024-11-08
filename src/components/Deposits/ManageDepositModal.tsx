import React from 'react';
import { Box, Typography, Modal, TextField, Button } from '@mui/material';

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

const ManageDepositModal: React.FC<ManageDepositModalProps> = ({ open, onClose, deposit }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Manage Deposit: {deposit.name}
        </Typography>

        {/* Form fields for managing deposit details */}
        <TextField
          fullWidth
          label="Deposit Amount"
          defaultValue={deposit.amountInvested}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Manager"
          defaultValue={deposit.manager}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Yield for Free Users"
          defaultValue={deposit.pricingPlans.Free}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Yield for Plus Users"
          defaultValue={deposit.pricingPlans.Plus}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Yield for Pro Users"
          defaultValue={deposit.pricingPlans.Pro}
          margin="normal"
        />

        {/* Save and Close buttons */}
        <Button variant="contained" color="primary" onClick={onClose} sx={{ mt: 2 }}>
          Save Changes
        </Button>
        <Button variant="outlined" onClick={onClose} sx={{ mt: 2, ml: 2 }}>
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

export default ManageDepositModal;