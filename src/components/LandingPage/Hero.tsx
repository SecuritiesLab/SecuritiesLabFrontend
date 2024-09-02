import * as React from 'react';
import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default function Hero() {
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
        fontSize: 'clamp(3.5rem, 10vw, 4rem)',
      }}
    >
      <Typography
        component="div"
        variant="h1"
        sx={{
          fontSize: 'inherit',
          color: (theme) =>
          theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
          whiteSpace: 'nowrap', 
        }}
      >
        Embedded Wealth Management For 
      </Typography>
      <Typography
        component="div"
        variant="h1"
        sx={{
          fontSize: 'clamp(3rem, 10vw, 4rem)',
          color: (theme) =>
            theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
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
                    onClick={() => window.open('/typeform', '_blank')}
                  >
                    Get early access
                  </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
