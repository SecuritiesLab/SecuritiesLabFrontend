import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, CssBaseline, Box, Typography } from '@mui/material';
import { resetPassword } from '../../api/userApi';
import { OtpAndPassword } from '../../components/Profile//OtpAndPassword';
import { useTranslation } from 'react-i18next';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function ResetPasswordPage() {
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email'); 

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const handleOtpSubmit = async (otp: number, newPassword: string) => {
    if (!email) {
      setErrorMessage('Email not found.');
      return;
    }

    try {
      await resetPassword({ email, otp, newPassword });
      setSuccessMessage('Password reset successfully.');
      setErrorMessage(null);
      setTimeout(() => navigate('/signin'), 2000); // Navigate to sign in page
    } catch (error) {
      setErrorMessage('Error resetting password. Please check your OTP and try again.');
      setSuccessMessage(null);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}>
          <img src={process.env.PUBLIC_URL + '/logo.png'} alt={t('general.companyLogoAlt')} style={{ height: 60 }} />
        </Box>
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <OtpAndPassword
          onSubmit={handleOtpSubmit}
          successMessage={successMessage || undefined}
          errorMessage={errorMessage|| undefined}
        />
      </Box>
    </Container>
    </ThemeProvider>
  );
}