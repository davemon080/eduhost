
import React from 'react';
import { 
  Home, 
  BookOpen, 
  Calendar, 
  Video, 
  FileText, 
  LogOut, 
  GraduationCap 
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  universityName: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onLogout, universityName }) => {
  const menuItems = [
    { id: 'community', icon: Home, label: 'Community' },
    { id: 'courses', icon: BookOpen, label: 'My Courses' },
    { id: 'schedule', icon: Calendar, label: 'Schedule' },
    { id: 'live', icon: Video, label: 'Live Classes' },
    { id: 'assignments', icon: FileText, label: 'Assignments' },
    { id: 'exams', icon: GraduationCap, label: 'Tests & Exams' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200 hidden md:flex flex-col z-50">
      <div className="p-6">
        <h1 className="text-xl font-bold text-blue-600 truncate">{universityName}</h1>
        <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">Portal</p>
      </div>

      <nav className="flex-1 px-4 py-2 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              activeTab === item.id 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <item.icon size={18} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-red-50 hover:text-red-600 rounded-lg text-sm font-medium transition-colors"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
