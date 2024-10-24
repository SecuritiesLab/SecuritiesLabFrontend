import React, { useEffect } from 'react';
import { Tabs, Tab, Box, Button, CssBaseline } from '@mui/material';
import AccountSettings from '../../components/Settings/AccountSettings';
import SecuritySettings from '../../components/Settings/SecuritySettings';
import EntitySettings from '../../components/Settings/EntitySettings';
import ApiSettings from '../../components/Settings/ApiSettings';
import KYCSettings from '../../components/Settings/KYCSettings';
import { useLocation } from 'react-router-dom';

const SettingsPage: React.FC = () => {
  const location = useLocation(); 
  const [selectedTab, setSelectedTab] = React.useState(0);
  const isVerified = localStorage.getItem("userVerification")

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

      // Handle URL query to redirect to a specific tab
      useEffect(() => {
        const params = new URLSearchParams(location.search);  // Parse query params from URL
        const tabParam = params.get('tab');  // e.g. `?tab=1` for Safeguarding tab
        if (tabParam) {
          setSelectedTab(Number(tabParam));  // Set the tab programmatically based on the param
        }
      }, [location]);

  return (
    <Box sx={{ width: '100%' }}>
      <CssBaseline />
      {/* Tabs for navigation */}
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        aria-label="Settings tabs"
        centered
      >
        <Tab label="Account" />
        <Tab label="Security" />
        <Tab label="Entity" />
        <Tab label="API" />
        <Tab label="KYC" />
      </Tabs>

      {/* Tab Panels */}
      <TabPanel value={selectedTab} index={0}>
        <AccountSettings />
      </TabPanel>

      <TabPanel value={selectedTab} index={1}>
        <SecuritySettings />
      </TabPanel>

      {isVerified == "true" &&
      <TabPanel value={selectedTab} index={2}>
        <EntitySettings />
      </TabPanel>
      }

      {isVerified == "true" &&
      <TabPanel value={selectedTab} index={3}>
        <ApiSettings />
      </TabPanel>}

      <TabPanel value={selectedTab} index={4}>
        <KYCSettings />
      </TabPanel>
    </Box>
  );
};

// TabPanel Component
const TabPanel = (props: any) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

export default SettingsPage;