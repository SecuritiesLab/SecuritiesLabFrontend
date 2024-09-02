import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded';
import EdgesensorHighRoundedIcon from '@mui/icons-material/EdgesensorHighRounded';
import ViewQuiltRoundedIcon from '@mui/icons-material/ViewQuiltRounded';

const items = [
  {
    icon: <ViewQuiltRoundedIcon />,
    title: 'Streamlined Client Experience',
    description:
      'Explore our user-friendly treasury management dashboard, featuring an intuitive UI/UX for seamless navigation and efficient financial oversight. It simplifies complex tasks to improve productivity and operational efficiency.',
  },
  {
    icon: <EdgesensorHighRoundedIcon />,
    title: 'Predictive AI analytics',
    description:
      'Optimize treasury management with predictive AI analysis, providing real-time forecasts and insights. Empower data-driven decision-making with tailored trend analysis for enhanced financial planning.',
  },
  {
    icon: <DevicesRoundedIcon />,
    title: 'Easy API integration',
    description:
      'Easily integrate our treasury management dashboard via user-friendly APIs, enhancing your website with powerful financial capabilities. Simplify operations and boost efficiency with our tailored API integration solution.',
  },
];

export default function DashboardFeatures() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);

  const handleItemClick = (index: number) => {
    setSelectedItemIndex(index);
  };

  const selectedFeature = items[selectedItemIndex];

  return (
    <Container id="features" sx={{ py: { xs: 8, sm: 16 } }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography component="h2" variant="h4" color="text.primary">
          AI-Enhanced Features
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: { xs: 2, sm: 4 } }}
        >
          Explore a suite of features including automated cash management, real-time analytics, risk assessment, and customizable reporting—all designed to optimize your financial operations with precision and ease.
        </Typography>
      </Box>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        useFlexGap
        sx={{ width: '100%' }}
      >
        {items.map(({ icon, title, description }, index) => (
          <Card
            key={index}
            variant="outlined"
            component={Button}
            onClick={() => handleItemClick(index)}
            sx={{
              p: 3,
              width: '100%',
              maxWidth: '800px',
              background: 'none',
              backgroundColor:
                selectedItemIndex === index ? 'action.selected' : undefined,
              borderColor: (theme) => {
                if (theme.palette.mode === 'light') {
                  return selectedItemIndex === index
                    ? 'primary.light'
                    : 'grey.200';
                }
                return selectedItemIndex === index ? 'primary.dark' : 'grey.800';
              },
            }}
          >
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                textAlign: 'left',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: { md: 'center' },
                gap: 2.5,
              }}
            >
              <Box
                sx={{
                  color: (theme) => {
                    if (theme.palette.mode === 'light') {
                      return selectedItemIndex === index
                        ? 'primary.main'
                        : 'grey.300';
                    }
                    return selectedItemIndex === index
                      ? 'primary.main'
                      : 'grey.700';
                  },
                }}
              >
                {icon}
              </Box>
              <Box sx={{ textTransform: 'none' }}>
                <Typography
                  color="text.primary"
                  variant="body2"
                  fontWeight="bold"
                >
                  {title}
                </Typography>
                <Typography
                  color="text.secondary"
                  variant="body2"
                  sx={{ my: 0.5 }}
                >
                  {description}
                </Typography>
              </Box>
            </Box>
          </Card>
        ))}
      </Stack>
    </Container>
  );
}
