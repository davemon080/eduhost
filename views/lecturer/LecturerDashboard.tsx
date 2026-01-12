
import React, { useState } from 'react';
import { UserProfile, University, Course } from '../../types';
import { COURSES } from '../../mockData';
import { 
  Home, 
  BookOpen, 
  Calendar, 
  Video, 
  FileText, 
  MessageSquare, 
  Plus, 
  Search, 
  Settings as SettingsIcon,
  LogOut,
  Menu,
  X,
  User,
  ArrowRight,
  Monitor,
  // Added missing Bell import
  Bell
} from 'lucide-react';
import ManageCourse from './ManageCourse';
import ManageCommunity from './ManageCommunity';

interface LecturerDashboardProps {
  user: UserProfile;
  university: University;
  onLogout: () => void;
  onUpdateUser: (user: UserProfile) => void;
}

const LecturerDashboard: React.FC<LecturerDashboardProps> = ({ user, university, onLogout, onUpdateUser }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const managedCourses = COURSES.filter(c => user.courses.includes(c.id));
  const activeCourse = COURSES.find(c => c.id === selectedCourseId);

  const navItems = [
    { id: 'overview', icon: Home, label: 'Control Center' },
    { id: 'courses', icon: BookOpen, label: 'Curriculum' },
    { id: 'community', icon: MessageSquare, label: 'Broadcasting' },
    { id: 'exams', icon: FileText, label: 'Assessments' },
    { id: 'schedule', icon: Calendar, label: 'Timetable' },
  ];

  const renderContent = () => {
    if (selectedCourseId && activeCourse) {
      return (
        <ManageCourse 
          course={activeCourse} 
          onBack={() => { setSelectedCourseId(null); setActiveTab('courses'); }} 
        />
      );
    }

    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
              <div className="relative z-10">
                <h2 className="text-3xl font-black mb-2">Welcome, {user.name.split(',')[0]}</h2>
                <p className="text-slate-400 font-medium">Faculty of {user.faculty} • Department of {user.department}</p>
                <div className="mt-8 flex gap-4">
                  <div className="bg-white/5 backdrop-blur-xl p-4 rounded-3xl border border-white/10">
                    <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1">Students Reached</p>
                    <p className="text-2xl font-bold">1,240+</p>
                  </div>
                  <div className="bg-white/5 backdrop-blur-xl p-4 rounded-3xl border border-white/10">
                    <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1">Courses Active</p>
                    <p className="text-2xl font-bold">{managedCourses.length}</p>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm">
                <h3 className="text-xl font-black text-slate-900 mb-6">Active Curriculum</h3>
                <div className="space-y-4">
                  {managedCourses.map(c => (
                    <button 
                      key={c.id} 
                      onClick={() => setSelectedCourseId(c.id)}
                      className="w-full flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-slate-300 transition-all group"
                    >
                      <div className="flex items-center gap-4 text-left">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center font-black text-slate-400 border border-slate-100">
                          {c.code.split(' ')[0]}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800">{c.code}</p>
                          <p className="text-xs text-slate-500">{c.title}</p>
                        </div>
                      </div>
                      <ArrowRight size={18} className="text-slate-300 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" />
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="bg-slate-50 rounded-[2.5rem] border border-slate-200 border-dashed p-10 flex flex-col items-center justify-center text-center">
                 <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-slate-400 mb-4 shadow-sm">
                    <Plus size={24} />
                 </div>
                 <h3 className="font-bold text-slate-800">Add New Course</h3>
                 <p className="text-xs text-slate-400 mt-1">Requires approval from the Faculty Head.</p>
                 <button className="mt-6 px-8 py-3 bg-slate-900 text-white rounded-2xl text-sm font-bold shadow-xl shadow-slate-200 hover:bg-blue-600 transition-colors">Request Listing</button>
              </div>
            </div>
          </div>
        );
      case 'courses':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4">
            {managedCourses.map(course => (
              <div key={course.id} className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm hover:shadow-xl transition-all group">
                <div className="flex items-center justify-between mb-6">
                  <div className="px-3 py-1 bg-slate-900 text-white text-[10px] font-black rounded-lg uppercase tracking-widest">{course.level}</div>
                  <div className="text-slate-400 group-hover:text-blue-600 transition-colors"><BookOpen size={20} /></div>
                </div>
                <h4 className="text-lg font-black text-slate-900 mb-2">{course.code}: {course.title}</h4>
                <p className="text-xs text-slate-400 font-medium mb-8 leading-relaxed line-clamp-2">{course.description}</p>
                <div className="flex flex-col gap-2">
                  <button 
                    onClick={() => setSelectedCourseId(course.id)}
                    className="w-full py-4 bg-slate-50 text-slate-900 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all border border-slate-200"
                  >
                    Manage Content
                  </button>
                </div>
              </div>
            ))}
          </div>
        );
      case 'community':
        return <ManageCommunity user={user} />;
      case 'exams':
        return (
          <div className="max-w-4xl mx-auto py-12 text-center bg-white rounded-[3rem] border border-slate-100 shadow-sm">
            <div className="w-24 h-24 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-8">
              <FileText size={48} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-4">Assessment Center</h2>
            <p className="text-slate-500 max-w-sm mx-auto mb-10">Set questions, manage grading rubrics, and schedule examination periods for your students.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-blue-600 transition-all shadow-xl shadow-slate-200">Create New Exam</button>
              <button className="px-10 py-4 border-2 border-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-all">Grade Submissions</button>
            </div>
          </div>
        );
      case 'schedule':
        return (
          <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm max-w-5xl mx-auto">
             <div className="flex items-center justify-between mb-10">
                <h3 className="text-2xl font-black text-slate-900">Weekly Lecture Planner</h3>
                <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl text-sm font-bold shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all">
                  <Plus size={18} /> Add Slot
                </button>
             </div>
             <div className="space-y-4">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
                  <div key={day} className="flex items-center gap-8 p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:border-slate-300 transition-all">
                    <div className="w-24 text-sm font-black text-slate-400 uppercase tracking-widest">{day}</div>
                    <div className="flex-1 flex flex-wrap gap-4">
                       <div className="px-5 py-3 bg-white rounded-2xl border border-slate-200 text-xs font-bold text-slate-600 flex items-center gap-3">
                          <Calendar size={14} className="text-blue-500"/>
                          08:00 - 10:00 (Virtual)
                       </div>
                       <div className="px-5 py-3 bg-white/50 border border-dashed border-slate-300 rounded-2xl text-[10px] font-black text-slate-300 uppercase flex items-center justify-center min-w-[120px]">
                          Available
                       </div>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar - Admin Stylized */}
      <aside className="fixed left-0 top-0 h-screen w-72 bg-slate-900 hidden md:flex flex-col z-50 text-white p-8">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
              <Monitor size={24}/>
            </div>
            <h1 className="text-lg font-black tracking-tighter">EduAdmin</h1>
          </div>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{university.name}</p>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { setSelectedCourseId(null); setActiveTab(item.id); }}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold transition-all ${activeTab === item.id ? 'bg-white/10 text-white shadow-xl' : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'}`}
            >
              <item.icon size={20} className={activeTab === item.id ? 'text-blue-500' : 'text-slate-600'} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="pt-8 border-t border-slate-800 space-y-4">
           <button onClick={() => { setSelectedCourseId(null); setActiveTab('profile'); }} className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold text-slate-500 hover:text-white transition-all group">
              <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center font-black group-hover:bg-blue-600 group-hover:text-white transition-all">
                {user.name.charAt(0)}
              </div>
              <div className="text-left">
                <p className="text-xs font-bold leading-none">{user.name}</p>
                <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-tighter">View Profile</p>
              </div>
           </button>
           <button onClick={onLogout} className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold text-red-500 hover:bg-red-500/10 transition-all">
              <LogOut size={20} />
              Sign Out
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-72 min-w-0 p-6 md:p-12">
        <header className="flex items-center justify-between mb-12">
           <div className="flex items-center gap-4">
              <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden p-3 bg-white rounded-2xl border border-slate-100 text-slate-900 shadow-sm"><Menu size={20}/></button>
              <h2 className="text-2xl font-black text-slate-900 capitalize tracking-tight">{selectedCourseId ? 'Manage Course' : activeTab}</h2>
           </div>
           <div className="flex items-center gap-4">
              <div className="hidden sm:flex relative items-center">
                 <Search size={18} className="absolute left-4 text-slate-400" />
                 <input type="text" placeholder="Search student ID..." className="pl-12 pr-6 py-3 bg-white border border-slate-100 rounded-2xl text-sm outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 w-64 transition-all" />
              </div>
              <button className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-blue-600 shadow-sm relative">
                <Bell size={20} />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-600 rounded-full border-2 border-white"></span>
              </button>
           </div>
        </header>

        <div className="max-w-[1400px]">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default LecturerDashboard;
