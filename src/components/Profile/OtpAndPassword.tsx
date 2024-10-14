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
  const [passwordError, setPasswordError] = React.useState<string | null>(null);

  // Password validation function
  const validatePassword = (password: string): boolean => {
    return password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password) && /[!@#$%^&*]/.test(password);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate the password before submitting the form
    if (!validatePassword(newPassword)) {
      setPasswordError('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
      return;
    }

    setPasswordError(null);  // Clear the password error if the validation passes
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
        error={!!passwordError}
        helperText={passwordError}
      />
      {errorMessage && <Typography color="error">{errorMessage}</Typography>}
      {successMessage && <Typography color="primary">{successMessage}</Typography>}
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Reset Password
      </Button>
    </Box>
  );
};