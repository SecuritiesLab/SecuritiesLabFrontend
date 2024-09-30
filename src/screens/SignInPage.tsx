import React, { useState }  from 'react';
import { useNavigate } from 'react-router-dom';
import { signinUser } from '../api/userApi';
import { Avatar, Button, CssBaseline, TextField, Typography, Container, Box, Link, Grid } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import GoogleSignIn from "../components/Profile/GoogleSignIn";
import ReCAPTCHA from "react-google-recaptcha";
import TwoFactorVerification from '../components/Profile/TwoFactorVerification';
import { useEmail } from '../contexts/EmailContext';


function Copyright(props: any) {
  const { t } = useTranslation();
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {t('general.copyright', { year: new Date().getFullYear() })} <Link color="inherit" href="https://securitieslab.eu/">{t('general.companyName')}</Link>
    </Typography>
  );
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function SignInPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [captchaToken, setCaptchaToken] = React.useState<string | null>(null);
  const [twoFactorRequired, setTwoFactorRequired] = useState(false);  
  const { email: emailFromContext, setEmail: setEmailFromContext } = useEmail();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!captchaToken) {
      setErrorMessage(t('signInPage.captchaErrorMessage'));
      return;
    }

    try {
      const result = await signinUser({ email, password, captchaToken });
      setEmailFromContext(email)
      if (result.twoFactorRequired) {
        // 2FA is required, show the TwoFactorVerification component
        setTwoFactorRequired(true);
      } else {
        // No 2FA required, proceed to dashboard
        navigate('/dashboard');
      }
    } catch (error: any) {
      setErrorMessage(t('signInPage.errorMessage'));
    }
  };

  // Function to handle CAPTCHA response
  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
  };

    // Callback when OTP is successfully verified
    const handleOtpSuccess = () => {
      navigate('/dashboard');  // Redirect to dashboard after successful OTP verification
    };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <img src={process.env.PUBLIC_URL + '/logo.png'} alt={t('general.companyLogoAlt')} style={{ height: 60 }} />
          </Box>

          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t('signInPage.title')}
          </Typography>
          {twoFactorRequired ? (
            // Render TwoFactorVerification component if 2FA is required
            <TwoFactorVerification email={email} onSuccess={handleOtpSuccess} />
          ) : (
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label={t('signInPage.emailLabel')}
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={t('signInPage.passwordLabel')}
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errorMessage && <Typography color="error">{errorMessage}</Typography>}

            {/* reCAPTCHA and Google Sign-In Container */}
            
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
              {/* reCAPTCHA widget */}
              <ReCAPTCHA
                sitekey="6LdoN0cqAAAAAPWjETt1VTDwItUxIWJdlXwvr2rk" // Replace with your actual reCAPTCHA site key
                onChange={handleCaptchaChange} // Handle the change event when user completes CAPTCHA
                style={{ marginBottom: '16px' }} // Add margin for spacing
              />

              {/* Google Sign-In Button 
              <GoogleSignIn />*/}
            </Box>

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              {t('signInPage.button')}
            </Button>

            <Grid container>
              {/* 
              <Grid item xs>
                
                <Link variant="body2" color="inherit" onClick={() => navigate('/forgot-password')} style={{ cursor: 'pointer' }}>
                  {t('signInPage.forgotPassword')}
                </Link>
              </Grid>
              */}
              {
              <Grid item>
                <Link variant="body2" color="inherit" onClick={() => navigate('/signup')} style={{ cursor: 'pointer' }}>
                  {t('signInPage.noAccount')}
                </Link>
              </Grid>
               }
            </Grid>
          </Box>
          )}
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}