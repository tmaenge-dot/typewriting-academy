import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { Assignment, Speed, CheckCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Assessment: React.FC = () => {
  const navigate = useNavigate();

  const handlePartIAssessment = () => {
    navigate('/typing-practice');
  };

  const handleSpeedTest = () => {
    navigate('/speed-development');
  };

  const handleDocumentFormatting = () => {
    navigate('/business-documents');
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}>
        📝 Skills Assessment
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3, fontSize: { xs: '0.9rem', md: '1rem' } }}>
        Evaluate your Information Processing & Typewriting skills and track progress
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card elevation={2} sx={{ height: '100%' }}>
            <CardContent sx={{ textAlign: 'center', p: { xs: 2, md: 3 } }}>
              <Assignment sx={{ fontSize: { xs: 40, md: 48 }, color: 'primary.main', mb: 1.5 }} />
              <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1rem', md: '1.1rem' } }}>
                Part I Assessment
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontSize: { xs: '0.8rem', md: '0.9rem' } }}>
                Test your elementary skills and achieve 25 WPM target
              </Typography>
              <Button 
                variant="contained" 
                size="small" 
                onClick={handlePartIAssessment}
                sx={{ 
                  fontSize: { xs: '0.8rem', md: '0.9rem' },
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 3
                  }
                }}
              >
                Start Assessment
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card elevation={2} sx={{ height: '100%' }}>
            <CardContent sx={{ textAlign: 'center', p: { xs: 2, md: 3 } }}>
              <Speed sx={{ fontSize: { xs: 40, md: 48 }, color: 'warning.main', mb: 1.5 }} />
              <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1rem', md: '1.1rem' } }}>
                Speed Test
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontSize: { xs: '0.8rem', md: '0.9rem' } }}>
                Timed typing test with accuracy measurement
              </Typography>
                            <Button 
                variant="contained" 
                color="secondary" 
                size="small" 
                onClick={handleSpeedTest}
                sx={{ 
                  fontSize: { xs: '0.8rem', md: '0.9rem' },
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 3
                  }
                }}
              >
                Take Speed Test
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card elevation={2} sx={{ height: '100%' }}>
            <CardContent sx={{ textAlign: 'center', p: { xs: 2, md: 3 } }}>
              <CheckCircle sx={{ fontSize: { xs: 40, md: 48 }, color: 'success.main', mb: 1.5 }} />
              <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1rem', md: '1.1rem' } }}>
                Document Formatting
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontSize: { xs: '0.8rem', md: '0.9rem' } }}>
                Test business document creation skills
              </Typography>
              <Button 
                variant="outlined" 
                size="small" 
                onClick={handleDocumentFormatting}
                sx={{ 
                  fontSize: { xs: '0.8rem', md: '0.9rem' },
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    borderColor: 'primary.main',
                    color: 'primary.main',
                    boxShadow: 2
                  }
                }}
              >
                Practice Documents
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Assessment;