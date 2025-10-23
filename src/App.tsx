import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './hooks/useAuth';
import { SubscriptionProvider } from './hooks/useSubscription';
// import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'; // Not needed for main routes

// Import critical components immediately (no lazy loading for better UX)
import TopNavigation from './components/TopNavigation/TopNavigation';
import Navigation from './components/Navigation/Navigation';
import Dashboard from './pages/Dashboard/Dashboard';
import TypingPractice from './pages/TypingPractice/TypingPractice';
import SpeedDevelopment from './pages/SpeedDevelopment/SpeedDevelopment';
import Assessment from './pages/Assessment/Assessment';

// Only lazy load heavy/less frequently used components
const Progress = React.lazy(() => import('./pages/Progress/Progress'));
const BusinessDocuments = React.lazy(() => import('./pages/BusinessDocuments/BusinessDocuments'));
const AIAssistant = React.lazy(() => import('./pages/AIAssistant/AIAssistant'));
const ExamPractice = React.lazy(() => import('./pages/ExamPractice/ExamPractice'));
const EnhancedExamPractice = React.lazy(() => import('./pages/ExamPractice/EnhancedExamPractice'));
const Pricing = React.lazy(() => import('./pages/Pricing/Pricing'));
const SignIn = React.lazy(() => import('./pages/Auth/SignIn'));
const SignUp = React.lazy(() => import('./pages/Auth/SignUp'));

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <AuthProvider>
      <SubscriptionProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
        <Router 
          basename="/"
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true
          }}
        >
        <React.Suspense fallback={<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</Box>}>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {/* Top Navigation Bar - No suspense needed, preloaded */}
            <TopNavigation />
            
            {/* Main Layout */}
            <Box sx={{ display: 'flex', flexGrow: 1 }}>
              {/* Side Navigation - Only show on non-auth pages */}
              <Routes>
                <Route path="/sign-in" element={null} />
                <Route path="/sign-up" element={null} />
                <Route path="*" element={<Navigation />} />
              </Routes>
              
              {/* Main Content with proper responsive layout */}
              <Box 
                component="main" 
                sx={{ 
                  flexGrow: 1,
                  minWidth: 0, // Allows shrinking
                  minHeight: '100vh',
                  pt: '64px',
                  overflowX: 'hidden',
                  overflowY: 'auto',
                  position: 'relative',
                  zIndex: 1
                }}
              >
                <Box sx={{ 
                  p: { xs: 2, md: 3 }, 
                  maxWidth: '1200px', 
                  mx: 'auto',
                  width: '100%',
                  pointerEvents: 'auto',
                  position: 'relative'
                }}>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/typing-practice" element={<TypingPractice />} />
                    <Route path="/speed-development" element={<SpeedDevelopment />} />
                    <Route path="/assessment" element={<Assessment />} />
                    <Route path="/progress" element={<Progress />} />
                    <Route path="/business-documents" element={<BusinessDocuments />} />
                    <Route path="/ai-assistant" element={<AIAssistant />} />
                    <Route path="/exam-practice" element={<ExamPractice />} />
                    <Route path="/enhanced-exam-practice" element={<EnhancedExamPractice />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/sign-up" element={<SignUp />} />
                  </Routes>
                </Box>
              </Box>
            </Box>
          </Box>
        </React.Suspense>
      </Router>
    </ThemeProvider>
    </SubscriptionProvider>
    </AuthProvider>
  );
}

export default App;