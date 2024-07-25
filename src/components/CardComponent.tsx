import React from 'react';
import { Box, Typography, Container, Card } from '@mui/material';

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
          justifyContent: 'center',
          borderRadius: '8px',
          padding: '24px',
          color: '#FFFFFF',
          minHeight: '300px',
          maxWidth: '1200px',
          width: '100%',
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            We enable financial institutions and businesses to diversify revenue streams and enhance customer retention through turnkey AI-driven treasury management and access to tokenized securities.
          </Typography>
        </Box>
      </Card>
    </Container>
  );
};

export default CryptoCardComponent;
