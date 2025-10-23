import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Chip,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper
} from '@mui/material';
import {
  Keyboard,
  Speed,
  Assessment,
  TrendingUp,
  CheckCircle,
  RadioButtonUnchecked,
  School,
  Business,
  SmartToy,
  Assignment
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Mock data for demonstration
  const userProgress = {
    currentPart: 1,
    partIProgress: 65,
    partIIProgress: 0,
    currentWPM: 18,
    targetWPM: 25,
    accuracy: 92,
    lessonsCompleted: 8,
    totalLessons: 20
  };

  const recentAchievements = [
    { id: 1, title: 'Keyboard Mastery', completed: true, date: '2025-10-20' },
    { id: 2, title: 'Basic Letter Formatting', completed: true, date: '2025-10-19' },
    { id: 3, title: '15 WPM Milestone', completed: true, date: '2025-10-18' },
    { id: 4, title: 'Tab Stops & Margins', completed: false, date: null },
    { id: 5, title: '25 WPM Target', completed: false, date: null }
  ];

  const syllabusProgress = [
    {
      section: 'A. Introduction',
      part: 'Part I',
      progress: 100,
      description: 'Computer care and basic operations'
    },
    {
      section: 'B. Keyboard Mastery',
      part: 'Part I',
      progress: 85,
      description: 'Keyboarding techniques and corrections'
    },
    {
      section: 'C. Elementary Skills',
      part: 'Part I',
      progress: 40,
      description: 'Document formatting and business documents'
    },
    {
      section: 'D. Intermediate Skills',
      part: 'Part II',
      progress: 0,
      description: 'Advanced formatting and tables'
    }
  ];

  return (
    <Box sx={{ width: '100%' }}>
      {/* Welcome Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}>
          📚 Welcome to Information Processing
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>
          Track your progress and continue your typing journey
        </Typography>
      </Box>

      {/* Overview Cards */}
      <Grid container spacing={2} mb={3}>
        <Grid item xs={6} sm={6} md={3}>
          <Card elevation={2} sx={{ height: '100%' }}>
            <CardContent sx={{ textAlign: 'center', p: { xs: 1.5, md: 2 } }}>
              <Speed sx={{ fontSize: { xs: 32, md: 40 }, color: 'primary.main', mb: 1 }} />
              <Typography variant="h5" color="primary.main" sx={{ fontSize: { xs: '1.2rem', md: '1.5rem' } }}>
                {userProgress.currentWPM}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', md: '0.85rem' } }}>
                Words Per Minute
              </Typography>
              <Typography variant="caption" display="block" sx={{ fontSize: { xs: '0.65rem', md: '0.75rem' } }}>
                Target: {userProgress.targetWPM} WPM
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6} sm={6} md={3}>
          <Card elevation={2} sx={{ height: '100%' }}>
            <CardContent sx={{ textAlign: 'center', p: { xs: 1.5, md: 2 } }}>
              <Assessment sx={{ fontSize: { xs: 32, md: 40 }, color: 'success.main', mb: 1 }} />
              <Typography variant="h5" color="success.main" sx={{ fontSize: { xs: '1.2rem', md: '1.5rem' } }}>
                {userProgress.accuracy}%
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', md: '0.85rem' } }}>
                Typing Accuracy
              </Typography>
              <Typography variant="caption" display="block" sx={{ fontSize: { xs: '0.65rem', md: '0.75rem' } }}>
                Excellent performance
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6} sm={6} md={3}>
          <Card elevation={2} sx={{ height: '100%' }}>
            <CardContent sx={{ textAlign: 'center', p: { xs: 1.5, md: 2 } }}>
              <School sx={{ fontSize: { xs: 32, md: 40 }, color: 'warning.main', mb: 1 }} />
              <Typography variant="h5" color="warning.main" sx={{ fontSize: { xs: '1.2rem', md: '1.5rem' } }}>
                {userProgress.lessonsCompleted}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', md: '0.85rem' } }}>
                Lessons Completed
              </Typography>
              <Typography variant="caption" display="block" sx={{ fontSize: { xs: '0.65rem', md: '0.75rem' } }}>
                of {userProgress.totalLessons} total
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6} sm={6} md={3}>
          <Card elevation={2} sx={{ height: '100%' }}>
            <CardContent sx={{ textAlign: 'center', p: { xs: 1.5, md: 2 } }}>
              <TrendingUp sx={{ fontSize: { xs: 32, md: 40 }, color: 'info.main', mb: 1 }} />
              <Typography variant="h5" color="info.main" sx={{ fontSize: { xs: '1.2rem', md: '1.5rem' } }}>
                Part {userProgress.currentPart}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', md: '0.85rem' } }}>
                Current Section
              </Typography>
              <Typography variant="caption" display="block" sx={{ fontSize: { xs: '0.65rem', md: '0.75rem' } }}>
                {userProgress.partIProgress}% complete
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Progress Section */}
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} md={8}>
          <Card elevation={2}>
            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
              <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' } }}>
                📈 Syllabus Progress Overview
              </Typography>
              
              {syllabusProgress.map((section, index) => (
                <Box key={index} mb={2}>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>
                        {section.section}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', md: '0.8rem' } }}>
                        {section.description}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Chip 
                        label={section.part} 
                        size="small" 
                        color={section.part === 'Part I' ? 'primary' : 'secondary'}
                        variant="outlined"
                        sx={{ fontSize: { xs: '0.7rem', md: '0.75rem' } }}
                      />
                      <Typography variant="body2" fontWeight="bold" sx={{ fontSize: { xs: '0.8rem', md: '0.9rem' } }}>
                        {section.progress}%
                      </Typography>
                    </Box>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={section.progress}
                    sx={{ height: 6, borderRadius: 3 }}
                    color={section.progress === 100 ? 'success' : 'primary'}
                  />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card elevation={2}>
            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
              <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' } }}>
                🎯 Recent Achievements
              </Typography>
              
              <List dense>
                {recentAchievements.map((achievement) => (
                  <ListItem key={achievement.id} disablePadding>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      {achievement.completed ? (
                        <CheckCircle color="success" sx={{ fontSize: { xs: 18, md: 20 } }} />
                      ) : (
                        <RadioButtonUnchecked color="action" sx={{ fontSize: { xs: 18, md: 20 } }} />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={achievement.title}
                      secondary={achievement.completed ? achievement.date : 'In Progress'}
                      primaryTypographyProps={{
                        sx: { 
                          textDecoration: achievement.completed ? 'line-through' : 'none',
                          opacity: achievement.completed ? 0.7 : 1,
                          fontSize: { xs: '0.85rem', md: '0.95rem' }
                        }
                      }}
                      secondaryTypographyProps={{
                        sx: { fontSize: { xs: '0.75rem', md: '0.8rem' } }
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Paper elevation={2} sx={{ p: { xs: 2, md: 3 } }}>
        <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' } }}>
          🚀 Quick Actions
        </Typography>
        <Grid container spacing={1.5}>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<Keyboard sx={{ fontSize: { xs: 16, md: 20 } }} />}
              onClick={() => navigate('/typing-practice')}
              sx={{ 
                py: { xs: 1.5, md: 2 },
                fontSize: { xs: '0.8rem', md: '0.9rem' },
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 4
                }
              }}
            >
              Start Typing Practice
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Speed sx={{ fontSize: { xs: 16, md: 20 } }} />}
              onClick={() => navigate('/speed-development')}
              sx={{ 
                py: { xs: 1.5, md: 2 },
                fontSize: { xs: '0.8rem', md: '0.9rem' },
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 4,
                  backgroundColor: 'primary.main',
                  color: 'white'
                }
              }}
            >
              Speed Challenge
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Assessment sx={{ fontSize: { xs: 16, md: 20 } }} />}
              onClick={() => navigate('/assessment')}
              sx={{ 
                py: { xs: 1.5, md: 2 },
                fontSize: { xs: '0.8rem', md: '0.9rem' },
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 4,
                  backgroundColor: 'primary.main',
                  color: 'white'
                }
              }}
            >
              Take Assessment
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Business sx={{ fontSize: { xs: 16, md: 20 } }} />}
              onClick={() => navigate('/business-documents')}
              sx={{ 
                py: { xs: 1.5, md: 2 },
                fontSize: { xs: '0.8rem', md: '0.9rem' },
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 4,
                  backgroundColor: 'primary.main',
                  color: 'white'
                }
              }}
            >
              Practice Documents
            </Button>
          </Grid>
        </Grid>

        {/* Feature Highlights */}
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} md={6}>
            <Box 
              p={{ xs: 2, md: 3 }} 
              sx={{ 
                bgcolor: 'primary.light', 
                borderRadius: 2, 
                color: 'primary.contrastText',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6,
                  bgcolor: 'primary.main'
                }
              }}
              onClick={() => navigate('/ai-assistant')}
            >
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1rem', md: '1.1rem' } }}>
                    🤖 AI Learning Assistant
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9, mb: 2, fontSize: { xs: '0.8rem', md: '0.9rem' } }}>
                    Get instant answers about computer care, typing techniques, and document formatting
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<SmartToy sx={{ fontSize: { xs: 16, md: 18 } }} />}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/ai-assistant');
                  }}
                  size="small"
                  sx={{ 
                    minWidth: { xs: 80, md: 120 },
                    fontSize: { xs: '0.75rem', md: '0.85rem' },
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'scale(1.05)'
                    }
                  }}
                >
                  Ask AI
                </Button>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box 
              p={{ xs: 2, md: 3 }} 
              sx={{ 
                bgcolor: 'success.light', 
                borderRadius: 2, 
                color: 'success.contrastText',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6,
                  bgcolor: 'success.main'
                }
              }}
              onClick={() => navigate('/exam-practice')}
            >
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1rem', md: '1.1rem' } }}>
                    📝 Part I Exam Practice
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9, mb: 2, fontSize: { xs: '0.8rem', md: '0.9rem' } }}>
                    Practice with official exam format: 5 tasks, 100 marks, 110 minutes
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Assignment sx={{ fontSize: { xs: 16, md: 18 } }} />}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/exam-practice');
                  }}
                  size="small"
                  sx={{ 
                    minWidth: { xs: 80, md: 120 },
                    fontSize: { xs: '0.75rem', md: '0.85rem' },
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'scale(1.05)'
                    }
                  }}
                >
                  Start Exam
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Dashboard;