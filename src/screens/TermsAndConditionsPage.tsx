import * as React from 'react';
import { Box, Button, Container, Typography, Paper, Link } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

export default function TermsAndConditionsPage() {
  const handleAccept = () => {
    // Handle accept logic here
    console.log("Accepted");
  };

  const handleDecline = () => {
    // Handle decline logic here
    console.log("Declined");
  };

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome Tomas Tourlet
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Terms & Conditions
        </Typography>

        {/* Download Link */}
        <Link href="/path/to/terms.pdf" underline="none" sx={{ mb: 2 }}>
          <Button startIcon={<DownloadIcon />} variant="outlined">
            Download
          </Button>
        </Link>

        {/* Terms and Conditions Content */}
        <Paper variant="outlined" sx={{ p: 2, maxHeight: 300, overflow: 'auto', mb: 4 }}>
          <Typography variant="h6">1. Introduction</Typography>
          <Typography variant="body2" paragraph>
            1.1 These Terms constitute a valid, binding, and enforceable agreement between SecuritiesLab and
            the person that benefits from our services.....
          </Typography>
        </Paper>

        {/* Accept and Decline Buttons */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" color="primary" onClick={handleAccept}>
            ACCEPT
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleDecline}>
            DECLINE
          </Button>
        </Box>
      </Box>
    </Container>
  );
}