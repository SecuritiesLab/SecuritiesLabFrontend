import * as React from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';

interface OtpAndPasswordProps {
  onSubmit: (otp: number, newPassword: string) => void;
  successMessage?: string;
  errorMessage?: string;
}

export const OtpAndPassword: React.FC<OtpAndPasswordProps> = ({ onSubmit, successMessage, errorMessage }) => {
  const [otp, setOtp] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(parseInt(otp), newPassword);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="otp"
        label="Enter the OTP"
        name="otp"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="newPassword"
        label="New Password"
        type="password"
        id="newPassword"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      {errorMessage && <Typography color="error">{errorMessage}</Typography>}
      {successMessage && <Typography color="primary">{successMessage}</Typography>}
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Reset Password
      </Button>
    </Box>
  );
};