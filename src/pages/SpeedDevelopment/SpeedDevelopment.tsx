import React, { useState, useEffect, useRef } from 'react';
import { useSubscription } from '../../hooks/useSubscription';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Grid, 
  Button, 
  LinearProgress, 
  Chip,
  Tabs,
  Tab,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { Speed, EmojiEvents, Stop, Refresh, Assessment } from '@mui/icons-material';

const SpeedDevelopment = () => {
  const { canUseFeature, getRemainingUsage, trackUsage, currentPlan } = useSubscription();
  const [currentTab, setCurrentTab] = useState(0);
  const [isTestActive, setIsTestActive] = useState(false);
  const [testDuration, setTestDuration] = useState(60); // seconds
  const [timeRemaining, setTimeRemaining] = useState(testDuration);
  const [testText, setTestText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [results, setResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const timerRef = useRef<number | null>(null);

  const testTexts = [
    {
      title: "Basic Practice",
      content: "The quick brown fox jumps over the lazy dog. This sentence contains all letters of the alphabet and is perfect for typing practice. Focus on accuracy first, then speed will naturally follow."
    },
    {
      title: "Business Text",
      content: "In today's business environment, effective communication is essential for success. Email correspondence, reports, and presentations require clear, concise writing skills that demonstrate professionalism."
    },
    {
      title: "Technical Content",
      content: "Computer technology continues to evolve rapidly, with new innovations emerging daily. Software development, artificial intelligence, and data analysis are shaping the future of digital communication."
    }
  ];

  const speedMilestones = [
    { wpm: 15, label: "Beginner", color: "default" as const, achieved: true },
    { wpm: 20, label: "Intermediate", color: "primary" as const, achieved: false },
    { wpm: 25, label: "Part I Target", color: "secondary" as const, achieved: false },
    { wpm: 30, label: "Advanced", color: "warning" as const, achieved: false },
    { wpm: 35, label: "Part II Target", color: "success" as const, achieved: false }
  ];

  useEffect(() => {
    if (isTestActive && timeRemaining > 0) {
      timerRef.current = setTimeout(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      finishTest();
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isTestActive, timeRemaining]);

  const startTest = (textIndex: number = 0) => {
    // Check if user can start a speed test
    if (!canUseFeature('speedTestsPerDay')) {
      alert(`Daily speed test limit reached! You have completed ${currentPlan.limitations.speedTestsPerDay} speed tests today. Upgrade to continue testing.`);
      return;
    }

    setTestText(testTexts[textIndex].content);
    setUserInput('');
    setIsTestActive(true);
    setTimeRemaining(testDuration);
    setStartTime(new Date());
    setShowResults(false);
    
    // Track speed test usage
    trackUsage('speedTestsTaken');
  };

  const finishTest = () => {
    setIsTestActive(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    const wordsTyped = userInput.trim().split(' ').length;
    const charactersTyped = userInput.length;
    const timeElapsed = testDuration - timeRemaining;
    const wpm = Math.round((wordsTyped / timeElapsed) * 60);
    
    // Calculate accuracy
    const correctChars = userInput.split('').filter((char, index) => char === testText[index]).length;
    const accuracy = Math.round((correctChars / userInput.length) * 100) || 0;
    
    const result = {
      date: new Date().toLocaleDateString(),
      wpm,
      accuracy,
      timeElapsed,
      wordsTyped,
      charactersTyped
    };
    
    setResults(prev => [result, ...prev].slice(0, 10)); // Keep last 10 results
    setShowResults(true);
  };

  const resetTest = () => {
    setIsTestActive(false);
    setTimeRemaining(testDuration);
    setUserInput('');
    setTestText('');
    setShowResults(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
    resetTest();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isTestActive) {
      setUserInput(event.target.value);
    }
  };

  const calculateCurrentWPM = () => {
    if (!isTestActive || !startTime) return 0;
    const timeElapsed = (Date.now() - startTime.getTime()) / 1000 / 60; // minutes
    const wordsTyped = userInput.trim().split(' ').length;
    return Math.round(wordsTyped / timeElapsed) || 0;
  };

  const getProgressValue = () => {
    const currentWPM = calculateCurrentWPM();
    return Math.min((currentWPM / 35) * 100, 100);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}>
        🚀 Speed Development Training
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3, fontSize: { xs: '0.9rem', md: '1rem' } }}>
        Progressive speed training from 25 WPM (Part I) to 35 WPM (Part II)
      </Typography>

      {/* Usage Status Display */}
      {currentPlan.limitations.speedTestsPerDay !== null && (
        <Paper 
          elevation={1} 
          sx={{ 
            p: 2, 
            mb: 3, 
            bgcolor: getRemainingUsage('speedTestsPerDay')! > 0 ? 'success.light' : 'warning.light',
            border: '1px solid',
            borderColor: getRemainingUsage('speedTestsPerDay')! > 0 ? 'success.main' : 'warning.main'
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="body1">
              Speed Tests Remaining Today: <strong>{getRemainingUsage('speedTestsPerDay')}</strong>
            </Typography>
            {getRemainingUsage('speedTestsPerDay') === 0 && (
              <Button 
                variant="contained" 
                size="small" 
                onClick={() => window.location.href = '/information-processing-app/pricing'}
              >
                Upgrade for Unlimited
              </Button>
            )}
          </Box>
        </Paper>
      )}

      {/* Tabs for different sections */}
      <Paper elevation={1} sx={{ mb: 3 }}>
        <Tabs 
          value={currentTab} 
          onChange={handleTabChange} 
          variant="fullWidth"
          sx={{ 
            '& .MuiTab-root': { 
              fontSize: { xs: '0.8rem', md: '0.9rem' },
              minHeight: { xs: 40, md: 48 }
            }
          }}
        >
          <Tab label="Speed Test" />
          <Tab label="Progress" />
          <Tab label="History" />
        </Tabs>
      </Paper>

      {/* Speed Test Tab */}
      {currentTab === 0 && (
        <Box sx={{ maxHeight: 'calc(100vh - 250px)', overflow: 'auto' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={8}>
              <Card elevation={2}>
                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                  <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' } }}>
                    <Speed sx={{ mr: 1, verticalAlign: 'middle', fontSize: 'inherit' }} />
                    Typing Speed Test
                  </Typography>
                  
                  {!testText && (
                    <Box>
                      <Typography variant="subtitle2" gutterBottom sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>
                        Choose a practice text:
                      </Typography>
                      <Grid container spacing={1}>
                        {testTexts.map((text, index) => (
                          <Grid item xs={12} sm={4} key={index}>
                            <Button
                              variant="outlined"
                              fullWidth
                              onClick={() => startTest(index)}
                              sx={{ 
                                height: { xs: 60, md: 80 }, 
                                flexDirection: 'column',
                                fontSize: { xs: '0.7rem', md: '0.8rem' }
                              }}
                            >
                              <Typography variant="subtitle2" sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
                                {text.title}
                              </Typography>
                              <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.6rem', md: '0.75rem' } }}>
                                {text.content.substring(0, 25)}...
                              </Typography>
                            </Button>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  )}

                  {testText && (
                    <Box>
                      <Paper elevation={1} sx={{ p: 1.5, mb: 2, backgroundColor: 'primary.light', color: 'white' }}>
                        <Grid container spacing={2} alignItems="center">
                          <Grid item xs={6} sm={3}>
                            <Typography variant="body2" sx={{ fontSize: { xs: '0.8rem', md: '0.9rem' } }}>
                              Time: {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
                            </Typography>
                          </Grid>
                          <Grid item xs={6} sm={3}>
                            <Typography variant="body2" sx={{ fontSize: { xs: '0.8rem', md: '0.9rem' } }}>
                              WPM: {calculateCurrentWPM()}
                            </Typography>
                          </Grid>
                          <Grid item xs={6} sm={3}>
                            <Button
                              size="small"
                              variant="contained"
                              color="error"
                              startIcon={<Stop />}
                              onClick={finishTest}
                              disabled={!isTestActive}
                              sx={{ fontSize: { xs: '0.7rem', md: '0.8rem' } }}
                            >
                              Finish
                            </Button>
                          </Grid>
                          <Grid item xs={6} sm={3}>
                            <Button
                              size="small"
                              variant="outlined"
                              startIcon={<Refresh />}
                              onClick={resetTest}
                              sx={{ 
                                fontSize: { xs: '0.7rem', md: '0.8rem' },
                                color: 'white',
                                borderColor: 'white'
                              }}
                            >
                              Reset
                            </Button>
                          </Grid>
                        </Grid>
                      </Paper>

                      <Paper sx={{ p: 2, mb: 2, backgroundColor: 'grey.50', maxHeight: 150, overflow: 'auto' }}>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            lineHeight: 1.6,
                            fontSize: { xs: '0.85rem', md: '0.95rem' }
                          }}
                        >
                          {testText}
                        </Typography>
                      </Paper>

                      <TextField
                        fullWidth
                        multiline
                        rows={3}
                        value={userInput}
                        onChange={handleInputChange}
                        placeholder="Start typing here..."
                        disabled={!isTestActive}
                        autoFocus={isTestActive}
                        sx={{ 
                          '& .MuiInputBase-root': {
                            fontSize: { xs: '0.9rem', md: '1rem' },
                            lineHeight: 1.5
                          }
                        }}
                      />
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} lg={4}>
              <Card elevation={2}>
                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                  <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1rem', md: '1.1rem' } }}>
                    Settings
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" gutterBottom sx={{ fontSize: { xs: '0.8rem', md: '0.9rem' } }}>
                      Duration:
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      {[30, 60, 120, 300].map(duration => (
                        <Button
                          key={duration}
                          size="small"
                          variant={testDuration === duration ? 'contained' : 'outlined'}
                          onClick={() => setTestDuration(duration)}
                          disabled={isTestActive}
                          sx={{ fontSize: { xs: '0.7rem', md: '0.8rem' }, minWidth: 45 }}
                        >
                          {duration}s
                        </Button>
                      ))}
                    </Box>
                  </Box>

                  {isTestActive && (
                    <Box>
                      <Typography variant="body2" gutterBottom sx={{ fontSize: { xs: '0.8rem', md: '0.9rem' } }}>
                        Progress:
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={(testDuration - timeRemaining) / testDuration * 100} 
                        sx={{ height: 6, mb: 1 }}
                      />
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}

      {/* Progress Overview Tab */}
      {currentTab === 1 && (
        <Box sx={{ maxHeight: 'calc(100vh - 250px)', overflow: 'auto' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Card elevation={2}>
                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                  <Speed sx={{ fontSize: { xs: 32, md: 40 }, color: 'primary.main', mb: 1 }} />
                  <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' } }}>
                    Current Speed: {results.length > 0 ? results[0].wpm : 0} WPM
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={getProgressValue()} 
                    sx={{ mb: 1, height: 6 }} 
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.8rem', md: '0.9rem' } }}>
                    Progress towards 35 WPM target
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card elevation={2}>
                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                  <EmojiEvents sx={{ fontSize: { xs: 32, md: 40 }, color: 'warning.main', mb: 1 }} />
                  <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' } }}>
                    Speed Milestones
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {speedMilestones.map((milestone, index) => (
                      <Chip
                        key={index}
                        label={`${milestone.wpm} WPM ${milestone.achieved ? '✓' : ''}`}
                        color={milestone.achieved ? 'success' : milestone.color}
                        variant={milestone.achieved ? 'filled' : 'outlined'}
                        size="small"
                        sx={{ fontSize: { xs: '0.7rem', md: '0.8rem' } }}
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}

      {/* Test History Tab */}
      {currentTab === 2 && (
        <Box sx={{ maxHeight: 'calc(100vh - 250px)', overflow: 'auto' }}>
          <Card elevation={2}>
            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
              <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' } }}>
                <Assessment sx={{ mr: 1, verticalAlign: 'middle', fontSize: 'inherit' }} />
                Test History
              </Typography>
              {results.length === 0 ? (
                <Typography color="text.secondary" sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>
                  No test results yet. Take a speed test to see your progress!
                </Typography>
              ) : (
                <Box sx={{ overflowX: 'auto' }}>
                  <TableContainer component={Paper} elevation={1}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontSize: { xs: '0.8rem', md: '0.9rem' } }}>Date</TableCell>
                          <TableCell sx={{ fontSize: { xs: '0.8rem', md: '0.9rem' } }}>WPM</TableCell>
                          <TableCell sx={{ fontSize: { xs: '0.8rem', md: '0.9rem' } }}>Accuracy</TableCell>
                          <TableCell sx={{ fontSize: { xs: '0.8rem', md: '0.9rem' } }}>Time</TableCell>
                          <TableCell sx={{ fontSize: { xs: '0.8rem', md: '0.9rem' } }}>Words</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {results.map((result, index) => (
                          <TableRow key={index}>
                            <TableCell sx={{ fontSize: { xs: '0.75rem', md: '0.85rem' } }}>
                              {result.date}
                            </TableCell>
                            <TableCell>
                              <Chip 
                                label={result.wpm} 
                                color={result.wpm >= 25 ? 'success' : result.wpm >= 20 ? 'primary' : 'default'}
                                size="small"
                                sx={{ fontSize: { xs: '0.7rem', md: '0.8rem' } }}
                              />
                            </TableCell>
                            <TableCell sx={{ fontSize: { xs: '0.75rem', md: '0.85rem' } }}>
                              {result.accuracy}%
                            </TableCell>
                            <TableCell sx={{ fontSize: { xs: '0.75rem', md: '0.85rem' } }}>
                              {result.timeElapsed}s
                            </TableCell>
                            <TableCell sx={{ fontSize: { xs: '0.75rem', md: '0.85rem' } }}>
                              {result.wordsTyped}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>
      )}

      {/* Results Dialog */}
      <Dialog open={showResults} onClose={() => setShowResults(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ textAlign: 'center', fontSize: { xs: '1.1rem', md: '1.25rem' } }}>
          Test Results
        </DialogTitle>
        <DialogContent>
          {results.length > 0 && (
            <Box sx={{ textAlign: 'center', py: 1 }}>
              <Typography variant="h4" color="primary" gutterBottom sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}>
                {results[0].wpm} WPM
              </Typography>
              <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1rem', md: '1.1rem' } }}>
                Accuracy: {results[0].accuracy}%
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.8rem', md: '0.9rem' } }}>
                Words: {results[0].wordsTyped} | Time: {results[0].timeElapsed}s
              </Typography>
              
              <Box sx={{ mt: 2 }}>
                {results[0].wpm >= 35 && (
                  <Chip label="🎉 Part II Target Achieved!" color="success" size="small" />
                )}
                {results[0].wpm >= 25 && results[0].wpm < 35 && (
                  <Chip label="🎯 Part I Target Achieved!" color="primary" size="small" />
                )}
                {results[0].wpm < 25 && (
                  <Chip label="Keep practicing!" color="default" size="small" />
                )}
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', gap: 1, pb: 2 }}>
          <Button onClick={() => setShowResults(false)} size="small">
            Close
          </Button>
          <Button 
            onClick={() => { setShowResults(false); startTest(0); }} 
            variant="contained" 
            size="small"
          >
            Test Again
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SpeedDevelopment;