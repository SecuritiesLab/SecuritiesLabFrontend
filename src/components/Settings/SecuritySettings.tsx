import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button, Typography, Box } from '@mui/material';
import axiosInstance from '../../api/axiosConfig'; // Assuming you have an axios instance for API requests
import TwoFactorSettings from './TwoFactorSettings';
import { getDecryptedData } from '../../authentication/EncryptAndDecryptData';

const SecuritySettings: React.FC = () => {
  const [userDetails, setUserDetails] = useState({
    email: '',
    isTwoFactorEnabled: false,
    twoFactorSecret: null,
  });
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const email = getDecryptedData("email")

  // Fetch user details (for 2FA status)
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axiosInstance.get(`/users/user-details?email=${email}`); // Replace with real email
        setUserDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch user details:', error);
        setLoading(false);
      }
    };
    fetchUserDetails();
  }, []);

  // Password validation function
  const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    return passwordRegex.test(password);
  };

  // Handle password change
  const handlePasswordReset = async () => {
    if (!validatePassword(newPassword)) {
      setPasswordError('Password must be at least 8 characters long and include an uppercase letter, a number, and a special character.');
      return;
    } else if (newPassword !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match.');
      return;
    } else {
      setPasswordError(null);
      setConfirmPasswordError(null);
    }

    try {
      await axiosInstance.post('/auth/change-password', {
        email: userDetails.email,
        newPassword: newPassword,
      });
      alert('Password updated successfully!');
    } catch (error) {
      console.error('Failed to update password:', error);
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Grid container spacing={2}>
      {/* Change Password Section */}
      <Grid item xs={12}>
        <Typography variant="h6">Change Password</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="New Password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          fullWidth
          variant="outlined"
          error={!!passwordError} // Show error if password is invalid
          helperText={passwordError} // Display password error message
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          fullWidth
          variant="outlined"
          error={!!confirmPasswordError} // Show error if passwords do not match
          helperText={confirmPasswordError} // Display confirm password error message
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePasswordReset}
          disabled={!validatePassword(newPassword) || newPassword !== confirmPassword} // Disable if passwords are invalid or don't match
        >
          Update Password
        </Button>
      </Grid>

      {/* Two-Factor Authentication Section */}
      <Grid item xs={12}>
        <TwoFactorSettings
          email={userDetails.email}
          twoFactorSecret={userDetails.twoFactorSecret}
          isTwoFactorEnabled={userDetails.isTwoFactorEnabled}
        />
      </Grid>
    </Grid>
  );
};

export default SecuritySettings;