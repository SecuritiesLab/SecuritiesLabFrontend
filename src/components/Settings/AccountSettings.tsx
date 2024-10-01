import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button, Typography, Box } from '@mui/material';
import axiosInstance from '../../api/axiosConfig'; // Assuming you have an axios instance for API requests
import SumsubKycWidget from '../KYC/SumSubKycWidget';
import { getDecryptedData } from '../../authentication/EncryptAndDecryptData';

const AccountSettings: React.FC = () => {
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    kycStatus: false,
  });

  const [loading, setLoading] = useState(true);
  const [kycStarted, setKycStarted] = useState(false);
  const email = getDecryptedData('email')

  // Fetch user details on component load
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axiosInstance.get(`/users/user-details?email=${email}`); 
        setUserDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch user details:', error);
        setLoading(false);
      }
    };
    
    fetchUserDetails();
  }, []);

  // Handle input changes for editable fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  // Handle KYC button click
  const handleKycInitiation = () => {
    setKycStarted(true);
    console.log('Initiating KYC process...');
  };

  // Handle Save Changes button click (to update first and last names)
  const handleSaveChanges = async () => {
    try {
      const response = await axiosInstance.put('/users/update-user', {
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        email: userDetails.email,
      });
      alert('Details updated successfully!');
    } catch (error) {
      console.error('Failed to update user details:', error);
      alert('Update failed. Please try again.');
    }
  };

  const handleKycCompleted = () => {
    try {
    // You can make a backend call here to notify that KYC is completed
    axiosInstance.post('/sumsub/kyc-completed', {email: userDetails.email, status: 'completed' })
      .then(response => console.log('Backend notified:', response.data))
      .catch(error => console.error('Error notifying backend:', error));
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        kycStatus: true,
      }));
      console.log('KYC Completed and status updated successfully');
    } catch (error) {
      console.error('Failed to update KYC status:', error);
    }
  };


  if (loading) {
    return <Typography>Loading user details...</Typography>;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="First Name"
          name="firstName"
          value={userDetails.firstName}
          onChange={handleChange}
          fullWidth
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Last Name"
          name="lastName"
          value={userDetails.lastName}
          onChange={handleChange}
          fullWidth
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Email"
          name="email"
          value={userDetails.email}
          fullWidth
          variant="outlined"
          disabled // Email is not editable
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">
          KYC Status: {userDetails.kycStatus ? 'Completed' : 'Not Completed'}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}> {/* Aligning buttons properly */}
          {!userDetails.kycStatus && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleKycInitiation}
              disabled={kycStarted} // Disable if KYC is already started
            >
              Start KYC
            </Button>
          )}
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSaveChanges}
          >
            Save Changes
          </Button>
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

export default AccountSettings;