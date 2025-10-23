import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Box, CircularProgress } from '@mui/material';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireAdmin = false }) => {
  const { isAuthenticated, isAdmin, isLocalhost } = useAuth();
  const location = useLocation();

  // Allow localhost access for development/admin
  if (isLocalhost && !requireAdmin) {
    return <>{children}</>;
  }

  // Check authentication
  if (!isAuthenticated) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  // Check admin requirement
  if (requireAdmin && !isAdmin && !isLocalhost) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '50vh',
        flexDirection: 'column',
        gap: 2
      }}>
        <CircularProgress />
        <div>Access denied. Admin privileges required.</div>
      </Box>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;