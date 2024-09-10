import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://securitieslab.eu/">
        SecuritiesLab
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// Create a dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function SignInPage() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email') as string;
    const password = data.get('password') as string;

    // Check if the credentials match
    if (email === 'admin@securitieslab.eu' && password === 'SLteam123!$&') {
      setErrorMessage(null);
      // Navigate to the dashboard
      navigate('/dashboard');
    } else {
      // Set error message if the credentials are incorrect
      setErrorMessage('Invalid email or password.');
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Logo at the Top */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <img src={process.env.PUBLIC_URL + '/logo.png'} alt="Company Logo" style={{ height: 60 }} />
          </Box>

          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              InputLabelProps={{ style: { color: 'white' } }} // Ensures the label is visible in dark mode
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              InputLabelProps={{ style: { color: 'white' } }} // Ensures the label is visible in dark mode
            />
            {errorMessage && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {errorMessage}
              </Typography>
            )}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>

           
            <Grid container>
               {/*
              <Grid item xs>
                <Link href="#" variant="body2" color="inherit">
                  Forgot password?
                </Link>
              </Grid>
              */}
              <Grid item>
                <Link
                  variant="body2"
                  color="inherit"
                  onClick={() => navigate('/signup')}
                  style={{ cursor: 'pointer' }}
                >
                  {"Don't have an account? Sign Up"}
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