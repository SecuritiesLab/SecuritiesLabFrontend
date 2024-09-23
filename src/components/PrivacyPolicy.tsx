import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const PrivacyPolicy = () => {
  return (
    <Container component="main" maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Privacy Policy
        </Typography>
        
        <Typography variant="body1" paragraph>
          <strong>Effective Date:</strong> 18th September 2024
        </Typography>

        <Typography variant="body1" paragraph>
          SecuritiesLab ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our application, SecuritiesLab.
        </Typography>

        <Typography variant="h6" gutterBottom>
          1. Information We Collect
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Personal Information:</strong> When you register an account, we collect personal information, including but not limited to, your name, email address, and password.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Usage Data:</strong> We collect information about how you interact with our app, including your IP address, browser type, and usage statistics.
        </Typography>

        <Typography variant="h6" gutterBottom>
          2. How We Use Your Information
        </Typography>
        <Typography variant="body1" paragraph>
          We use your information to:
          <ul>
            <li>Provide, operate, and maintain the app.</li>
            <li>Improve and personalize the user experience.</li>
            <li>Communicate with you, such as for customer support or to provide updates.</li>
          </ul>
        </Typography>

        <Typography variant="h6" gutterBottom>
          3. Sharing Your Information
        </Typography>
        <Typography variant="body1" paragraph>
          We do not share your personal information with any third parties, except:
          <ul>
            <li>If required by law or to protect our legal rights.</li>
            <li>With third-party service providers that assist in app operations (e.g., hosting services).</li>
          </ul>
        </Typography>

        <Typography variant="h6" gutterBottom>
          4. Security
        </Typography>
        <Typography variant="body1" paragraph>
          We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the internet is completely secure.
        </Typography>

        <Typography variant="h6" gutterBottom>
          5. Changes to This Privacy Policy
        </Typography>
        <Typography variant="body1" paragraph>
          We may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated date.
        </Typography>

        <Typography variant="h6" gutterBottom>
          6. Contact Us
        </Typography>
        <Typography variant="body1" paragraph>
          If you have any questions or concerns about this Privacy Policy, please contact us at postmaster@securitieslab.eu.
        </Typography>
      </Box>
    </Container>
  );
};

export default PrivacyPolicy;