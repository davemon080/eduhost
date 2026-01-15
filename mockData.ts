
import { University, Course, FeedPost, LiveClass } from './types';

export const UNIVERSITIES: University[] = [
  { id: '1', name: 'University of Technology', logo: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=100&h=100&fit=crop', primaryColor: '#2563eb' },
  { id: '2', name: 'State Academic Institute', logo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=100&h=100&fit=crop', primaryColor: '#dc2626' },
  { id: '3', name: 'Global Science University', logo: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?w=100&h=100&fit=crop', primaryColor: '#059669' },
];

export const COURSES: Course[] = [
  { 
    id: 'c1', 
    code: 'CSC 101', 
    title: 'Introduction to Computing', 
    description: 'Foundations of computer systems and history.', 
    faculty: 'Science', 
    department: 'Computer Science', 
    level: '100L', 
    lecturerName: 'Prof. Mark Wood', 
    youtubeId: 'OAx_6-vdF8E', 
    modules: [],
    lessons: [
      {
        id: 'l1',
        title: 'History of Computing',
        description: 'Tracing the evolution from abacus to modern microprocessors.',
        youtubeId: 'OAx_6-vdF8E',
        modules: [
          { id: 'm1', title: 'Early Computing Era Notes', type: 'PDF', fileUrl: '#' },
          { id: 'm2', title: 'The Turing Machine Theory', type: 'PDF', fileUrl: '#' }
        ],
        timestamps: [{ time: '02:30', label: 'The Abacus' }, { time: '08:45', label: 'Mechanical Computers' }]
      },
      {
        id: 'l2',
        title: 'Binary & Data Representation',
        description: 'How computers understand information using bits and bytes.',
        youtubeId: 'pyX8kQ-JzHI',
        modules: [
          { id: 'm3', title: 'Binary Math Cheat Sheet', type: 'PDF', fileUrl: '#' }
        ],
        timestamps: [{ time: '01:00', label: 'Introduction to Bits' }]
      }
    ]
  },
  { 
    id: 'c2', 
    code: 'CSC 102', 
    title: 'Logic and Philosophy', 
    description: 'Discrete structures and logical reasoning.', 
    faculty: 'Science', 
    department: 'Computer Science', 
    level: '100L', 
    lecturerName: 'Dr. Alice Bohr', 
    youtubeId: 'pyX8kQ-JzHI', 
    modules: [],
    lessons: [
      {
        id: 'l3',
        title: 'Propositional Logic',
        description: 'Introduction to logic gates and truth tables.',
        youtubeId: 'pyX8kQ-JzHI',
        modules: [
          { id: 'm4', title: 'Logic Gate Diagrams', type: 'PDF', fileUrl: '#' }
        ]
      }
    ]
  },
  { id: 'c3', code: 'CSC 201', title: 'Algorithms & Complexity', description: 'Analysis of sorting, searching and graph algorithms.', faculty: 'Science', department: 'Computer Science', level: '200L', lecturerName: 'Dr. Sarah Jenkins', youtubeId: '8hly31xKli0', modules: [], lessons: [] },
  { id: 'c4', code: 'CSC 202', title: 'Object Oriented Programming', description: 'Advanced Java and C++ programming patterns.', faculty: 'Science', department: 'Computer Science', level: '200L', lecturerName: 'Prof. Mark Wood', youtubeId: 'pTB0EiLXUC8', modules: [], lessons: [] },
  { id: 'c5', code: 'CSC 301', title: 'Operating Systems', description: 'Kernel architecture, threads, and memory management.', faculty: 'Science', department: 'Computer Science', level: '300L', lecturerName: 'Dr. Sarah Jenkins', youtubeId: '2m-9p4_Mv98', modules: [], lessons: [] },
  { id: 'ch1', code: 'CHM 101', title: 'General Chemistry I', description: 'Introduction to atomic structure and chemical bonding.', faculty: 'Science', department: 'Chemistry', level: '100L', lecturerName: 'Dr. Marie Curie', youtubeId: 'ad79nYk2keg', modules: [], lessons: [] },
  { id: 'm1', code: 'MTH 101', title: 'Algebra & Trigonometry', description: 'Basic algebraic structures and trig functions.', faculty: 'Science', department: 'Mathematics', level: '100L', lecturerName: 'Dr. Evans Cole', youtubeId: 'LwCRRUa8yTU', modules: [], lessons: [] },
  { id: 'e1', code: 'MEG 101', title: 'Engr. Drawing I', description: 'Technical drawing and blueprint standards.', faculty: 'Engineering', department: 'Mechanical Engineering', level: '100L', lecturerName: 'Engr. David Stone', youtubeId: 'u6K2_yGqGjM', modules: [], lessons: [] },
];

export const FEED_POSTS: FeedPost[] = [
  {
    id: 'p1',
    authorId: 'l1',
    authorName: 'Prof. Johnson',
    authorRole: 'Dean, Science',
    content: 'Welcome back scholars! Remember to register your courses before Friday 5:00 PM.',
    timestamp: '2 hours ago',
    likes: 24
  }
];

export const LIVE_CLASSES: LiveClass[] = [
  { id: 'l1', title: 'Algorithmic Complexity Seminar', courseCode: 'CSC 201', startTime: 'Today, 2:00 PM', status: 'LIVE' }
];
