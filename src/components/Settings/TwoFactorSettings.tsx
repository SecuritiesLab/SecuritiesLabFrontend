import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, TextField, Grid } from '@mui/material';
import QRCodeDisplay from '../../components/Profile/QRCodeDisplay';
import { generateTwoFactorSecret, verifyTwoFactorCode, disableTwoFactor } from '../../api/twoFactorApi';

const TwoFactorSettings: React.FC<{ email: string; twoFactorSecret: string | null ;isTwoFactorEnabled: boolean}> = ({ email, twoFactorSecret, isTwoFactorEnabled }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [isTwoFactorEnabledLocal, setIsTwoFactorEnabledLocal] = useState(isTwoFactorEnabled);
  const [loading, setLoading] = useState(false);
  const [setupComplete, setSetupComplete] = useState(false);

  // Fetch the QR Code URL if twoFactorSecret is not present
  const enable2FA = async () => {
      setLoading(true);
      try {
        const response = await generateTwoFactorSecret(email);
        setQrCodeUrl(response.qrCodeUrl);  // Show QR code to the user
        setLoading(false);
      } catch (error) {
        console.error('Error enabling 2FA:', error);
        setLoading(false);
    }
  };

  // Verify the code entered by the user
  const handleVerifyCode = async () => {
    setLoading(true);
    try {
      await verifyTwoFactorCode(email, verificationCode);
      setIsTwoFactorEnabledLocal(true);
      setSetupComplete(true);
      alert('2FA Enabled successfully');
      setLoading(false);
    } catch (error) {
      console.error('Verification failed:', error);
      alert('Verification failed. Please try again.');
      setLoading(false);
    }
  };

  // Disable 2FA
  const handleDisable2FA = async () => {
    setLoading(true);
    try {
      await disableTwoFactor(email);
      setIsTwoFactorEnabledLocal(false);
      alert('2FA Disabled successfully');
      setLoading(false);
    } catch (error) {
      console.error('Error disabling 2FA:', error);
      setLoading(false);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Two-Factor Authentication (2FA)</Typography>
        {isTwoFactorEnabledLocal ? (
          <Box>
            <Button variant="contained" color="error" onClick={handleDisable2FA}>
              Disable 2FA
            </Button>
          </Box>
        ) : (
          <Box>
            <Button variant="contained" color="primary" onClick={enable2FA}>
              Enable 2FA
            </Button>
          </Box>
        )}
      </Grid>

      {/* Show QR Code and Verification Input if enabling 2FA */}
      {qrCodeUrl && !setupComplete && (
        <Grid item xs={12}>
          <QRCodeDisplay qrCodeUrl={qrCodeUrl} />
          <TextField
            label="Enter verification code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleVerifyCode}
            disabled={setupComplete}
            sx={{ mt: 2 }}
          >
            {setupComplete ? '2FA Enabled' : 'Verify Code'}
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

export default TwoFactorSettings;