import { Box, Typography, Card, CardContent, Grid, LinearProgress, Chip } from '@mui/material';

const Progress = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}>
        📊 Progress Tracking
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3, fontSize: { xs: '0.9rem', md: '1rem' } }}>
        Monitor your Information Processing & Typewriting development and achievements
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card elevation={2}>
            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
              <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' } }}>
                Syllabus Progress
              </Typography>
              
              <Box mb={2}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>
                    Part I: Introduction
                  </Typography>
                  <Chip label="Complete" color="success" size="small" sx={{ fontSize: { xs: '0.7rem', md: '0.8rem' } }} />
                </Box>
                <LinearProgress variant="determinate" value={100} sx={{ height: 6 }} />
              </Box>

              <Box mb={2}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>
                    Part I: Keyboard Mastery
                  </Typography>
                  <Typography sx={{ fontSize: { xs: '0.8rem', md: '0.9rem' }, fontWeight: 'bold' }}>
                    85%
                  </Typography>
                </Box>
                <LinearProgress variant="determinate" value={85} sx={{ height: 6 }} />
              </Box>

              <Box mb={2}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>
                    Part I: Elementary Skills
                  </Typography>
                  <Typography sx={{ fontSize: { xs: '0.8rem', md: '0.9rem' }, fontWeight: 'bold' }}>
                    40%
                  </Typography>
                </Box>
                <LinearProgress variant="determinate" value={40} sx={{ height: 6 }} />
              </Box>

              <Box mb={1}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>
                    Part II: Intermediate Skills
                  </Typography>
                  <Typography sx={{ fontSize: { xs: '0.8rem', md: '0.9rem' }, fontWeight: 'bold' }}>
                    0%
                  </Typography>
                </Box>
                <LinearProgress variant="determinate" value={0} sx={{ height: 6 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Progress;