
import React, { useState } from 'react';
import { University, UserProfile, Course, UserRole } from '../types';
import Sidebar from '../components/Sidebar';
import Community from './tabs/Community';
import Courses from './tabs/Courses';
import Classroom from './tabs/Classroom';
import LiveClassView from './tabs/LiveClassView';
import Schedule from './tabs/Schedule';
import You from './tabs/You';
import LecturerDashboard from './lecturer/LecturerDashboard';
import { COURSES } from '../mockData';
import { User, Bell, Home, BookOpen, Calendar, GraduationCap, ArrowLeft, Search, MessageSquare } from 'lucide-react';

interface DashboardProps {
  university: University;
  user: UserProfile;
  onLogout: () => void;
  onUpdateUser: (user: UserProfile) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ university, user, onLogout, onUpdateUser }) => {
  const [activeTab, setActiveTab] = useState('community');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  // For Student view
  const myCourses = COURSES.filter(c => user.courses.includes(c.id));
  const activeCourse = COURSES.find(c => c.id === selectedCourseId);

  const handleBackNavigation = () => {
    if (selectedCourseId) {
      setSelectedCourseId(null);
      setActiveTab('courses');
    }
  };

  if (user.role === UserRole.LECTURER) {
    return (
      <LecturerDashboard 
        user={user} 
        university={university} 
        onLogout={onLogout} 
        onUpdateUser={onUpdateUser}
      />
    );
  }

  const renderContent = () => {
    if (selectedCourseId && activeCourse) {
      return (
        <Classroom 
          course={activeCourse} 
          onBack={() => {
            setSelectedCourseId(null);
            setActiveTab('courses');
          }} 
        />
      );
    }

    switch (activeTab) {
      case 'community': return <Community user={user} />;
      case 'courses': return <Courses courses={myCourses} onSelectCourse={(id) => setSelectedCourseId(id)} />;
      case 'schedule': return <Schedule />;
      case 'exams':
        return (
          <div className="p-12 text-center bg-white rounded-[2rem] border border-slate-100 shadow-sm max-w-2xl mx-auto animate-in fade-in duration-500">
            <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-500">
              <GraduationCap size={40} />
            </div>
            <h2 className="text-2xl font-black text-slate-800 mb-2">Assessments</h2>
            <p className="text-slate-500 font-medium">No live exams or tests are currently active for your registered courses.</p>
          </div>
        );
      case 'you': return <You user={user} onUpdate={onUpdateUser} onLogout={onLogout} />;
      default: return <Community user={user} />;
    }
  };

  // Standard labels and icons as requested:
  // Updates -> Community
  // Communities -> Courses
  // Calls -> Schedule
  // Chats -> Assessments
  const navItems = [
    { id: 'community', icon: Home, label: 'Community', badge: true },
    { id: 'courses', icon: BookOpen, label: 'Courses' },
    { id: 'schedule', icon: Calendar, label: 'Schedule' },
    { id: 'exams', icon: GraduationCap, label: 'Assessments', count: 61 },
    { id: 'you', icon: User, label: 'You', isAvatar: true },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row relative">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(tab) => { setSelectedCourseId(null); setActiveTab(tab); }} 
        onLogout={onLogout} 
        universityName={university.name}
      />

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

      <main className="flex-1 md:ml-64 flex flex-col min-w-0 pb-32 md:pb-0">
        <header className="h-20 bg-white/70 backdrop-blur-xl border-b border-slate-100 px-6 md:px-12 flex items-center justify-between sticky top-0 z-40">
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
              <h2 className="text-xl font-black text-slate-800 capitalize leading-none">
                {activeTab === 'you' ? 'Account Hub' : activeTab.replace('-', ' ')}
              </h2>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 hidden sm:block">
                {university.name}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden lg:flex relative items-center">
              <Search size={16} className="absolute left-4 text-slate-300" />
              <input 
                type="text" 
                placeholder="Search resources..." 
                className="pl-12 pr-6 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-xs outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 w-48 transition-all" 
              />
            </div>
            <button className="relative p-3 text-slate-400 hover:text-blue-600 transition-colors">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-6 w-[1px] bg-slate-100 mx-1 hidden sm:block"></div>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black shadow-sm bg-blue-100 text-blue-600">
              {user.name.charAt(0)}
            </div>
          </div>
        </header>

        <div className="p-6 md:p-12 overflow-y-auto max-w-[1600px] mx-auto w-full">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
