import * as React from 'react';
import { Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container, IconButton, InputAdornment } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { signupUser } from '../api/userApi';
import { useTranslation } from 'react-i18next';
import GoogleSignIn from '../components/Profile/GoogleSignIn';
import ReCAPTCHA from "react-google-recaptcha";
import { storeEncryptedData } from '../authentication/EncryptAndDecryptData';

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

export default function SignUpPage() {
  const { t } = useTranslation();
  const [firstName, setFirstName] = React.useState<string>('');
  const [lastName, setLastName] = React.useState<string>('');
  const [passwordError, setPasswordError] = React.useState<string | null>(null);
  const [emailError, setEmailError] = React.useState<string | null>(null);
  const [firstNameError, setFirstNameError] = React.useState<string | null>(null);
  const [lastNameError, setLastNameError] = React.useState<string | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [password, setPassword] = React.useState<string>('');
  const [confirmPassword, setConfirmPassword] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [captchaToken, setCaptchaToken] = React.useState<string | null>(null);
  const navigate = useNavigate();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password) && /[!@#$%^&*]/.test(password);
  };

  const validateName = (name: string): boolean => {
    return name.trim() !== '';
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    let valid = true;

    if (!validateName(firstName)) {
      setFirstNameError(t('signUpPage.firstNameError'));
      valid = false;
    } else {
      setFirstNameError(null);
    }

    if (!validateName(lastName)) {
      setLastNameError(t('signUpPage.lastNameError'));
      valid = false;
    } else {
      setLastNameError(null);
    }

    if (!validateEmail(email)) {
      setEmailError(t('signUpPage.emailError'));
      valid = false;
    } else {
      setEmailError(null);
    }

    if (!validatePassword(password)) {
      setPasswordError(t('signUpPage.passwordError'));
      valid = false;
    } else if (password !== confirmPassword) {
      setPasswordError(t('signUpPage.passwordMismatchError'));
      valid = false;
    } else {
      setPasswordError(null);
    }

    if (!captchaToken) {
      setErrorMessage('Please complete the CAPTCHA');
      valid = false
      return;
    }
    else{
      valid = true;
    }

    if (valid) {
      try {
        await signupUser({ firstName, lastName, email, password, captchaToken });
        storeEncryptedData("email", email)
        navigate('/otp-verification', { state: { email } });
      } catch (error: any) {
        setErrorMessage(error.message);
      }
    }
  };

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}>
          <img src={process.env.PUBLIC_URL + '/logo.png'} alt={t('general.companyLogoAlt')} style={{ height: 60 }} />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t('signUpPage.title')}
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label={t('signUpPage.firstNameLabel')}
                  autoFocus
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  error={!!firstNameError}
                  helperText={firstNameError}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label={t('signUpPage.lastNameLabel')}
                  name="lastName"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  error={!!lastNameError}
                  helperText={lastNameError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label={t('signUpPage.emailLabel')}
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={!!emailError}
                  helperText={emailError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label={t('signUpPage.passwordLabel')}
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={!!passwordError}
                  helperText={passwordError}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword((show) => !show)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label={t('signUpPage.confirmPasswordLabel')}
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  error={!!passwordError}
                  helperText={passwordError}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle confirm password visibility"
                          onClick={() => setShowConfirmPassword((show) => !show)}
                          edge="end"
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
              <ReCAPTCHA
                sitekey="6LdoN0cqAAAAAPWjETt1VTDwItUxIWJdlXwvr2rk" // Replace with your reCAPTCHA site key
                onChange={handleCaptchaChange}
                style={{ marginBottom: '16px' }} // Add margin for spacing
              />

              <GoogleSignIn />
            </Box>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              {t('signUpPage.button')}
            </Button>
            {errorMessage && <Typography color="error">{errorMessage}</Typography>}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2" onClick={() => navigate('/signin')}>
                  {t('signUpPage.alreadyAccount')}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}