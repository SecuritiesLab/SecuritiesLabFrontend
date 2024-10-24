import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded';
import EdgesensorHighRoundedIcon from '@mui/icons-material/EdgesensorHighRounded';
import ViewQuiltRoundedIcon from '@mui/icons-material/ViewQuiltRounded';
import { useTranslation } from 'react-i18next';

export default function DashboardFeatures() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
  const { t } = useTranslation(); // Hook to access translation

  // Items now refer to translated titles and descriptions
  const items = [
    {
      icon: <ViewQuiltRoundedIcon />,
      title: t(`dashboardFeatures.feature1.title`), // Corrected dynamic key
      description: t(`dashboardFeatures.feature1.description`), // Corrected dynamic key
    },
    {
      icon: <EdgesensorHighRoundedIcon />,
      title: t(`dashboardFeatures.feature2.title`), // Corrected dynamic key
      description: t(`dashboardFeatures.feature2.description`), // Corrected dynamic key
    },
    {
      icon: <DevicesRoundedIcon />,
      title: t(`dashboardFeatures.feature3.title`), // Corrected dynamic key
      description: t(`dashboardFeatures.feature3.description`), // Corrected dynamic key
    },
  ];

  const handleItemClick = (index: number) => {
    setSelectedItemIndex(index);
  };

  return (
    <Container id="features" sx={{ py: { xs: 8, sm: 16 } }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography component="h2" variant="h4" color="text.primary">
          {t('dashboardFeatures.title')} {/* Translated title */}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: { xs: 2, sm: 4 } }}
        >
          {t('dashboardFeatures.subtitle')} {/* Translated description */}
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
                return selectedItemIndex === index
                  ? 'primary.dark'
                  : 'grey.800';
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
                  {title} {/* Translated title */}
                </Typography>
                <Typography
                  color="text.secondary"
                  variant="body2"
                  sx={{ my: 0.5 }}
                >
                  {description} {/* Translated description */}
                </Typography>
              </Box>
            </Box>
          </Card>
        ))}
      </Stack>
    </Container>
  );
}