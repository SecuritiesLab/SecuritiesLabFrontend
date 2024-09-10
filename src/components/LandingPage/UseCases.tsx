import * as React from 'react';
import { Box, Grid, Typography, Container } from '@mui/material';

const imageUrls = [
  '/UseCases/DaAS.jpeg',
  '/UseCases/Safeguarding.jpeg',
  '/UseCases/E-com.jpeg',
  '/UseCases/SME.jpeg',
];

const useCases = [
  {
    title: "FinTech/BaaS - Deposit as a Service",
    description: "As a FinTech, you want to offer your customers the ability to earn interest on their deposits without complicated onboarding.",
    solution: "Integrate Securities Lab’s Deposit as a Service via API to offer daily earnings of up to 5.1% APY, improving customer satisfaction and generating a new revenue stream.",
    image: imageUrls[0],
  },
  {
    title: "FinTech/BaaS: Streamlined Client Funds Safeguarding",
    description: "As a FinTech, you need to securely segregate client funds to meet regulatory requirements and build trust.",
    solution: "Integrate Securities Lab's Safeguarding Solution via API to automate fund segregation, ensure compliance, and streamline auditing with real-time reporting.",
    image: imageUrls[1],
  },
  {
    title: "E-commerce Platforms: Driving Customer Loyalty",
    description: "As an e-commerce platform, you want to increase customer loyalty by offering interest on funds held in e-wallets.",
    solution: "Use Securities Lab’s deposit services API to enable users to earn daily interest, enhancing customer retention and positioning your platform as a leader in financial innovation.",
    image: imageUrls[2],
  },
  {
    title: "SMEs: AI-Driven Treasury Optimization",
    description: "As an SME, you're seeking to optimize treasury operations and maximize returns on idle cash while staying compliant.",
    solution: "Leverage Securities Lab’s AI-powered treasury tools for real-time analytics, risk assessment, and optimized financial management.",
    image: imageUrls[3],
  },
];

const UseCasesComponent = () => {
  return (
    <Container id="useCases" sx={{ mt: 8, mb: 8 }}>
      {/* Title Section */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography component="h2" variant="h4" color="text.primary">
          Use Cases
        </Typography>
        <Typography          variant="body1"
          color="text.secondary"
          sx={{ mb: { xs: 2, sm: 4 } }}>
          Explore how our solutions can benefit different industries.
        </Typography>
      </Box>

      {/* Use Cases Section */}
      {useCases.map((useCase, index) => (
        <Grid
          container
          key={index}
          spacing={1}  // Reduced spacing between image and text
          sx={{
            mb: 6,
            backgroundColor: '#121212',
            borderRadius: 2,
            boxShadow: 3,
            padding: 4,
            alignItems: 'center',  // Ensures vertical alignment
          }}
        >
          {/* Left side for image */}
          <Grid item xs={12} md={5}> {/* Adjusted width to give more space for text */}
            <Box
              component="img"
              src={process.env.PUBLIC_URL + useCase.image}
              alt={useCase.title}
              sx={{
                width: '100%',
                maxHeight: '200px',  // Consistent height for all images
                objectFit: 'cover',
                borderRadius: 2,
              }}
            />
          </Grid>

          {/* Right side for content */}
          <Grid
            item
            xs={12}
            md={7}  // Adjusted the width for the text
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center', // Vertically align the content
              textAlign: 'left',  // Ensure text is left-aligned
              pl: { md: 2 },  // Add padding on the left side for larger screens
            }}
          >
            <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#fff' }}>
              {useCase.title}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom sx={{ mb: 2 }}>
              {useCase.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {useCase.solution}
            </Typography>
          </Grid>
        </Grid>
      ))}
    </Container>
  );
};

export default UseCasesComponent;