import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { verifyOtp } from '../api/userApi'; // Import the verifyOtp service
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

function OtpVerification() {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email; // Get email from state passed via navigation


  // Dark theme configuration
const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const handleVerifyOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const otpData = { email, otp }; // Prepare OTP data to send
      const response = await verifyOtp(otpData); // Call verifyOtp service
      alert(response); // Show success message or handle as needed
      navigate('/dashboard'); // Redirect to Terms and Conditions after successful OTP verification
    } catch (error) {
      setError('Invalid OTP. Please try again.');
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
    <Container component="main" maxWidth="xs">
    <CssBaseline />

{/* Logo at the Top */}
<Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}>
  <img src={process.env.PUBLIC_URL + '/logo.png'} alt="Company Logo" style={{ height: 60 }} />
</Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 4,
        }}
      >
        <Typography component="h1" variant="h5">
          Verify OTP
        </Typography>
        <form onSubmit={handleVerifyOtp}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Verify OTP
          </Button>
          {error && <Typography color="error">{error}</Typography>}
        </form>
      </Box>
    </Container>
    </ThemeProvider>
  );
}

export default OtpVerification;