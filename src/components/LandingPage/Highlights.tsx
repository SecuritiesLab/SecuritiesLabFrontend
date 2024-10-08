import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import { useTranslation } from 'react-i18next';

const items = [
  { icon: <SettingsSuggestRoundedIcon />, key: 'highlights.item1' },
  { icon: <ConstructionRoundedIcon />, key: 'highlights.item2' },
  { icon: <ThumbUpAltRoundedIcon />, key: 'highlights.item3' },
  { icon: <AutoFixHighRoundedIcon />, key: 'highlights.item4' },
  { icon: <SupportAgentRoundedIcon />, key: 'highlights.item5' },
  { icon: <QueryStatsRoundedIcon />, key: 'highlights.item6' },
];

export default function Highlights() {
  const { t } = useTranslation();

  return (
    <Box id="highlights" sx={{ pt: { xs: 4, sm: 12 }, pb: { xs: 8, sm: 16 }, color: 'white', bgcolor: '#06090a' }}>
      <Container
        sx={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: { xs: 3, sm: 6 } }}
      >
        <Box sx={{ width: { sm: '100%', md: '60%' }, textAlign: { sm: 'left', md: 'center' } }}>
          <Typography component="h2" variant="h4">
            {t('highlights.title')}
          </Typography>
          <Typography variant="body1" sx={{ color: 'grey.400' }}>
            {t('highlights.subtitle')}
          </Typography>
        </Box>
        <Grid container spacing={2.5}>
          {items.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Stack
                direction="column"
                color="inherit"
                component={Card}
                spacing={1}
                useFlexGap
                sx={{
                  p: 3,
                  height: '100%',
                  border: '1px solid',
                  borderColor: 'grey.800',
                  background: 'transparent',
                  backgroundColor: 'grey.900',
                }}
              >
                <Box sx={{ opacity: '50%' }}>{item.icon}</Box>
                <div>
                  <Typography fontWeight="medium" gutterBottom>
                    {t(`${item.key}.title`)}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'grey.400' }}>
                    {t(`${item.key}.description`)}
                  </Typography>
                </div>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}