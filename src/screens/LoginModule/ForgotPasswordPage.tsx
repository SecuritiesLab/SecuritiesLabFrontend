import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, CssBaseline, Box, Typography } from '@mui/material';
import { forgotPassword } from '../../api/userApi';
import { EmailInput } from '../../components/Profile/EmailInput';
import { useTranslation } from 'react-i18next';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function ForgotPasswordPage() {
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const handleEmailSubmit = async (email: string) => {
    try {
      await forgotPassword(email);
      setSuccessMessage(t('forgotPasswordPage.successMessage'));
      setErrorMessage(null);
      setTimeout(() => navigate(`/reset-password?email=${email}`), 2000); // Navigate to reset password page
    } catch (error) {
      setErrorMessage(t('forgotPasswordPage.errorMessage'));
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
        {t('forgotPasswordPage.title')}
        </Typography>
        <EmailInput
          onSubmit={handleEmailSubmit}
          buttonText={t('forgotPasswordPage.buttonText')} 
          successMessage={successMessage || undefined}
          errorMessage={errorMessage || undefined}
        />
      </Box>
    </Container>
    </ThemeProvider>
  );
}