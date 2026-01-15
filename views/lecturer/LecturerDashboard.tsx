
import React, { useState } from 'react';
import { UserProfile, University, Course } from '../../types';
import { COURSES } from '../../mockData';
import { 
  Home, 
  BookOpen, 
  Calendar, 
  GraduationCap,
  Plus, 
  Search, 
  LogOut,
  User,
  Monitor,
  Bell,
  ArrowLeft
} from 'lucide-react';
import ManageCourse from './ManageCourse';
import ManageCommunity from './ManageCommunity';
import ManageExams from './ManageExams';
import ManageSchedule from './ManageSchedule';
import You from '../tabs/You';

interface LecturerDashboardProps {
  user: UserProfile;
  university: University;
  onLogout: () => void;
  onUpdateUser: (user: UserProfile) => void;
}

const LecturerDashboard: React.FC<LecturerDashboardProps> = ({ user, university, onLogout, onUpdateUser }) => {
  const [activeTab, setActiveTab] = useState('community');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  const managedCourses = COURSES.filter(c => user.courses.includes(c.id));
  const activeCourse = COURSES.find(c => c.id === selectedCourseId);

  const handleBackNavigation = () => {
    if (selectedCourseId) {
      setSelectedCourseId(null);
      setActiveTab('courses');
    }
  };

  const renderContent = () => {
    if (selectedCourseId && activeCourse) {
      return (
        <ManageCourse 
          course={activeCourse} 
          onBack={handleBackNavigation} 
        />
      );
    }

    switch (activeTab) {
      case 'community': return <ManageCommunity user={user} />;
      case 'courses': return (
        <div className="animate-in fade-in slide-in-from-bottom-4 space-y-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-slate-900">Institutional Curriculum</h3>
            <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-500/20">
               <Plus size={16}/> New Course
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {managedCourses.map(course => (
              <div key={course.id} className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm hover:shadow-xl transition-all group">
                <div className="flex items-center justify-between mb-6">
                  <div className="px-3 py-1 bg-slate-900 text-white text-[10px] font-black rounded-lg uppercase tracking-widest">{course.level}</div>
                  <div className="text-slate-400 group-hover:text-blue-600 transition-colors"><BookOpen size={20} /></div>
                </div>
                <h4 className="text-lg font-black text-slate-900 mb-2">{course.code}: {course.title}</h4>
                <p className="text-xs text-slate-400 font-medium mb-8 leading-relaxed line-clamp-2">{course.description}</p>
                <button 
                  onClick={() => setSelectedCourseId(course.id)}
                  className="w-full py-4 bg-slate-50 text-slate-900 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all border border-slate-200"
                >
                  Manage Materials
                </button>
              </div>
            ))}
          </div>
        </div>
      );
      case 'schedule': return <ManageSchedule />;
      case 'exams': return <ManageExams />;
      case 'you': return <You user={user} onUpdate={onUpdateUser} onLogout={onLogout} />;
      default: return <ManageCommunity user={user} />;
    }
  };

  const navItems = [
    { id: 'community', icon: Home, label: 'Community', badge: true },
    { id: 'courses', icon: BookOpen, label: 'Courses' },
    { id: 'schedule', icon: Calendar, label: 'Schedule' },
    { id: 'exams', icon: GraduationCap, label: 'Assessments', count: 12 },
    { id: 'you', icon: User, label: 'You', isAvatar: true },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row relative">
      <aside className="fixed left-0 top-0 h-screen w-72 bg-slate-900 hidden md:flex flex-col z-50 text-white p-8 border-r border-white/5">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
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
           <div className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold text-slate-500">
              <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center font-black">
                {user.name.charAt(0)}
              </div>
              <div className="text-left">
                <p className="text-xs font-bold leading-none text-white">{user.name}</p>
                <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-tighter">Administrator</p>
              </div>
           </div>
           <button onClick={onLogout} className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold text-red-500 hover:bg-red-500/10 transition-all">
              <LogOut size={20} />
              Sign Out
           </button>
        </div>
      </aside>

      {/* MOBILE BOTTOM MENU - MATCHING IMAGE STYLE WITH UPDATED LABELS */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[100] bg-[#1a1a1a]/95 backdrop-blur-xl border-t border-white/5 pt-3 pb-8 px-6">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          {navItems.map(item => (
            <button 
              key={item.id}
              onClick={() => { setSelectedCourseId(null); setActiveTab(item.id); }}
              className={`flex flex-col items-center gap-1 group relative transition-colors duration-200 ${activeTab === item.id ? 'text-white' : 'text-zinc-500'}`}
            >
              <div className="relative">
                {item.isAvatar ? (
                  <div className={`w-7 h-7 rounded-full overflow-hidden border-2 transition-all ${activeTab === item.id ? 'border-white' : 'border-zinc-700'}`}>
                    <img src={`https://ui-avatars.com/api/?name=${user.name}&background=random&color=fff`} className="w-full h-full object-cover" alt="Profile" />
                  </div>
                ) : (
                  <item.icon size={26} strokeWidth={activeTab === item.id ? 2.5 : 2} />
                )}
                
                {item.count && (
                  <span className="absolute -top-1.5 -right-3 px-1.5 py-0.5 bg-[#22c55e] text-black text-[10px] font-bold rounded-full min-w-[18px] text-center">
                    {item.count}
                  </span>
                )}
                
                {item.badge && !item.count && (
                  <span className="absolute top-0 -right-0.5 w-2 h-2 bg-[#22c55e] rounded-full border border-[#1a1a1a]"></span>
                )}
              </div>
              <span className="text-[10px] font-medium tracking-tight">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <main className="flex-1 md:ml-72 min-w-0 p-6 md:p-12 pb-32 md:pb-12">
        <header className="flex items-center justify-between mb-12">
           <div className="flex items-center gap-4">
              {selectedCourseId && (
                <button 
                  onClick={handleBackNavigation}
                  className="p-3 bg-slate-900 text-white rounded-2xl hover:bg-blue-600 transition-all shadow-xl flex items-center justify-center animate-in slide-in-from-left-4"
                >
                  <ArrowLeft size={20} />
                </button>
              )}
              <div className="flex flex-col">
                <h2 className="text-2xl font-black text-slate-900 capitalize tracking-tight leading-none">
                  {activeTab === 'you' ? 'You' : activeTab.replace('-', ' ')}
                </h2>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 hidden sm:block">
                  {university.name} • Institutional Admin
                </span>
              </div>
           </div>
           <div className="flex items-center gap-4">
              <div className="hidden sm:flex relative items-center">
                 <Search size={18} className="absolute left-4 text-slate-400" />
                 <input 
                  type="text" 
                  placeholder="Universal search..." 
                  className="pl-12 pr-6 py-3 bg-white border border-slate-100 rounded-2xl text-sm outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 w-64 transition-all" 
                />
              </div>
              <button className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-blue-600 shadow-sm relative transition-colors">
                <Bell size={20} />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-600 rounded-full border-2 border-white"></span>
              </button>
           </div>
        </header>

        <div className="max-w-[1400px] mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default LecturerDashboard;
