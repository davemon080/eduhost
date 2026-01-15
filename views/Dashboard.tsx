
import React, { useState } from 'react';
import { University, UserProfile, Course, UserRole } from '../types';
import Sidebar from '../components/Sidebar';
import Community from './tabs/Community';
import Courses from './tabs/Courses';
import Classroom from './tabs/Classroom';
import LiveClassView from './tabs/LiveClassView';
import Schedule from './tabs/Schedule';
import You from './tabs/You';
import Assessments from './tabs/Assessments';
import LecturerDashboard from './lecturer/LecturerDashboard';
import { COURSES } from '../mockData';
import { User, Bell, Home, BookOpen, Calendar, GraduationCap, ArrowLeft, Search, MessageSquare, MoreVertical, Phone, Users, Video } from 'lucide-react';

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
      case 'schedule': return <Schedule onJoinLive={() => setActiveTab('live')} />;
      case 'live': return <LiveClassView user={user} onBack={() => setActiveTab('schedule')} />;
      case 'exams': return <Assessments />;
      case 'you': return <You user={user} onUpdate={onUpdateUser} onLogout={onLogout} />;
      default: return <Community user={user} />;
    }
  };

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

      {/* MOBILE BOTTOM MENU - DARK STYLE */}
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
              <span className="text-[10px] font-medium tracking-tight">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <main className="flex-1 md:ml-64 flex flex-col min-w-0 pb-32 md:pb-0">
        <div className="p-6 md:p-12 overflow-y-auto max-w-[1600px] mx-auto w-full">
          {/* BODY CONTENT HEADER */}
          <div className="flex items-center justify-between mb-10 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="flex items-center gap-4">
              {(selectedCourseId || activeTab === 'live') && (
                <button 
                  onClick={() => {
                    if (activeTab === 'live') {
                      setActiveTab('schedule');
                    } else {
                      handleBackNavigation();
                    }
                  }}
                  className="p-3 bg-slate-900 text-white rounded-2xl hover:bg-blue-600 transition-all shadow-xl flex items-center justify-center"
                >
                  <ArrowLeft size={20} />
                </button>
              )}
              <div className="flex flex-col">
                <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-none capitalize">
                  {activeTab === 'you' ? 'Account Hub' : activeTab.replace('-', ' ')}
                </h1>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">
                  {university.name}
                </p>
              </div>
            </div>

            {/* Notification and Dots aligned horizontally */}
            <div className="flex items-center gap-2">
              <button className="relative p-2 text-slate-400 hover:text-blue-600 transition-colors">
                <Bell size={24} />
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-slate-50"></span>
              </button>
              <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                <MoreVertical size={24} />
              </button>
            </div>
          </div>

          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
