import React, { useEffect, useState } from 'react';
import { Box, Typography, Container, Button, CssBaseline } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import QRCodeDisplay from '../../components/Profile/QRCodeDisplay'; // Reusable QR code component
import { generateTwoFactorSecret, verifyTwoFactorCode } from '../../api/twoFactorApi'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getDecryptedData } from '../../authentication/EncryptAndDecryptData';

const TwoFactorPage: React.FC = () => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [verificationCode, setVerificationCode] = useState<string | null>(null);
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const navigate = useNavigate();
  const email = getDecryptedData("email")

  // Fetch the QR Code URL and secret
  useEffect(() => {
    const fetchQrCode = async () => {
      if (email == null){
        console.log("email not present")
        return
      }
      try {
        const response = await generateTwoFactorSecret(email);
        setQrCodeUrl(response.qrCodeUrl);  // Assuming API provides the QR code URL directly
      } catch (error) {
        console.error('Error generating 2FA secret:', error);
      }
    };
    fetchQrCode();
  }, []);


  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  // Verify the 2FA code entered by the user
  const handleVerifyCode = async () => {
    if (!verificationCode || !email) return;
    try {
      const response = await verifyTwoFactorCode(email,verificationCode);
      console.log(response)
      if (response == "2FA verification successful") {
        setIsSetupComplete(true);
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Verification failed:', error);
    }
  };

  // Handle skip action
  const handleSkip = () => {
    navigate('/dashboard');
  };

  // Handle next or setup action
  const handleNextOrSetup = () => {
    console.log("handle verify")
    if (isSetupComplete) {
      navigate('/dashboard');
    } else {
      handleVerifyCode();
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
        <Typography variant="h5" gutterBottom>
          Set Up Two-Factor Authentication (2FA)
        </Typography>

        {/* Display QR Code if available */}
        {qrCodeUrl && <QRCodeDisplay qrCodeUrl={qrCodeUrl} />}

        {/* Input for Verification Code */}
        <input
  type="text"
  inputMode="numeric"
  pattern="[0-9]*"
  placeholder="Enter verification code"
  value={verificationCode || ''}
  onChange={(e) => setVerificationCode(e.target.value)}
/>

        <Box mt={2} display="flex" justifyContent="space-between">
          <Button variant="outlined" onClick={handleSkip}>
            Skip
          </Button>
          <Button
            variant="contained"
            onClick={handleNextOrSetup}
            color={isSetupComplete ? 'primary' : 'secondary'}
          >
            {isSetupComplete ? 'Next' : 'Set up 2FA'}
          </Button>
        </Box>
      </Box>
    </Container>
    </ThemeProvider>
  );
};

export default TwoFactorPage;