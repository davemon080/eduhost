
import React from 'react';
import { 
  LayoutGrid, 
  BookOpen, 
  Calendar, 
  Video, 
  GraduationCap,
  LogOut, 
  Sparkles,
  ChevronRight,
  ClipboardCheck,
  UserCheck,
  FileText
} from 'lucide-react';
import { UserRole } from '../types';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  universityName: string;
  userRole: UserRole;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onLogout, universityName, userRole }) => {
  const isStudent = userRole === UserRole.STUDENT;

  const categories = [
    {
      label: 'Academic Activities',
      items: [
        { id: 'courses', icon: BookOpen, label: isStudent ? 'Classroom' : 'My Modules', desc: 'Access reading materials and videos.' },
        { id: 'exams', icon: FileText, label: 'Assessments & Results', desc: 'View deadlines, tests, and feedback.' },
        ...(!isStudent ? [{ id: 'advising', icon: UserCheck, label: 'Student Advising', desc: 'Approve student course registrations.' }] : []),
      ]
    },
    {
      label: 'Planning',
      items: [
        { id: 'schedule', icon: Calendar, label: 'Timeline & Schedule', desc: 'Weekly class timetable.' },
        { id: 'live', icon: Video, label: 'Live Halls', desc: 'Join virtual lecture sessions.' },
      ]
    },
    {
      label: 'Community',
      items: [
        { id: 'community', icon: LayoutGrid, label: 'Portal Feed', desc: 'Faculty and student updates.' },
      ]
    }
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-80 bg-white border-r border-slate-200/60 hidden md:flex flex-col z-50">
      <div className="p-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-200" style={{ backgroundColor: 'var(--primary-brand)' }}>
            <Sparkles size={22} />
          </div>
          <div>
            <h1 className="text-lg font-extrabold text-slate-900 tracking-tight truncate w-48">Paragon Hub</h1>
            <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--primary-brand)' }}>{universityName}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-8 overflow-y-auto custom-scrollbar">
        {categories.map((category) => (
          <div key={category.label} className="space-y-2">
            <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{category.label}</p>
            {category.items.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-start gap-4 px-4 py-3.5 rounded-2xl transition-all duration-200 group text-left ${
                  activeTab === item.id 
                    ? 'text-white shadow-xl shadow-slate-100' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
                style={activeTab === item.id ? { backgroundColor: 'var(--primary-brand)' } : {}}
              >
                <div className="mt-0.5">
                  <item.icon size={20} strokeWidth={activeTab === item.id ? 2.5 : 2} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-bold leading-tight ${activeTab === item.id ? 'text-white' : 'text-slate-800'}`}>
                    {item.label}
                  </p>
                  <p className={`text-[10px] mt-1 font-medium leading-relaxed line-clamp-2 ${activeTab === item.id ? 'text-white/70' : 'text-slate-400'}`}>
                    {item.desc}
                  </p>
                </div>
                <ChevronRight size={14} className={`mt-1 opacity-0 group-hover:opacity-100 transition-opacity ${activeTab === item.id ? 'text-white' : 'text-slate-300'}`} />
              </button>
            ))}
          </div>
        ))}
      </nav>

      <div className="p-6 border-t border-slate-100">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-4 px-5 py-4 text-slate-400 hover:bg-red-50 hover:text-red-600 rounded-2xl text-sm font-bold transition-all"
        >
          <LogOut size={20} />
          <div className="text-left">
            <p className="text-sm font-bold">Secure Sign Out</p>
            <p className="text-[10px] font-medium opacity-60">Sign out of your session.</p>
          </div>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
