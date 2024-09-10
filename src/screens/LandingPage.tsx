import * as React from 'react';
import { PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import AppAppBar from '../components/LandingPage/AppAppBar';
import Hero from '../components/LandingPage/Hero';
import LogoCollection from '../components/LandingPage/LogoCollection';
import Highlights from '../components/LandingPage/Highlights';
import Pricing from '../components/LandingPage/Pricing';
import DashboardFeatures from '../components/LandingPage/DashboardFeatures';
import MoneySafeguarding from '../components/LandingPage/MoneySafeguarding';
import AddFullSizeImage from '../components/LandingPage/AddFullSizeImage';
import Testimonials from '../components/LandingPage/Testimonials';
import FAQ from '../components/LandingPage/FAQ';
import Footer from '../components/LandingPage/Footer';
import LandingPageTheme from '../themes/LandingPageTheme';
import CryptoCardComponent from '../components/LandingPage/CardComponent';
import { Helmet } from 'react-helmet';
import UseCasesComponent from '../components/LandingPage/UseCases';

interface ToggleCustomThemeProps {
  showCustomTheme: Boolean;
  toggleCustomTheme: () => void;
}

function ToggleCustomTheme({
  showCustomTheme,
  toggleCustomTheme,
}: ToggleCustomThemeProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100dvw',
        position: 'fixed',
        bottom: 24,
      }}
    >
      <ToggleButtonGroup
        color="primary"
        exclusive
        value={showCustomTheme}
        onChange={toggleCustomTheme}
        aria-label="Platform"
        sx={{
          backgroundColor: 'background.default',
          '& .Mui-selected': {
            pointerEvents: 'none',
          },
        }}
      >
        <ToggleButton value>
          <AutoAwesomeRoundedIcon sx={{ fontSize: '20px', mr: 1 }} />
          Custom theme
        </ToggleButton>
        <ToggleButton value={false}>Material Design 2</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

export default function LandingPage() {
  const [mode, setMode] = React.useState<PaletteMode>('dark');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const LPtheme = createTheme(LandingPageTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode('dark');
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ bgcolor: 'background.default' }}>
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
      <Hero />
        <LogoCollection />
        <CryptoCardComponent />
        <MoneySafeguarding />
        <Divider />
        <UseCasesComponent /> {/* Include UseCasesComponent */}
        <Divider />
        <DashboardFeatures />
        <Divider />
        <Highlights />
        <Divider />
        <FAQ />
        <Divider />
        <Footer/>
      </Box>
    </ThemeProvider>
  );
}