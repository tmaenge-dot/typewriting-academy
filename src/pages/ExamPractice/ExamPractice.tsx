import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Card,
  CardContent,
  Alert,
  Chip,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  PlayArrow,
  CheckCircle,
  Warning,
  ExpandMore,
  Print,
  Save,
  Refresh
} from '@mui/icons-material';

interface ExamTask {
  id: number;
  title: string;
  description: string;
  marks: number;
  instructions: string;
  content: string;
  timeLimit: number; // in minutes
  formatting: {
    spacing: 'single' | 'double';
    margins: 'justified' | 'left' | 'standard';
    layout: 'paragraph' | 'letter' | 'memo' | 'itinerary' | 'table';
  };
}

const ExamPractice = () => {
  const [currentTask, setCurrentTask] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isExamActive, setIsExamActive] = useState(false);
  const [taskStartTime, setTaskStartTime] = useState<number | null>(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [completedTasks, setCompletedTasks] = useState<boolean[]>([false, false, false, false, false]);
  const [examStartTime, setExamStartTime] = useState<number | null>(null);
  const [totalExamTime, setTotalExamTime] = useState(0);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Official Part I Exam Tasks
  const examTasks: ExamTask[] = [
    {
      id: 1,
      title: 'Task 1: Passage Typing',
      description: 'Type the following passage in double line spacing, justify your margins',
      marks: 10,
      instructions: 'Format: Double spacing, justified margins, accurate typing',
      timeLimit: 15,
      content: `Like all insects, a bee's body is divided into three parts: a head with two antennae, a thorax with six legs, and an abdomen. All bees have branched hairs somewhere on their bodies and two pairs of wings. Only female bees have stingers (which are modified ovipositors, organs originally used to lay eggs). Many bee species have black and yellow coloration, but many do not - they actually come in a variety of colors, including green, blue, red, or black. Some are striped, and some even have a metallic sheen. They range in size from large carpenter bees and bumble bees to the tiny Perdita minima bee, which is less than two millimeters long.

There are over 20,000 bee species worldwide, including the honey bee, which originated in Eurasia and has been imported around the globe as a domesticated species. Wild bees species live on every continent except Antarctica. In North America there are approximately 4,000 native bee species occupying ecosystems from forests to deserts to grasslands.

As they forage, bees perform the critical act of pollination. As a bee enters a flower to feed on nectar and gather pollen, some of the pollen sticks to the bee's body. When the bee flies on, it deposits some of that pollen on the next flower it visits, resulting in fertilization, allowing the plant to reproduce and to generate the fruits and seeds so many other wildlife species rely on as a food source. In fact, bees pollinate a staggering 80 percent of all flowering plants, including approximately 75 percent of the fruits, nuts, and vegetables grown in the United States.`,
      formatting: {
        spacing: 'double',
        margins: 'justified',
        layout: 'paragraph'
      }
    },
    {
      id: 2,
      title: 'Task 2: Business Letter',
      description: 'Type the letter below on an A4 paper for dispatch today',
      marks: 25,
      instructions: 'Format as business letter with proper layout, dates, and references',
      timeLimit: 30,
      content: `Dale Arthur
Owner of Cuts by Dale
0402 340 120
dale_arthur@cutsbydale.com.au
23 Surfers Parade
Toowoomba Qld 4350
Ref DA/(typist's initials)
(Insert today's date)

Sarah Henderson
The Toowoomba Gazette
34 Main Street
Toowoomba Qld 4350

Dear Ms Henderson,

Re: Media coverage of salon opening

I am writing to ask for media coverage of my upcoming salon opening in Toowoomba. I have salons in Brisbane and the Gold Coast, and can't wait to open my latest branch on (Monday next). I think Toowoomba residents would love to know about my salon's high-end experience and hair, beauty and cosmetic services.

I'd love you to visit my salon on opening day and learn more. You can interview me and my employees and take advantage of a complimentary hair or beauty treatment. This will let you write a feature article on the Cuts by Dale difference using your firsthand experience.

Thank you for your considering my proposal and I hope to see you on opening day. I have enclosed a brochure so you can familiarise yourself with our services. If you'd like a treatment, please call me on the number above so I can book your appointment at a time that's convenient for you. I look forward to hearing from you soon.

Yours faithfully

Dale Arthur

encs`,
      formatting: {
        spacing: 'single',
        margins: 'standard',
        layout: 'letter'
      }
    },
    {
      id: 3,
      title: 'Task 3: Memorandum',
      description: 'Type the memo below for dispatch today',
      marks: 20,
      instructions: 'Format as standard memorandum with proper headings and layout',
      timeLimit: 20,
      content: `MEMORANDUM

To: 		Computer Programming Division
From: 		Vice President Lumbergh
Date: 		(today's date)
Ref:		LO/(typist's initials)

Attaching cover sheets to TPS reports

This is to remind the division that, starting today, we are now filing all Testing Procedure Specification (TPS) reports with new cover sheets.

The reason for this change is simple. In addition to a new format, the cover sheets provide a summary of the report as well as the updated legal copy. The new cover sheets also include Initech's new logo.

Though this change may initially seem like a headache and an extra step, it is necessary to include the new cover sheets due to their updated information. Failing to do so will result in a confusing and inaccurate product being delivered to our customers.

Please be sure to follow this new procedure.`,
      formatting: {
        spacing: 'single',
        margins: 'standard',
        layout: 'memo'
      }
    },
    {
      id: 4,
      title: 'Task 4: Itinerary',
      description: 'Type the itinerary below for display',
      marks: 20,
      instructions: 'Format with proper alignment and clear presentation for display purposes',
      timeLimit: 20,
      content: `BUSINESS TRIP ITINERARY

Mr. John Smith - Regional Sales Manager
Trip to Melbourne: 25-27 October 2025

DAY 1 - MONDAY 25 OCTOBER
08:00	Depart Brisbane Airport - Flight VA823
10:30	Arrive Melbourne Airport
11:30	Taxi to Hotel Grand Chancellor
12:00	Check-in and lunch at hotel restaurant
14:00	Meeting with Melbourne Regional Office
16:30	Visit client - ABC Manufacturing Pty Ltd
18:00	Return to hotel
19:30	Dinner with Regional Sales Team

DAY 2 - TUESDAY 26 OCTOBER
08:00	Breakfast meeting - Cafe Milano
09:30	Client presentation - XYZ Corporation
12:00	Lunch with procurement manager
14:00	Site visit - Production facility tour
16:00	Return to hotel for conference call
17:30	Team building dinner - Crown Casino

DAY 3 - WEDNESDAY 27 OCTOBER
09:00	Final client meeting - DEF Industries
11:00	Check out from hotel
12:30	Lunch at airport
14:00	Depart Melbourne Airport - Flight VA830
16:30	Arrive Brisbane Airport`,
      formatting: {
        spacing: 'single',
        margins: 'standard',
        layout: 'itinerary'
      }
    },
    {
      id: 5,
      title: 'Task 5: Tabulated Document',
      description: 'Type the following and rule as shown',
      marks: 25,
      instructions: 'Create properly formatted table with ruling and alignment',
      timeLimit: 25,
      content: `MONTHLY SALES REPORT - OCTOBER 2025

PRODUCT CATEGORY		UNITS SOLD	REVENUE		% OF TOTAL
________________________________________________

Office Supplies			2,450		$24,500		18.5%
Computer Equipment		890		$89,000		67.2%
Furniture			156		$15,600		11.8%
Stationery			312		$3,120		2.4%
________________________________________________

TOTAL				3,808		$132,220	100.0%

Regional Breakdown:
Brisbane			1,142		$39,677		30.0%
Melbourne			1,216		$43,552		32.9%
Sydney				1,045		$37,413		28.3%
Perth				405		$11,578		8.8%
________________________________________________

GRAND TOTAL			3,808		$132,220	100.0%

Report prepared by: Sales Department
Date: 22 October 2025`,
      formatting: {
        spacing: 'single',
        margins: 'standard',
        layout: 'table'
      }
    }
  ];

  useEffect(() => {
    let interval: number;
    if (isExamActive && taskStartTime) {
      interval = setInterval(() => {
        const taskElapsed = (Date.now() - taskStartTime) / 1000;
        setTimeElapsed(taskElapsed);
        
        if (examStartTime) {
          const totalElapsed = (Date.now() - examStartTime) / 1000;
          setTotalExamTime(totalElapsed);
        }
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isExamActive, taskStartTime, examStartTime]);

  const startExam = () => {
    setIsExamActive(true);
    setExamStartTime(Date.now());
    startTask();
  };

  const startTask = () => {
    setTaskStartTime(Date.now());
    setTimeElapsed(0);
    setUserInput('');
    inputRef.current?.focus();
  };

  const completeTask = () => {
    const newCompleted = [...completedTasks];
    newCompleted[currentTask] = true;
    setCompletedTasks(newCompleted);
    
    if (currentTask < examTasks.length - 1) {
      setCurrentTask(currentTask + 1);
      startTask();
    } else {
      // Exam completed
      setIsExamActive(false);
      setTaskStartTime(null);
    }
  };

  const nextTask = () => {
    if (currentTask < examTasks.length - 1) {
      setCurrentTask(currentTask + 1);
      startTask();
    }
  };

  const previousTask = () => {
    if (currentTask > 0) {
      setCurrentTask(currentTask - 1);
      startTask();
    }
  };

  const resetExam = () => {
    setCurrentTask(0);
    setUserInput('');
    setIsExamActive(false);
    setTaskStartTime(null);
    setTimeElapsed(0);
    setCompletedTasks([false, false, false, false, false]);
    setExamStartTime(null);
    setTotalExamTime(0);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(event.target.value);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeStatus = () => {
    const timeLimit = examTasks[currentTask].timeLimit * 60;
    const percentage = (timeElapsed / timeLimit) * 100;
    
    if (percentage >= 100) return 'error';
    if (percentage >= 80) return 'warning';
    return 'success';
  };

  const currentExamTask = examTasks[currentTask];

  return (
    <Box sx={{ width: '100%' }}>
      {/* Header */}
      <Box mb={3}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}>
          📝 Part I Exam Practice
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>
          National Certificate in Secretarial Studies - Official Exam Format
        </Typography>
      </Box>

      {/* Exam Overview */}
      <Paper elevation={2} sx={{ p: { xs: 2, md: 3 }, mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' } }}>
          📋 Exam Overview
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontSize: { xs: '0.8rem', md: '0.9rem' } }}>
              Total Tasks: 5 | Total Marks: 100 | Time Limit: 110 minutes
            </Typography>
            <Box display="flex" gap={0.5} mb={2} flexWrap="wrap">
              {examTasks.map((task, index) => (
                <Chip
                  key={task.id}
                  label={`Task ${task.id}`}
                  color={completedTasks[index] ? 'success' : index === currentTask ? 'primary' : 'default'}
                  variant={index === currentTask ? 'filled' : 'outlined'}
                  size="small"
                  sx={{ fontSize: { xs: '0.7rem', md: '0.8rem' } }}
                  icon={completedTasks[index] ? <CheckCircle /> : undefined}
                />
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            {isExamActive && (
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Total Exam Time: {formatTime(totalExamTime)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Current Task Time: {formatTime(timeElapsed)}
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>

        {!isExamActive && (
          <Box mt={2}>
            <Button
              variant="contained"
              size="large"
              startIcon={<PlayArrow />}
              onClick={startExam}
            >
              Start Exam Practice
            </Button>
            <Button
              variant="outlined"
              sx={{ ml: 2 }}
              startIcon={<Refresh />}
              onClick={resetExam}
            >
              Reset
            </Button>
          </Box>
        )}
      </Paper>

      {isExamActive && (
        <Grid container spacing={3}>
          {/* Task Instructions */}
          <Grid item xs={12} md={5}>
            <Paper sx={{ p: 3 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">{currentExamTask.title}</Typography>
                <Chip label={`${currentExamTask.marks} marks`} color="primary" />
              </Box>
              
              <Typography variant="body1" mb={2}>
                {currentExamTask.description}
              </Typography>

              <Alert severity="info" sx={{ mb: 2 }}>
                <Typography variant="body2">
                  <strong>Instructions:</strong> {currentExamTask.instructions}
                </Typography>
              </Alert>

              {/* Formatting Requirements */}
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="subtitle2">📐 Formatting Requirements</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2">
                    • <strong>Spacing:</strong> {currentExamTask.formatting.spacing} line spacing<br/>
                    • <strong>Margins:</strong> {currentExamTask.formatting.margins}<br/>
                    • <strong>Layout:</strong> {currentExamTask.formatting.layout} format<br/>
                    • <strong>Time Limit:</strong> {currentExamTask.timeLimit} minutes
                  </Typography>
                </AccordionDetails>
              </Accordion>

              {/* Time Progress */}
              <Box mt={3}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="body2" color="text.secondary">
                    Time Progress
                  </Typography>
                  <Typography variant="body2" color={getTimeStatus() === 'error' ? 'error.main' : 'text.primary'}>
                    {formatTime(timeElapsed)} / {formatTime(currentExamTask.timeLimit * 60)}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={Math.min((timeElapsed / (currentExamTask.timeLimit * 60)) * 100, 100)}
                  color={getTimeStatus()}
                  sx={{ height: 8, borderRadius: 4 }}
                />
                {timeElapsed >= currentExamTask.timeLimit * 60 && (
                  <Alert severity="error" sx={{ mt: 1 }}>
                    Time limit exceeded! Consider moving to the next task.
                  </Alert>
                )}
              </Box>

              {/* Navigation Controls */}
              <Box mt={3} display="flex" gap={1}>
                <Button
                  variant="outlined"
                  onClick={previousTask}
                  disabled={currentTask === 0}
                >
                  Previous
                </Button>
                <Button
                  variant="contained"
                  onClick={completeTask}
                  startIcon={<CheckCircle />}
                >
                  Complete Task
                </Button>
                <Button
                  variant="outlined"
                  onClick={nextTask}
                  disabled={currentTask === examTasks.length - 1}
                >
                  Next
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Typing Area */}
          <Grid item xs={12} md={7}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                📄 Source Document
              </Typography>
              
              {/* Original Text Display */}
              <Box
                sx={{
                  fontFamily: 'monospace',
                  fontSize: '14px',
                  lineHeight: currentExamTask.formatting.spacing === 'double' ? 2 : 1.5,
                  p: 2,
                  bgcolor: 'grey.50',
                  borderRadius: 1,
                  maxHeight: '300px',
                  overflowY: 'auto',
                  mb: 3,
                  whiteSpace: 'pre-line'
                }}
              >
                {currentExamTask.content}
              </Box>

              <Typography variant="h6" gutterBottom>
                ⌨️ Your Typing
              </Typography>

              {/* Typing Input */}
              <textarea
                ref={inputRef}
                value={userInput}
                onChange={handleInputChange}
                placeholder="Begin typing the document exactly as shown above..."
                style={{
                  width: '100%',
                  minHeight: '400px',
                  padding: '15px',
                  fontSize: '14px',
                  fontFamily: 'monospace',
                  lineHeight: currentExamTask.formatting.spacing === 'double' ? 2 : 1.5,
                  border: '2px solid #1976d2',
                  borderRadius: '4px',
                  outline: 'none',
                  resize: 'vertical'
                }}
              />

              {/* Formatting Toolbar */}
              <Box mt={2} display="flex" gap={1}>
                <Button variant="outlined" size="small" startIcon={<Save />}>
                  Save Draft
                </Button>
                <Button variant="outlined" size="small" startIcon={<Print />}>
                  Print Preview
                </Button>
                <Chip 
                  label={`${userInput.length} characters typed`} 
                  variant="outlined" 
                  size="small"
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* Exam Summary */}
      {!isExamActive && completedTasks.some(task => task) && (
        <Paper sx={{ p: 3, mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            📊 Exam Summary
          </Typography>
          <Grid container spacing={2}>
            {examTasks.map((task, index) => (
              <Grid item xs={12} sm={6} md={4} key={task.id}>
                <Card variant="outlined">
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography variant="subtitle2">{task.title}</Typography>
                      {completedTasks[index] ? (
                        <CheckCircle color="success" />
                      ) : (
                        <Warning color="warning" />
                      )}
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {completedTasks[index] ? 'Completed' : 'Not completed'}
                    </Typography>
                    <Typography variant="caption">
                      {task.marks} marks
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          
          <Alert severity="info" sx={{ mt: 2 }}>
            <Typography variant="body2">
              <strong>Next Steps:</strong> Review your completed tasks and prepare for the actual exam. 
              Practice regularly to improve speed and accuracy.
            </Typography>
          </Alert>
        </Paper>
      )}
    </Box>
  );
};

export default ExamPractice;