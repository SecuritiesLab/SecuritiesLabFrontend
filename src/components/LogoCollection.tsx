import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const amlogos = [
  `${process.env.PUBLIC_URL}/logo/avivaColor.png`,
  `${process.env.PUBLIC_URL}/logo/blackrock1.png`,
  `${process.env.PUBLIC_URL}/logo/ft1.png`,
  `${process.env.PUBLIC_URL}/logo/fidelityColor.png`,
];

const logoStyle = {
  maxWidth: '200px', // Set max width to control scaling
  height: 'auto', // Maintain aspect ratio
  margin: '0 16px', // Adjust margin for spacing between logos
};

export default function LogoCollection() {
  return (
    <Box id="logoCollection" sx={{ py: 4 }}>
      <Typography
        component="p"
        variant="subtitle2"
        align="center"
        color="text.secondary"
        mb={2} // Margin below the text
      >
        We partner with the best asset managers
      </Typography>
      <Grid
        container
        justifyContent="center" // Centers the logos horizontally
        alignItems="center" // Ensures logos are centered vertically in their container
        spacing={2} // Add spacing between grid items (this replaces the margin)
      >
        {amlogos.map((logo, index) => (
          <Grid item key={index}>
            <img
              src={logo}
              alt={`Company logo number ${index + 1}`}
              style={logoStyle}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
