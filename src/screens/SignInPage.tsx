import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { signinUser } from '../api/userApi';
import { Avatar, Button, CssBaseline, TextField, Typography, Container, Box, Link, Grid } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await signinUser({ email, password });
      navigate('/dashboard');
    } catch (error: any) {
      setErrorMessage(t('signInPage.errorMessage'));
    }
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
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              {t('signInPage.button')}
            </Button>

            <Grid container>
            <Grid item xs>
                {/* Add Forgot Password Link */}
                <Link variant="body2" color="inherit" onClick={() => navigate('/forgot-password')} style={{ cursor: 'pointer' }}>
                  {t('signInPage.forgotPassword')}
                </Link>
              </Grid>
              <Grid item>
                <Link variant="body2" color="inherit" onClick={() => navigate('/signup')} style={{ cursor: 'pointer' }}>
                  {t('signInPage.noAccount')}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}