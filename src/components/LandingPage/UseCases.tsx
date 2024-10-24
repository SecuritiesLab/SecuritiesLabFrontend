import * as React from 'react';
import { Box, Grid, Typography, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function UseCasesComponent() {
  const { t } = useTranslation();

  const useCases = [
    { title: t('useCases.case1.title'), description: t('useCases.case1.description'), solution: t('useCases.case1.solution') },
    { title: t('useCases.case2.title'), description: t('useCases.case2.description'), solution: t('useCases.case2.solution') },
    { title: t('useCases.case3.title'), description: t('useCases.case3.description'), solution: t('useCases.case3.solution') },
    { title: t('useCases.case4.title'), description: t('useCases.case4.description'), solution: t('useCases.case4.solution') },
  ];

  return (
    <Container id="useCases" sx={{ mt: 8, mb: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography component="h2" variant="h4" color="text.primary">
          {t('useCases.title')}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: { xs: 2, sm: 4 } }}>
          {t('useCases.subtitle')}
        </Typography>
      </Box>
      {useCases.map((useCase, index) => (
        <Box key={index} sx={{ mb: 4, p: 4, backgroundColor: '#1e1e1e', borderRadius: 2, boxShadow: 3 }}>
          <Grid container justifyContent="center" sx={{ alignItems: 'center', textAlign: 'center' }}>
            <Grid item xs={12} md={8} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="h5" gutterBottom sx={{ color: '#fff' }}>
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
        </Box>
      ))}
    </Container>
  );
}