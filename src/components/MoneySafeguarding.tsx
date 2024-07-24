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


const moneySafeguarding = [
  {
    avatar: <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />,
    name: 'Remy Sharp',
    occupation: 'Senior Engineer',
    testimonial:
      "Allocate funds to eligible traditional and tokenized assets.",
  },
  {
    avatar: <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />,
    name: 'Travis Howard',
    occupation: 'Lead Product Designer',
    testimonial:
      "Manage treasury via our Saaas",
  },
  {
    avatar: <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />,
    name: 'Cindy Baker',
    occupation: 'CTO',
    testimonial:
      'Safeguard easily in T+0 assets (MMF, 0-risk instruments under Basel III) via our SaaS',
  }
];

const problems = [
  {
    title:
      "Low Yield on Safeguarding Solutions",
      data: "Fintechs often encounter safeguarding solutions that offer minimal returns. This necessitates a robust treasury management system to effectively optimize and monitor idle funds."
  },
  {
    title:
      "Scalability Issues for Asset Managers",
      data: "Asset managers face challenges in scaling their operations to onboard fintechs and their end customers efficiently. This results in complex and costly deposit solutions."
  },
  {
    title:
      "Need for New Revenue Streams",
      data: "Fintechs typically operate in low-profit environments and require innovative revenue streams to monetize their cash flow, making traditional deposit solutions challenging and expensive."
  }
];

const solutions = [
  {
    title: 'Seamless Connectivity',
    subtitle: 'Our smart SaaS platform connects financial institutions and businesses with asset managers.',
    data:
      "Enjoy embedded access to liquid assets for safeguarding and end customer deposits.",
  },
  {
    title: 'Advanced Management Tools',
    subtitle: 'AI-driven treasury management tools optimize idle fund usage.',
    data:
      "These essential tools reduce risk, ensure compliance with strict capital and safeguarding requirements, and provide regulatory peace of mind.",
  },
  {
    title: 'Access to Traditional and Tokenized Securities',
    subtitle: 'Facilitates access to both traditional and tokenized securities.',
    data:
      'Embrace the speed of tokenization and unlock new opportunities for fintechs to further monetize their transaction flow.',
  }
];


const optimizing = [
  {
    testimonial:
      "Simplify reconciliation and treasury management on your assets.",
  },
  {
    testimonial:
      "Simplify reconciliation and treasury management on your assets.",
  }
];


const empower = [
  {
    testimonial:
      "Enable customers to earn yield on idle cash via innovative products.",
  },
  {
    testimonial:
      "New revenue streams for your entity.",
  }
];

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
        sx={{
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        <Typography component="h2" variant="h4" color="text.primary">
          Challenges
        </Typography>
        <Typography variant="body1" color="text.secondary">
        Facing low yields, scalability issues, and the need for new revenue streams.
        </Typography>
      </Box>
      <Grid container spacing={2} justifyContent="center">
        {problems.map((problem, index) => (
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
                  title={problem.title}
                />
              </Box>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {problem.data}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box
        sx={{
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        <Typography component="h2" variant="h4" color="text.primary">
          SecuritiesLab Solution
        </Typography>
        <Typography variant="body1" color="text.secondary">
        Innovative connectivity, advanced management tools, and access to both traditional and tokenized securities.
        </Typography>
      </Box>
      <Grid container spacing={2} justifyContent="center">
        {solutions.map((solution, index) => (
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
                  title={solution.title}
                  subheader={solution.subtitle}
                />
              </Box>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {solution.data}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

    </Container>
  );
}
