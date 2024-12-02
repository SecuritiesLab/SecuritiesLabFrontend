import * as React from 'react';
import { ListItemButton, ListItemIcon, ListItemText, Divider, ListSubheader, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import Collapse from '@mui/material/Collapse';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LayersIcon from '@mui/icons-material/Layers';
import SecurityIcon from '@mui/icons-material/Security';
import PaymentIcon from '@mui/icons-material/Payment';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PaymentsIcon from '@mui/icons-material/Payments';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import StormIcon from '@mui/icons-material/Storm';
import TollIcon from '@mui/icons-material/Toll';
import CommentBankIcon from '@mui/icons-material/CommentBank';
import { Link } from '@mui/material';
import SavingsIcon from '@mui/icons-material/Savings';
import WalletIcon from '@mui/icons-material/Wallet';

// Main menu items
export const MainListItems = () => {
  const [openTreasury, setOpenTreasury] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Get the current path

  const handleTreasuryClick = () => {
    setOpenTreasury(!openTreasury);
    navigate('/safeguarding?tab=0');
  };

  const handleOperationClick = () => {
    navigate('/safeguarding?tab=0');
  };


  const handleSafeguardingClick = () => {
    navigate('/safeguarding?tab=1');
  };


  const getSelectedStyle = (path: string, tab?: string) => {
    if (tab !== undefined) {
      const currentTab = new URLSearchParams(location.search).get('tab');
      return location.pathname === path && currentTab === tab
        ? { color: 'lightblue', fontWeight: 'bold' }
        : {};
    }
    return location.pathname === path ? { color: 'lightblue', fontWeight: 'bold' } : {};
  };

  React.useEffect(() => {
    // Automatically expand Treasury if current path matches any of its sub-items
    setOpenTreasury(/^\/safeguarding/.test(location.pathname));
  }, [location.pathname]);

  return (
    <React.Fragment>
      <ListItemButton onClick={() => navigate('/dashboard')} sx={getSelectedStyle('/dashboard')}>
        <ListItemIcon>
          <HomeIcon sx={getSelectedStyle('/dashboard')} />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>

      <ListItemButton onClick={() => navigate('/accounts')} sx={getSelectedStyle('/accounts')}>
        <ListItemIcon>
          <AccountBalanceIcon sx={getSelectedStyle('/accounts')} />
        </ListItemIcon>
        <ListItemText primary="Accounts" />
      </ListItemButton>

      <ListItemButton onClick={handleTreasuryClick} sx={getSelectedStyle('/treasury')}>
        <ListItemIcon>
          <LayersIcon sx={getSelectedStyle('/treasury')} />
        </ListItemIcon>
        <ListItemText primary="Treasury" />
        {openTreasury ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItemButton>

      <Collapse in={openTreasury} timeout="auto" unmountOnExit>
        <ListItemButton
          sx={{ pl: 4, ...getSelectedStyle('/safeguarding', '0') }}
          onClick={() => navigate('/safeguarding?tab=0')}
        >
          <ListItemIcon>
            <SecurityIcon sx={getSelectedStyle('/safeguarding', '0')} />
          </ListItemIcon>
          <ListItemText primary="Operation" />
        </ListItemButton>

        <ListItemButton
          sx={{ pl: 4, ...getSelectedStyle('/safeguarding', '1') }}
          onClick={() => navigate('/safeguarding?tab=1')}
        >
          <ListItemIcon>
            <SecurityIcon sx={getSelectedStyle('/safeguarding', '1')} />
          </ListItemIcon>
          <ListItemText primary="Safeguarding" />
        </ListItemButton>
      </Collapse>

      <ListItemButton onClick={() => navigate('/deposit')} sx={getSelectedStyle('/deposit')}>
        <ListItemIcon>
          <SavingsIcon sx={getSelectedStyle('/deposit')} />
        </ListItemIcon>
        <ListItemText primary="Deposit" />
      </ListItemButton>

      <ListItemButton onClick={() => navigate('/wallet')} sx={getSelectedStyle('/wallet')}>
        <ListItemIcon>
          <WalletIcon sx={getSelectedStyle('/wallet')} />
        </ListItemIcon>
        <ListItemText primary="Wallet" />
      </ListItemButton>
    </React.Fragment>
  );
};

// Secondary list items
export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);

// Bottom buttons: Settings and Sign Out
export const BottomListItems = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Sign out logic here (e.g., clearing auth tokens)
    localStorage.removeItem('token');
    localStorage.removeItem('email')
    localStorage.clear()
    navigate('/'); // Navigate to the landing page after sign-out
  };

  const handleSettingsPress = () => {
    navigate('/settings'); // Navigate to the landing page after sign-out
  };

  return (
    <React.Fragment>
      <Divider sx={{ mt: 4 }} /> {/* Add more space before the bottom buttons */}
      <Box sx={{ mt: 'auto', mb: 1 }}>
        <ListItemButton onClick={handleSettingsPress}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItemButton>
        <ListItemButton onClick={handleSignOut}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Sign Out" />
        </ListItemButton>
      </Box>
    </React.Fragment>
  );
};