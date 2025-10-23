import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
  Badge,
  Divider,
  ListItemIcon,
  ListItemText,
  Chip
} from '@mui/material';
import {
  AccountCircle,
  Logout,
  Settings,
  Person,
  NotificationsNone,
  Login,
  PersonAdd,
  AdminPanelSettings
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const TopNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAdmin, isLocalhost, isAuthenticated, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    logout();
    setAnchorEl(null);
    navigate('/sign-in');
  };

  const handleSignIn = () => {
    navigate('/sign-in');
  };

  const handleSignUp = () => {
    navigate('/sign-up');
  };

  const handleProfileClick = () => {
    setAnchorEl(null);
    navigate('/profile');
  };

  const getInitials = (name?: string) => {
    if (!name) return 'D'; // Default for Developer/Localhost
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const isAuthPage = location.pathname === '/sign-in' || location.pathname === '/sign-up';

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: 'primary.main'
      }}
    >
      <Toolbar>
        {/* App Title */}
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: 1,
            cursor: 'pointer',
            '&:hover': { opacity: 0.8 }
          }}
          onClick={() => navigate('/')}
        >
          📚 Information Processing & Typewriting
        </Typography>

        {/* Notifications (for logged in users) */}
        {user && (
          <IconButton 
            color="inherit" 
            sx={{ mr: 1 }}
            aria-label="notifications"
          >
            <Badge badgeContent={0} color="error">
              <NotificationsNone />
            </Badge>
          </IconButton>
        )}

        {/* User Authentication Section */}
        {isAuthenticated ? (
          // Authenticated user - show profile and logout options
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 2 }}>
              <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' } }}>
                Welcome, {user?.name || 'User'}
              </Typography>
              {(isAdmin || isLocalhost) && (
                <Chip 
                  label={isAdmin ? "Admin" : "Localhost"} 
                  size="small" 
                  color={isAdmin ? "secondary" : "warning"}
                  icon={<AdminPanelSettings />}
                  sx={{ fontSize: '0.7rem' }}
                />
              )}
            </Box>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="profile-menu"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar 
                sx={{ 
                  width: 32, 
                  height: 32,
                  bgcolor: 'secondary.main',
                  fontSize: '0.875rem'
                }}
              >
                {getInitials(user?.name)}
              </Avatar>
            </IconButton>
            <Menu
              id="profile-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleProfileMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              PaperProps={{
                sx: { mt: 1, minWidth: 200 }
              }}
            >
              <MenuItem onClick={handleProfileMenuClose} disabled>
                <ListItemIcon>
                  <Person fontSize="small" />
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    {user?.name || 'User'}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {user?.email || 'No email'}
                  </Typography>
                </ListItemText>
              </MenuItem>
              
              <Divider />
              
              <MenuItem onClick={handleProfileClick}>
                <ListItemIcon>
                  <AccountCircle fontSize="small" />
                </ListItemIcon>
                <ListItemText>Profile & Settings</ListItemText>
              </MenuItem>
              
              <MenuItem onClick={handleProfileMenuClose}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                <ListItemText>Preferences</ListItemText>
              </MenuItem>
              
              <Divider />
              
              <MenuItem onClick={handleSignOut}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                <ListItemText>Sign Out</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          // Not authenticated - show sign in/up buttons (only when not on auth pages)
          !isAuthPage && (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button 
                color="inherit" 
                onClick={handleSignIn}
                startIcon={<Login />}
                variant="outlined"
                sx={{ 
                  borderColor: 'rgba(255,255,255,0.5)',
                  '&:hover': { 
                    borderColor: 'white',
                    backgroundColor: 'rgba(255,255,255,0.1)'
                  }
                }}
              >
                Sign In
              </Button>
              <Button 
                color="secondary" 
                onClick={handleSignUp}
                startIcon={<PersonAdd />}
                variant="contained"
                sx={{ 
                  '&:hover': { 
                    backgroundColor: 'secondary.dark'
                  }
                }}
              >
                Sign Up
              </Button>
            </Box>
          )
        )}
      </Toolbar>
    </AppBar>
  );
};

export default TopNavigation;