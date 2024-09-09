import * as React from 'react';
import { Container, Typography, Box, Link } from '@mui/material';

export default function CompanyTermsPage() {
  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Terms and Conditions
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        Last updated: [Date]
      </Typography>

      <Typography variant="body1" paragraph>
        Welcome to SecuritiesLab(“Company”, “we”, “our”, “us”). These Terms and Conditions (“Terms”, “Agreement”) govern your access to and use of our website securitieslab.eu (“Site”) and services, including any information, tools, and features offered on the Site.
      </Typography>

      <Typography variant="body1" paragraph>
        By accessing or using our Site, you agree to be bound by these Terms. If you do not agree to all the terms and conditions of this agreement, then you may not access the Site or use any services.
      </Typography>

      <Typography variant="h6" gutterBottom>
        1. Use of Our Site
      </Typography>
      <Typography variant="body1" paragraph>
        You may use our Site and services for lawful purposes only. You agree not to use the Site in any way that could damage, disable, overburden, or impair the Site or interfere with any other party’s use of the Site.
      </Typography>

      <Typography variant="h6" gutterBottom>
        2. Collection of Information
      </Typography>
      <Typography variant="body1" paragraph>
        We collect information from you when you fill out forms on our Site, including but not limited to Typeform, and when you interact with features and tools on our Site. This information may include your name, email address, contact information, and any other details you provide.
      </Typography>

      <Typography variant="h6" gutterBottom>
        3. Cookies
      </Typography>
      <Typography variant="body1" paragraph>
        We use cookies and similar technologies to improve your experience on our Site. Cookies are small data files stored on your device that help us remember your preferences and enhance your user experience. By using our Site, you consent to the use of cookies in accordance with our Terms.
      </Typography>

      <Typography variant="h6" gutterBottom>
        4. Storage of Information
      </Typography>
      <Typography variant="body1" paragraph>
        The information you provide to us through Typeform or any other means on our Site is stored securely and used solely for the purpose of providing you with the services offered on our Site. We take reasonable steps to protect your information from unauthorized access, disclosure, alteration, or destruction.
      </Typography>

      <Typography variant="h6" gutterBottom>
        5. Changes to Terms
      </Typography>
      <Typography variant="body1" paragraph>
        We reserve the right to update or modify these Terms at any time without prior notice. Your continued use of the Site after any changes to these Terms will constitute your acceptance of such changes.
      </Typography>

      <Typography variant="h6" gutterBottom>
        6. Governing Law
      </Typography>
      <Typography variant="body1" paragraph>
        These Terms and any separate agreements whereby we provide you services shall be governed by and construed in accordance with the laws of Latvia.
      </Typography>

      <Typography variant="h6" gutterBottom>
        7. Contact Information
      </Typography>
      <Typography variant="body1" paragraph>
        If you have any questions about these Terms, please contact us at [your contact information].
      </Typography>

      <Box sx={{ mt: 4 }}>
        <Link href="/" variant="body2" color="primary">
          Back to Home
        </Link>
      </Box>
    </Container>
  );
}