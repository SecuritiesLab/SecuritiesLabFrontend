import * as React from 'react';
import { ListItemButton, ListItemIcon, ListItemText, Divider, ListSubheader, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Collapse from '@mui/material/Collapse';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LayersIcon from '@mui/icons-material/Layers';
import SecurityIcon from '@mui/icons-material/Security';
import PaymentIcon from '@mui/icons-material/Payment';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PaymentsIcon from '@mui/icons-material/Payments';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import StormIcon from '@mui/icons-material/Storm';
import TollIcon from '@mui/icons-material/Toll';
import CommentBankIcon from '@mui/icons-material/CommentBank';
import { Link } from '@mui/material';

// Main menu items
export const MainListItems = () => {
  const [openBaaS, setOpenBaaS] = React.useState(false);
  const [openAnalytics, setOpenAnalytics] = React.useState(false);

  // Toggle BaaS Submenu
  const handleBaaSClick = () => {
    setOpenBaaS(!openBaaS);
  };

  const handleAnalyticsClick = () => {
    setOpenAnalytics(!openAnalytics);
  };

  return (
    <React.Fragment>
      <ListItemButton>
        <ListItemIcon>
          <AccountBalanceIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>

      {/* BaaS Section */}
      <ListItemButton onClick={handleBaaSClick}>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="BaaS" />
        {openBaaS ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItemButton>
      
      {/* Nested Submenu for BaaS */}
      <Collapse in={openBaaS} timeout="auto" unmountOnExit>
        <ListItemButton sx={{ pl: 4 }}>
          <ListItemIcon>
            <SecurityIcon />
          </ListItemIcon>
          <ListItemText primary="Safeguarding" />
        </ListItemButton>
        <ListItemButton sx={{ pl: 4 }}>
          <ListItemIcon>
            <PaymentIcon />
          </ListItemIcon>
          <ListItemText primary="Deposit as a Service (DaaS)" />
        </ListItemButton>
      </Collapse>
              {/* Link to API Documentation */}
              <ListItemButton sx={{ pl: 2 }}>
          <ListItemIcon>
            <MenuBookIcon />
          </ListItemIcon>
          <ListItemText primary="API Documentation" />
        </ListItemButton>

        <ListItemButton  sx={{ pl: 2 }}>
          <ListItemIcon>
            <PaymentsIcon />
          </ListItemIcon>
          <ListItemText primary="Payments" />
        </ListItemButton>

      {/* BaaS Section */}
      <ListItemButton onClick={handleAnalyticsClick}>
        <ListItemIcon>
          <LeaderboardIcon />
        </ListItemIcon>
        <ListItemText primary="Analytics" />
        {openAnalytics ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItemButton>
      
      {/* Nested Submenu for BaaS */}
      <Collapse in={openAnalytics} timeout="auto" unmountOnExit>
        <ListItemButton sx={{ pl: 4 }}>
          <ListItemIcon>
            <StormIcon />
          </ListItemIcon>
          <ListItemText primary="Forecast" />
        </ListItemButton>
        <ListItemButton sx={{ pl: 4 }}>
          <ListItemIcon>
            <TollIcon />
          </ListItemIcon>
          <ListItemText primary="Risk" />
        </ListItemButton>
        <ListItemButton sx={{ pl: 4 }}>
          <ListItemIcon>
            <CommentBankIcon />
          </ListItemIcon>
          <ListItemText primary="Reconciliation" />
        </ListItemButton>
      </Collapse>
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