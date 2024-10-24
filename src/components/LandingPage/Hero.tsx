import * as React from 'react';
import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Hero() {
  const navigate = useNavigate();
  const { t } = useTranslation();

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
              fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', 
              '@media (max-width: 600px)': {
                fontSize: 'clamp(2rem, 8vw, 2.5rem)', 
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
                whiteSpace: 'normal', 
              }}
            >
              {t('hero.titleLine1')}
            </Typography>
            <Typography
              component="div"
              variant="h1"
              sx={{
                fontSize: 'inherit',
                color: (theme) =>
                  theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
                whiteSpace: 'normal', 
              }}
            >
              {t('hero.titleLine2')}
            </Typography>
          </Typography>
          <Typography
            textAlign="center"
            color="text.secondary"
            sx={{ alignSelf: 'center', width: { sm: '100%', md: '80%' } }}
          >
            {t('hero.subtitle')}
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
              sx={{ width: '100%' }}
              onClick={() => navigate('/get-early-access')}
            >
              {t('hero.button')}
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