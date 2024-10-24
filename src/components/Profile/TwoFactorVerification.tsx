import React, { useState } from 'react';
import { verifyTwoFactorCode } from '../../api/twoFactorApi'; // Import your API call
import { Box, Button, TextField, Typography } from '@mui/material';

interface TwoFactorVerificationProps {
  email: string;  // Email of the user passed down from the parent component
  onSuccess: () => void;  // Callback when OTP is successfully verified
}

const TwoFactorVerification: React.FC<TwoFactorVerificationProps> = ({ email, onSuccess }) => {
  const [otpCode, setOtpCode] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleVerifyOtp = async () => {
    try {
      const response = await verifyTwoFactorCode( email, otpCode );
      if (response == "2FA verification successful") {
        onSuccess(); // Call the success callback (i.e., to navigate to dashboard)
      } else {
        setErrorMessage('Invalid OTP. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Error verifying OTP. Please try again.');
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6">Two-Factor Authentication</Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Enter the OTP generated by your authenticator app.
      </Typography>
      <TextField
        label="OTP Code"
        value={otpCode}
        onChange={(e) => setOtpCode(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />
      {errorMessage && <Typography color="error">{errorMessage}</Typography>}
      <Button variant="contained" onClick={handleVerifyOtp}>
        Verify OTP
      </Button>
    </Box>
  );
};

export default TwoFactorVerification;