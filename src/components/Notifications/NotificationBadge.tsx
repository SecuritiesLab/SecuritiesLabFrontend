import * as React from 'react';
import { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Typography, Box } from '@mui/material';
import axiosInstance from '../../api/axiosConfig';
import { getDecryptedData } from '../../authentication/EncryptAndDecryptData';

const NotificationBadge: React.FC = () => {
  const [notificationCount, setNotificationCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Fetch unread notifications
  const fetchNotifications = async () => {
    try {
      const email = getDecryptedData('email');
      if (!email) {
        return;
      }
      const response = await axiosInstance.get(`/notifications/unread?email=${email}`);
      setNotificationCount(response.data.length);
      setNotifications(response.data); // Store notifications
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  };

  // Fetch notifications on component mount
  useEffect(() => {
    fetchNotifications();
  }, []);

  // Open notifications menu
  const handleOpenNotifications = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Close notifications menu
  const handleCloseNotifications = async () => {
    try {
      const email = getDecryptedData('email');
      if (!email) {
        return;
      }
      await axiosInstance.post(`/notifications/read?email=${email}`);
      setNotificationCount(0); // Reset notification count
      setAnchorEl(null); // Close the menu
    } catch (error) {
      console.error('Failed to mark notifications as read:', error);
    }
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleOpenNotifications}>
        <Badge badgeContent={notificationCount} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      {/* Notifications Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseNotifications}
        keepMounted
      >
        {notifications.length > 0 ? (
          notifications.map((notification: any) => (
            <MenuItem key={notification.id}>
              <Box>
                <Typography variant="body1">{notification.message}</Typography>
                <Typography variant="caption" color="textSecondary">
                  {new Date(notification.createdAt).toLocaleString()}
                </Typography>
              </Box>
            </MenuItem>
          ))
        ) : (
          <MenuItem>
            <Typography>No new notifications</Typography>
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default NotificationBadge;