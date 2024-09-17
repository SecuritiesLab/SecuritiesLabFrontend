import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { verifyOtp } from '../api/userApi';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useTranslation } from 'react-i18next';

function OtpVerification() {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();  // Access translation hook
  const email = location.state?.email;

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const handleVerifyOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const otpData = { email, otp };
      const response = await verifyOtp(otpData);
      alert(response);
      navigate('/dashboard');
    } catch (error) {
      setError(t('otpVerification.error'));
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}>
          <img src={process.env.PUBLIC_URL + '/logo.png'} alt={t('general.companyLogoAlt')} style={{ height: 60 }} />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
          <Typography component="h1" variant="h5">
            {t('otpVerification.title')}
          </Typography>
          <form onSubmit={handleVerifyOtp}>
            <TextField
              margin="normal"
              required
              fullWidth
              label={t('otpVerification.label')}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              {t('otpVerification.button')}
            </Button>
            {error && <Typography color="error">{error}</Typography>}
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default OtpVerification;