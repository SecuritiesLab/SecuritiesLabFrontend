import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const logoStyle = {
  width: '140px',
  height: 'auto',
  marginBottom: '16px', // Added margin bottom for space below the logo
};

export default function Footer() {
  return (
    <Box
      sx={{
        bottom: 0,
        left: 0,
        width: '100%',
        bgcolor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 2, // Increased padding for more space inside the footer
        boxShadow: 0,
        zIndex: 1300, // Ensures footer is above other content
      }}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          mb: 2, // Add bottom margin to create extra space below the container
        }}
      >
        <Link href="https://www.linkedin.com/company/securities-lab" target="_blank" rel="noopener noreferrer">
        <img
              src={process.env.PUBLIC_URL + '/logo.png'}
              style={logoStyle}
              alt="logo of sitemark"
            />
        </Link>
        <Typography variant="body2" color="text.secondary" mt={1} sx={{ display: 'flex', alignItems: 'center' }}>
          Follow us on{' '}
          <Link href="https://www.linkedin.com/company/securities-lab" target="_blank" rel="noopener noreferrer">
            <LinkedInIcon fontSize="small" sx={{ ml: 0.5 }} />
          </Link>
        </Typography>
      </Container>
    </Box>
  );
}
