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

const safeguarding = [
  {
    title: "Seamless Multicurrency Options",
    text: "Effortlessly manage safeguarding in multiple currencies with top asset managers. Enjoy the convenience of instant access and reliable performance."
  },
  {
    title: "AI-Driven Optimization",
    text: "Optimize idle cash usage with AI tools designed to reduce risk and ensure compliance. Maintain regulatory peace of mind with intelligent treasury management."
  },
  {
    title: "Flexible Integration",
    text: "Choose between seamless API integration or utilizing our intuitive platform. Adaptable solutions to fit your specific operational needs."
  },
]

const DepositAsAService = [
  {
    title: "Effortless Account Opening",
    text: "Open deposit accounts for your end customers effortlessly to enrich your product offering. Retain customers by helping them monetize their cash flow."
  },
  {
    title: "Diverse Securities Selection",
    text: "Offer a wide range of securities to meet your customers' needs, including money market funds, tokenized securities, and bonds, providing the desired exposure."
  },
  {
    title: "Competitive Edge",
    text: "Stay ahead of major fintech competitors and keep pace with market evolution. Monetizing cash flow is now a must-have for financial institutions."
  },
]

const StableCoinWallet = [
  {
    title: "Instant Wallet Creation",
    text: "Create stablecoin wallets effortlessly for your end customers with a click of a button, simplifying the onboarding process."
  },
  {
    title: "Seamless Transactions",
    text: "Facilitate fast, transparent, and secure transactions using stablecoins, ensuring a modern and efficient payment solution."
  },
  {
    title: "Enhanced Security",
    text: "Offer your end customers enhanced security features with stablecoin wallets, ensuring their transactions and assets are protected."
  },
]

export default function MoneySafeguarding() {
  const theme = useTheme();

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
        Safeguarding Solutions
        </Typography>
        <Typography variant="body1" color="text.secondary">
        Often difficult to open, costly, and not generating yield, safeguarding accounts present significant challenges. Our solution changes this landscape.
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
        Deposit as a Service
        </Typography>
        <Typography variant="body1" color="text.secondary">
        Empower your offerings by enabling yield-bearing deposits for your end customers with our innovative solution.
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
        Stablecoin Wallets
        </Typography>
        <Typography variant="body1" color="text.secondary">
        Embrace the future of payments by offering exposure to tokenized assets and enabling seamless transactions with stablecoins. Experience speed, transparency, and ease of use.
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
