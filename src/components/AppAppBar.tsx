import * as React from 'react';
import { PaletteMode } from '@mui/material';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import ToggleColorMode from './ToggleColorMode';

const logoStyle = {
  width: '100px',
  height: 'auto',
  cursor: 'pointer',
};

interface AppAppBarProps {
  mode: PaletteMode;
  toggleColorMode: () => void;
}

const menus = [
  { id: 'products', label: 'Products', items: ["Safeguarding", 'Deposit as a Service', 'Stablecoin Wallets'] },
  { id: 'faq', label: 'FAQ' },
  { id: 'features', label: 'Features' }
];

function AppAppBar({ mode, toggleColorMode }: AppAppBarProps) {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [currentMenu, setCurrentMenu] = React.useState<string | null>(null);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      // Adjust the offset based on your header or navigation bar height
      const offset = 128;
      const targetPosition = sectionElement.getBoundingClientRect().top + window.scrollY - offset;
      console.log(`Target position for ${sectionId}: ${targetPosition}`);
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
      setOpen(false);
    } else {
      console.warn(`Element with ID ${sectionId} not found.`);
    }
  };

  const handleMenuClick = (menuId: string) => (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setCurrentMenu(menuId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setCurrentMenu(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 2,
        zIndex: 1200, // Ensure AppBar is below the Menus
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          variant="regular"
          sx={(theme) => ({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
            borderRadius: '999px',
            bgcolor:
              theme.palette.mode === 'light'
                ? 'rgba(255, 255, 255, 0.4)'
                : 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(24px)',
            maxHeight: 40,
            border: '1px solid',
            borderColor: 'divider',
            boxShadow:
              theme.palette.mode === 'light'
                ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
          })}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexGrow: 1,
            }}
          >
            <img
              src={process.env.PUBLIC_URL + '/logo.png'}
              style={logoStyle}
              alt="logo of sitemark"
            />
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              ml: 'auto', // Add this line to push menu items to the right
              alignItems: 'center',
              gap: 2,
            }}
          >
            {menus.map(menu => (
              <React.Fragment key={menu.id}>
                {menu.items ? (
                  <Button
                    aria-controls={`${menu.id}-menu`}
                    aria-haspopup="true"
                    onClick={handleMenuClick(menu.id)}
                    sx={{ py: '6px', px: '12px' }}
                  >
                    <Typography variant="body2" color="text.primary">
                      {menu.label}
                    </Typography>
                  </Button>
                ) : (
                  <Button
                    onClick={() => scrollToSection(menu.id)}
                    sx={{ py: '6px', px: '12px' }}
                  >
                    <Typography variant="body2" color="text.primary">
                      {menu.label}
                    </Typography>
                  </Button>
                )}
                {menu.items && (
                  <Menu
                    id={`${menu.id}-menu`}
                    anchorEl={anchorEl}
                    open={currentMenu === menu.id}
                    onClose={handleMenuClose}
                    MenuListProps={{
                      'aria-labelledby': `${menu.id}-button`,
                    }}
                    sx={{ zIndex: 1300 }} // Ensure dropdowns appear above other elements
                  >
                    {menu.items.map(item => (
                      <MenuItem
                        key={item}
                        onClick={() => scrollToSection(item.toLowerCase().replace(/\s+/g, '-'))}
                      >
                        {item}
                      </MenuItem>
                    ))}
                  </Menu>
                )}
              </React.Fragment>
            ))}
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 0.5,
              alignItems: 'center',
              ml: 2 // Add margin-left to create space between FAQ and the button
            }}
          >
            <Button
              color="primary"
              variant="contained"
              size="small"
              component="a"
              href="https://jk979qb2k3e.typeform.com/to/Ppni4Nxk"
              target="_blank"
            >
              Get early access
            </Button>
          </Box>
          <Box sx={{ display: { sm: '', md: 'none' } }}>
            <Button
              variant="text"
              color="primary"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ minWidth: '30px', p: '4px' }}
            >
              <MenuIcon />
            </Button>
            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
              <Box
                sx={{
                  minWidth: '60dvw',
                  p: 2,
                  backgroundColor: 'background.paper',
                  flexGrow: 1,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'end',
                    flexGrow: 1,
                  }}
                >
                  <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
                </Box>
                {menus.map(menu => (
                  <React.Fragment key={menu.id}>
                    {menu.items ? (
                      menu.items.map(item => (
                        <MenuItem
                          key={item}
                          onClick={() => scrollToSection(item.toLowerCase().replace(/\s+/g, '-'))}
                        >
                          {item}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem onClick={() => scrollToSection(menu.id)}>
                        {menu.label}
                      </MenuItem>
                    )}
                  </React.Fragment>
                ))}
                <Divider />
                <MenuItem>
                  <Button
                    color="primary"
                    variant="contained"
                    component="a"
                    href="https://jk979qb2k3e.typeform.com/to/Ppni4Nxk"
                    target="_blank"
                    sx={{ width: '100%' }}
                  >
                    Get early access
                  </Button>
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default AppAppBar;
