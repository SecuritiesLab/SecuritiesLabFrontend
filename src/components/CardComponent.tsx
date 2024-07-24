import React from 'react';
import { Box, Button, Typography, Container, Grid, Card } from '@mui/material';

const CryptoCardComponent = () => {
  return (
    <Container
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Card
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderRadius: '8px',
          padding: '24px',
          color: '#FFFFFF',
          minHeight: '300px',
          maxWidth: '1200px',
          width: '100%',
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography variant="h1" sx={{ fontSize: '80px', fontWeight: 'bold' }}>
            2%
          </Typography>
        </Box>

        <Box sx={{ flex: 2, textAlign: 'left' }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            Spend crypto, get cash back
          </Typography>
          <Typography variant="body1" sx={{ marginY: '16px' }}>
            Earn 2% Cashback with Bleep's Crypto Card on every purchase you make, whether it's online or in-store. Available with Apple Pay and Google Pay.
          </Typography>
          <Box sx={{ display: 'flex', gap: '16px' }}>
            <Button variant="outlined" sx={{ color: '#FFFFFF', borderColor: '#FFFFFF' }}>
              Compare
            </Button>
            <Button variant="contained" sx={{ backgroundColor: '#1A73E8' }}>
              Get started
            </Button>
          </Box>
        </Box>

        <Box sx={{ flex: 1, textAlign: 'right' }}>
          <img
            src="https://via.placeholder.com/150"
            alt="Crypto Card"
            style={{ borderRadius: '8px', width: '100%', maxWidth: '200px' }}
          />
        </Box>
      </Card>
    </Container>
  );
};

export default CryptoCardComponent;
