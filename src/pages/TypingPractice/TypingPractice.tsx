import React, { useState, useEffect, useRef } from 'react';
import { useSubscription } from '../../hooks/useSubscription';
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  Alert,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tabs,
  Tab
} from '@mui/material';
import {
  PlayArrow,
  Stop,
  Refresh,
  Timer,
  Speed,
  Assessment,
  CheckCircle,
  RadioButtonUnchecked,
  ExpandMore,
  Keyboard,
  SmartToy,
  Visibility,
  VisibilityOff
} from '@mui/icons-material';
import KeyboardSimulation from '../../components/KeyboardSimulation/KeyboardSimulation';

interface Lesson {
  id: number;
  title: string;
  description: string;
  keys: string[];
  practiceText: string;
  targetWPM: number;
  completed: boolean;
  difficulty: 'Beginner' | 'Elementary' | 'Intermediate' | 'Advanced';
  notes?: string;
}

const TypingPractice = () => {
  const { canUseFeature, getRemainingUsage, trackUsage, currentPlan } = useSubscription();
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [tabValue, setTabValue] = useState(0); // 0 = Syllabus, 1 = Key Mastery
  const [keyProgress, setKeyProgress] = useState<{[key: number]: {wpm: number, accuracy: number, unlocked: boolean}}>(() => {
    // Initialize with first letter 'A' unlocked
    return { 21: { wpm: 0, accuracy: 0, unlocked: true } };
  });
  const [showKeyboard, setShowKeyboard] = useState(true); // Show keyboard simulation by default
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Syllabus-based lesson structure
  const syllabusLessons = {
    week1: [
      {
        id: 1,
        title: '1. Computer Care & Proper Handling',
        description: 'Learn to take proper care of computer equipment and components',
        keys: ['Theory', 'Practice'],
        practiceText: 'Handle computer equipment with clean dry hands. Keep food and drinks away from computers. Dust computer screens gently with soft cloth. Store equipment in dry secure locations. Check cables and connections regularly.',
        targetWPM: 15,
        completed: false,
        difficulty: 'Beginner' as const,
        notes: `
COMPUTER CARE & PROPER HANDLING

1. PHYSICAL HANDLING:
   • Always handle equipment with clean, dry hands
   • Avoid touching screens or sensitive components
   • Lift equipment properly using both hands
   • Never carry laptops by the screen
   • Support the base when moving computers

2. ENVIRONMENTAL CARE:
   • Keep computers away from direct sunlight
   • Maintain room temperature between 18-24°C
   • Avoid dusty, humid, or smoky environments
   • Ensure proper ventilation around equipment
   • Keep away from magnetic fields and electrical interference

3. DAILY MAINTENANCE:
   • Clean keyboard and mouse regularly
   • Use appropriate cleaning materials (soft cloth, screen cleaner)
   • Check for loose connections
   • Keep air vents free from dust and obstructions
   • Shut down properly before moving equipment

4. SAFETY PRECAUTIONS:
   • No food or drinks near computer equipment
   • Keep liquids away from electrical components
   • Report any unusual sounds, smells, or behaviors
   • Use surge protectors for electrical safety
   • Maintain clear workspace to prevent accidents`
      },
      {
        id: 2,
        title: '2. Work Material Organization',
        description: 'Properly arrange and organize computer work materials',
        keys: ['Organization', 'Workspace'],
        practiceText: 'Organize desk space for efficient work flow. Place monitor at eye level to reduce strain. Keep frequently used items within easy reach. Maintain clear pathways around workstation. Store documents and supplies systematically.',
        targetWPM: 15,
        completed: false,
        difficulty: 'Beginner' as const,
        notes: `
WORK MATERIAL ORGANIZATION

1. WORKSTATION SETUP:
   • Position monitor 20-26 inches from eyes
   • Top of screen should be at or below eye level
   • Keyboard and mouse on same level
   • Chair height allows feet flat on floor
   • Document holder beside monitor to reduce neck strain

2. DESK ORGANIZATION:
   • Keep desktop clear of unnecessary items
   • Frequently used items within arm's reach
   • Telephone on non-dominant side
   • Reference materials easily accessible
   • Adequate lighting without screen glare

3. CABLE MANAGEMENT:
   • Route cables safely to prevent tripping
   • Use cable ties or clips to organize wires
   • Keep power cables away from data cables
   • Label cables for easy identification
   • Ensure cables don't create tension on ports

4. STORAGE SYSTEMS:
   • Dedicated spaces for different supplies
   • Filing system for documents and media
   • Secure storage for valuable equipment
   • Easy access to cleaning materials
   • Backup storage for important files

5. ERGONOMIC CONSIDERATIONS:
   • Adjustable chair with proper back support
   • Footrest if needed
   • Adequate workspace depth and width
   • Good air circulation
   • Proper lighting to reduce eye strain`
      },
      {
        id: 3,
        title: '3. System Power Management',
        description: 'Correct procedures for powering up and shutting down computers',
        keys: ['Power', 'Startup', 'Shutdown'],
        practiceText: 'Power on monitor first then system unit. Wait for complete startup before opening programs. Save all work before shutting down. Use proper shutdown procedure from operating system. Wait for complete shutdown before turning off power.',
        targetWPM: 15,
        completed: false,
        difficulty: 'Beginner' as const,
        notes: `
SYSTEM POWER MANAGEMENT

1. PROPER STARTUP SEQUENCE:
   • Check all cable connections are secure
   • Turn on peripherals first (monitor, printer, speakers)
   • Press power button on system unit
   • Wait for POST (Power-On Self-Test) to complete
   • Allow operating system to load completely
   • Enter password if required
   • Wait for desktop to fully load before using

2. SHUTDOWN PROCEDURE:
   • Save all open documents and close programs
   • Click Start menu > Shutdown/Power Off
   • Select "Shut down" option
   • Wait for "Safe to turn off" message
   • Turn off monitor and peripherals
   • Turn off power strips or UPS if used

3. RESTART PROCEDURES:
   • Use Restart option for system updates
   • Allow complete shutdown before restart
   • Don't interrupt restart process
   • Wait for full system reload

4. POWER PROBLEMS PREVENTION:
   • Use UPS (Uninterruptible Power Supply) for protection
   • Avoid power button shutdown except in emergencies
   • Don't turn off during updates or file operations
   • Report frequent power issues to IT support

5. ENERGY MANAGEMENT:
   • Set appropriate sleep/hibernate modes
   • Turn off monitor when away for extended periods
   • Use power management settings effectively
   • Understand standby vs. full shutdown differences`
      },
      {
        id: 4,
        title: '4. Hardware & Software Usage',
        description: 'Understanding and proper use of computer hardware and software components',
        keys: ['Hardware', 'Software', 'Components'],
        practiceText: 'Identify system unit components including processor memory and storage. Understand input devices like keyboard mouse and scanner. Learn output devices such as monitor printer and speakers. Distinguish between system software and application programs.',
        targetWPM: 18,
        completed: false,
        difficulty: 'Beginner' as const,
        notes: `
HARDWARE & SOFTWARE USAGE

1. HARDWARE COMPONENTS:
   INPUT DEVICES:
   • Keyboard - for text and command input
   • Mouse - for pointing and selection
   • Microphone - for audio input
   • Scanner - for document digitization
   • Camera - for image/video capture

   OUTPUT DEVICES:
   • Monitor - visual display
   • Printer - hard copy output
   • Speakers - audio output
   • Headphones - private audio

   PROCESSING UNIT:
   • CPU - central processing unit
   • RAM - random access memory
   • Storage - hard drives, SSDs
   • Motherboard - connects all components

2. SOFTWARE CATEGORIES:
   SYSTEM SOFTWARE:
   • Operating System (Windows, macOS, Linux)
   • Device drivers
   • Utility programs
   • Firmware

   APPLICATION SOFTWARE:
   • Word processors
   • Spreadsheets
   • Databases
   • Web browsers
   • Media players

3. PROPER USAGE GUIDELINES:
   • Install software only from trusted sources
   • Keep software updated with latest patches
   • Use appropriate software for specific tasks
   • Understand licensing requirements
   • Regular system maintenance and cleanup

4. HARDWARE CARE:
   • Handle removable media carefully
   • Insert USB devices properly
   • Clean optical drives periodically
   • Monitor system temperature
   • Check for firmware updates`
      },
      {
        id: 5,
        title: '5. Business Document Production',
        description: 'Using computers to create professional business documents',
        keys: ['Documents', 'Business', 'Formatting'],
        practiceText: 'Create professional letters with proper business format. Design memoranda for internal communication. Prepare invoices and reports using templates. Apply consistent formatting and corporate branding. Save documents in appropriate formats for sharing and archiving.',
        targetWPM: 20,
        completed: false,
        difficulty: 'Beginner' as const,
        notes: `
BUSINESS DOCUMENT PRODUCTION

1. DOCUMENT TYPES:
   CORRESPONDENCE:
   • Business letters - external communication
   • Memoranda - internal communication
   • Emails - electronic correspondence
   • Fax documents - transmitted communications

   BUSINESS FORMS:
   • Invoices - billing documents
   • Purchase orders - procurement documents
   • Reports - analytical documents
   • Proposals - project documents

2. FORMATTING STANDARDS:
   • Consistent fonts and sizes
   • Proper margins and spacing
   • Professional letterhead usage
   • Correct date and address formats
   • Appropriate salutations and closings

3. SOFTWARE APPLICATIONS:
   WORD PROCESSING:
   • Microsoft Word
   • Google Docs
   • LibreOffice Writer
   • Template usage

   SPREADSHEETS:
   • Microsoft Excel
   • Google Sheets
   • Data organization and calculations

4. DOCUMENT MANAGEMENT:
   • File naming conventions
   • Version control
   • Backup procedures
   • Security considerations
   • Sharing protocols

5. QUALITY STANDARDS:
   • Spell check and grammar review
   • Proofreading procedures
   • Corporate style compliance
   • Legal and ethical considerations
   • Professional presentation`
      },
      {
        id: 6,
        title: '6. Printer Setup & Operation',
        description: 'Loading paper, ribbons, and cartridges in various printer types',
        keys: ['Printer', 'Paper', 'Cartridge'],
        practiceText: 'Load paper into printer tray with correct orientation. Install ink cartridges following manufacturer instructions. Replace toner cartridges safely avoiding spills. Set paper size and type in printer properties. Perform printer alignment and test printing procedures.',
        targetWPM: 18,
        completed: false,
        difficulty: 'Beginner' as const,
        notes: `
PRINTER SETUP & OPERATION

1. PRINTER TYPES:
   INKJET PRINTERS:
   • Use liquid ink cartridges
   • Good for color printing
   • Suitable for documents and photos
   • Regular maintenance required

   LASER PRINTERS:
   • Use toner cartridges
   • Fast printing speeds
   • High-quality text output
   • Lower per-page costs

2. PAPER LOADING:
   • Check paper tray capacity
   • Adjust paper guides to paper size
   • Load paper with print side down (usually)
   • Fan paper before loading to prevent jams
   • Don't overfill tray
   • Set correct paper size in printer settings

3. CARTRIDGE INSTALLATION:
   INK CARTRIDGES:
   • Turn off printer before installation
   • Remove protective tape from new cartridge
   • Insert until clicks into place
   • Run alignment procedure
   • Print test page

   TONER CARTRIDGES:
   • Wear gloves to avoid toner contact
   • Remove all packing materials
   • Shake gently as instructed
   • Install firmly and securely
   • Reset chip if required

4. MAINTENANCE PROCEDURES:
   • Regular cleaning of print heads
   • Paper path cleaning
   • Proper storage of spare cartridges
   • Monitor ink/toner levels
   • Replace when quality deteriorates

5. TROUBLESHOOTING:
   • Paper jams - remove carefully
   • Poor print quality - clean/align heads
   • Streaked output - replace cartridge
   • No printing - check connections and drivers`
      },
      {
        id: 7,
        title: '7. Storage & Media Management',
        description: 'Proper storage conditions for computers and digital media',
        keys: ['Storage', 'Media', 'Conditions'],
        practiceText: 'Store computers in dry dust-free environments. Keep storage media away from magnetic fields and extreme temperatures. Organize files systematically on hard drives and external storage. Create regular backups of important data. Label and catalog removable media properly.',
        targetWPM: 18,
        completed: false,
        difficulty: 'Beginner' as const,
        notes: `
STORAGE & MEDIA MANAGEMENT

1. PHYSICAL STORAGE CONDITIONS:
   COMPUTER EQUIPMENT:
   • Temperature: 10-35°C when off, 16-35°C when operating
   • Humidity: 20-80% relative humidity
   • Clean, dust-free environment
   • Away from direct sunlight
   • Stable, vibration-free surfaces
   • Adequate ventilation space

2. DIGITAL MEDIA STORAGE:
   USB FLASH DRIVES:
   • Store in protective cases
   • Avoid extreme temperatures
   • Keep away from magnetic fields
   • Regular virus scanning
   • Safe ejection procedures

   EXTERNAL HARD DRIVES:
   • Handle carefully - sensitive to shock
   • Store upright when not in use
   • Regular health checks
   • Proper backup procedures

   OPTICAL MEDIA (CDs/DVDs):
   • Store in protective cases
   • Handle by edges only
   • Keep away from heat and light
   • Clean with radial motions (not circular)

3. FILE ORGANIZATION:
   • Logical folder structures
   • Descriptive file names
   • Version control systems
   • Regular cleanup of obsolete files
   • Consistent naming conventions

4. BACKUP STRATEGIES:
   • 3-2-1 Rule: 3 copies, 2 different media, 1 offsite
   • Regular scheduled backups
   • Test restore procedures
   • Document backup procedures
   • Cloud storage considerations

5. SECURITY MEASURES:
   • Password protection for sensitive data
   • Encryption for confidential information
   • Physical security of storage devices
   • Access control and permissions
   • Secure disposal of old media`
      },
      {
        id: 8,
        title: '8. Fault Finding & Reporting',
        description: 'Identifying problems and reporting system breakdowns effectively',
        keys: ['Troubleshooting', 'Reporting', 'Problems'],
        practiceText: 'Identify common computer problems and symptoms. Document error messages and system behaviors accurately. Follow systematic troubleshooting procedures before seeking help. Report issues clearly with relevant details. Maintain logs of recurring problems and solutions.',
        targetWPM: 20,
        completed: false,
        difficulty: 'Elementary' as const,
        notes: `
FAULT FINDING & REPORTING

1. COMMON PROBLEMS IDENTIFICATION:
   HARDWARE ISSUES:
   • No power - check connections and power supply
   • No display - verify monitor and cable connections
   • Unusual noises - may indicate failing components
   • Overheating - check fans and ventilation
   • Peripheral not working - check drivers and connections

   SOFTWARE PROBLEMS:
   • Program crashes - note error messages
   • Slow performance - check available memory and storage
   • File corruption - attempt recovery procedures
   • Network connectivity issues - check settings and cables

2. SYSTEMATIC TROUBLESHOOTING:
   STEP 1: Define the Problem
   • What exactly is not working?
   • When did the problem start?
   • What changed recently?

   STEP 2: Gather Information
   • Error messages (exact wording)
   • System configuration
   • Recent changes or updates

   STEP 3: Basic Checks
   • Restart the system
   • Check all connections
   • Verify power sources
   • Test with different users

   STEP 4: Isolate the Cause
   • Test individual components
   • Use different software/hardware
   • Check system logs

3. EFFECTIVE PROBLEM REPORTING:
   ESSENTIAL INFORMATION:
   • Exact error messages
   • Steps to reproduce problem
   • When problem occurs
   • Impact on work/productivity
   • Previous attempts to resolve

   REPORTING FORMAT:
   • Problem description
   • System information
   • Error messages/screenshots
   • Steps taken
   • Urgency level

4. DOCUMENTATION PROCEDURES:
   • Maintain problem log
   • Record solutions that work
   • Note recurring issues
   • Track response times
   • Follow up on resolutions

5. WHEN TO SEEK HELP:
   • Safety concerns (smoke, burning smell)
   • Data loss risk
   • Beyond basic troubleshooting skills
   • Hardware replacement needed
   • Network/server issues`
      }
    ],
    week2: [
      {
        id: 9,
        title: 'Home Row Mastery - ASDF JKL;',
        description: 'Perfect finger placement and muscle memory for home row keys',
        keys: ['A', 'S', 'D', 'F', 'J', 'K', 'L', ';'],
        practiceText: 'asdf jkl; asdf jkl; sad lad ask flask fall; dad all fad lass; ask sad fall flask lads lass; fall sad ask lads flask;',
        targetWPM: 15,
        completed: false,
        difficulty: 'Beginner' as const
      },
      {
        id: 10,
        title: 'Top Row Keys - QWER UIOP',
        description: 'Learn proper reach technique for top row keys',
        keys: ['Q', 'W', 'E', 'R', 'U', 'I', 'O', 'P'],
        practiceText: 'qwer uiop qwer uiop; were pier rope wire pore pour ware wore pure rope; power proper quote upper;',
        targetWPM: 18,
        completed: false,
        difficulty: 'Beginner' as const
      },
      {
        id: 11,
        title: 'Bottom Row Keys - ZXCV BNM',
        description: 'Master bottom row keys with proper finger reaches',
        keys: ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
        practiceText: 'zxcv bnm zxcv bnm; zinc cave name maze; box van men zone; calm zinc move name cave bone;',
        targetWPM: 18,
        completed: false,
        difficulty: 'Beginner' as const
      },
      {
        id: 12,
        title: 'Full Alphabet Integration',
        description: 'Combine all letter keys with proper typing technique',
        keys: ['All letters'],
        practiceText: 'the quick brown fox jumps over the lazy dog; alphabet letters form words and sentences for communication;',
        targetWPM: 20,
        completed: false,
        difficulty: 'Elementary' as const
      }
    ],
    week3: [
      {
        id: 13,
        title: 'Number Row Training 1-5',
        description: 'Master numbers 1 through 5 with proper finger reaches',
        keys: ['1', '2', '3', '4', '5'],
        practiceText: '12345 12345 12345; file 123 documents; order 45 items; reference number 1234; total 12 plus 345 equals 357;',
        targetWPM: 20,
        completed: false,
        difficulty: 'Elementary' as const
      },
      {
        id: 14,
        title: 'Number Row Training 6-0',
        description: 'Complete number row with digits 6 through 0',
        keys: ['6', '7', '8', '9', '0'],
        practiceText: '67890 67890 67890; invoice 6789; phone number 067 890 1234; calculate 678 plus 90 equals 768;',
        targetWPM: 20,
        completed: false,
        difficulty: 'Elementary' as const
      },
      {
        id: 15,
        title: 'Basic Business Punctuation',
        description: 'Master essential punctuation for business documents',
        keys: ['.', ',', '?', '!', ';', ':', '"', "'"],
        practiceText: 'Dear Sir, How are you? We are pleased to inform you: the order is ready! Please collect it; time is 2:30 p.m.',
        targetWPM: 22,
        completed: false,
        difficulty: 'Elementary' as const
      },
      {
        id: 16,
        title: 'Document Formatting Basics',
        description: 'Learn spacing, alignment, and basic document structure',
        keys: ['Formatting', 'Spacing', 'Layout'],
        practiceText: 'Proper document formatting includes correct spacing between paragraphs. Use consistent margins and alignment. Business letters require professional presentation.',
        targetWPM: 22,
        completed: false,
        difficulty: 'Elementary' as const
      }
    ],
    week4: [
      {
        id: 17,
        title: 'Business Letter Formatting',
        description: 'Master professional business letter layout and structure',
        keys: ['Letters', 'Business Format'],
        practiceText: 'Dear Sir or Madam, We are pleased to acknowledge receipt of your enquiry dated 15th October 2025. We shall be happy to provide the information you requested. Yours faithfully, Secretary',
        targetWPM: 25,
        completed: false,
        difficulty: 'Intermediate' as const
      },
      {
        id: 18,
        title: 'Memorandum Production',
        description: 'Create internal business memoranda with proper formatting',
        keys: ['Memoranda', 'Internal Communication'],
        practiceText: 'MEMORANDUM TO: All Department Heads FROM: General Manager DATE: 22nd October 2025 SUBJECT: Monthly Staff Meeting The monthly staff meeting will be held on Friday 25th October at 2:00 PM in Conference Room A.',
        targetWPM: 25,
        completed: false,
        difficulty: 'Intermediate' as const
      },
      {
        id: 19,
        title: 'Tabulated Documents',
        description: 'Practice creating tables and forms with proper alignment',
        keys: ['Tables', 'Forms', 'Alignment'],
        practiceText: 'Invoice Number: 001234     Date: 22/10/2025     Customer: ABC Limited     Item: Office Supplies     Quantity: 50     Unit Price: R15.00     Total: R750.00',
        targetWPM: 28,
        completed: false,
        difficulty: 'Intermediate' as const
      },
      {
        id: 20,
        title: 'Speed Achievement Test',
        description: 'Achieve consistent 35 WPM with 95% accuracy for Part II qualification',
        keys: ['Speed Test', 'Accuracy'],
        practiceText: 'Professional secretarial work demands high levels of accuracy and speed in document production. The National Certificate in Secretarial Studies Part II requires students to demonstrate typing speeds of 35 words per minute while maintaining accuracy levels above 95 percent. Regular practice and proper technique development are essential for achieving these professional standards in the modern business environment.',
        targetWPM: 35,
        completed: false,
        difficulty: 'Advanced' as const
      }
    ]
  };

  // Key-by-Key Mastery: detailed per-key lessons (letters A-Z, numbers 0-9 and punctuation group)
  const keyLessons: Lesson[] = [
    // Letters A-Z (each lesson explains finger placement and provides drills)
    {
      id: 21,
      title: 'Key A - Left Pinky',
      description: 'Left pinky reaches for A (home row). Emphasize gentle press and return to home position.',
      keys: ['A'],
      practiceText: 'a a a a a  a as a da a a  ada  aads a asada',
      targetWPM: 15,
      completed: false,
      difficulty: 'Beginner',
      notes: `Finger: Left little finger\nPosition: Rest on F (left ring finger on D, left middle on S, left little on A)\nTechnique: Stretch the little finger slightly down and left to strike A then return to home position. Keep wrist relaxed.\nDrill: Strike single 'a' repeatedly, then short pairs and short words containing a.`
    },
    {
      id: 22,
      title: 'Key B - Left Index (reach)',
      description: 'B is normally typed by the left index finger (reach from home row).',
      keys: ['B'],
      practiceText: 'b b b b  bob bab babe bobb  cab babe cab back',
      targetWPM: 16,
      completed: false,
      difficulty: 'Beginner',
      notes: `Finger: Left index finger\nPosition: Home row at F and J (index on F and J).\nTechnique: Move index finger down and left to press B then return to home. Practice slow controlled strokes.`
    },
    {
      id: 23,
      title: 'Key C - Left Middle (reach)',
      description: 'C is typed by left middle finger with a small downward movement.',
      keys: ['C'],
      practiceText: 'c c cc ccc  can cane cancel  cacao  civic  ocean',
      targetWPM: 16,
      completed: false,
      difficulty: 'Beginner',
      notes: `Finger: Left middle finger\nTechnique: Pivot slightly from S to reach C; keep motion economical and return to S (home).\nDrill: single-letter strikes then short syllables.`
    },
    {
      id: 24,
      title: 'Key D - Left Middle (home)',
      description: 'D is a home-row key for the left middle finger; keep finger anchored and use gentle press.',
      keys: ['D'],
      practiceText: 'd d d dd dad add dead deed dad add',
      targetWPM: 18,
      completed: false,
      difficulty: 'Beginner',
      notes: `Finger: Left middle\nPosition: Home row (ASDF)\nTechnique: Keep finger curved, press and return; practice common letter pairs with A and S.`
    },
    {
      id: 25,
      title: 'Key E - Left Middle/Index (top row reach)',
      description: 'E is typed with the left middle (or index as taught) reaching up to the top row; practice reach and return.',
      keys: ['E'],
      practiceText: 'e e ee eel  pen peel deer  ever never  enter deep',
      targetWPM: 18,
      completed: false,
      difficulty: 'Beginner',
      notes: `Finger: Left middle or index depending on system\nTechnique: Reach up to E, press lightly, return to home. Practice words combining E with home-row letters.`
    },
    {
      id: 26,
      title: 'Key F - Left Index (home, anchor)',
      description: 'F is the primary home key for the left index finger; it is the anchor point for left-hand touch typing.',
      keys: ['F'],
      practiceText: 'f f ff  far fat safe self  faint fife  offer frame',
      targetWPM: 18,
      completed: false,
      difficulty: 'Beginner',
      notes: `Finger: Left index - home position\nTechnique: Keep finger on F during normal typing as anchor; use for quick strikes to nearby keys.`
    },
    {
      id: 27,
      title: 'Key G - Left Index (home reach)',
      description: 'G is typed with the left index finger; practice small inward tend to press G then return to F.',
      keys: ['G'],
      practiceText: 'g g gg gang gag gauge  green ago  going',
      targetWPM: 18,
      completed: false,
      difficulty: 'Beginner',
      notes: `Finger: Left index\nTechnique: Quick, controlled press then back to F. Practice in word contexts like "going" and "gag".`
    },
    {
      id: 28,
      title: 'Key H - Right Index (home)',
      description: 'H is the home key for the right index finger; it is the anchor for the right hand.',
      keys: ['H'],
      practiceText: 'h h hh he the that  home that  here high',
      targetWPM: 18,
      completed: false,
      difficulty: 'Beginner',
      notes: `Finger: Right index - home row (J K L ;)\nTechnique: Keep curved finger and return to J or H home as appropriate.`
    },
    {
      id: 29,
      title: 'Key I - Right Middle (top row reach)',
      description: 'I is typed with the right middle finger reaching up to the top row.',
      keys: ['I'],
      practiceText: 'i i ii  ill in ink  initiate  divine  it is',
      targetWPM: 18,
      completed: false,
      difficulty: 'Beginner',
      notes: `Finger: Right middle\nTechnique: Short upward reach then return to home position J/K.`
    },
    {
      id: 30,
      title: 'Key J - Right Index (home, anchor)',
      description: 'J is the anchor for the right hand and has a tactile bump for placement.',
      keys: ['J'],
      practiceText: 'j j jj  just jab jam  major job  jump judge',
      targetWPM: 18,
      completed: false,
      difficulty: 'Beginner',
      notes: `Finger: Right index\nTechnique: Use bump on J for orientation; keep hand relaxed and return after each press.`
    },
    {
      id: 31,
      title: 'Key K - Right Middle (home)',
      description: 'K is typed with the right middle finger; maintain curved finger and return quickly.',
      keys: ['K'],
      practiceText: 'k k kk  kick back kayak  make lake  take',
      targetWPM: 18,
      completed: false,
      difficulty: 'Beginner',
      notes: `Finger: Right middle\nTechnique: Controlled press and return to J home.`
    },
    {
      id: 32,
      title: 'Key L - Right Ring (home)',
      description: 'L uses the right ring finger on the home row; practice consistent curvature.',
      keys: ['L'],
      practiceText: 'l l ll  lad ladle lull  fall loll  call',
      targetWPM: 18,
      completed: false,
      difficulty: 'Beginner',
      notes: `Finger: Right ring\nTechnique: Short motion to press L then back to home. Pair with K and ; drills.`
    },
    {
      id: 33,
      title: 'Key M - Right Index (reach)',
      description: 'M is reached by the right index finger (or right middle depending on technique) from home row; practice downward reach.',
      keys: ['M'],
      practiceText: 'm m mm mom map am aim  mammal  commerce  am me',
      targetWPM: 16,
      completed: false,
      difficulty: 'Beginner',
      notes: `Finger: Right index (common)\nTechnique: Reach down from J, return to home; practice in pairs and short words.`
    },
    {
      id: 34,
      title: 'Key N - Right Index (bottom row)',
      description: 'N is typically typed with the right index finger; use a controlled reach and return.',
      keys: ['N'],
      practiceText: 'n n nn  nan noon  plan name  name noon',
      targetWPM: 16,
      completed: false,
      difficulty: 'Beginner',
      notes: `Finger: Right index\nTechnique: Small downward movement then back to J home; keep wrist stable.`
    },
    {
      id: 35,
      title: 'Key O - Right Ring/Middle (top row)',
      description: 'O is typed with the right ring or middle finger reaching to the top row.',
      keys: ['O'],
      practiceText: 'o o oo  on only onto  potato  move  go to',
      targetWPM: 18,
      completed: false,
      difficulty: 'Beginner',
      notes: `Finger: Right ring/middle\nTechnique: Upward reach, quick return; practice with common vowel combinations.`
    },
    {
      id: 36,
      title: 'Key P - Right Pinky (top row)',
      description: 'P is typed by the right little finger on the top row; practise stretch and return.',
      keys: ['P'],
      practiceText: 'p p pp pop pep pap peep  proper paper  place',
      targetWPM: 16,
      completed: false,
      difficulty: 'Beginner',
      notes: `Finger: Right little finger\nTechnique: Stretch upward to P then return; use short drills to build accuracy.`
    },
    {
      id: 37,
      title: 'Key Q - Left Pinky (top row)',
      description: 'Q is typed with the left little finger; practice small reach up and quick return.',
      keys: ['Q'],
      practiceText: 'q q qq qu quack  quick quote  queen  aqua',
      targetWPM: 15,
      completed: false,
      difficulty: 'Beginner',
      notes: `Finger: Left little finger\nTechnique: Reach to top left and return; practice with common "qu" combinations.`
    },
    {
      id: 38,
      title: 'Key R - Left Index (top row reach)',
      description: 'R uses the left index finger to reach the top row; practice controlled motion.',
      keys: ['R'],
      practiceText: 'r r rr rear rare are  rather roar  repair',
      targetWPM: 18,
      completed: false,
      difficulty: 'Beginner',
      notes: `Finger: Left index\nTechnique: Reach up to R and return to F home; drill with common letter pairs.`
    },
    {
      id: 39,
      title: 'Key S - Left Ring (home)',
      description: 'S is a home key for the left ring finger; practice steady strokes.',
      keys: ['S'],
      practiceText: 's s ss  sat sat  sass seas  pass  mass',
      targetWPM: 18,
      completed: false,
      difficulty: 'Beginner',
      notes: `Finger: Left ring\nTechnique: Keep finger curved on S home; combine with A and D drills.`
    },
    {
      id: 40,
      title: 'Key T - Left Index (top row)',
      description: 'T is typed with the left index finger reaching to the top row.',
      keys: ['T'],
      practiceText: 't t tt to tea  tone test  total time  treat',
      targetWPM: 18,
      completed: false,
      difficulty: 'Beginner',
      notes: `Finger: Left index\nTechnique: Quick upward reach then back; combine with R and Y practice.`
    },
    {
      id: 41,
      title: 'Key U - Right Index (top row reach)',
      description: 'U is typed by the right index finger reaching to the top row.',
      keys: ['U'],
      practiceText: 'u u uu up us use  unit unity  duty  un used',
      targetWPM: 18,
      completed: false,
      difficulty: 'Beginner',
      notes: `Finger: Right index\nTechnique: Short reach up to U and back; practice vowel combinations.`
    },
    {
      id: 42,
      title: 'Key V - Left Index (bottom row reach)',
      description: 'V is typed with the left index finger; practice a short downward reach.',
      keys: ['V'],
      practiceText: 'v v vv van vat save valve  vote  vivid',
      targetWPM: 16,
      completed: false,
      difficulty: 'Beginner',
      notes: `Finger: Left index\nTechnique: Reach down to V then back; start slowly to avoid mis-strikes.`
    },
    {
      id: 43,
      title: 'Key W - Left Ring/Index (top row)',
      description: 'W is typed with the left ring or index depending on technique; practice top-row reach.',
      keys: ['W'],
      practiceText: 'w w ww war was warm  wear  water  wide',
      targetWPM: 18,
      completed: false,
      difficulty: 'Beginner',
      notes: `Finger: Left ring/index\nTechnique: Upward reach and return; practice common words.`
    },
    {
      id: 44,
      title: 'Key X - Left Ring (bottom row)',
      description: 'X is typed with the left ring finger; use a small downward reach.',
      keys: ['X'],
      practiceText: 'x x xx  ax ox axl  exam  xray  extra',
      targetWPM: 16,
      completed: false,
      difficulty: 'Beginner',
      notes: `Finger: Left ring\nTechnique: Controlled movement from S down to X then back.`
    },
    {
      id: 45,
      title: 'Key Y - Right Index (top row)',
      description: 'Y is typed with the right index finger reaching to the top row.',
      keys: ['Y'],
      practiceText: 'y y yy you yoyo yale  year  yes  yellow',
      targetWPM: 18,
      completed: false,
      difficulty: 'Beginner',
      notes: `Finger: Right index\nTechnique: Upward reach and return; connect with T and U in drills.`
    },
    {
      id: 46,
      title: 'Key Z - Left Little (bottom row)',
      description: 'Z is usually typed with the left little finger; practice small reach.',
      keys: ['Z'],
      practiceText: 'z z zz zoo zap zest  zone  zero  zinc',
      targetWPM: 15,
      completed: false,
      difficulty: 'Beginner',
      notes: `Finger: Left little\nTechnique: Small downward-left reach; return to A home quickly.`
    },
    // Number row - grouped into two lessons for 1-5 and 6-0
    {
      id: 47,
      title: 'Numbers 1-5 (Top Row)',
      description: 'Type numbers 1 to 5 using top-row digits; practice with numeric sequences and short numeric phrases.',
      keys: ['1','2','3','4','5'],
      practiceText: '1 2 3 4 5  12345 11122 23445 51234 120 345 125',
      targetWPM: 20,
      completed: false,
      difficulty: 'Elementary',
      notes: `Technique: Use top-row digits with appropriate finger (1-left pinky, 2-left ring/index depending on layout). Practice sequences and common numeric groupings.`
    },
    {
      id: 48,
      title: 'Numbers 6-0 (Top Row)',
      description: 'Type numbers 6 to 0 using top-row digits; build confidence with telephone and invoice numbers.',
      keys: ['6','7','8','9','0'],
      practiceText: '6 7 8 9 0  67890 90908 670 890 067890 600 123456',
      targetWPM: 20,
      completed: false,
      difficulty: 'Elementary',
      notes: `Technique: Use right-hand digits appropriately; practice phone and invoice style numbers to build real-world speed.`
    },
    {
      id: 49,
      title: 'Common Punctuation Group',
      description: `Practice common punctuation marks used in business documents: . , ; : ? ! " ' and parentheses.`,
      keys: [".", ",", ";", ":", "?", "!", '"', "'", "(", ")", "-", "/", "@"],
      practiceText: 'Dear Sir, We are pleased to: confirm your order (Ref: #123). Please respond by 15/11/2025. Thank you!',
      targetWPM: 22,
      completed: false,
      difficulty: 'Elementary',
      notes: `Technique: Use correct finger for each punctuation (usually right hand for punctuation near Enter). Practice inserting punctuation into sentences and dates.`
    }
  ];

  const allLessons = [
    ...syllabusLessons.week1,
    ...keyLessons,
    ...syllabusLessons.week2,
    ...syllabusLessons.week3,
    ...syllabusLessons.week4
  ];

  useEffect(() => {
    // Set first lesson as default
    if (!selectedLesson && allLessons.length > 0) {
      setSelectedLesson(allLessons[0]);
    }
  }, []);

  useEffect(() => {
    let interval: number;
    if (isTyping && startTime && selectedLesson) {
      interval = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000;
        setTimeElapsed(elapsed);
        
        // Calculate WPM (words per minute)
        const wordsTyped = userInput.trim().split(' ').length;
        const minutes = elapsed / 60;
        const currentWpm = minutes > 0 ? Math.round(wordsTyped / minutes) : 0;
        setWpm(currentWpm);
      }, 100);
    }
    
    return () => clearInterval(interval);
  }, [isTyping, startTime, userInput, selectedLesson]);

  useEffect(() => {
    // Calculate accuracy
    if (userInput.length > 0 && selectedLesson) {
      const textToCompare = selectedLesson.practiceText.substring(0, userInput.length);
      let correctChars = 0;
      
      for (let i = 0; i < userInput.length; i++) {
        if (userInput[i] === textToCompare[i]) {
          correctChars++;
        }
      }
      
      const accuracyPercent = Math.round((correctChars / userInput.length) * 100);
      setAccuracy(accuracyPercent);
    } else {
      setAccuracy(100);
    }
  }, [userInput, selectedLesson]);

  const startTyping = () => {
    // Check if user can start a new lesson
    if (!canUseFeature('dailyLessons')) {
      alert(`Daily lesson limit reached! You have completed ${currentPlan.limitations.dailyLessons} lessons today. Upgrade to continue learning.`);
      return;
    }

    setIsTyping(true);
    setStartTime(Date.now());
    setUserInput('');
    setTimeElapsed(0);
    setWpm(0);
    setAccuracy(100);
    inputRef.current?.focus();
    
    // Track lesson usage
    trackUsage('lessonsCompleted');
  };

  const stopTyping = () => {
    setIsTyping(false);
    setStartTime(null);
    
    // Update key progress if this is a key mastery lesson and practice is complete
    if (selectedLesson && selectedLesson.id >= 21 && selectedLesson.id <= 49) {
      const isComplete = userInput.length >= selectedLesson.practiceText.length;
      if (isComplete) {
        updateKeyProgress(selectedLesson.id, wpm, accuracy);
        
        // Show completion message
        if (accuracy >= 90) {
          alert(`🎉 Excellent! You've mastered the "${selectedLesson.title}" with ${accuracy.toFixed(1)}% accuracy. Next lesson unlocked!`);
        } else {
          alert(`Good effort! You completed "${selectedLesson.title}" with ${accuracy.toFixed(1)}% accuracy. Try again to achieve 90% and unlock the next lesson.`);
        }
      }
    }
  };

  const resetPractice = () => {
    setIsTyping(false);
    setStartTime(null);
    setUserInput('');
    setTimeElapsed(0);
    setWpm(0);
    setAccuracy(100);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isTyping || !selectedLesson) return;
    
    const value = event.target.value;
    setUserInput(value);
    
    // Auto-stop when text is completed
    if (value.length >= selectedLesson.practiceText.length) {
      stopTyping();
    }
  };

  const getCharacterColor = (index: number, char: string) => {
    if (index >= userInput.length) return '#424242'; // Dark gray for untyped text
    
    const userChar = userInput[index];
    if (userChar === char) {
      return '#2e7d32'; // Darker green for correct (better contrast)
    } else {
      return '#d32f2f'; // Darker red for incorrect (better contrast)
    }
  };

  const progress = selectedLesson ? (userInput.length / selectedLesson.practiceText.length) * 100 : 0;

  const selectLesson = (lesson: Lesson) => {
    // Check if key mastery lesson is unlocked
    if (lesson.id >= 21 && lesson.id <= 49) {
      const progress = keyProgress[lesson.id];
      if (!progress?.unlocked) {
        alert(`This lesson is locked! Complete the previous lesson with 90% accuracy to unlock.`);
        return;
      }
    }
    setSelectedLesson(lesson);
    resetPractice();
  };

  const updateKeyProgress = (lessonId: number, wpm: number, accuracy: number) => {
    const newProgress = { wpm, accuracy, unlocked: true };
    
    setKeyProgress(prev => {
      const updated = { ...prev, [lessonId]: newProgress };
      
      // Unlock next lesson if accuracy >= 90%
      if (accuracy >= 90 && lessonId < 49) {
        const nextLessonId = lessonId + 1;
        if (!prev[nextLessonId]?.unlocked) {
          updated[nextLessonId] = { wpm: 0, accuracy: 0, unlocked: true };
        }
      }
      
      return updated;
    });
  };

  // Function to parse and structure lesson notes
  const parseNotes = (notes: string) => {
    const lines = notes.split('\n').filter(line => line.trim() !== '');
    const sections: { title: string; content: string[] }[] = [];
    let currentSection: { title: string; content: string[] } | null = null;

    lines.forEach(line => {
      const trimmedLine = line.trim();
      
      // Check if line is a main heading (ALL CAPS with no bullet points)
      if (trimmedLine.match(/^[A-Z\s&':]+$/) && trimmedLine.length > 3 && !trimmedLine.startsWith('•')) {
        if (currentSection) sections.push(currentSection);
        currentSection = { title: trimmedLine, content: [] };
      }
      // Check if line is a numbered section (1. 2. etc.)
      else if (trimmedLine.match(/^\d+\.\s+[A-Z]/)) {
        if (currentSection) sections.push(currentSection);
        currentSection = { title: trimmedLine, content: [] };
      }
      // Check if line starts with • (bullet point)
      else if (trimmedLine.startsWith('•')) {
        if (currentSection) {
          currentSection.content.push(trimmedLine);
        }
      }
      // Regular content line
      else if (trimmedLine.length > 0) {
        if (currentSection) {
          currentSection.content.push(trimmedLine);
        } else {
          // If no section yet, create a general section
          currentSection = { title: 'Overview', content: [trimmedLine] };
        }
      }
    });

    if (currentSection) sections.push(currentSection);
    return sections;
  };

  const renderStructuredNotes = (notes: string) => {
    const sections = parseNotes(notes);
    
    return (
      <Box>
        {sections.map((section, index) => (
          <Box key={index} sx={{ mb: 3 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontSize: { xs: '1rem', md: '1.1rem' },
                fontWeight: 'bold',
                color: 'primary.main',
                mb: 1,
                borderBottom: '2px solid',
                borderColor: 'primary.light',
                pb: 0.5
              }}
            >
              {section.title}
            </Typography>
            <Box sx={{ pl: 1 }}>
              {section.content.map((item, itemIndex) => (
                <Typography 
                  key={itemIndex}
                  variant="body2"
                  sx={{ 
                    mb: 0.5,
                    fontSize: { xs: '0.85rem', md: '0.9rem' },
                    lineHeight: 1.6,
                    color: item.startsWith('•') ? 'text.primary' : 'text.secondary'
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    );
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setSelectedLesson(null); // Clear selection when switching tabs
    resetPractice();
  };

  const renderKeyMasteryLessons = () => {
    // Group letters A-Z, numbers, and punctuation
    const letterLessons = keyLessons.filter(lesson => lesson.id >= 21 && lesson.id <= 46);
    const numberLessons = keyLessons.filter(lesson => lesson.id >= 47 && lesson.id <= 48);
    const punctuationLessons = keyLessons.filter(lesson => lesson.id === 49);

    return (
      <>
        {/* Letters A-Z */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6">🔤 Letters A-Z (Individual Key Mastery)</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Master each letter key with proper finger placement and muscle memory drills
            </Typography>
            <Grid container spacing={1}>
              {letterLessons.map((lesson) => {
                const progress = keyProgress[lesson.id];
                const isUnlocked = progress?.unlocked || false;
                const isCompleted = progress?.accuracy >= 90;
                
                return (
                  <Grid item xs={6} sm={4} md={3} key={lesson.id}>
                    <Paper
                      elevation={selectedLesson?.id === lesson.id ? 3 : 1}
                      onClick={() => isUnlocked ? selectLesson(lesson) : null}
                      sx={{
                        p: 1.5,
                        cursor: isUnlocked ? 'pointer' : 'not-allowed',
                        bgcolor: selectedLesson?.id === lesson.id ? 'primary.light' : 
                                isCompleted ? 'success.light' :
                                isUnlocked ? 'background.paper' : 'grey.200',
                        color: selectedLesson?.id === lesson.id ? 'primary.contrastText' : 
                               isCompleted ? 'success.contrastText' :
                               isUnlocked ? 'text.primary' : 'text.disabled',
                        opacity: isUnlocked ? 1 : 0.6,
                        '&:hover': {
                          bgcolor: isUnlocked ? (selectedLesson?.id === lesson.id ? 'primary.light' : 'grey.100') : 'grey.200'
                        },
                        transition: 'all 0.2s',
                        position: 'relative'
                      }}
                    >
                      <Typography variant="h6" align="center" sx={{ fontSize: '1.1rem' }}>
                        {lesson.keys[0]?.toUpperCase()}
                      </Typography>
                      <Typography variant="caption" align="center" display="block">
                        {lesson.title.split(' - ')[1]}
                      </Typography>
                      {isCompleted && (
                        <CheckCircle 
                          sx={{ 
                            position: 'absolute', 
                            top: 4, 
                            right: 4, 
                            fontSize: '1rem',
                            color: 'success.main'
                          }} 
                        />
                      )}
                      {!isUnlocked && (
                        <Typography variant="caption" align="center" display="block" sx={{ color: 'text.disabled' }}>
                          🔒 Locked
                        </Typography>
                      )}
                      {progress && isUnlocked && (
                        <Typography variant="caption" align="center" display="block" sx={{ fontSize: '0.7rem' }}>
                          {progress.accuracy > 0 ? `${progress.accuracy.toFixed(0)}%` : 'Not started'}
                        </Typography>
                      )}
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* Numbers */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6">🔢 Number Keys (0-9)</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {numberLessons.map((lesson) => (
                <ListItemButton
                  key={lesson.id}
                  onClick={() => selectLesson(lesson)}
                  selected={selectedLesson?.id === lesson.id}
                  sx={{ borderRadius: 1, mb: 1 }}
                >
                  <ListItemIcon>
                    <Keyboard color={selectedLesson?.id === lesson.id ? 'primary' : 'inherit'} />
                  </ListItemIcon>
                  <ListItemText
                    primary={lesson.title}
                    secondary={`Target: ${lesson.targetWPM} WPM`}
                  />
                  {lesson.completed && <CheckCircle color="success" />}
                </ListItemButton>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>

        {/* Punctuation */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6">⌨️ Punctuation & Symbols</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {punctuationLessons.map((lesson) => (
                <ListItemButton
                  key={lesson.id}
                  onClick={() => selectLesson(lesson)}
                  selected={selectedLesson?.id === lesson.id}
                  sx={{ borderRadius: 1, mb: 1 }}
                >
                  <ListItemIcon>
                    <Keyboard color={selectedLesson?.id === lesson.id ? 'primary' : 'inherit'} />
                  </ListItemIcon>
                  <ListItemText
                    primary={lesson.title}
                    secondary={`Target: ${lesson.targetWPM} WPM`}
                  />
                  {lesson.completed && <CheckCircle color="success" />}
                </ListItemButton>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      </>
    );
  };

  const renderWeekLessons = (weekLessons: Lesson[], weekTitle: string) => (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="h6">{weekTitle}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          {weekLessons.map((lesson) => (
            <ListItemButton
              key={lesson.id}
              onClick={() => selectLesson(lesson)}
              selected={selectedLesson?.id === lesson.id}
              sx={{ 
                borderRadius: 2, 
                mb: 1.5,
                p: 2,
                bgcolor: selectedLesson?.id === lesson.id ? 'primary.light' : 'background.paper',
                border: selectedLesson?.id === lesson.id ? '2px solid' : '1px solid',
                borderColor: selectedLesson?.id === lesson.id ? 'primary.main' : 'grey.300',
                boxShadow: selectedLesson?.id === lesson.id ? 2 : 1,
                '&:hover': { 
                  bgcolor: selectedLesson?.id === lesson.id ? 'primary.light' : 'grey.50',
                  boxShadow: 3,
                  transform: 'translateY(-1px)',
                  transition: 'all 0.3s ease'
                }
              }}
            >
              <ListItemIcon>
                {lesson.completed ? (
                  <CheckCircle color="success" />
                ) : (
                  <RadioButtonUnchecked color="action" />
                )}
              </ListItemIcon>
              <ListItemText
                primary={lesson.title}
                secondary={lesson.description}
              />
              <Box sx={{ ml: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box display="flex" gap={1}>
                  <Chip 
                    label={lesson.difficulty} 
                    size="small" 
                    color={lesson.difficulty === 'Beginner' ? 'primary' : lesson.difficulty === 'Elementary' ? 'secondary' : 'default'}
                    variant="outlined"
                  />
                  <Chip 
                    label={`Target: ${lesson.targetWPM} WPM`} 
                    size="small" 
                    variant="outlined"
                  />
                </Box>
              </Box>
            </ListItemButton>
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );

  return (
    <Box sx={{ width: '100%' }}>
      {/* Header */}
      <Box mb={4}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          sx={{ 
            fontSize: { xs: '1.75rem', md: '2.25rem' },
            fontWeight: 'bold',
            color: 'primary.main',
            textAlign: 'center',
            mb: 2
          }}
        >
          ⌨️ Keyboarding Skills Training
        </Typography>
        <Typography 
          variant="body1" 
          color="text.secondary" 
          sx={{ 
            fontSize: { xs: '1rem', md: '1.1rem' },
            textAlign: 'center',
            fontWeight: 500,
            mb: 1
          }}
        >
          Syllabus-Based Progressive Learning - Start with Home Row Mastery
        </Typography>
        
        {/* Usage Status Display */}
        <Paper 
          elevation={1} 
          sx={{ 
            p: 2, 
            mb: 3, 
            bgcolor: currentPlan.id === 'free' ? 'warning.light' : 'success.light',
            border: '1px solid',
            borderColor: currentPlan.id === 'free' ? 'warning.main' : 'success.main'
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                Current Plan: {currentPlan.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {currentPlan.price === 0 ? 'Free forever' : `$${currentPlan.price}/${currentPlan.period}`}
              </Typography>
            </Box>
            <Box display="flex" gap={2} flexWrap="wrap">
              {currentPlan.limitations.dailyLessons !== null && (
                <Chip 
                  label={`Lessons: ${getRemainingUsage('dailyLessons')} remaining`}
                  color={getRemainingUsage('dailyLessons')! > 0 ? 'success' : 'error'}
                  variant="outlined"
                />
              )}
              {currentPlan.id === 'free' && (
                <Button 
                  variant="contained" 
                  size="small" 
                  onClick={() => window.location.href = '/information-processing-app/pricing'}
                  sx={{ fontWeight: 'bold' }}
                >
                  Upgrade Now
                </Button>
              )}
            </Box>
          </Box>
        </Paper>
      </Box>

      <Grid container spacing={2}>
        {/* Lesson Selection Panel */}
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: { xs: 2, md: 3 }, height: 'fit-content' }}>
            {/* Tabs for Syllabus vs Key Mastery */}
            <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2 }}>
              <Tab label="📚 Syllabus" sx={{ fontSize: { xs: '0.8rem', md: '0.9rem' } }} />
              <Tab label="🔤 Key Mastery" sx={{ fontSize: { xs: '0.8rem', md: '0.9rem' } }} />
            </Tabs>

            {tabValue === 0 && (
              <>
                <Typography variant="body2" color="text.secondary" mb={3}>
                  Follow the syllabus structure for systematic skill development
                </Typography>
                {renderWeekLessons(syllabusLessons.week1, "Part I-A: Introduction (Computer Care & Operations)")}
                {renderWeekLessons(keyLessons, "Key-by-Key Foundation")}
                {renderWeekLessons(syllabusLessons.week2, "Part I-B: Keyboard Mastery")}
                {renderWeekLessons(syllabusLessons.week3, "Part I-C: Elementary Skills")}
                {renderWeekLessons(syllabusLessons.week4, "Part II-D: Intermediate Skills")}
              </>
            )}

            {tabValue === 1 && (
              <>
                <Typography variant="body2" color="text.secondary" mb={3}>
                  Master individual keys with finger placement guidance and progressive drills
                </Typography>
                {renderKeyMasteryLessons()}
              </>
            )}
          </Paper>
        </Grid>

        {/* Practice Area */}
        <Grid item xs={12} md={8}>
          {selectedLesson && (
            <>
              {/* Current Lesson Info */}
              <Paper sx={{ p: 3, mb: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Box>
                    <Typography variant="h6">{selectedLesson.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {selectedLesson.description}
                    </Typography>
                  </Box>
                  <Box display="flex" gap={1}>
                    <Chip 
                      label={selectedLesson.difficulty} 
                      color={selectedLesson.difficulty === 'Beginner' ? 'primary' : 'secondary'}
                    />
                    <Chip 
                      label={`Target: ${selectedLesson.targetWPM} WPM`} 
                      variant="outlined"
                    />
                  </Box>
                </Box>

                {/* Focus Areas */}
                <Box mb={2}>
                  <Typography variant="body2" color="text.secondary" mb={1}>
                    Focus Areas:
                  </Typography>
                  <Box display="flex" flexWrap="wrap" gap={1}>
                    {selectedLesson.keys.map((key, index) => (
                      <Chip 
                        key={index}
                        label={key} 
                        size="small" 
                        variant="outlined"
                        icon={<Keyboard />}
                      />
                    ))}
                  </Box>
                </Box>

                {/* Theory Lesson Content - Full Page Display */}
                {selectedLesson.notes && selectedLesson.keys?.includes('Theory') ? (
                  <Box sx={{ mt: 3 }}>
                    <Paper 
                      elevation={2}
                      sx={{ 
                        p: { xs: 3, md: 4 },
                        bgcolor: '#fafafa',
                        borderRadius: 3,
                        border: '1px solid #e0e0e0'
                      }}
                    >
                      <Typography 
                        variant="h5" 
                        sx={{ 
                          mb: 3, 
                          color: 'primary.main',
                          fontWeight: 'bold',
                          borderBottom: '2px solid',
                          borderColor: 'primary.main',
                          pb: 1
                        }}
                      >
                        📚 {selectedLesson.title}
                      </Typography>
                      
                      <Box sx={{ 
                        fontSize: { xs: '1rem', md: '1.1rem' },
                        lineHeight: 1.7,
                        color: 'text.primary',
                        '& h1, & h2, & h3': {
                          color: 'primary.main',
                          mt: 3,
                          mb: 2,
                          fontWeight: 'bold'
                        },
                        '& ul, & ol': {
                          pl: 3,
                          mb: 2
                        },
                        '& li': {
                          mb: 1
                        },
                        '& p': {
                          mb: 2
                        }
                      }}>
                        {renderStructuredNotes(selectedLesson.notes)}
                      </Box>

                      {/* Practice Section for Theory Lessons */}
                      <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid #e0e0e0' }}>
                        <Typography variant="h6" sx={{ mb: 2, color: 'secondary.main' }}>
                          💻 Practice Exercise
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2, fontStyle: 'italic' }}>
                          Apply what you've learned by practicing this text:
                        </Typography>
                        <Paper sx={{ p: 2, bgcolor: 'grey.100', fontFamily: 'monospace', fontSize: '0.95rem' }}>
                          {selectedLesson.practiceText}
                        </Paper>
                      </Box>
                    </Paper>
                  </Box>
                ) : selectedLesson.notes && (
                  // Regular Practice Lessons - Keep accordion format
                  <Accordion sx={{ mt: 2 }}>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: { xs: '1rem', md: '1.1rem' } }}>
                        📚 Comprehensive Study Notes & Guidelines
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Paper 
                        elevation={1}
                        sx={{ 
                          p: { xs: 2, md: 3 },
                          bgcolor: 'grey.50',
                          borderRadius: 2,
                          maxHeight: '500px',
                          overflowY: 'auto'
                        }}
                      >
                        {renderStructuredNotes(selectedLesson.notes)}
                      </Paper>
                    </AccordionDetails>
                  </Accordion>
                )}
              </Paper>

              {/* Performance Metrics - Only show for practice lessons */}
              {!selectedLesson.keys?.includes('Theory') && (
                <>
                  <Grid container spacing={2} mb={3}>
                <Grid item xs={4}>
                  <Card>
                    <CardContent sx={{ textAlign: 'center', py: 2 }}>
                      <Speed sx={{ fontSize: 30, color: 'primary.main', mb: 1 }} />
                      <Typography variant="h5" color="primary.main">
                        {wpm}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        WPM
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={4}>
                  <Card>
                    <CardContent sx={{ textAlign: 'center', py: 2 }}>
                      <Assessment sx={{ fontSize: 30, color: 'success.main', mb: 1 }} />
                      <Typography variant="h5" color="success.main">
                        {accuracy}%
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Accuracy
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={4}>
                  <Card>
                    <CardContent sx={{ textAlign: 'center', py: 2 }}>
                      <Timer sx={{ fontSize: 30, color: 'warning.main', mb: 1 }} />
                      <Typography variant="h5" color="warning.main">
                        {Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toFixed(0).padStart(2, '0')}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Time
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              {/* Practice Text Display */}
              <Paper sx={{ p: 3, mb: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6">Practice Text</Typography>
                  <Box display="flex" alignItems="center" gap={2}>
                    <LinearProgress 
                      variant="determinate" 
                      value={progress} 
                      sx={{ width: 150, height: 8, borderRadius: 4 }}
                    />
                    <Typography variant="caption">
                      {Math.round(progress)}%
                    </Typography>
                  </Box>
                </Box>

                {/* Display text with color coding */}
                <Box
                  sx={{
                    fontFamily: '"Roboto Mono", "Courier New", monospace',
                    fontSize: { xs: '16px', md: '20px' },
                    lineHeight: 2,
                    p: { xs: 2, md: 3 },
                    bgcolor: 'background.paper',
                    border: '2px solid',
                    borderColor: 'primary.main',
                    borderRadius: 2,
                    minHeight: { xs: 100, md: 120 },
                    mb: 3,
                    boxShadow: 2,
                    '&:hover': {
                      boxShadow: 3
                    }
                  }}
                >
                  {selectedLesson.practiceText.split('').map((char, index) => (
                    <span
                      key={index}
                      style={{
                        color: getCharacterColor(index, char),
                        backgroundColor: index === userInput.length ? '#bbdefb' : 'transparent',
                        padding: index === userInput.length ? '4px 2px' : '2px 0',
                        borderRadius: index === userInput.length ? '3px' : '0',
                        fontWeight: index === userInput.length ? 'bold' : 'normal',
                        boxShadow: index === userInput.length ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {char === ' ' ? '␣' : char}
                    </span>
                  ))}
                </Box>

                {/* AI Keyboard Simulation */}
                {(selectedLesson.id >= 21 && selectedLesson.id <= 49) && (
                  <Paper sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, pb: 0 }}>
                      <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <SmartToy color="primary" />
                        AI Keyboard Guide
                      </Typography>
                      <Button
                        size="small"
                        onClick={() => setShowKeyboard(!showKeyboard)}
                        startIcon={showKeyboard ? <VisibilityOff /> : <Visibility />}
                      >
                        {showKeyboard ? 'Hide' : 'Show'} Keyboard
                      </Button>
                    </Box>
                    {showKeyboard && (
                      <KeyboardSimulation
                        isTyping={isTyping}
                        userInput={userInput}
                        practiceText={selectedLesson.practiceText}
                        showFingerGuide={true}
                      />
                    )}
                  </Paper>
                )}

                {/* Typing Input */}
                <textarea
                  ref={inputRef}
                  value={userInput}
                  onChange={handleInputChange}
                  placeholder={isTyping ? "Type the text above..." : "Click Start to begin this lesson"}
                  disabled={!isTyping}
                  style={{
                    width: '100%',
                    height: '120px',
                    padding: '20px',
                    fontSize: '18px',
                    fontFamily: '"Roboto Mono", "Courier New", monospace',
                    border: '2px solid #1976d2',
                    borderRadius: '8px',
                    outline: 'none',
                    resize: 'none',
                    backgroundColor: isTyping ? '#ffffff' : '#f5f5f5',
                    color: '#333333',
                    lineHeight: '1.6',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease'
                  }}
                />

                {/* Control Buttons */}
                <Box mt={2} display="flex" gap={2}>
                  {!isTyping ? (
                    <Button
                      variant="contained"
                      startIcon={<PlayArrow />}
                      onClick={startTyping}
                      color="primary"
                    >
                      Start Lesson
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      startIcon={<Stop />}
                      onClick={stopTyping}
                      color="error"
                    >
                      Stop
                    </Button>
                  )}
                  
                  <Button
                    variant="outlined"
                    startIcon={<Refresh />}
                    onClick={resetPractice}
                  >
                    Reset
                  </Button>
                </Box>
              </Paper>

              {/* Performance Feedback */}
              {userInput.length > 20 && (
                <Alert 
                  severity={
                    wpm >= selectedLesson.targetWPM && accuracy >= 95 ? "success" :
                    accuracy >= 95 ? "info" :
                    accuracy >= 85 ? "warning" : "error"
                  } 
                  sx={{ mb: 3 }}
                >
                  <Typography variant="body2">
                    {wpm >= selectedLesson.targetWPM && accuracy >= 95
                      ? `Excellent! You've achieved the target speed with great accuracy. Ready for the next lesson.`
                      : accuracy >= 95 
                      ? `Great accuracy! Focus on building up to ${selectedLesson.targetWPM} WPM.`
                      : accuracy >= 85 
                      ? "Good progress. Focus on accuracy - slow down if needed to maintain precision."
                      : "Focus on accuracy first. Practice the key combinations slowly until muscle memory develops."
                    }
                  </Typography>
                </Alert>
              )}

              {/* AI Help Section */}
              <Paper sx={{ p: 3, bgcolor: 'info.light', color: 'info.contrastText' }}>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      🤖 Need Help with This Lesson?
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Ask our AI Assistant about typing techniques, finger placement, or any questions you have
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<SmartToy />}
                    component="a"
                    href="/ai-assistant"
                    sx={{ minWidth: 120 }}
                  >
                    Get Help
                  </Button>
                </Box>
              </Paper>
                </>
              )}
            </>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default TypingPractice;