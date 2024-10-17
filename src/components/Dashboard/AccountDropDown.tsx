import React, { useState, useEffect } from 'react';
import { Menu, MenuItem, IconButton, Box, Typography, Divider, ListItemIcon } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { fetchUserWithCompanies } from '../../api/userApi';
import { getDecryptedData } from '../../authentication/EncryptAndDecryptData';

export default function AccountDropdown() {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [userName, setUserName] = useState<string>('');
  const [companyNames, setCompanyNames] = useState<string[]>([]); // Store company names
  const open = Boolean(anchorEl);
  const email = getDecryptedData('email');
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (email) {
      fetchUserWithCompanies(email).then((data) => {
        setUserName(data.userName);
        setCompanyNames(data.companyNames); // Store company names
      });
    }
  }, [email]);

  const handleCompanySelect = (companyName: string) => {
    // Navigate to SettingsPage with Entity tab selected (index 2)
    navigate('/settings', { state: { selectedTab: 2, companyName } });
    handleClose();
  };

  const handleAddCompany = () => {
    navigate('/settings/entities/new');
    handleClose();
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <IconButton size="large" edge="end" color="inherit" onClick={handleClick} sx={{ display: 'flex', alignItems: 'center' }}>
        <AccountCircle sx={{ fontSize: '40px', mr: 1 }} />
        <Box>
          <Typography variant="subtitle1">{userName}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {companyNames.length > 0 ? companyNames[0] : t('accountDropdown.noCompanies')}
          </Typography>
        </Box>
        <ArrowDropDownIcon />
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose} PaperProps={{ sx: { width: 240 } }}>
        <Typography variant="overline" sx={{ ml: 2, mt: 1 }}>{t('accountDropdown.entities')}</Typography>
        {companyNames.map((company) => (
          <MenuItem key={company} onClick={() => handleCompanySelect(company)}>
            <Typography variant="body2">{company}</Typography>
          </MenuItem>
        ))}
        <MenuItem onClick={handleAddCompany}>
          <ListItemIcon><AddIcon fontSize="small" /></ListItemIcon>
          <Typography variant="body2">{t('accountDropdown.addCompany')}</Typography>
        </MenuItem>
        <Divider sx={{ my: 1 }} />
        <Typography variant="overline" sx={{ ml: 2 }}>{t('accountDropdown.billing')}</Typography>
        <MenuItem><Typography variant="body2">{t('accountDropdown.invoices')}</Typography></MenuItem>
      </Menu>
    </Box>
  );
}