
import React, { useState, useRef, useEffect } from 'react';
import { University, UserProfile, Course, UserRole, SavedRecording } from '../types';
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
import { 
  User, 
  Bell, 
  Home, 
  BookOpen, 
  Calendar, 
  GraduationCap, 
  ArrowLeft, 
  Search, 
  MessageSquare, 
  MoreVertical, 
  Phone, 
  Users, 
  Video,
  X,
  LifeBuoy,
  MessageCircle,
  Settings as SettingsIcon,
  LogOut,
  Info
} from 'lucide-react';

interface DashboardProps {
  university: University;
  user: UserProfile;
  onLogout: () => void;
  onUpdateUser: (user: UserProfile) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ university, user, onLogout, onUpdateUser }) => {
  const [activeTab, setActiveTab] = useState('community');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMiniMenu, setShowMiniMenu] = useState(false);

  const notificationRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMiniMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // For Student view
  const myCourses = COURSES.filter(c => user.courses.includes(c.id));
  const activeCourse = COURSES.find(c => c.id === selectedCourseId);

  const handleBackNavigation = () => {
    if (selectedCourseId) {
      setSelectedCourseId(null);
      setActiveTab('courses');
    }
  };

  const handleSaveRecording = (recording: SavedRecording) => {
    const updatedUser = {
      ...user,
      recordings: [...(user.recordings || []), recording]
    };
    onUpdateUser(updatedUser);
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
      case 'live': return <LiveClassView user={user} onBack={() => setActiveTab('schedule')} onSaveRecording={handleSaveRecording} />;
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

  const notifications = [
    { id: 1, title: 'New Study Material', desc: 'Prof. Mark uploaded a new PDF for CSC 101.', time: '10m ago', unread: true },
    { id: 2, title: 'Live Class Starting', desc: 'CSC 201 Seminar starts in 15 minutes.', time: '45m ago', unread: true },
    { id: 3, title: 'Assignment Graded', desc: 'Your Logic & Philosophy essay has been reviewed.', time: '2h ago', unread: false },
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
          <div className="flex items-center justify-between mb-10 animate-in fade-in slide-in-from-top-4 duration-500 relative">
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

            <div className="flex items-center gap-2">
              {/* Notification Button & Dropdown */}
              <div className="relative" ref={notificationRef}>
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={`relative p-2 transition-all rounded-xl ${showNotifications ? 'bg-blue-50 text-blue-600' : 'text-slate-400 hover:text-blue-600 hover:bg-slate-100'}`}
                >
                  <Bell size={24} />
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-50"></span>
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-3 w-80 bg-white/95 backdrop-blur-xl border border-slate-100 rounded-[2rem] shadow-2xl z-[120] animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
                    <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                       <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Notifications</h3>
                       <button className="text-[10px] font-black text-blue-600 uppercase hover:underline">Clear All</button>
                    </div>
                    <div className="max-h-96 overflow-y-auto divide-y divide-slate-50">
                      {notifications.map(n => (
                        <div key={n.id} className={`p-5 flex gap-4 hover:bg-slate-50 transition-colors cursor-pointer group ${n.unread ? 'bg-blue-50/20' : ''}`}>
                          <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${n.unread ? 'bg-blue-500' : 'bg-transparent'}`}></div>
                          <div className="flex-1">
                            <p className="text-sm font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">{n.title}</p>
                            <p className="text-xs text-slate-500 mt-1 leading-relaxed">{n.desc}</p>
                            <p className="text-[10px] font-black text-slate-300 uppercase mt-2">{n.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button className="w-full py-4 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest hover:bg-slate-50 transition-colors">
                      View all alerts
                    </button>
                  </div>
                )}
              </div>

              {/* More Actions Button & Dropdown */}
              <div className="relative" ref={menuRef}>
                <button 
                  onClick={() => setShowMiniMenu(!showMiniMenu)}
                  className={`p-2 transition-all rounded-xl ${showMiniMenu ? 'bg-slate-900 text-white' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-100'}`}
                >
                  <MoreVertical size={24} />
                </button>

                {showMiniMenu && (
                  <div className="absolute right-0 mt-3 w-56 bg-slate-900 rounded-3xl shadow-2xl z-[120] animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden py-2 border border-white/5">
                    {[
                      { icon: Info, label: 'Platform Info', onClick: () => {} },
                      { icon: LifeBuoy, label: 'Help Center', onClick: () => { setActiveTab('you'); setShowMiniMenu(false); } },
                      { icon: MessageCircle, label: 'Send Feedback', onClick: () => {} },
                      { divider: true },
                      { icon: LogOut, label: 'Institutional Logout', onClick: onLogout, danger: true },
                    ].map((item, i) => (
                      item.divider ? (
                        <div key={i} className="h-px bg-white/10 my-2 mx-4" />
                      ) : (
                        <button
                          key={i}
                          onClick={item.onClick}
                          className={`w-full flex items-center gap-3 px-6 py-3.5 text-xs font-black uppercase tracking-widest transition-all ${
                            item.danger ? 'text-red-400 hover:bg-red-500/10' : 'text-slate-400 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          <item.icon size={16} />
                          {item.label}
                        </button>
                      )
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
