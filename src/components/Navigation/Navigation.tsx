import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
  Chip,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Dashboard,
  Keyboard,
  Speed,
  Assessment,
  TrendingUp,
  Business,
  School,
  Menu,
  Close,
  SmartToy,
  Assignment,
  StarBorder
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const navigationItems = [
    {
      text: 'Dashboard',
      icon: <Dashboard />,
      path: '/',
      description: 'Overview and progress'
    },
    {
      text: 'Typing Practice',
      icon: <Keyboard />,
      path: '/typing-practice',
      description: 'Keyboard mastery & techniques'
    },
    {
      text: 'Speed Development',
      icon: <Speed />,
      path: '/speed-development',
      description: '25 WPM → 35 WPM progression'
    },
    {
      text: 'Assessment',
      icon: <Assessment />,
      path: '/assessment',
      description: 'Skills evaluation'
    },
    {
      text: 'Progress Tracking',
      icon: <TrendingUp />,
      path: '/progress',
      description: 'Track your development'
    },
    {
      text: 'Business Documents',
      icon: <Business />,
      path: '/business-documents',
      description: 'Letters, memos, forms'
    },
    {
      text: 'AI Assistant',
      icon: <SmartToy />,
      path: '/ai-assistant',
      description: 'Get instant help and answers'
    },
    {
      text: 'Exam Practice',
      icon: <Assignment />,
      path: '/exam-practice',
      description: 'Official Part I exam format'
    },
    {
      text: 'Enhanced Exam Practice',
      icon: <Assignment />,
      path: '/enhanced-exam-practice',
      description: 'Multiple exam sets with varied content'
    },
    {
      text: 'Pricing & Plans',
      icon: <StarBorder />,
      path: '/pricing',
      description: 'Upgrade for unlimited access'
    }
  ];

  const syllabusItems = [
    {
      text: 'Part I: Introduction',
      icon: <School />,
      path: '/typing-practice',
      description: 'Computer care & basic operations',
      badge: 'Part I'
    },
    {
      text: 'Part I: Keyboard Mastery',
      icon: <Keyboard />,
      path: '/typing-practice',
      description: 'Keyboarding techniques',
      badge: 'Part I'
    },
    {
      text: 'Part I: Elementary Skills',
      icon: <Business />,
      path: '/business-documents',
      description: 'Basic document formatting',
      badge: 'Part I'
    },
    {
      text: 'Part II: Intermediate Skills',
      icon: <Assessment />,
      path: '/enhanced-exam-practice',
      description: 'Advanced formatting & tables',
      badge: 'Part II'
    }
  ];

  const isActivePath = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const drawerContent = (
    <>
      {/* Main Navigation */}
      <List>
        <ListItem>
          <Typography variant="overline" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
            Main Features
          </Typography>
        </ListItem>
        {navigationItems.map((item) => (
          <ListItemButton
            key={item.text}
            onClick={() => handleNavigation(item.path)}
            selected={isActivePath(item.path)}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'primary.light',
                color: 'primary.contrastText',
                '&:hover': {
                  backgroundColor: 'primary.main',
                },
              },
            }}
          >
            <ListItemIcon sx={{ color: isActivePath(item.path) ? 'inherit' : 'action.active' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              secondary={item.description}
              secondaryTypographyProps={{ variant: 'caption' }}
            />
          </ListItemButton>
        ))}
      </List>

      <Divider />

      {/* Syllabus Navigation */}
      <List>
        <ListItem>
          <Typography variant="overline" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
            Syllabus Modules
          </Typography>
        </ListItem>
        {syllabusItems.map((item) => (
          <ListItemButton
            key={item.text}
            onClick={() => handleNavigation(item.path)}
            selected={isActivePath(item.path)}
          >
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={
                <Box display="flex" alignItems="center" gap={1}>
                  {item.text}
                  <Chip 
                    label={item.badge} 
                    size="small" 
                    color={item.badge === 'Part I' ? 'primary' : 'secondary'}
                    variant="outlined"
                  />
                </Box>
              }
              secondary={item.description}
              secondaryTypographyProps={{ variant: 'caption' }}
            />
          </ListItemButton>
        ))}
      </List>
    </>
  );

  return (
    <>
      {/* Top AppBar for mobile */}
      {isMobile && (
        <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1, top: '64px' }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <Menu />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Navigation Menu
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      {/* Navigation Drawer */}
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          width: 280,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 280,
            boxSizing: 'border-box',
            top: '64px', // Account for top navigation
            height: 'calc(100vh - 64px)',
            ...(isMobile && {
              marginTop: '64px',
            }),
          },
        }}
      >
        {/* Close button for mobile */}
        {isMobile && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
            <IconButton onClick={handleDrawerToggle}>
              <Close />
            </IconButton>
          </Box>
        )}
        
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Navigation;