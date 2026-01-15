
export enum UserRole {
  STUDENT = 'STUDENT',
  LECTURER = 'LECTURER',
  ADMIN = 'ADMIN'
}

export interface University {
  id: string;
  name: string;
  logo: string;
  primaryColor: string;
}

export interface Module {
  id: string;
  title: string;
  fileUrl: string;
  type: 'PDF' | 'DOC' | 'VIDEO';
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  modules: Module[];
  timestamps?: { time: string; label: string }[];
}

export interface Course {
  id: string;
  code: string;
  title: string;
  description: string;
  faculty: string;
  department: string;
  level: string;
  lecturerName: string;
  lessons: Lesson[];
  modules: Module[];
  youtubeId: string;
}

export interface SavedRecording {
  id: string;
  title: string;
  courseCode: string;
  date: string;
  duration: string;
  thumbnail: string;
}

export interface AcademicRecord {
  semester: string;
  gpa: number;
  completedCourses: string[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  matricNo?: string;
  staffId?: string;
  universityId: string;
  role: UserRole;
  level?: string;
  faculty: string;
  department: string;
  courses: string[]; 
  progress?: AcademicRecord[];
  recordings?: SavedRecording[];
  avatar?: string;
  settings?: {
    notifications: boolean;
    darkMode: boolean;
    twoFactor: boolean;
  };
}

export interface FeedPost {
  id: string;
  authorId: string;
  authorName: string;
  authorRole: string;
  content: string;
  timestamp: string;
  likes: number;
}

export interface LiveClass {
  id: string;
  title: string;
  courseCode: string;
  startTime: string;
  status: 'SCHEDULED' | 'LIVE' | 'COMPLETED';
}
