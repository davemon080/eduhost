
import React, { useState } from 'react';
import { University, UserProfile, Course, UserRole } from '../types';
import Sidebar from '../components/Sidebar';
import Community from './tabs/Community';
import Courses from './tabs/Courses';
import Classroom from './tabs/Classroom';
import LiveClassView from './tabs/LiveClassView';
import Schedule from './tabs/Schedule';
import Profile from './tabs/Profile';
import Settings from './tabs/Settings';
import LecturerDashboard from './lecturer/LecturerDashboard';
import { COURSES } from '../mockData';
import { User, Bell, Menu, X, Settings as SettingsIcon, LogOut, Home, BookOpen, Video, Calendar, GraduationCap } from 'lucide-react';

interface DashboardProps {
  university: University;
  user: UserProfile;
  onLogout: () => void;
  onUpdateUser: (user: UserProfile) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ university, user, onLogout, onUpdateUser }) => {
  const [activeTab, setActiveTab] = useState('community');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // For Student view
  const myCourses = COURSES.filter(c => user.courses.includes(c.id));
  const activeCourse = COURSES.find(c => c.id === selectedCourseId);

  // If Lecturer, render the Lecturer Specific Dashboard
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

  // --- Student Dashboard Render Logic ---
  const renderContent = () => {
    if (activeTab === 'profile') return <Profile user={user} onUpdate={onUpdateUser} onLogout={onLogout} />;
    if (activeTab === 'settings') return <Settings user={user} onUpdate={onUpdateUser} />;

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
      case 'live': return <LiveClassView />;
      case 'schedule': return <Schedule />;
      case 'assignments':
        return (
          <div className="p-12 text-center bg-white rounded-[2rem] border border-slate-100 shadow-sm max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-300">
              <Bell size={40} />
            </div>
            <h2 className="text-2xl font-black text-slate-800 mb-2">My Assignments</h2>
            <p className="text-slate-500 font-medium">No pending tasks. You are all caught up for the week!</p>
          </div>
        );
      case 'exams':
        return (
          <div className="p-12 text-center bg-white rounded-[2rem] border border-slate-100 shadow-sm max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-500">
              <GraduationCap size={40} />
            </div>
            <h2 className="text-2xl font-black text-slate-800 mb-2">Examination Portal</h2>
            <p className="text-slate-500 font-medium">There are no live exams or tests scheduled for today.</p>
          </div>
        );
      default: return <Community user={user} />;
    }
  };

  const navItems = [
    { id: 'community', icon: Home, label: 'Community' },
    { id: 'courses', icon: BookOpen, label: 'Courses' },
    { id: 'schedule', icon: Calendar, label: 'Schedule' },
    { id: 'live', icon: Video, label: 'Live' },
    { id: 'assignments', icon: GraduationCap, label: 'Tasks' },
    { id: 'exams', icon: SettingsIcon, label: 'Exams' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(tab) => { setSelectedCourseId(null); setActiveTab(tab); }} 
        onLogout={onLogout} 
        universityName={university.name}
      />

      <div className={`fixed inset-0 z-[100] md:hidden transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
        <div className={`absolute top-0 bottom-0 left-0 w-80 bg-white shadow-2xl transition-transform duration-500 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-8 h-full flex flex-col">
            <div className="flex items-center justify-between mb-12">
               <h1 className="text-xl font-black text-blue-600">{university.name}</h1>
               <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-slate-400 hover:text-slate-900"><X size={24}/></button>
            </div>
            <nav className="flex-1 space-y-3">
              {navItems.map(item => (
                <button 
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); setSelectedCourseId(null); }}
                  className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === item.id ? 'bg-blue-600 text-white shadow-xl shadow-blue-200' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                  <item.icon size={20} />
                  {item.label}
                </button>
              ))}
              <div className="pt-8 border-t border-slate-100 space-y-3">
                <button onClick={() => { setActiveTab('settings'); setIsMobileMenuOpen(false); }} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === 'settings' ? 'bg-blue-600 text-white shadow-xl shadow-blue-200' : 'text-slate-500 hover:bg-slate-50'}`}>
                  <SettingsIcon size={20} />
                  Settings
                </button>
                <button onClick={onLogout} className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-red-500 hover:bg-red-50 transition-all">
                  <LogOut size={20} />
                  Logout
                </button>
              </div>
            </nav>
          </div>
        </div>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-slate-100 px-4 py-2 flex items-center justify-around z-50">
        {navItems.slice(0, 5).map(item => (
          <button 
            key={item.id}
            onClick={() => { setActiveTab(item.id); setSelectedCourseId(null); }}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${activeTab === item.id ? 'text-blue-600' : 'text-slate-400'}`}
          >
            <item.icon size={20} />
            <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
          </button>
        ))}
      </div>

      <main className="flex-1 md:ml-64 flex flex-col min-w-0 pb-20 md:pb-0">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 md:px-12 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-xl transition-colors">
              <Menu size={24} />
            </button>
            <h2 className="text-xl font-black text-slate-800 capitalize">
              {activeTab.replace('-', ' ')}
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-3 text-slate-400 hover:text-blue-600 transition-colors hidden sm:block">
              <Bell size={22} />
              <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-[1px] bg-slate-100 mx-2 hidden sm:block"></div>
            <button 
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-3 p-1 rounded-2xl transition-all ${activeTab === 'profile' ? 'bg-blue-50 ring-2 ring-blue-100' : 'hover:bg-slate-50'}`}
            >
              <div className="text-right hidden lg:block">
                <p className="text-sm font-black text-slate-800 leading-none">{user.name}</p>
                <p className="text-[10px] text-slate-400 mt-1 font-bold uppercase tracking-widest">{user.role}</p>
              </div>
              <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-black transition-all shadow-sm ${activeTab === 'profile' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'}`}>
                {user.name.charAt(0)}
              </div>
            </button>
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
