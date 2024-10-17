import React, { useState }  from 'react';
import { useNavigate } from 'react-router-dom';
import { signinUser } from '../../api/userApi';
import { Avatar, Button, CssBaseline, TextField, Typography, Container, Box, Link, Grid, IconButton, InputAdornment } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import GoogleSignIn from '../../components/Profile/GoogleSignIn';
import ReCAPTCHA from "react-google-recaptcha";
import TwoFactorVerification from '../../components/Profile/TwoFactorVerification';
import { storeEncryptedData } from '../../authentication/EncryptAndDecryptData';


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
  const [showPassword, setShowPassword] = useState(false);  // State to toggle password visibility
  const env = process.env.REACT_APP_ENV

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!captchaToken) {
      setErrorMessage(t('signInPage.captchaErrorMessage'));
      return;
    }

    try {
      const result = await signinUser({ email, password, captchaToken });
      storeEncryptedData("email", email)
      if (result.twoFactorRequired) {
        setTwoFactorRequired(true);  // 2FA is required, show the TwoFactorVerification component
      } else {
        navigate('/dashboard');  // No 2FA required, proceed to dashboard
      }
    } catch (error: any) {
      setErrorMessage(t('signInPage.errorMessage'));
    }
  };

  // Toggle password visibility
  const handleClickShowPassword = () => setShowPassword((show) => !show);

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
            <TwoFactorVerification email={email} onSuccess={handleOtpSuccess} /> // Render TwoFactorVerification component if 2FA is required
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
                type={showPassword ? 'text' : 'password'}  // Toggle between 'text' and 'password' based on showPassword
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {errorMessage && <Typography color="error">{errorMessage}</Typography>}

              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
                {/* reCAPTCHA widget */}
                <ReCAPTCHA
                  sitekey="6LdoN0cqAAAAAPWjETt1VTDwItUxIWJdlXwvr2rk"  // Replace with your actual reCAPTCHA site key
                  onChange={handleCaptchaChange}
                  style={{ marginBottom: '16px' }}
                />
                { env === "local" &&
 
              <GoogleSignIn />    }        
              </Box>
              

              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                {t('signInPage.button')}
              </Button>

            <Grid container>
              
              <Grid item xs>
                
                <Link variant="body2" color="inherit" onClick={() => navigate('/forgot-password')} style={{ cursor: 'pointer' }}>
                  {t('signInPage.forgotPassword')}
                </Link>
              </Grid>
              
              { env === "local" &&
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