import * as React from 'react';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppAppBar from '../components/LandingPage/AppAppBar';
import Footer from '../components/LandingPage/Footer';
import LandingPageTheme from '../themes/LandingPageTheme';
import { PaletteMode } from '@mui/material';

export default function TypeformPage() {
  const [mode, setMode] = React.useState<PaletteMode>('dark');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const LPtheme = createTheme(LandingPageTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });
  const theme = showCustomTheme ? LPtheme : defaultTheme;

  React.useEffect(() => {
    // Create the script element
    const script = document.createElement('script');
    script.src = "https://embed.typeform.com/next/embed.js";
    script.async = true;

    // Append the script to the body
    document.body.appendChild(script);

    // Cleanup the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <AppAppBar mode={mode} toggleColorMode={toggleColorMode} showGetEarlyAccess={false} />
        {/* Conditionally removed "Get Early Access" button on the Typeform page */}
        <Box component="main" sx={{ flexGrow: 1, p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 10 }}>
          <Box sx={{ width: '100%', maxWidth: '800px' }}>
            <div
              data-tf-widget="Ppni4Nxk"
              data-tf-iframe-props="title=Get early access"
              data-tf-transitive-search-params
              style={{ width: '100%', height: '600px', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            ></div>
          </Box>
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}