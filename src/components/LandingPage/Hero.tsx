import * as React from 'react';
import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: '100%',
        backgroundSize: '100% 20%',
        backgroundRepeat: 'no-repeat',
      })}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '70%' } }}>
          <Typography
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignSelf: 'center',
              textAlign: 'center',
              fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', // Adjusted clamp values for better responsiveness
              '@media (max-width: 600px)': {
                fontSize: 'clamp(2rem, 8vw, 2.5rem)', // Further adjustment for very small screens
              },
            }}
          >
            <Typography
              component="div"
              variant="h1"
              sx={{
                fontSize: 'inherit',
                color: (theme) =>
                  theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
                whiteSpace: 'normal', // Allow text to wrap
              }}
            >
              Embedded Wealth Management For
            </Typography>
            <Typography
              component="div"
              variant="h1"
              sx={{
                fontSize: 'inherit', // Keep font size consistent within this block
                color: (theme) =>
                  theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
                whiteSpace: 'normal', // Allow text to wrap
              }}
            >
              Business Finance
            </Typography>
          </Typography>
          <Typography
            textAlign="center"
            color="text.secondary"
            sx={{ alignSelf: 'center', width: { sm: '100%', md: '80%' } }}
          >
            Optimize your treasury management and access tokenized securities with ease
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignSelf="center"
            spacing={1}
            useFlexGap
            sx={{ pt: 2, width: { xs: '100%', sm: 'auto' } }}
          >
            <Button
              color="primary"
              variant="contained"
              component="a"
              sx={{ width: '100%' }}
              onClick={() => navigate('/typeform')}
            >
              Get early access
            </Button>
          </Stack>
          {/*
          <Typography       
          variant="body2" 
          color="text.secondary"
            sx={{ 
              textAlign: 'center', 
              pt: 3, // Increase spacing above the text
              fontSize: '0.875rem', // Slightly increase font size
            }}>
            By signing up, you agree to our{' '}
            <Link          
            href="/terms-and-conditions" 
              color="primary" 
              underline="always">
              Terms and Conditions
            </Link>.
          </Typography>
          */}
        </Stack>
      </Container>
    </Box>
  );
}