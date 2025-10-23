import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  LinearProgress,
  Chip,
  Alert,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Card,
  CardContent,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Timer,
  Assignment,
  PlayArrow,
  Pause,
  Stop,
  CheckCircle,
  Schedule,
} from '@mui/icons-material';

interface ExamSet {
  id: number;
  title: string;
  duration: number; // in minutes
  tasks: Task[];
}

interface Task {
  id: number;
  title: string;
  description: string;
  content: string;
  marks: number;
  timeAllocation: number;
  instructions: string[];
  type: 'passage' | 'letter' | 'memo' | 'itinerary' | 'table';
}

const examSets: ExamSet[] = [
  {
    id: 1,
    title: "Information Processing I - Paper 1 (Technology Focus)",
    duration: 150, // 2.5 hours
    tasks: [
      {
        id: 1,
        title: "Task 1: Passage Typing",
        description: "Type the following passage in double line spacing, justify your margins.",
        content: `The rapid advancement of artificial intelligence has transformed the way we work and communicate in the modern business environment. Companies worldwide are integrating AI systems to enhance productivity, streamline operations, and improve customer service. Machine learning algorithms now process vast amounts of data to provide insights that were previously impossible to obtain through traditional methods.

However, this technological revolution also brings challenges that organizations must address. Privacy concerns, data security, and the need for employee retraining have become critical issues. Businesses must balance the benefits of automation with the human element that remains essential for creative problem-solving and relationship building.

The future workplace will likely feature human-AI collaboration, where technology augments human capabilities rather than replacing them entirely. This symbiotic relationship requires new skills and adaptation from the workforce. Organizations that successfully navigate this transition will gain significant competitive advantages in their respective markets.

Educational institutions play a crucial role in preparing students for this evolving landscape. Curricula must incorporate digital literacy, critical thinking, and adaptability to ensure graduates can thrive in an AI-enhanced workplace.`,
        marks: 10,
        timeAllocation: 25,
        instructions: [
          "Use double line spacing throughout",
          "Justify both left and right margins", 
          "Maintain consistent formatting",
          "Proofread for accuracy"
        ],
        type: 'passage'
      },
      {
        id: 2,
        title: "Task 2: Business Letter",
        description: "Type the following business letter using appropriate business format.",
        content: `TechSolutions Ltd
15 Innovation Drive
SILICON VALLEY
CA 94301
Tel: (555) 123-4567
Email: info@techsolutions.com

Our Ref: TS/2024/001

[Today's Date]

Ms Sarah Johnson
Operations Manager
Digital Dynamics Corp
25 Technology Parkway
TECH CITY
TX 75001

Dear Ms Johnson

RE: PARTNERSHIP PROPOSAL FOR AI DEVELOPMENT PROJECT

Thank you for your interest in collaborating with TechSolutions Ltd on the upcoming artificial intelligence development project. Following our productive meeting last week, I am pleased to outline our partnership proposal.

Our company has been at the forefront of AI innovation for over eight years, with a team of 50 experienced developers and data scientists. We have successfully completed more than 200 projects across various industries, including healthcare, finance, and manufacturing. Our expertise in machine learning, natural language processing, and computer vision makes us an ideal partner for your ambitious project.

We propose a joint venture structure where both companies contribute equally to resources and expertise. TechSolutions will provide the technical infrastructure and AI development capabilities, while Digital Dynamics will contribute domain expertise and market access. This collaboration will allow us to leverage our combined strengths to deliver innovative solutions.

The proposed timeline spans 18 months, with key milestones at 6-month intervals. Initial development will focus on creating the core AI algorithms, followed by testing and refinement phases. We estimate the total project value at $2.5 million, with costs shared equally between our organizations.

I have enclosed detailed project specifications, timeline charts, and financial projections for your review. Our legal team is prepared to draft the partnership agreement pending your approval of these terms.

I look forward to your response and hope we can formalize this partnership soon. Please contact me directly if you require any clarification or wish to discuss modifications to the proposal.

Yours sincerely

Michael Rodriguez
Chief Executive Officer

Enclosures: Project specifications, Timeline charts, Financial projections`,
        marks: 30,
        timeAllocation: 45,
        instructions: [
          "Use appropriate business letter format",
          "Include all header information",
          "Use today's date",
          "Ensure proper spacing and alignment",
          "Include all enclosures mentioned"
        ],
        type: 'letter'
      },
      {
        id: 3,
        title: "Task 3: Memorandum", 
        description: "Type the following memorandum using standard memo format.",
        content: `MEMORANDUM

TO: All Department Managers
FROM: Jennifer Chen, Human Resources Director  
DATE: [Today's Date]
REF: JC/hr/2024/015

SUBJECT: IMPLEMENTATION OF REMOTE WORK POLICY

Following extensive consultation with department heads and employee representatives, management has approved a comprehensive remote work policy effective from next month. This memorandum outlines the key provisions and implementation procedures.

ELIGIBILITY CRITERIA
All permanent employees with at least six months of satisfactory service are eligible to apply for remote work arrangements. Positions involving customer-facing activities, equipment operation, or security-sensitive tasks may have limited remote work options. Department managers will assess individual applications based on job requirements and performance history.

WORK ARRANGEMENTS
Approved remote workers may work from home up to three days per week. Core business hours (10:00 AM to 3:00 PM) must be maintained regardless of location. Employees must maintain reliable internet connectivity, appropriate workspace, and professional communication standards during remote work hours.

EQUIPMENT AND SUPPORT
The company will provide necessary equipment including laptops, software licenses, and communication tools. IT support will be available for remote workers through a dedicated helpdesk. Employees are responsible for maintaining secure work environments and protecting company data.

PERFORMANCE MONITORING
Managers will conduct monthly check-ins with remote workers to assess productivity and address any challenges. Performance evaluation criteria remain unchanged, focusing on output quality and deadline adherence rather than physical presence.

TRIAL PERIOD
The policy will undergo a six-month trial period with comprehensive review and feedback collection. Based on the results, permanent adoption or modifications will be considered. Department managers must submit monthly reports on remote work effectiveness.

Training sessions on remote work best practices will be conducted next week. Please ensure all eligible staff receive this information promptly and encourage applications from suitable candidates.`,
        marks: 20,
        timeAllocation: 30,
        instructions: [
          "Use standard memorandum format",
          "Include all header information", 
          "Use appropriate spacing",
          "Maintain professional tone",
          "Use today's date"
        ],
        type: 'memo'
      },
      {
        id: 4,
        title: "Task 4: Business Itinerary",
        description: "Display the following business itinerary in an appropriate format.",
        content: `BUSINESS TRIP TO SINGAPORE
Digital Marketing Conference

Monday 15 July to Thursday 18 July 2024

MONDAY 15 JULY

Time                    Activity
0630 hours             Taxi from home to London Heathrow Airport
0800 hours             Check-in for Flight SQ321 to Singapore Changi
0930 hours             Flight departure from London Heathrow
                       (Flight time: 13 hours 30 minutes)
0505 hours (Tue)       Arrive Singapore Changi Airport (local time)
0630 hours             Immigration and baggage collection
0730 hours             Taxi to Marina Bay Sands Hotel
0900 hours             Hotel check-in and breakfast
1100 hours             Conference registration and welcome session
1300 hours             Networking lunch with delegates
1500 hours             Keynote presentation: "Future of Digital Marketing"
1700 hours             Break and refreshments
1800 hours             Panel discussion: "AI in Marketing Strategy"
2000 hours             Welcome dinner at Sky Restaurant

TUESDAY 16 JULY

Time                    Activity
0700 hours             Hotel breakfast
0830 hours             Workshop: "Social Media Analytics"
1030 hours             Coffee break and networking
1100 hours             Presentation: "Customer Journey Mapping"
1300 hours             Lunch with potential clients
1500 hours             Site visit: Singapore Digital Hub
1700 hours             Return to hotel
1930 hours             Business dinner with Asian partners

WEDNESDAY 17 JULY

Time                    Activity
0700 hours             Hotel breakfast
0900 hours             Final conference sessions
1200 hours             Conference closing ceremony
1400 hours             Lunch and departure preparations
1600 hours             Shopping at Orchard Road
1900 hours             Farewell dinner with conference organizers
2200 hours             Return to hotel and packing

THURSDAY 18 JULY

Time                    Activity
0600 hours             Hotel checkout
0730 hours             Taxi to Singapore Changi Airport
0930 hours             Check-in for Flight SQ322 to London
1130 hours             Flight departure from Singapore
                       (Flight time: 13 hours 45 minutes)
1715 hours             Arrive London Heathrow (local time)
1900 hours             Immigration and baggage collection
2030 hours             Taxi home

CONTACTS:
Conference Organizer: Ms Lisa Wang (+65 9123 4567)
Hotel Concierge: Marina Bay Sands (+65 6688 8868)
Local Transport: Singapore Taxi Service (+65 6555 1234)
Emergency Contact: Embassy (+65 6424 4200)`,
        marks: 20,
        timeAllocation: 25,
        instructions: [
          "Use clear tabular format for times and activities",
          "Maintain consistent spacing and alignment",
          "Include all contact information",
          "Use appropriate headings and subheadings"
        ],
        type: 'itinerary'
      },
      {
        id: 5,
        title: "Task 5: Tabulated Document",
        description: "Display the following information in an appropriate tabular format.",
        content: `QUARTERLY SALES PERFORMANCE REPORT
Information Technology Division

PRODUCT CATEGORY ANALYSIS - Q3 2024

Product Category | Target Sales ($) | Actual Sales ($) | Variance ($) | Variance (%) | Units Sold | Market Share (%)

Software Licenses | 250,000 | 287,500 | +37,500 | +15.0 | 1,150 | 28.5
Hardware Systems | 180,000 | 165,750 | -14,250 | -7.9 | 85 | 22.1
Cloud Services | 320,000 | 356,800 | +36,800 | +11.5 | 892 | 35.7
Support Contracts | 150,000 | 142,500 | -7,500 | -5.0 | 475 | 18.9
Training Programs | 75,000 | 89,250 | +14,250 | +19.0 | 298 | 12.3

TOTALS | 975,000 | 1,041,800 | +66,800 | +6.9 | 2,900 | 23.5

REGIONAL PERFORMANCE BREAKDOWN

Region | Q1 Sales ($) | Q2 Sales ($) | Q3 Sales ($) | Growth Rate (%) | Target Achievement (%)

North America | 185,450 | 198,720 | 215,680 | +8.5 | 108.4
Europe | 156,890 | 172,340 | 188,920 | +9.6 | 105.2
Asia Pacific | 142,630 | 159,880 | 178,450 | +11.6 | 112.3
Latin America | 89,340 | 95,680 | 103,250 | +7.9 | 97.8
Middle East/Africa | 67,230 | 72,150 | 79,580 | +10.3 | 106.7

SALES REPRESENTATIVE PERFORMANCE

Representative | Territory | Q3 Sales ($) | Commission ($) | Deals Closed | Average Deal Size ($)

Sarah Mitchell | Northeast | 125,680 | 6,284 | 28 | 4,489
James Rodriguez | Southeast | 118,750 | 5,938 | 25 | 4,750  
Patricia Wong | West Coast | 142,350 | 7,118 | 31 | 4,592
Michael Chen | Midwest | 108,920 | 5,446 | 22 | 4,951
Angela Davis | Southwest | 134,280 | 6,714 | 29 | 4,630

Note: Commission rate is 5% of gross sales
Target achievement calculations based on individual quarterly targets
Market share data sourced from TechAnalytics Research Q3 2024 Report`,
        marks: 25,
        timeAllocation: 35,
        instructions: [
          "Use appropriate table formatting with clear borders",
          "Align numerical data consistently", 
          "Include all headings and subheadings",
          "Maintain neat presentation throughout",
          "Include notes and source information"
        ],
        type: 'table'
      }
    ]
  }
];

const EnhancedExamPractice: React.FC = () => {
  const [selectedExam, setSelectedExam] = useState<number>(1);
  const [currentTask, setCurrentTask] = useState<number>(0);
  const [examStarted, setExamStarted] = useState<boolean>(false);
  const [examPaused, setExamPaused] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [showInstructions, setShowInstructions] = useState<boolean>(true);
  const [completedTasks, setCompletedTasks] = useState<Set<number>>(new Set());

  const currentExam = examSets.find(exam => exam.id === selectedExam);
  const currentTaskData = currentExam?.tasks[currentTask];

  useEffect(() => {
    let timer: number;
    if (examStarted && !examPaused && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [examStarted, examPaused, timeRemaining]);

  const startExam = () => {
    if (currentExam) {
      setTimeRemaining(currentExam.duration * 60); // Convert to seconds
      setExamStarted(true);
      setExamPaused(false);
      setShowInstructions(false);
      setCurrentTask(0);
      setUserAnswers({});
      setCompletedTasks(new Set());
    }
  };

  const pauseExam = () => {
    setExamPaused(!examPaused);
  };

  const stopExam = () => {
    setExamStarted(false);
    setExamPaused(false);
    setTimeRemaining(0);
    setCurrentTask(0);
    setShowInstructions(true);
  };

  const nextTask = () => {
    if (currentExam && currentTask < currentExam.tasks.length - 1) {
      setCompletedTasks(prev => new Set([...prev, currentTaskData!.id]));
      setCurrentTask(prev => prev + 1);
    }
  };

  const previousTask = () => {
    if (currentTask > 0) {
      setCurrentTask(prev => prev - 1);
    }
  };

  const handleAnswerChange = (taskId: number, answer: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [taskId]: answer
    }));
  };

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = (): number => {
    if (!currentExam) return 0;
    return ((currentTask + 1) / currentExam.tasks.length) * 100;
  };

  if (showInstructions) {
    return (
      <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
            Information Processing I - Enhanced Examination Practice
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Select Examination Paper
                  </Typography>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Choose Exam Paper</InputLabel>
                    <Select
                      value={selectedExam}
                      onChange={(e) => setSelectedExam(Number(e.target.value))}
                      label="Choose Exam Paper"
                    >
                      {examSets.map((exam) => (
                        <MenuItem key={exam.id} value={exam.id}>
                          {exam.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  
                  {currentExam && (
                    <Box>
                      <Typography variant="body2" sx={{ mb: 2 }}>
                        <strong>Duration:</strong> {Math.floor(currentExam.duration / 60)} hours {currentExam.duration % 60} minutes
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 2 }}>
                        <strong>Total Tasks:</strong> {currentExam.tasks.length}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Total Marks:</strong> {currentExam.tasks.reduce((sum, task) => sum + task.marks, 0)}
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Examination Instructions
                  </Typography>
                  <Typography variant="body2" paragraph>
                    <strong>NATIONAL CERTIFICATE IN SECRETARIAL STUDIES</strong><br/>
                    INFORMATION PROCESSING I PART I
                  </Typography>
                  
                  <Alert severity="info" sx={{ mb: 2 }}>
                    <Typography variant="body2">
                      <strong>INSTRUCTIONS TO CANDIDATES:</strong>
                    </Typography>
                    <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
                      <li>The tasks may be completed in any order but should be submitted in numerical order</li>
                      <li>Use today's date for letters and memoranda</li>
                      <li>Any appropriate method of display may be used except when specific instructions are given</li>
                      <li>Use a ragged right margin except when justified margins are specified</li>
                      <li>Read all instructions carefully before beginning each task</li>
                      <li>Manage your time effectively across all tasks</li>
                    </ul>
                  </Alert>

                  {currentExam && (
                    <Box sx={{ mt: 3 }}>
                      <Typography variant="h6" gutterBottom>
                        Task Overview:
                      </Typography>
                      {currentExam.tasks.map((task, index) => (
                        <Box key={task.id} sx={{ mb: 1 }}>
                          <Typography variant="body2">
                            <strong>Task {index + 1}:</strong> {task.title} ({task.marks} marks)
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<PlayArrow />}
              onClick={startExam}
              disabled={!currentExam}
              sx={{ px: 4, py: 2 }}
            >
              Start Examination
            </Button>
          </Box>
        </Paper>
      </Box>
    );
  }

  if (!currentExam || !currentTaskData) {
    return null;
  }

  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto', p: 2 }}>
      {/* Exam Header */}
      <Paper sx={{ p: 2, mb: 2, background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)', color: 'white' }}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {currentExam.title}
            </Typography>
            <Typography variant="body2">
              Task {currentTask + 1} of {currentExam.tasks.length}
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
              <Timer />
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {formatTime(timeRemaining)}
              </Typography>
            </Box>
            <Typography variant="body2">
              Time Remaining
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={4} sx={{ textAlign: 'right' }}>
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                color="warning"
                size="small"
                startIcon={examPaused ? <PlayArrow /> : <Pause />}
                onClick={pauseExam}
              >
                {examPaused ? 'Resume' : 'Pause'}
              </Button>
              <Button
                variant="contained" 
                color="error"
                size="small"
                startIcon={<Stop />}
                onClick={stopExam}
              >
                Stop
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Progress Bar */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body2" sx={{ minWidth: '100px' }}>
            Progress:
          </Typography>
          <LinearProgress
            variant="determinate"
            value={getProgressPercentage()}
            sx={{ flexGrow: 1, height: 8, borderRadius: 4 }}
          />
          <Typography variant="body2" sx={{ minWidth: '50px' }}>
            {Math.round(getProgressPercentage())}%
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 1, mt: 2, flexWrap: 'wrap' }}>
          {currentExam.tasks.map((task, index) => (
            <Chip
              key={task.id}
              label={`Task ${index + 1}`}
              variant={index === currentTask ? 'filled' : 'outlined'}
              color={completedTasks.has(task.id) ? 'success' : index === currentTask ? 'primary' : 'default'}
              icon={completedTasks.has(task.id) ? <CheckCircle /> : <Assignment />}
              onClick={() => setCurrentTask(index)}
              sx={{ cursor: 'pointer' }}
            />
          ))}
        </Box>
      </Paper>

      {/* Task Content */}
      <Paper sx={{ p: 3, mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Box>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              {currentTaskData.title}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {currentTaskData.description}
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Chip
              label={`${currentTaskData.marks} marks`}
              color="primary"
              variant="filled"
              sx={{ mb: 1 }}
            />
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Schedule fontSize="small" />
              Suggested: {currentTaskData.timeAllocation} min
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Task Instructions */}
        {currentTaskData.instructions.length > 0 && (
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
              Instructions:
            </Typography>
            <ul style={{ margin: 0, paddingLeft: '20px' }}>
              {currentTaskData.instructions.map((instruction, index) => (
                <li key={index}>
                  <Typography variant="body2">{instruction}</Typography>
                </li>
              ))}
            </ul>
          </Alert>
        )}

        {/* Task Content */}
        <Paper sx={{ p: 2, bgcolor: 'grey.50', mb: 3 }}>
          <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', lineHeight: 1.6 }}>
            {currentTaskData.content}
          </Typography>
        </Paper>

        {/* Answer Area */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Your Answer:
          </Typography>
          <TextField
            multiline
            fullWidth
            rows={12}
            variant="outlined"
            placeholder={`Begin typing your answer for ${currentTaskData.title}...`}
            value={userAnswers[currentTaskData.id] || ''}
            onChange={(e) => handleAnswerChange(currentTaskData.id, e.target.value)}
            disabled={examPaused}
            sx={{
              '& .MuiInputBase-root': {
                fontFamily: 'monospace',
                fontSize: '14px',
                lineHeight: 1.5,
              }
            }}
          />
        </Box>
      </Paper>

      {/* Navigation */}
      <Paper sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button
            variant="outlined"
            onClick={previousTask}
            disabled={currentTask === 0 || examPaused}
          >
            Previous Task
          </Button>
          
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2">
              Task {currentTask + 1} of {currentExam.tasks.length}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Words typed: {(userAnswers[currentTaskData.id] || '').split(' ').filter(word => word.length > 0).length}
            </Typography>
          </Box>
          
          <Button
            variant="contained"
            onClick={nextTask}
            disabled={currentTask === currentExam.tasks.length - 1 || examPaused}
          >
            {currentTask === currentExam.tasks.length - 1 ? 'Complete Exam' : 'Next Task'}
          </Button>
        </Box>
      </Paper>

      {/* Time Warning Dialog */}
      <Dialog open={timeRemaining <= 300 && timeRemaining > 0 && examStarted && !examPaused}>
        <DialogTitle sx={{ color: 'error.main' }}>
          ⚠️ Time Warning
        </DialogTitle>
        <DialogContent>
          <Typography>
            You have less than 5 minutes remaining! Please complete your current work and submit your examination.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {}} color="primary">
            Continue Working
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EnhancedExamPractice;