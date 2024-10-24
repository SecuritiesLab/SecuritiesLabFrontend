import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button, Typography, Box } from '@mui/material';
import axiosInstance from '../../api/axiosConfig';
import { getDecryptedData } from '../../authentication/EncryptAndDecryptData';

const AccountSettings: React.FC = () => {
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const [loading, setLoading] = useState(true);
  const email = getDecryptedData('email');

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
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSaveChanges}
        >
          Save Changes
        </Button>
      </Grid>
    </Grid>
  );
};

export default AccountSettings;