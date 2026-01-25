
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
import ManageAdvising from './lecturer/ManageAdvising';
import { COURSES } from '../mockData';
import { 
  User, 
  Bell, 
  Compass, 
  Library, 
  CalendarDays, 
  Trophy, 
  ArrowLeft, 
  MoreVertical, 
  Info,
  LifeBuoy,
  MessageCircle,
  LogOut,
  Sparkles,
  ArrowRight,
  Clock,
  ClipboardCheck,
  UserCheck,
  FileText
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) setShowNotifications(false);
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setShowMiniMenu(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const myCourses = COURSES.filter(c => user.courses.includes(c.id));
  const activeCourse = COURSES.find(c => c.id === selectedCourseId);

  const handleBackNavigation = () => {
    if (selectedCourseId) {
      setSelectedCourseId(null);
      setActiveTab('courses');
    }
  };

  const handleSaveRecording = (recording: SavedRecording) => {
    onUpdateUser({ ...user, recordings: [...(user.recordings || []), recording] });
  };

  const renderContent = () => {
    if (selectedCourseId && activeCourse) return <Classroom course={activeCourse} onBack={() => { setSelectedCourseId(null); setActiveTab('courses'); }} />;
    switch (activeTab) {
      case 'community': return <Community user={user} university={university} />;
      case 'courses': return <Courses courses={myCourses} onSelectCourse={setSelectedCourseId} />;
      case 'schedule': return <Schedule onJoinLive={() => setActiveTab('live')} />;
      case 'live': return <LiveClassView user={user} onBack={() => setActiveTab('schedule')} onSaveRecording={handleSaveRecording} />;
      case 'exams': return <Assessments />;
      case 'advising': return <ManageAdvising university={university} />;
      case 'you': return <You user={user} onUpdate={onUpdateUser} onLogout={onLogout} />;
      default: return <Community user={user} university={university} />;
    }
  };

  const isStudent = user.role === UserRole.STUDENT;

  const navItems = [
    { id: 'community', icon: Compass, label: 'Feed' },
    { id: 'courses', icon: Library, label: 'Classroom' },
    { id: 'exams', icon: FileText, label: 'Results' },
    { id: 'schedule', icon: CalendarDays, label: 'Timeline' },
    { id: 'you', icon: User, label: 'Account', isAvatar: true },
  ];

  const getPageTitle = () => {
    switch (activeTab) {
      case 'community': return 'Institutional Feed';
      case 'courses': return isStudent ? 'Active Classroom' : 'Assigned Modules';
      case 'schedule': return 'Timeline & Schedule';
      case 'live': return 'Live Halls';
      case 'exams': return 'Assessments & Results';
      case 'advising': return 'Student Advising Queue';
      case 'you': return 'Account Hub';
      default: return activeTab;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row relative">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(tab) => { setSelectedCourseId(null); setActiveTab(tab); }} 
        onLogout={onLogout} 
        universityName={university.name}
        userRole={user.role}
      />

      {/* MOBILE BOTTOM MENU */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[100] bg-white/90 backdrop-blur-3xl border-t border-slate-200/50 px-4 pt-2 pb-5">
        <div className="flex items-center justify-between max-w-md mx-auto">
          {navItems.map(item => (
            <button 
              key={item.id}
              onClick={() => { setSelectedCourseId(null); setActiveTab(item.id); }}
              className={`relative flex flex-col items-center gap-0.5 px-2 py-1 transition-all duration-300 group min-w-[64px]`}
            >
              <div 
                className={`absolute inset-0 blur-xl rounded-full transition-opacity duration-500 ${activeTab === item.id ? 'opacity-100' : 'opacity-0'}`}
                style={{ backgroundColor: `${university.primaryColor}1A` }}
              ></div>
              <div className={`relative transition-transform duration-300 ${activeTab === item.id ? 'scale-110 -translate-y-0.5' : 'text-slate-400'}`}>
                {item.isAvatar ? (
                  <div className={`w-6 h-6 rounded-full border-2 transition-all ${activeTab === item.id ? 'shadow-md' : 'border-slate-200 grayscale'}`} style={activeTab === item.id ? { borderColor: university.primaryColor } : {}}>
                    <img src={`https://ui-avatars.com/api/?name=${user.name}&background=random`} className="w-full h-full rounded-full" />
                  </div>
                ) : (
                  <item.icon 
                    size={20} 
                    strokeWidth={activeTab === item.id ? 2.5 : 2} 
                    className={`${activeTab === item.id ? '' : 'text-slate-400'}`}
                    style={activeTab === item.id ? { color: university.primaryColor } : {}}
                  />
                )}
              </div>
              <span className={`text-[8px] font-black uppercase tracking-widest transition-colors duration-300 ${activeTab === item.id ? '' : 'text-slate-400'}`} style={activeTab === item.id ? { color: university.primaryColor } : {}}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <main className="flex-1 md:ml-80 flex flex-col min-w-0 pb-24 md:pb-0">
        <header className="sticky top-0 z-40 bg-slate-50/80 backdrop-blur-md border-b border-slate-200/40 px-6 md:px-12 py-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-5">
              {(selectedCourseId || activeTab === 'live') && (
                <button onClick={() => activeTab === 'live' ? setActiveTab('schedule') : handleBackNavigation()} className="w-10 h-10 bg-white border border-slate-200 text-slate-900 rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center shadow-sm">
                  <ArrowLeft size={20} />
                </button>
              )}
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-none">
                  {getPageTitle()}
                </h1>
                <p className="text-[10px] font-black uppercase tracking-widest mt-2" style={{ color: university.primaryColor }}>{university.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden lg:flex items-center gap-2 mr-4">
                <button 
                  onClick={() => setActiveTab('courses')}
                  className="px-4 py-2 bg-white border border-slate-200 text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-2"
                >
                  <Library size={14} /> Classroom
                </button>
              </div>

              <div className="relative" ref={notificationRef}>
                <button onClick={() => setShowNotifications(!showNotifications)} className={`p-2.5 rounded-xl transition-all ${showNotifications ? 'bg-white shadow-sm ring-1 ring-slate-100' : 'text-slate-400 hover:bg-white border border-transparent hover:border-slate-200'}`} style={showNotifications ? { color: university.primaryColor } : {}}>
                  <Bell size={22} />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-50"></span>
                </button>
              </div>

              <div className="relative" ref={menuRef}>
                <button onClick={() => setShowMiniMenu(!showMiniMenu)} className={`p-2.5 rounded-xl transition-all ${showMiniMenu ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-900 hover:bg-white border border-transparent hover:border-slate-200'}`}>
                  <MoreVertical size={22} />
                </button>
                {showMiniMenu && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-3xl shadow-2xl z-[120] border border-slate-200 overflow-hidden py-2 animate-in slide-in-from-top-2">
                    {[
                      { icon: Info, label: 'Help Desk', onClick: () => { setActiveTab('you'); setShowMiniMenu(false); } },
                      { divider: true },
                      { icon: LogOut, label: 'Sign Out', onClick: onLogout, danger: true },
                    ].map((item, i) => (
                      item.divider ? <div key={i} className="h-px bg-slate-100 my-2 mx-4" /> : (
                        <button key={i} onClick={item.onClick} className={`w-full flex items-center gap-3 px-6 py-3.5 text-xs font-black uppercase tracking-widest transition-all ${item.danger ? 'text-red-500 hover:bg-red-50' : 'text-slate-600 hover:bg-slate-50'}`}>
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
        </header>

        <section className="p-6 md:p-12 overflow-y-auto max-w-7xl mx-auto w-full page-transition">
          {renderContent()}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
