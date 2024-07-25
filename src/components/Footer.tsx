import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';


const logoStyle = {
  width: '140px',
  height: 'auto',
  marginBottom: '16px', // Add margin below the logo
};

export default function Footer() {
  return (
    <Box
      sx={{
        position: 'relative',
        bottom: 0,
        left: 0,
        width: '100%',
        bgcolor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 2, // Adjust padding for top and bottom
        boxShadow: 0,
        pb: 10, // Add padding-bottom for space below LinkedIn text
      }}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Link href="https://www.linkedin.com/company/securities-lab" target="_blank" rel="noopener noreferrer">
        <img
              src={process.env.PUBLIC_URL + '/logo.png'}
              style={logoStyle}
              alt="logo of sitemark"
            />
        </Link>
        <Typography variant="body2" color="text.secondary" mt={1}>
          Follow us on 
          <Link href="https://www.linkedin.com/company/securities-lab" target="_blank" rel="noopener noreferrer">
          LinkedIn
          </Link>
        </Typography>
      </Container>
    </Box>
  );
}
