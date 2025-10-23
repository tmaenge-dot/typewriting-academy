import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  Tabs,
  Tab,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Business,
  Description,
  Email,
  Receipt,
  Assignment,
  Person,
  RequestQuote,
  Assessment,
  ExpandMore,
  Visibility,
  Edit,
  CheckCircle,
  Info,
  FormatAlignLeft,
  Margin,
} from '@mui/icons-material';

interface DocumentTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  difficulty: 'Elementary' | 'Intermediate' | 'Advanced';
  part: 'Part I' | 'Part II';
  icon: React.ReactElement;
  template: string;
  guidelines: string[];
  formatFeatures: string[];
}

const documentTemplates: DocumentTemplate[] = [
  {
    id: 'business-letter',
    name: 'Business Letter (Fully Blocked)',
    category: 'Letters',
    description: 'Modern fully blocked business letter format with all elements aligned to left margin',
    difficulty: 'Elementary',
    part: 'Part I',
    icon: <Email />,
    template: `[Letterhead or Sender's Address]
TechSolutions Ltd
15 Innovation Drive
SILICON VALLEY
CA 94301
Tel: (555) 123-4567
Email: info@techsolutions.com

[Date]
22 October 2025

[Reference]
Our Ref: TS/2025/001

[Inside Address]
Ms Sarah Johnson
Operations Manager
Digital Dynamics Corp
25 Technology Parkway
TECH CITY
TX 75001

[Salutation]
Dear Ms Johnson

[Subject Line]
RE: PARTNERSHIP PROPOSAL FOR AI DEVELOPMENT PROJECT

[Body Paragraphs]
Thank you for your interest in collaborating with TechSolutions Ltd on the upcoming artificial intelligence development project. Following our productive meeting last week, I am pleased to outline our partnership proposal.

Our company has been at the forefront of AI innovation for over eight years, with a team of 50 experienced developers and data scientists. We have successfully completed more than 200 projects across various industries.

[Complimentary Close]
Yours sincerely

[Signature Space - 4 line spaces]


[Name and Title]
Michael Rodriguez
Chief Executive Officer

[Enclosures]
Enclosures: Project specifications, Timeline charts, Financial projections`,
    guidelines: [
      'All lines start at the left margin (fully blocked format)',
      'Use single line spacing within paragraphs, double spacing between sections',
      'Leave 4 line spaces for handwritten signature',
      'Use consistent font throughout (Times New Roman 12pt recommended)',
      'Maintain professional tone and clear structure',
      'Include all essential elements in correct order'
    ],
    formatFeatures: [
      'Left-aligned text throughout',
      'No indentation for paragraphs',
      'Clear section spacing',
      'Professional letterhead',
      'Reference line positioning',
      'Proper enclosure notation'
    ]
  },
  {
    id: 'memorandum',
    name: 'Memorandum (Internal)',
    category: 'Memos',
    description: 'Standard internal memorandum format for organizational communication',
    difficulty: 'Elementary',
    part: 'Part I',
    icon: <Description />,
    template: `MEMORANDUM

TO: All Department Managers
FROM: Jennifer Chen, Human Resources Director
DATE: 22 October 2025
REF: JC/hr/2025/015

SUBJECT: IMPLEMENTATION OF REMOTE WORK POLICY

Following extensive consultation with department heads and employee representatives, management has approved a comprehensive remote work policy effective from next month.

POLICY OVERVIEW
The new policy allows eligible employees to work remotely up to three days per week, subject to departmental requirements and performance standards.

ELIGIBILITY CRITERIA
• Minimum six months satisfactory service
• Role suitability for remote work
• Reliable internet connectivity
• Appropriate home workspace

IMPLEMENTATION SCHEDULE
Training sessions will commence next week. Please ensure all staff receive information about the new policy.

Contact HR with any questions regarding implementation.`,
    guidelines: [
      'Use MEMORANDUM as header in capital letters',
      'Include TO, FROM, DATE, REF in header section',
      'Subject line should be descriptive and in capitals',
      'Use clear headings for different sections',
      'Maintain formal but direct tone',
      'No signature required for memos'
    ],
    formatFeatures: [
      'Standard memo header format',
      'Clear subject identification',
      'Sectioned content with headings',
      'Bullet points for lists',
      'Concise professional language',
      'No signature block needed'
    ]
  },
  {
    id: 'savinggram',
    name: 'Savinggram',
    category: 'Telegrams',
    description: 'Concise telegram format for urgent business communications',
    difficulty: 'Elementary',
    part: 'Part I',
    icon: <Assignment />,
    template: `SAVINGGRAM

TO: MARKETING DIRECTOR LONDON OFFICE
FROM: REGIONAL MANAGER MANCHESTER

DATE: 22 OCTOBER 2025
TIME: 1430 HOURS

MESSAGE:
URGENT PRODUCT LAUNCH MEETING SCHEDULED 25 OCTOBER 1000 HOURS BOARDROOM STOP ATTENDANCE MANDATORY STOP AGENDA FOLLOWS BY EMAIL STOP CONFIRM ATTENDANCE IMMEDIATELY STOP

PRIORITY: HIGH
RESPONSE REQUIRED: YES

END MESSAGE`,
    guidelines: [
      'Use capital letters throughout',
      'Minimize words to reduce cost',
      'Use STOP to separate sentences',
      'Include sender and receiver clearly',
      'Specify date and time',
      'Keep message concise and clear'
    ],
    formatFeatures: [
      'All capitals format',
      'STOP punctuation system',
      'Minimal word usage',
      'Clear addressing system',
      'Time stamping',
      'Priority indication'
    ]
  },
  {
    id: 'curriculum-vitae',
    name: 'Curriculum Vitae',
    category: 'Personal',
    description: 'Professional CV format for job applications and career documentation',
    difficulty: 'Intermediate',
    part: 'Part I',
    icon: <Person />,
    template: `CURRICULUM VITAE

PERSONAL INFORMATION
Name: Sarah Michelle Johnson
Address: 25 Professional Drive, Business City, BC 12345
Telephone: (555) 123-4567
Email: sarah.johnson@email.com
Date of Birth: 15 March 1995
Nationality: British

CAREER OBJECTIVE
Seeking a challenging position in Information Technology where I can utilize my technical skills and educational background to contribute to organizational success.

EDUCATION
2020-2022    Master of Science in Computer Science
              University of Technology, London
              Grade: Distinction (75%)

2017-2020    Bachelor of Science in Information Systems
              Technical College, Manchester  
              Grade: First Class Honours (78%)

PROFESSIONAL EXPERIENCE
2022-Present  Systems Analyst
              TechSolutions Ltd, London
              • Analyze business requirements and design system solutions
              • Collaborate with development teams on project implementation
              • Conduct user training and system documentation

2020-2022    Junior Developer (Part-time)
              Digital Services Company, London
              • Assisted in software development projects
              • Performed system testing and debugging
              • Maintained project documentation

TECHNICAL SKILLS
Programming Languages: Python, Java, JavaScript, SQL
Software: Microsoft Office Suite, Visual Studio, Git
Operating Systems: Windows, Linux, macOS
Databases: MySQL, PostgreSQL, MongoDB

ACHIEVEMENTS
• Dean's List for Academic Excellence (2019-2020)
• Certified Scrum Master (2023)
• Best Project Award for Database Design (2022)

INTERESTS
Technology innovation, continuous learning, professional development

REFERENCES
Available upon request`,
    guidelines: [
      'Use clear section headings in capitals',
      'Present information in reverse chronological order',
      'Include specific dates and durations',
      'Quantify achievements where possible',
      'Maintain consistent formatting throughout',
      'Keep to maximum 2 pages for most positions'
    ],
    formatFeatures: [
      'Clear section divisions',
      'Chronological ordering',
      'Bullet point achievements',
      'Professional language',
      'Contact information prominence',
      'Skills categorization'
    ]
  },
  {
    id: 'invoice',
    name: 'Invoice',
    category: 'Financial',
    description: 'Professional invoice format for business transactions and billing',
    difficulty: 'Intermediate',
    part: 'Part I',
    icon: <Receipt />,
    template: `                              INVOICE

TechSolutions Ltd                        Invoice No: INV-2025-001
15 Innovation Drive                      Date: 22 October 2025
SILICON VALLEY                          Payment Terms: Net 30 days
CA 94301                                Due Date: 21 November 2025
Tel: (555) 123-4567

BILL TO:
Digital Dynamics Corp
Ms Sarah Johnson, Operations Manager
25 Technology Parkway
TECH CITY, TX 75001

DESCRIPTION OF SERVICES:

Item    Description                      Quantity    Rate        Amount
001     System Analysis & Design         40 hours    $125.00     $5,000.00
002     Software Development            80 hours    $100.00     $8,000.00
003     Testing & Documentation         20 hours    $85.00      $1,700.00
004     User Training Sessions          16 hours    $75.00      $1,200.00

                                        Subtotal:               $15,900.00
                                        Tax (8.5%):             $1,351.50
                                        TOTAL AMOUNT DUE:       $17,251.50

PAYMENT INSTRUCTIONS:
Please remit payment within 30 days of invoice date. 
Late payments subject to 1.5% monthly service charge.

Thank you for your business.

Authorized Signature: _________________________
                     Michael Rodriguez, CEO`,
    guidelines: [
      'Include complete company information',
      'Use sequential invoice numbering',
      'Clearly state payment terms and due date',
      'Itemize all services or products',
      'Calculate taxes and totals accurately',
      'Include payment instructions'
    ],
    formatFeatures: [
      'Professional header layout',
      'Clear billing information',
      'Itemized service table',
      'Tax calculations',
      'Payment terms clarity',
      'Authorization signature'
    ]
  },
  {
    id: 'quotation',
    name: 'Quotation',
    category: 'Financial',
    description: 'Price quotation format for business proposals and estimates',
    difficulty: 'Intermediate',
    part: 'Part I',
    icon: <RequestQuote />,
    template: `                            QUOTATION

TechSolutions Ltd                        Quote No: QUO-2025-001
15 Innovation Drive                      Date: 22 October 2025
SILICON VALLEY                          Valid Until: 21 November 2025
CA 94301                                Project: AI Development System
Tel: (555) 123-4567

QUOTE FOR:
Digital Dynamics Corp
Attention: Ms Sarah Johnson, Operations Manager
25 Technology Parkway
TECH CITY, TX 75001

PROJECT DESCRIPTION:
Development of custom AI-powered business analytics platform including
system design, implementation, testing, and deployment.

DETAILED QUOTATION:

Phase   Description                      Duration    Cost
1       Requirements Analysis           2 weeks     $15,000.00
2       System Design & Architecture    3 weeks     $22,500.00
3       Core Development               8 weeks     $60,000.00
4       Testing & Quality Assurance    2 weeks     $12,000.00
5       Deployment & Training          1 week      $8,000.00

                                      Subtotal:    $117,500.00
                                      Contingency (10%): $11,750.00
                                      TOTAL QUOTE: $129,250.00

TERMS AND CONDITIONS:
• Quote valid for 30 days from date issued
• 50% deposit required before project commencement
• Payment terms: Net 30 days from invoice date
• All prices exclude applicable taxes

We look forward to working with you on this project.

Prepared by: Michael Rodriguez, Chief Executive Officer
Email: m.rodriguez@techsolutions.com
Direct Line: (555) 123-4501`,
    guidelines: [
      'Include quotation number and validity period',
      'Clearly describe the project scope',
      'Break down costs by phases or items',
      'State terms and conditions clearly',
      'Include contact information for queries',
      'Maintain professional presentation'
    ],
    formatFeatures: [
      'Professional quote header',
      'Project scope definition',
      'Phased cost breakdown',
      'Clear terms and conditions',
      'Validity period emphasis',
      'Contact information prominence'
    ]
  },
  {
    id: 'business-report',
    name: 'Business Report',
    category: 'Reports',
    description: 'Formal business report structure for professional analysis and recommendations',
    difficulty: 'Advanced',
    part: 'Part II',
    icon: <Assessment />,
    template: `                        BUSINESS REPORT

TO:         Board of Directors
FROM:       Strategic Planning Committee
DATE:       22 October 2025
SUBJECT:    Market Expansion Analysis - Southeast Asia Region

EXECUTIVE SUMMARY

This report examines opportunities for market expansion into Southeast Asia, analyzing market potential, competitive landscape, and implementation strategies. Key findings indicate significant growth opportunities with projected ROI of 25% within 18 months.

1.0 INTRODUCTION

1.1 Purpose and Scope
This analysis evaluates market entry strategies for Southeast Asian markets, focusing on Singapore, Malaysia, and Thailand as primary targets.

1.2 Methodology
Research conducted through market analysis, competitor evaluation, and financial modeling over a 12-week period.

2.0 MARKET ANALYSIS

2.1 Market Size and Growth
The Southeast Asian technology market shows consistent 15% annual growth, with total addressable market of $2.5 billion.

2.2 Target Demographics
Primary targets include:
• Enterprise clients (500+ employees)
• Technology-forward SMEs
• Government agencies modernizing systems

3.0 COMPETITIVE LANDSCAPE

3.1 Major Competitors
Key players include TechAsia Ltd, Digital Solutions Pte, and Innovation Systems Co.

3.2 Market Positioning
Opportunity exists for premium positioning based on superior technology and service quality.

4.0 FINANCIAL PROJECTIONS

4.1 Investment Requirements
Initial investment: $1.2 million
• Market research and setup: $200,000
• Staff recruitment and training: $400,000
• Marketing and sales: $300,000
• Technology infrastructure: $300,000

4.2 Revenue Projections
Year 1: $800,000
Year 2: $2,100,000  
Year 3: $3,750,000

5.0 RECOMMENDATIONS

5.1 Market Entry Strategy
Recommend phased approach beginning with Singapore as regional headquarters.

5.2 Implementation Timeline
• Q1 2026: Establish Singapore office
• Q2 2026: Launch pilot projects
• Q3 2026: Expand to Malaysia and Thailand

6.0 CONCLUSION

Market expansion into Southeast Asia presents significant growth opportunity with acceptable risk profile. Recommendation is to proceed with implementation plan.

APPENDICES
Appendix A: Market Research Data
Appendix B: Financial Models
Appendix C: Competitor Analysis

Prepared by: Strategic Planning Committee
Contact: planning@techsolutions.com`,
    guidelines: [
      'Use clear hierarchical numbering system',
      'Include executive summary at beginning',
      'Structure with logical flow and sections',
      'Support conclusions with data and evidence',
      'Include specific recommendations',
      'Add appendices for supporting information'
    ],
    formatFeatures: [
      'Formal report structure',
      'Numbered section headings',
      'Executive summary inclusion',
      'Data-supported analysis',
      'Clear recommendations',
      'Professional appendices'
    ]
  }
];

const BusinessDocuments = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [selectedDocument, setSelectedDocument] = useState<DocumentTemplate | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [practiceOpen, setPracticeOpen] = useState(false);
  const [practiceText, setPracticeText] = useState('');
  const [showHints, setShowHints] = useState(false);

  const categories = ['All', 'Letters', 'Memos', 'Financial', 'Personal', 'Reports', 'Telegrams'];

  const filteredDocuments = currentTab === 0 
    ? documentTemplates 
    : documentTemplates.filter(doc => doc.category === categories[currentTab]);

  const handlePreview = (document: DocumentTemplate) => {
    setSelectedDocument(document);
    setPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setPreviewOpen(false);
    setSelectedDocument(null);
  };

  const handlePractice = (document: DocumentTemplate) => {
    setSelectedDocument(document);
    setPracticeText('');
    setShowHints(false);
    setPracticeOpen(true);
  };

  const handleClosePractice = () => {
    setPracticeOpen(false);
    setSelectedDocument(null);
    setPracticeText('');
    setShowHints(false);
  };

  const handleStartWithTemplate = () => {
    if (selectedDocument) {
      setPracticeText(selectedDocument.template);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Business /> Business Document Layouts & Formats
      </Typography>
      
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
        Master professional document formatting with emphasis on modern fully blocked layouts and proper business communication standards.
      </Typography>

      {/* Format Guidelines Alert */}
      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
          Modern Business Document Standards:
        </Typography>
        <Typography variant="body2">
          • <strong>Fully Blocked Format:</strong> All text aligned to left margin (modern standard)
          • <strong>Consistent Spacing:</strong> Single spacing within paragraphs, double between sections
          • <strong>Professional Fonts:</strong> Times New Roman 12pt or Arial 11pt recommended
          • <strong>Proper Margins:</strong> 1 inch (2.54cm) on all sides for printed documents
        </Typography>
      </Alert>

      {/* Document Categories */}
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={currentTab}
          onChange={(_e, newValue) => setCurrentTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
        >
          {categories.map((category) => (
            <Tab key={category} label={category} />
          ))}
        </Tabs>
      </Paper>

      {/* Document Templates Grid */}
      <Grid container spacing={3}>
        {filteredDocuments.map((document) => (
          <Grid item xs={12} md={6} lg={4} key={document.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Box sx={{ color: 'primary.main', fontSize: 32 }}>
                    {document.icon}
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {document.name}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                      <Chip 
                        label={document.part} 
                        color={document.part === 'Part I' ? 'primary' : 'secondary'} 
                        size="small" 
                      />
                      <Chip 
                        label={document.difficulty} 
                        variant="outlined"
                        size="small" 
                      />
                    </Box>
                  </Box>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {document.description}
                </Typography>

                <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Key Format Features:
                </Typography>
                <List dense>
                  {document.formatFeatures.slice(0, 3).map((feature, index) => (
                    <ListItem key={index} sx={{ py: 0, px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 20 }}>
                        <CheckCircle fontSize="small" color="success" />
                      </ListItemIcon>
                      <ListItemText 
                        primary={feature} 
                        primaryTypographyProps={{ variant: 'caption' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>

              <Box sx={{ p: 2, pt: 0 }}>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="outlined"
                      size="small"
                      startIcon={<Visibility />}
                      onClick={() => handlePreview(document)}
                    >
                      Preview
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="contained"
                      size="small"
                      startIcon={<Edit />}
                      onClick={() => handlePractice(document)}
                    >
                      Practice
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Format Guidelines Section */}
      <Paper sx={{ mt: 4, p: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FormatAlignLeft /> Document Layout Guidelines
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="h6">Fully Blocked Format Rules</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  <ListItem>
                    <ListItemIcon><Margin /></ListItemIcon>
                    <ListItemText 
                      primary="All text starts at left margin"
                      secondary="No indentation for paragraphs or sections"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><FormatAlignLeft /></ListItemIcon>
                    <ListItemText 
                      primary="Consistent left alignment"
                      secondary="Date, signature, closing - all left-aligned"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Info /></ListItemIcon>
                    <ListItemText 
                      primary="Modern professional standard"
                      secondary="Widely accepted in contemporary business"
                    />
                  </ListItem>
                </List>
              </AccordionDetails>
            </Accordion>
            
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="h6">Spacing Standards</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" paragraph>
                  <strong>Within Text:</strong> Single line spacing within paragraphs
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>Between Sections:</strong> Double line spacing between different sections
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>Signature Space:</strong> 4 line spaces for handwritten signatures
                </Typography>
                <Typography variant="body2">
                  <strong>Margins:</strong> 1 inch (2.54cm) on all sides for printed documents
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="h6">Professional Standards</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" paragraph>
                  <strong>Font Selection:</strong> Times New Roman 12pt or Arial 11pt
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>Paper Quality:</strong> Standard A4 (210mm × 297mm) white paper
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>Print Quality:</strong> Black ink, clear and legible output
                </Typography>
                <Typography variant="body2">
                  <strong>Proofreading:</strong> Error-free spelling, grammar, and formatting
                </Typography>
              </AccordionDetails>
            </Accordion>
            
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="h6">Element Positioning</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" paragraph>
                  <strong>Letters:</strong> Date → Reference → Inside Address → Salutation → Body → Close → Signature
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>Memos:</strong> Header (TO/FROM/DATE/REF) → Subject → Body sections
                </Typography>
                <Typography variant="body2">
                  <strong>Reports:</strong> Title → Executive Summary → Numbered Sections → Conclusions → Appendices
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </Paper>

      {/* Document Preview Dialog */}
      <Dialog
        open={previewOpen}
        onClose={handleClosePreview}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedDocument?.name} - Template Preview
        </DialogTitle>
        <DialogContent>
          {selectedDocument && (
            <Box>
              <Alert severity="info" sx={{ mb: 2 }}>
                <Typography variant="body2">
                  This template demonstrates proper formatting for {selectedDocument.name}. 
                  Pay attention to alignment, spacing, and element positioning.
                </Typography>
              </Alert>
              
              <Paper sx={{ p: 3, bgcolor: 'grey.50' }}>
                <TextField
                  multiline
                  fullWidth
                  value={selectedDocument.template}
                  variant="outlined"
                  InputProps={{
                    readOnly: true,
                    sx: { 
                      fontFamily: 'monospace',
                      fontSize: '12px',
                      lineHeight: 1.5,
                      bgcolor: 'white'
                    }
                  }}
                  rows={20}
                />
              </Paper>
              
              <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
                Formatting Guidelines:
              </Typography>
              <List>
                {selectedDocument.guidelines.map((guideline, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckCircle color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={guideline} />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePreview}>Close</Button>
          <Button 
            variant="contained" 
            startIcon={<Edit />}
            onClick={() => {
              handleClosePreview();
              if (selectedDocument) {
                handlePractice(selectedDocument);
              }
            }}
          >
            Practice This Format
          </Button>
        </DialogActions>
      </Dialog>

      {/* Practice Dialog */}
      <Dialog 
        open={practiceOpen} 
        onClose={handleClosePractice} 
        maxWidth="lg" 
        fullWidth
        PaperProps={{
          sx: { height: '90vh' }
        }}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">
              Practice: {selectedDocument?.name}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                size="small"
                variant="outlined"
                onClick={() => setShowHints(!showHints)}
              >
                {showHints ? 'Hide' : 'Show'} Hints
              </Button>
              <Button
                size="small"
                variant="contained"
                onClick={handleStartWithTemplate}
              >
                Start with Template
              </Button>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ height: '100%' }}>
            {/* Practice Area */}
            <Grid item xs={12} md={showHints ? 6 : 12}>
              <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="subtitle2" gutterBottom>
                  Type your document here (use proper formatting):
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  value={practiceText}
                  onChange={(e) => setPracticeText(e.target.value)}
                  placeholder="Start typing your document here... 

Tips:
- Use fully blocked format (all text aligned left)
- Include proper date, inside address, salutation
- Use single spacing within paragraphs
- Double space between sections
- Include proper closing and signature block"
                  sx={{
                    flexGrow: 1,
                    '& .MuiInputBase-root': {
                      height: '100%',
                      alignItems: 'flex-start',
                      fontFamily: 'monospace',
                      fontSize: '14px',
                      lineHeight: 1.5
                    },
                    '& .MuiInputBase-input': {
                      height: '100% !important',
                      overflow: 'auto !important'
                    }
                  }}
                  InputProps={{
                    sx: {
                      height: '100%'
                    }
                  }}
                />
              </Box>
            </Grid>

            {/* Hints Panel */}
            {showHints && selectedDocument && (
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2, height: '100%', overflow: 'auto', bgcolor: 'grey.50' }}>
                  <Typography variant="h6" gutterBottom>
                    📋 Format Guidelines
                  </Typography>
                  
                  <Typography variant="subtitle2" gutterBottom>
                    Key Requirements:
                  </Typography>
                  <List dense>
                    {selectedDocument.formatFeatures.map((feature, index) => (
                      <ListItem key={index} sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 20 }}>
                          <CheckCircle fontSize="small" color="primary" />
                        </ListItemIcon>
                        <ListItemText 
                          primary={feature} 
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                    ))}
                  </List>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="subtitle2" gutterBottom>
                    📝 Detailed Guidelines:
                  </Typography>
                  <List dense>
                    {selectedDocument.guidelines.map((guideline, index) => (
                      <ListItem key={index} sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 20 }}>
                          <Info fontSize="small" color="info" />
                        </ListItemIcon>
                        <ListItemText 
                          primary={guideline} 
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                    ))}
                  </List>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="subtitle2" gutterBottom>
                    🎯 Practice Tips:
                  </Typography>
                  <Alert severity="info" sx={{ mb: 2 }}>
                    <Typography variant="body2">
                      • Keep all text aligned to the left margin<br/>
                      • Use consistent spacing between sections<br/>
                      • Include all required document elements<br/>
                      • Maintain professional tone throughout
                    </Typography>
                  </Alert>

                  <Typography variant="caption" color="text.secondary">
                    Part: {selectedDocument.part} | Difficulty: {selectedDocument.difficulty}
                  </Typography>
                </Paper>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePractice}>
            Close
          </Button>
          <Button 
            variant="outlined"
            onClick={() => setPracticeText('')}
          >
            Clear
          </Button>
          <Button 
            variant="contained"
            onClick={() => {
              // Here you could add validation logic
              alert('Practice saved! Keep working on your formatting skills.');
            }}
          >
            Save Practice
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BusinessDocuments;