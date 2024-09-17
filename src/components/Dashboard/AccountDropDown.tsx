import * as React from 'react';
import { Menu, MenuItem, IconButton, Box, Typography, Divider, ListItemIcon } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddIcon from '@mui/icons-material/Add';

export default function AccountDropdown() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {/* User Account Info */}
      <IconButton
        size="large"
        edge="end"
        color="inherit"
        onClick={handleClick}
        sx={{ display: 'flex', alignItems: 'center' }}
      >
        <AccountCircle sx={{ fontSize: '40px', mr: 1 }} />
        <Box>
          <Typography variant="subtitle1">MOHIT TEMBE</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            AMBR PAYMENTS UAB
          </Typography>
        </Box>
        <ArrowDropDownIcon />
      </IconButton>

      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: { width: 240 },
        }}
      >
        <Typography variant="overline" sx={{ ml: 2, mt: 1 }}>
          Entities
        </Typography>
        <MenuItem>
          <Typography variant="body2">Ambr Payments UAB</Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <AddIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2">Add New Company</Typography>
        </MenuItem>
        <Divider sx={{ my: 1 }} />
        <Typography variant="overline" sx={{ ml: 2 }}>
          Approvals
        </Typography>
        <MenuItem>
          <Typography variant="body2">Pending Approvals</Typography>
        </MenuItem>
        <MenuItem>
          <Typography variant="body2">Your Requests</Typography>
        </MenuItem>
        <Divider sx={{ my: 1 }} />
        <Typography variant="overline" sx={{ ml: 2 }}>
          Billing
        </Typography>
        <MenuItem>
          <Typography variant="body2">Invoices</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}