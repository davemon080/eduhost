
import { University, Course, FeedPost, LiveClass } from './types';

export const UNIVERSITIES: University[] = [
  { id: '1', name: 'University of Technology', logo: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=100&h=100&fit=crop', primaryColor: '#2563eb' },
  { id: '2', name: 'State Academic Institute', logo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=100&h=100&fit=crop', primaryColor: '#dc2626' },
  { id: '3', name: 'Global Science University', logo: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?w=100&h=100&fit=crop', primaryColor: '#059669' },
];

export const COURSES: Course[] = [
  // SCIENCE - COMPUTER SCIENCE
  { id: 'c1', code: 'CSC 101', title: 'Introduction to Computing', description: 'Foundations of computer systems and history.', faculty: 'Science', department: 'Computer Science', level: '100L', lecturerName: 'Prof. Mark Wood', youtubeId: 'OAx_6-vdF8E', modules: [] },
  { id: 'c2', code: 'CSC 102', title: 'Logic and Philosophy', description: 'Discrete structures and logical reasoning.', faculty: 'Science', department: 'Computer Science', level: '100L', lecturerName: 'Dr. Alice Bohr', youtubeId: 'pyX8kQ-JzHI', modules: [] },
  { id: 'c3', code: 'CSC 201', title: 'Algorithms & Complexity', description: 'Analysis of sorting, searching and graph algorithms.', faculty: 'Science', department: 'Computer Science', level: '200L', lecturerName: 'Dr. Sarah Jenkins', youtubeId: '8hly31xKli0', modules: [] },
  { id: 'c4', code: 'CSC 202', title: 'Object Oriented Programming', description: 'Advanced Java and C++ programming patterns.', faculty: 'Science', department: 'Computer Science', level: '200L', lecturerName: 'Prof. Mark Wood', youtubeId: 'pTB0EiLXUC8', modules: [] },
  { id: 'c5', code: 'CSC 301', title: 'Operating Systems', description: 'Kernel architecture, threads, and memory management.', faculty: 'Science', department: 'Computer Science', level: '300L', lecturerName: 'Dr. Sarah Jenkins', youtubeId: '2m-9p4_Mv98', modules: [] },
  
  // SCIENCE - CHEMISTRY (Newly Added to fix your empty state)
  { id: 'ch1', code: 'CHM 101', title: 'General Chemistry I', description: 'Introduction to atomic structure and chemical bonding.', faculty: 'Science', department: 'Chemistry', level: '100L', lecturerName: 'Dr. Marie Curie', youtubeId: 'ad79nYk2keg', modules: [] },
  { id: 'ch2', code: 'CHM 102', title: 'Organic Chemistry Foundations', description: 'Study of carbon-based compounds and reactions.', faculty: 'Science', department: 'Chemistry', level: '100L', lecturerName: 'Dr. Marie Curie', youtubeId: 'ad79nYk2keg', modules: [] },
  { id: 'ch3', code: 'CHM 103', title: 'Practical Chemistry Lab', description: 'Hands-on laboratory safety and experimentation.', faculty: 'Science', department: 'Chemistry', level: '100L', lecturerName: 'Prof. Robert Boyle', youtubeId: 'ad79nYk2keg', modules: [] },
  { id: 'ch4', code: 'CHM 201', title: 'Inorganic Chemistry', description: 'Coordination chemistry and transition metals.', faculty: 'Science', department: 'Chemistry', level: '200L', lecturerName: 'Dr. Marie Curie', youtubeId: 'ad79nYk2keg', modules: [] },
  { id: 'ch5', code: 'CHM 205', title: 'Analytical Techniques', description: 'Spectroscopy and chromatography basics.', faculty: 'Science', department: 'Chemistry', level: '200L', lecturerName: 'Prof. Robert Boyle', youtubeId: 'ad79nYk2keg', modules: [] },

  // SCIENCE - BIOLOGY (Newly Added)
  { id: 'b1', code: 'BIO 101', title: 'General Biology I', description: 'Cell biology, genetics, and evolution.', faculty: 'Science', department: 'Biology', level: '100L', lecturerName: 'Dr. Charles Darwin', youtubeId: 'ad79nYk2keg', modules: [] },
  { id: 'b2', code: 'BIO 102', title: 'Plant Biology', description: 'Botanical structures and photosynthesis.', faculty: 'Science', department: 'Biology', level: '100L', lecturerName: 'Prof. Mendel', youtubeId: 'ad79nYk2keg', modules: [] },
  { id: 'b3', code: 'BIO 103', title: 'Animal Diversity', description: 'Zoological classifications and ecosystems.', faculty: 'Science', department: 'Biology', level: '100L', lecturerName: 'Dr. Charles Darwin', youtubeId: 'ad79nYk2keg', modules: [] },
  { id: 'b4', code: 'BIO 201', title: 'Genetics & Heredity', description: 'Inheritance patterns and DNA replication.', faculty: 'Science', department: 'Biology', level: '200L', lecturerName: 'Prof. Mendel', youtubeId: 'ad79nYk2keg', modules: [] },

  // SCIENCE - MATHEMATICS
  { id: 'm1', code: 'MTH 101', title: 'Algebra & Trigonometry', description: 'Basic algebraic structures and trig functions.', faculty: 'Science', department: 'Mathematics', level: '100L', lecturerName: 'Dr. Evans Cole', youtubeId: 'LwCRRUa8yTU', modules: [] },
  { id: 'm2', code: 'MTH 102', title: 'Calculus I', description: 'Limits, derivatives and integrals.', faculty: 'Science', department: 'Mathematics', level: '100L', lecturerName: 'Dr. Evans Cole', youtubeId: 'fNk_zzaMoSs', modules: [] },
  { id: 'm3', code: 'MTH 201', title: 'Linear Algebra', description: 'Vector spaces and matrix transformations.', faculty: 'Science', department: 'Mathematics', level: '200L', lecturerName: 'Dr. Evans Cole', youtubeId: 'fNk_zzaMoSs', modules: [] },

  // ENGINEERING - MECHANICAL
  { id: 'e1', code: 'MEG 101', title: 'Engr. Drawing I', description: 'Technical drawing and blueprint standards.', faculty: 'Engineering', department: 'Mechanical Engineering', level: '100L', lecturerName: 'Engr. David Stone', youtubeId: 'u6K2_yGqGjM', modules: [] },
  { id: 'e2', code: 'MEG 201', title: 'Thermodynamics I', description: 'Energy laws and heat transfer systems.', faculty: 'Engineering', department: 'Mechanical Engineering', level: '200L', lecturerName: 'Engr. David Stone', youtubeId: 'v8WvD9-f8-c', modules: [] },

  // SOCIAL SCIENCES - ECONOMICS
  { id: 'ec1', code: 'ECO 101', title: 'Microeconomics I', description: 'Supply, demand, and consumer behavior.', faculty: 'Social Sciences', department: 'Economics', level: '100L', lecturerName: 'Dr. Janet Yellen', youtubeId: 'HXV3zeQKqGY', modules: [] },
  { id: 'ec2', code: 'ECO 102', title: 'Macroeconomics I', description: 'National income and fiscal policy.', faculty: 'Social Sciences', department: 'Economics', level: '100L', lecturerName: 'Dr. Janet Yellen', youtubeId: 'HXV3zeQKqGY', modules: [] },

  // ART - PHILOSOPHY
  { id: 'ph1', code: 'PHL 101', title: 'Intro to Logic', description: 'Formal systems of deduction and induction.', faculty: 'Art', department: 'Philosophy', level: '100L', lecturerName: 'Prof. Socrates', youtubeId: 'pyX8kQ-JzHI', modules: [] }
];

export const FEED_POSTS: FeedPost[] = [
  {
    id: 'p1',
    authorId: 'l1',
    authorName: 'Prof. Johnson',
    authorRole: 'Dean, Science',
    content: 'Welcome back scholars! Remember to register your courses before Friday 5:00 PM. We have a great semester ahead with new virtual lab tools.',
    timestamp: '2 hours ago',
    likes: 24
  },
  {
    id: 'p2',
    authorId: 'l2',
    authorName: 'Dr. Sarah Jenkins',
    authorRole: 'Lecturer, CSC Dept',
    content: 'I have uploaded new reading materials for CSC 201. Please check your classroom module section. See you at the live session tomorrow.',
    timestamp: '5 hours ago',
    likes: 12
  }
];

export const LIVE_CLASSES: LiveClass[] = [
  { id: 'l1', title: 'Algorithmic Complexity Seminar', courseCode: 'CSC 201', startTime: 'Today, 2:00 PM', status: 'LIVE' },
  { id: 'l2', title: 'Calculus Q&A Session', courseCode: 'MTH 101', startTime: 'Tomorrow, 10:00 AM', status: 'SCHEDULED' }
];
