import React from 'react';
import { Grid, TextField, Button } from '@mui/material';

const ApiSettings: React.FC = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="API Key"
          placeholder="Enter API key"
          fullWidth
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="API Secret"
          placeholder="Enter API secret"
          fullWidth
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary">Update API Credentials</Button>
      </Grid>
    </Grid>
  );
};

export default ApiSettings;