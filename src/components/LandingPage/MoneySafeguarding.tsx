import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/system';
import { useTranslation } from 'react-i18next';


export default function MoneySafeguarding() {
  const theme = useTheme();
   const { t } = useTranslation();

  const safeguarding = [
    {
      title: t('moneySafeguarding.safeguarding1.title'),
      text: t('moneySafeguarding.safeguarding1.text')
    },
    {
      title: t('moneySafeguarding.safeguarding2.title'),
      text: t('moneySafeguarding.safeguarding2.text')
    },
    {
      title: t('moneySafeguarding.safeguarding3.title'),
      text: t('moneySafeguarding.safeguarding3.text')
    },
  ]
  
  const DepositAsAService = [
    {
      title: t('moneySafeguarding.deposit1.title'),
      text: t('moneySafeguarding.deposit1.text'),
    },
    {
      title: t('moneySafeguarding.deposit2.title'),
      text: t('moneySafeguarding.deposit2.text'),
    },
    {
      title: t('moneySafeguarding.deposit3.title'),
      text: t('moneySafeguarding.deposit3.text'),
    },
  ]
  
  const StableCoinWallet = [
    {
      title: t('moneySafeguarding.stablecoin1.title'),
      text: t('moneySafeguarding.stablecoin1.text'),
    },
    {
      title: t('moneySafeguarding.stablecoin2.title'),
      text: t('moneySafeguarding.stablecoin2.text'),
    },
    {
      title: t('moneySafeguarding.stablecoin3.title'),
      text: t('moneySafeguarding.stablecoin3.text'),
    },
  ]
  return (
    <Container
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Box 
      id = "safeguarding"
        sx={{
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        <Typography component="h2" variant="h4" color="text.primary">
        {t('moneySafeguarding.safeguardingTitle')}
        </Typography>
        <Typography variant="body1" color="text.secondary">
        {t('moneySafeguarding.safeguardingDescription')}
        </Typography>
      </Box>
      <Grid container spacing={2} justifyContent="center">
        {safeguarding.map((data, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex' }}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flexGrow: 1,
                p: 1,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  pr: 2,
                }}
              >
                <CardHeader
                  title={data.title}
                />
              </Box>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {data.text}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box
      id = "deposit-as-a-service"
        sx={{
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        <Typography component="h2" variant="h4" color="text.primary">
        {t('moneySafeguarding.depositTitle')}
        </Typography>
        <Typography variant="body1" color="text.secondary">
        {t('moneySafeguarding.depositDescription')}
        </Typography>
      </Box>
      <Grid container spacing={2} justifyContent="center">
        {DepositAsAService.map((data, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex' }}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flexGrow: 1,
                p: 1,
              }}
            >
                            <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  pr: 2,
                }}
              >
                <CardHeader
                  title={data.title}
                />
              </Box>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {data.text}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box
      id = "stablecoin-wallets"
        sx={{
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        <Typography component="h2" variant="h4" color="text.primary">
        {t('moneySafeguarding.stablecoinTitle')}
        </Typography>
        <Typography variant="body1" color="text.secondary">
        {t('moneySafeguarding.stablecoinDescription')}
        </Typography>
      </Box>
      <Grid container spacing={2} justifyContent="center">
        {StableCoinWallet.map((data, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex' }}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flexGrow: 1,
                p: 1,
              }}
            >
                            <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  pr: 2,
                }}
              >
                <CardHeader
                  title={data.title}
                />
              </Box>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {data.text}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

    </Container>
  );
}
