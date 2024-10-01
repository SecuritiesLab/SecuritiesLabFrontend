import React from 'react';
import { Tabs, Tab, Box, Button, CssBaseline } from '@mui/material';
import AccountSettings from '../../components/Settings/AccountSettings';
import SecuritySettings from '../../components/Settings/SecuritySettings';
import EntitySettings from '../../components/Settings/EntitySettings';
import ApiSettings from '../../components/Settings/ApiSettings';

const SettingsPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = React.useState(0);

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
      </Tabs>

      {/* Tab Panels */}
      <TabPanel value={selectedTab} index={0}>
        <AccountSettings />
      </TabPanel>

      <TabPanel value={selectedTab} index={1}>
        <SecuritySettings />
      </TabPanel>

      <TabPanel value={selectedTab} index={2}>
        <EntitySettings />
      </TabPanel>

      <TabPanel value={selectedTab} index={3}>
        <ApiSettings />
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