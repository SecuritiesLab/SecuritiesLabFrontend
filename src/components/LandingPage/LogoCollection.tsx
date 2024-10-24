import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';

const amlogos = [
  `${process.env.PUBLIC_URL}/logo/avivaColor.png`,
  `${process.env.PUBLIC_URL}/logo/blackrock1.png`,
  `${process.env.PUBLIC_URL}/logo/ft1.png`,
  `${process.env.PUBLIC_URL}/logo/fidelityColor.png`,
];

const logoStyle = {
  maxWidth: '200px', 
  height: 'auto',
  margin: '0 16px',
};

export default function LogoCollection() {
  const { t } = useTranslation();

  return (
    <Box id="logoCollection" sx={{ py: 4 }}>
     {/* <Typography component="p" variant="subtitle2" align="center" color="text.secondary" mb={2}>
        {t('logoCollection.title')}
  </Typography> */}
      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        {amlogos.map((logo, index) => (
          <Grid item key={index}>
            <img src={logo} alt={`Company logo number ${index + 1}`} style={logoStyle} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}