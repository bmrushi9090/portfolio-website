import { useState } from 'react'
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  CssBaseline,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from '@mui/material'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import CloseIcon from '@mui/icons-material/Close'
import CodeIcon from '@mui/icons-material/Code'
import DownloadIcon from '@mui/icons-material/Download'
import EmailIcon from '@mui/icons-material/Email'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone'
import TerminalIcon from '@mui/icons-material/Terminal'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { motion, useScroll, useSpring } from 'framer-motion'
import resumePdf from './assets/Rushikesh_Shelke_Front-End_Developer_Resume.pdf'
import './App.css'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#a855f7',
    },
    secondary: {
      main: '#c084fc',
    },
    background: {
      default: '#050505',
      paper: '#111111',
    },
    text: {
      primary: '#f8fafc',
      secondary: '#a1a1aa',
    },
  },
  typography: {
    fontFamily:
      'Roboto, "Segoe UI", Arial, system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
    h1: { fontWeight: 800, lineHeight: 1.08, letterSpacing: 0 },
    h2: { fontWeight: 800, lineHeight: 1.14, letterSpacing: 0 },
    h3: { fontWeight: 700, lineHeight: 1.18, letterSpacing: 0 },
    h4: { fontWeight: 700, lineHeight: 1.2, letterSpacing: 0 },
    h5: { fontWeight: 400, lineHeight: 1.6, letterSpacing: 0 },
    button: { fontWeight: 800, textTransform: 'none' },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: 'none',
          minHeight: 44,
          paddingInline: 20,
          transition: 'transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        },
        contained: {
          color: '#020617',
          background: 'linear-gradient(135deg, #c084fc, #7c3aed)',
          boxShadow: '0 14px 34px rgba(168, 85, 247, 0.25)',
          '&:hover': {
            boxShadow: '0 18px 44px rgba(192, 132, 252, 0.22)',
          },
        },
        outlined: {
          color: '#f8fafc',
          borderColor: 'rgba(248, 250, 252, 0.22)',
          background: 'rgba(255, 255, 255, 0.03)',
          '&:hover': {
            borderColor: '#c084fc',
            background: 'rgba(168, 85, 247, 0.12)',
          },
        },
        text: {
          color: '#f8fafc',
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.06)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 22px 60px rgba(0, 0, 0, 0.3)',
        },
      },
    },
  },
})

const MotionBox = motion(Box)
const MotionCard = motion(Card)

const navItems = ['About', 'Skills', 'Work', 'Resume', 'Contact']

const skillGroups = [
  {
    eyebrow: 'Frontend',
    title: 'React.js Development',
    icon: <CodeIcon />,
    description: 'Component architecture, hooks, routing, API integration, and responsive UI.',
    featured: ['React.js', 'Material UI'],
    skills: ['React.js', 'JavaScript', 'Material UI', 'Redux', 'REST APIs', 'Hooks', 'Routing'],
  },
  {
    eyebrow: 'Mobile',
    title: 'React Native Apps',
    icon: <PhoneIphoneIcon />,
    description: 'Mobile screens, navigation flows, reusable components, and native-feeling UX.',
    featured: ['React Native', 'Navigation'],
    skills: ['React Native', 'Mobile UI', 'Navigation', 'Forms', 'API Integration', 'Reusable Screens'],
  },
  {
    eyebrow: 'Engineering',
    title: 'Software Engineering',
    icon: <TerminalIcon />,
    description: 'Clean code, debugging, Git workflows, reusable patterns, and delivery mindset.',
    featured: ['Git', 'Clean Code'],
    skills: ['Git', 'Debugging', 'Clean Code', 'Reusable Components', 'Problem Solving', 'Agile Basics'],
  },
]

const allSkills = [...new Set(skillGroups.flatMap((group) => group.skills))]

const projects = [
  {
    title: 'Dealer Management System (DMS) PWA',
    description:
      'A progressive web application with appointment booking, job cards, service estimates, final inspection workflows, REST API integration, and responsive cross-device UI.',
    tags: ['React.js', 'PWA', 'REST APIs'],
  },
  {
    title: 'Vehicle Service Booking App',
    description:
      'A React Native mobile app for vehicle service booking and management, including vehicle details, service history, profile flows, and responsive mobile performance.',
    tags: ['React Native', 'Mobile UI', 'API'],
  },
  {
    title: 'E-Commerce Application',
    description:
      'A full-stack MERN e-commerce application with authentication, cart, wishlist, product browsing, and order management features.',
    tags: ['MERN Stack', 'Auth', 'Cart'],
  },
  {
    title: 'AI ChatBot Application',
    description:
      'An AI-powered chatbot application built with the MERN stack and LangChain for conversational interactions and practical AI-assisted workflows.',
    tags: ['MERN Stack', 'LangChain', 'AI'],
  },
]

const highlights = [
  ['Associate Software Engineer', 'Current focus'],
  ['React.js Developer', 'Frontend web'],
  ['React Native Developer', 'Mobile apps'],
]

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

function App() {
  const [resumeOpen, setResumeOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className="app-shell">
        <motion.div className="scroll-progress" style={{ scaleX }} />
        <AppBar position="sticky" color="transparent" elevation={0} className="topbar">
          <Container maxWidth="lg">
            <Toolbar disableGutters sx={{ justifyContent: 'space-between', py: 1.1 }}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Avatar className="brand-avatar">RS</Avatar>
                <Box>
                  <Typography variant="h6" fontWeight={900}>
                    Rushikesh Shelke
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Associate Software Engineer
                  </Typography>
                </Box>
              </Stack>

              <Stack direction="row" spacing={0.25} sx={{ display: { xs: 'none', md: 'flex' } }}>
                {navItems.map((item) => (
                  <Button key={item} color="inherit" href={`#${item.toLowerCase()}`}>
                    {item}
                  </Button>
                ))}
              </Stack>
            </Toolbar>
          </Container>
        </AppBar>

        <Box component="main">
          <Box id="about" className="hero-section">
            <Container maxWidth="lg">
              <Box className="hero-grid">
                <Box className="hero-left">
                  <MotionBox
                    variants={stagger}
                    initial="hidden"
                    animate="visible"
                    className="hero-copy"
                  >
                    <MotionBox variants={fadeUp}>
                      <motion.div
                        className="role-badge"
                        whileHover={{ y: -3, scale: 1.02 }}
                        transition={{ type: 'spring', stiffness: 320, damping: 20 }}
                      >
                        <motion.span
                          className="role-icon"
                          animate={{ rotate: [0, -8, 8, 0], scale: [1, 1.08, 1] }}
                          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
                        >
                          <BusinessCenterIcon fontSize="small" />
                        </motion.span>
                        <Box>
                          <Typography component="span">Available for roles</Typography>
                          <Typography component="strong">Associate Software Engineer</Typography>
                        </Box>
                      </motion.div>
                    </MotionBox>
                    <MotionBox variants={fadeUp}>
                      <Typography variant="h1" fontSize={{ xs: 38, sm: 48, md: 64 }} maxWidth={820}>
                        Designing web and mobile apps with clean React engineering.
                      </Typography>
                    </MotionBox>
                    <MotionBox variants={fadeUp}>
                      <Typography
                        variant="h5"
                        color="text.secondary"
                        sx={{ mt: 3, maxWidth: 700, fontSize: { xs: 18, md: 20 } }}
                      >
                        I work as an Associate Software Engineer with a focus on React.js,
                        React Native, reusable UI components, API-connected experiences, and
                        polished interfaces that feel simple to use.
                      </Typography>
                    </MotionBox>

                    <MotionBox variants={fadeUp}>
                      <Stack
                        direction="row"
                        spacing={2}
                        useFlexGap
                        className="hero-actions"
                        sx={{ mt: 4, flexWrap: 'wrap' }}
                      >
                        <Button href="#work" size="large" variant="contained" endIcon={<OpenInNewIcon />}>
                          View Projects
                        </Button>
                        <Button
                          size="large"
                          variant="outlined"
                          startIcon={<VisibilityIcon />}
                          onClick={() => setResumeOpen(true)}
                        >
                          Preview Resume
                        </Button>
                        <Button
                          href={resumePdf}
                          download="Rushikesh_Shelke_Resume.pdf"
                          size="large"
                          variant="text"
                          startIcon={<DownloadIcon />}
                        >
                          Download
                        </Button>
                      </Stack>
                    </MotionBox>
                  </MotionBox>
                </Box>

                <Box className="hero-right">
                  <MotionBox
                    className="hero-visual"
                    initial={{ opacity: 0, scale: 0.92, rotate: 2 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 90, damping: 18, delay: 0.2 }}
                  >
                    <motion.div
                      className="floating-card primary-card"
                      animate={{ y: [0, -12, 0] }}
                      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <Typography variant="overline">Current Role</Typography>
                      <Typography variant="h4">Associate Software Engineer</Typography>
                      <Typography color="text.secondary">
                        React.js, React Native, UI systems, and frontend delivery.
                      </Typography>
                    </motion.div>

                    <motion.div
                      className="floating-card code-card"
                      animate={{ y: [0, 12, 0] }}
                      transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <Typography component="pre">
                        {`const stack = [
  'React.js',
  'React Native',
  'Material UI',
  'Framer Motion'
]`}
                      </Typography>
                    </motion.div>

                    <Stack className="quick-stats" spacing={1.5}>
                      {highlights.map(([title, subtitle]) => (
                        <Box className="stat-row" key={title}>
                          <span />
                          <Box>
                            <Typography fontWeight={900}>{title}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {subtitle}
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                    </Stack>
                  </MotionBox>
                </Box>
              </Box>
            </Container>
          </Box>

          <Container maxWidth="lg">
            <Box id="skills" className="section">
              <MotionBox
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={stagger}
              >
                <MotionBox variants={fadeUp}>
                  <Typography variant="overline" color="primary">
                    Engineering Stack
                  </Typography>
                  <Typography variant="h2" fontSize={{ xs: 32, md: 44 }} sx={{ mb: 3 }}>
                    Focused skills for modern product teams.
                  </Typography>
                </MotionBox>

                <Box className="card-grid three-columns">
                  {skillGroups.map((group, index) => (
                    <Box key={group.title}>
                      <MotionCard
                        variants={fadeUp}
                        whileHover={{ y: -10, scale: 1.015 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                        className="skill-card"
                      >
                        <CardContent sx={{ p: 3.2 }}>
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            gap={2}
                            className="skill-card-header"
                          >
                            <Box className="skill-icon">{group.icon}</Box>
                            <Chip
                              label={`${group.skills.length} skills`}
                              size="small"
                              className="skill-count"
                            />
                          </Stack>
                          <Box className="skill-title-block">
                            <Typography variant="overline">{group.eyebrow}</Typography>
                            <Typography variant="h5">{group.title}</Typography>
                          </Box>
                          <Typography color="text.secondary" sx={{ mb: 2.5 }}>
                            {group.description}
                          </Typography>
                          <Box className="featured-skills">
                            {group.featured.map((skill) => (
                              <Box className="featured-skill" key={skill}>
                                {skill}
                              </Box>
                            ))}
                          </Box>
                          <Box className="card-skill-slider" aria-label={`${group.title} skills`}>
                            <Box
                              className={`card-skill-track ${index % 2 === 1 ? 'reverse-track' : ''}`}
                            >
                              {[...group.skills, ...group.skills].map((skill, skillIndex) => (
                                <span key={`${skill}-${skillIndex}`}>{skill}</span>
                              ))}
                            </Box>
                          </Box>
                          <Box className="skill-summary">
                            {group.skills.slice(0, 3).map((skill) => (
                              <Box key={skill}>
                                <span />
                                <Typography variant="body2">{skill}</Typography>
                              </Box>
                            ))}
                          </Box>
                        </CardContent>
                      </MotionCard>
                    </Box>
                  ))}
                </Box>

                <MotionBox
                  className="skills-marquee"
                  variants={fadeUp}
                  aria-label="Technology skills"
                >
                  <Box className="skills-track">
                    {[...allSkills, ...allSkills].map((skill, index) => (
                      <span key={`${skill}-${index}`}>{skill}</span>
                    ))}
                  </Box>
                </MotionBox>
              </MotionBox>
            </Box>

            <Box id="work" className="section">
              <Stack
                direction={{ xs: 'column', md: 'row' }}
                justifyContent="space-between"
                alignItems={{ xs: 'flex-start', md: 'flex-end' }}
                spacing={2}
                sx={{ mb: 3 }}
              >
                <Box>
                  <Typography variant="overline" color="primary">
                    Selected Work
                  </Typography>
                  <Typography variant="h2" fontSize={{ xs: 32, md: 44 }}>
                    Project areas I can present and grow.
                  </Typography>
                </Box>
                <Button variant="text" endIcon={<OpenInNewIcon />} href="https://github.com/" target="_blank">
                  GitHub
                </Button>
              </Stack>

              <Box className="card-grid three-columns">
                {projects.map((project, index) => (
                  <Box key={project.title}>
                    <MotionCard
                      className="project-card"
                      initial={{ opacity: 0, y: 30, scale: 0.96 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      whileHover={{ y: -12 }}
                      viewport={{ once: true, amount: 0.35 }}
                      transition={{ type: 'spring', stiffness: 170, damping: 20, delay: index * 0.08 }}
                    >
                      <CardContent sx={{ p: 3.2 }}>
                        <Typography className="project-number">0{index + 1}</Typography>
                        <Typography variant="h5" sx={{ mb: 1.5 }}>
                          {project.title}
                        </Typography>
                        <Typography color="text.secondary" sx={{ minHeight: 118 }}>
                          {project.description}
                        </Typography>
                        <Stack className="project-tags">
                          {project.tags.map((tag) => (
                            <Chip key={tag} label={tag} size="small" variant="outlined" className="project-tag" />
                          ))}
                        </Stack>
                      </CardContent>
                    </MotionCard>
                  </Box>
                ))}
              </Box>
            </Box>

            <Box id="resume" className="resume-panel">
              <Box className="resume-grid">
                <Box>
                  <MotionBox
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.45 }}
                  >
                    <Typography variant="overline" color="secondary">
                      Resume
                    </Typography>
                    <Typography variant="h3" fontSize={{ xs: 30, md: 40 }}>
                      Preview or download my real resume PDF.
                    </Typography>
                    <Typography color="text.secondary" sx={{ mt: 2, maxWidth: 650 }}>
                      The portfolio now uses the PDF from your assets folder, so recruiters can
                      preview it without leaving the site or download it directly.
                    </Typography>
                  </MotionBox>
                </Box>
                <Box>
                  <MotionBox
                    className="resume-actions"
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.45 }}
                  >
                    <Button
                      fullWidth
                      size="large"
                      variant="contained"
                      startIcon={<VisibilityIcon />}
                      onClick={() => setResumeOpen(true)}
                    >
                      Preview Resume
                    </Button>
                    <Button
                      fullWidth
                      size="large"
                      variant="outlined"
                      startIcon={<DownloadIcon />}
                      href={resumePdf}
                      download="Rushikesh_Shelke_Resume.pdf"
                    >
                      Download PDF
                    </Button>
                  </MotionBox>
                </Box>
              </Box>
            </Box>

            <Box id="contact" className="contact-section">
              <MotionBox
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
              >
                <Typography variant="h2" fontSize={{ xs: 32, md: 46 }}>
                  Let us build clean software together.
                </Typography>
                <Typography color="text.secondary" sx={{ mt: 2, mb: 4, maxWidth: 680 }}>
                  I am open to Associate Software Engineer, React.js Developer, and React Native
                  Developer opportunities.
                </Typography>
                <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap">
                  <Button
                    href="mailto:hello@example.com"
                    variant="contained"
                    size="large"
                    startIcon={<EmailIcon />}
                  >
                    Say Hello
                  </Button>
                  <IconButton color="primary" href="https://github.com/" target="_blank" aria-label="GitHub">
                    <GitHubIcon />
                  </IconButton>
                  <IconButton
                    color="primary"
                    href="https://www.linkedin.com/"
                    target="_blank"
                    aria-label="LinkedIn"
                  >
                    <LinkedInIcon />
                  </IconButton>
                </Stack>
              </MotionBox>
            </Box>
          </Container>
        </Box>

        <Dialog open={resumeOpen} onClose={() => setResumeOpen(false)} maxWidth="lg" fullWidth>
          <DialogTitle sx={{ pr: 7 }}>
            Resume Preview
            <IconButton
              aria-label="Close resume preview"
              onClick={() => setResumeOpen(false)}
              sx={{ position: 'absolute', right: 16, top: 12 }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers sx={{ p: 0 }}>
            <Box className="pdf-frame-wrap">
              <iframe src={resumePdf} title="Rushikesh Shelke Resume" className="pdf-frame" />
            </Box>
          </DialogContent>
        </Dialog>
      </Box>
    </ThemeProvider>
  )
}

export default App
