import React from 'react';
import { Tabs, Tab, Box, Button, CssBaseline } from '@mui/material';
import AccountSettings from '../../components/Settings/AccountSettings';
import SecuritySettings from '../../components/Settings/SecuritySettings';
import EntitySettings from '../../components/Settings/EntitySettings';
import ApiSettings from '../../components/Settings/ApiSettings';
import KYCSettings from '../../components/Settings/KYCSettings';

const SettingsPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const isVerified = localStorage.getItem("userVerification")

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

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