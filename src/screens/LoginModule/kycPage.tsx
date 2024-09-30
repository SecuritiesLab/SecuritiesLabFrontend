import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SumsubKycWidget from '../../components/KYC/SumSubKycWidget'; 
import { Button, Box, Typography, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axiosInstance from '../../api/axiosConfig'; // Import your Axios instance
import { useEmail } from '../../contexts/EmailContext';


const KycPage: React.FC = () => {
  const navigate = useNavigate();
  const [kycCompleted, setKycCompleted] = useState(false); // State to manage button text
  const { email: emailFromContext, setEmail: setEmailFromContext } = useEmail();

  const handleSkipKyc = () => {
    if (kycCompleted) {
      // If KYC is completed, redirect to dashboard
      navigate('/2fa');
    } else {
      // If KYC is skipped, you can notify the backend here and then navigate
      navigate('/2fa');
    }
  };

  // Callback to call when KYC is completed
  const handleKycCompleted = () => {
    setKycCompleted(true);
    if (emailFromContext == null){
      console.log("email not present")
      return
    }
    // You can make a backend call here to notify that KYC is completed
    axiosInstance.post('/sumsub/kyc-completed', {email: emailFromContext, status: 'completed' })
      .then(response => console.log('Backend notified:', response.data))
      .catch(error => console.error('Error notifying backend:', error));
  };

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
        <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Complete KYC Verification
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Please complete the KYC process to continue using the platform. You may also choose to skip this step for now.
        </Typography>
        
        {/* Render Sumsub KYC Widget and pass the completion callback */}
        <SumsubKycWidget onKycCompleted={handleKycCompleted} />

        {/* Button changes to "Next" when KYC is completed */}
        <Button 
          variant="contained" 
          color="secondary" 
          sx={{ mt: 4 }} 
          onClick={handleSkipKyc}
        >
          {kycCompleted ? 'Next' : 'Skip KYC'}
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default KycPage;