import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Snackbar, Alert, Paper, Divider } from '@mui/material';

const ApiDocumentationPage = () => {
  const [oauthClientId, setOauthClientId] = useState('');
  const [oauthClientSecret, setOauthClientSecret] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  // Dummy function to generate OAuth2 credentials (client_id and client_secret)
  const handleGenerateCredentials = () => {
    // Simulate credential generation (in real implementation, this would be done via a backend)
    setOauthClientId('dummy-client-id-123456');
    setOauthClientSecret('dummy-client-secret-abcdef');
    setShowSuccess(true);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>API Documentation & OAuth2 Access</Typography>

      {/* Section for generating OAuth2 credentials */}
      <Typography variant="h6" gutterBottom>Generate OAuth2 Credentials</Typography>
      <Typography variant="body2" gutterBottom>
        Generate your OAuth2 credentials to securely access our API. Use these credentials to authenticate your
        requests when programmatically creating or managing deposit products.
      </Typography>
      <Button variant="contained" onClick={handleGenerateCredentials} sx={{ mb: 2 }}>
        Generate OAuth2 Credentials
      </Button>

      {/* Display generated credentials */}
      {oauthClientId && (
        <Paper sx={{ padding: 2, marginBottom: 3 }}>
          <Typography variant="subtitle1">Your OAuth2 Credentials:</Typography>
          <Typography variant="body2"><strong>Client ID:</strong> {oauthClientId}</Typography>
          <Typography variant="body2"><strong>Client Secret:</strong> {oauthClientSecret}</Typography>
        </Paper>
      )}

      {/* Divider */}
      <Divider sx={{ my: 3 }} />

      {/* API Documentation Section */}
      <Typography variant="h6" gutterBottom>API Endpoints</Typography>
      <Typography variant="body2" gutterBottom>
        Below are some common API endpoints you can use to manage deposit products.
      </Typography>

      {/* Example: Create a new deposit product */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1">1. Create a New Deposit Product</Typography>
        <Typography variant="body2" gutterBottom>
          <strong>POST</strong> /api/deposits/create
        </Typography>
        <Paper sx={{ padding: 2 }}>
          <pre>{`
curl -X POST https://api.securitieslab.eu/api/deposits/create \\
  -H "Authorization: Bearer <access_token>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Business Euro Savings Plan",
    "assetManager": "Fidelity ILF - The Euro Fund",
    "pricingPlans": {
      "Pro": "4.5%",
      "Plus": "3.9%"
    },
    "userType": "Retail",
    "initialInvestment": 100000
  }'
          `}</pre>
        </Paper>
      </Box>

      {/* Example: Update an existing deposit product */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1">2. Update an Existing Deposit Product</Typography>
        <Typography variant="body2" gutterBottom>
          <strong>PUT</strong> /api/deposits/{`<deposit_id>`}
        </Typography>
        <Paper sx={{ padding: 2 }}>
          <pre>{`
curl -X PUT https://api.securitieslab.eu/api/deposits/<deposit_id> \\
  -H "Authorization: Bearer <access_token>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Updated Euro Savings Plan",
    "pricingPlans": {
      "Pro": "5.0%",
      "Plus": "4.0%"
    }
  }'
          `}</pre>
        </Paper>
      </Box>

      {/* Example: List all deposit products */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1">3. List All Deposit Products</Typography>
        <Typography variant="body2" gutterBottom>
          <strong>GET</strong> /api/deposits
        </Typography>
        <Paper sx={{ padding: 2 }}>
          <pre>{`
curl -X GET https://api.securitieslab.eu/api/deposits \\
  -H "Authorization: Bearer <access_token>" \\
          `}</pre>
        </Paper>
      </Box>

      {/* Success Snackbar */}
      <Snackbar open={showSuccess} autoHideDuration={3000} onClose={() => setShowSuccess(false)}>
        <Alert onClose={() => setShowSuccess(false)} severity="success">
          OAuth2 credentials generated successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ApiDocumentationPage;