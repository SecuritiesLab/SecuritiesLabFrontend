import React from 'react';

import { Box, Typography, Container, Card } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import StarIcon from '@mui/icons-material/Star';

const CryptoCardComponent = () => {
  const theme = useTheme();

  return (
    <Container
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        display: 'flex',
        justifyContent: 'center',
        mb: { xs: 6, sm: 12 },
      }}
    >
      <Card
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 2,
          padding: 4,
          color: theme.palette.text.primary,
          minHeight: '300px',
          maxWidth: '1200px',
          width: '100%',
          position: 'relative',
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.shadows[5],
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                background: `linear-gradient(90deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: '9rem',
                fontWeight: 'bold',
                display: 'inline-block',
                textAlign: 'center',
                textShadow: `2px 2px 4px ${theme.palette.grey[700]}`,
                lineHeight: 1,
                mb: 1,
              }}
            >
              5.1%
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                fontSize: '1rem',
                color: theme.palette.text.secondary,
              }}
            >
              <Typography variant="caption">
                * Conditions apply
              </Typography>
            </Box>
          </Box>
          <Box sx={{ textAlign: 'center', maxWidth: '800px' }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
              We enable financial institutions and businesses to diversify revenue streams and enhance customer retention through turnkey AI-driven treasury management and access to tokenized securities.
            </Typography>
          </Box>
        </Box>
      </Card>
    </Container>
  );
};

export default CryptoCardComponent;
