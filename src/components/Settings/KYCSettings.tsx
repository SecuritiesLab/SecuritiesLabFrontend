import React, { useState, useEffect } from 'react';
import { Grid, Button, Typography, Box } from '@mui/material';
import axiosInstance from '../../api/axiosConfig';
import SumsubKycWidget from '../KYC/SumSubKycWidget';
import { getDecryptedData } from '../../authentication/EncryptAndDecryptData';

const KYCSettings: React.FC = () => {
  const [kycStarted, setKycStarted] = useState(false);
  const [kycStatus, setKycStatus] = useState(false);
  const email = getDecryptedData('email');

  // Fetch KYC status
  useEffect(() => {
    const fetchKycStatus = async () => {
      try {
        const response = await axiosInstance.get(`/users/user-details?email=${email}`); 
        setKycStatus(response.data.kycStatus);
      } catch (error) {
        console.error('Failed to fetch KYC status:', error);
      }
    };

    fetchKycStatus();
  }, []);

  // Handle KYC button click
  const handleKycInitiation = () => {
    setKycStarted(true);
    console.log('Initiating KYC process...');
  };

  // Handle KYC completion
  const handleKycCompleted = () => {
    try {
      axiosInstance.post('/sumsub/kyc-completed', {email, status: 'completed' })
        .then(response => console.log('Backend notified:', response.data))
        .catch(error => console.error('Error notifying backend:', error));
      setKycStatus(true);
      console.log('KYC Completed and status updated successfully');
    } catch (error) {
      console.error('Failed to update KYC status:', error);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">
          KYC Status: {kycStatus ? 'Completed' : 'Not Completed'}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}> {/* Aligning buttons properly */}
          {!kycStatus && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleKycInitiation}
              disabled={kycStarted} // Disable if KYC is already started
            >
              Start KYC
            </Button>
          )}
        </Box>
      </Grid>

      {kycStarted && (
        <Grid item xs={12}>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6">KYC Process</Typography>
            <Button variant="contained" color="error" onClick={() => setKycStarted(false)}>
              Cancel KYC
            </Button>
            {/* SumSub KYC Widget Component Here */}
            <SumsubKycWidget onKycCompleted={handleKycCompleted}/> 
          </Box>
        </Grid>
      )}
    </Grid>
  );
};

export default KYCSettings;