
import React, { useState } from 'react';
import { UserProfile, UserRole } from '../../types';
import { 
  User, 
  Settings, 
  LogOut, 
  ChevronRight, 
  Shield, 
  Bell, 
  Moon, 
  HelpCircle, 
  FileText, 
  Award, 
  CreditCard 
} from 'lucide-react';
import Profile from './Profile';
import SettingsView from './Settings';

interface YouProps {
  user: UserProfile;
  onUpdate: (user: UserProfile) => void;
  onLogout: () => void;
}

const You: React.FC<YouProps> = ({ user, onUpdate, onLogout }) => {
  const [subView, setSubView] = useState<'hub' | 'profile' | 'settings'>('hub');

  if (subView === 'profile') {
    return (
      <div className="animate-in fade-in slide-in-from-right-4 duration-300">
        <button 
          onClick={() => setSubView('hub')}
          className="mb-6 flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900 transition-colors"
        >
          <ChevronRight size={18} className="rotate-180" /> Back to Hub
        </button>
        <Profile user={user} onUpdate={onUpdate} onLogout={onLogout} />
      </div>
    );
  }

  if (subView === 'settings') {
    return (
      <div className="animate-in fade-in slide-in-from-right-4 duration-300">
        <button 
          onClick={() => setSubView('hub')}
          className="mb-6 flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900 transition-colors"
        >
          <ChevronRight size={18} className="rotate-180" /> Back to Hub
        </button>
        <SettingsView user={user} onUpdate={onUpdate} />
      </div>
    );
  }

  const sections = [
    { 
      label: 'Account & Identity', 
      items: [
        { id: 'profile', label: 'Detailed Profile', icon: User, color: 'text-blue-600 bg-blue-50', onClick: () => setSubView('profile') },
        { id: 'badges', label: 'Academic Badges', icon: Award, color: 'text-amber-600 bg-amber-50' },
      ]
    },
    { 
      label: 'Preferences', 
      items: [
        { id: 'settings', label: 'App Settings', icon: Settings, color: 'text-slate-600 bg-slate-100', onClick: () => setSubView('settings') },
        { id: 'billing', label: 'Fees & Payments', icon: CreditCard, color: 'text-indigo-600 bg-indigo-50' },
      ]
    },
    { 
      label: 'Support', 
      items: [
        { id: 'help', label: 'Help Center', icon: HelpCircle, color: 'text-green-600 bg-green-50' },
        { id: 'terms', label: 'Institutional Policy', icon: FileText, color: 'text-slate-400 bg-slate-100' },
      ]
    }
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Profile Header Card */}
      <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm flex items-center gap-6">
        <div className="w-20 h-20 bg-blue-600 rounded-[1.8rem] flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-blue-500/20">
          {user.name.charAt(0)}
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-black text-slate-900 leading-tight">{user.name}</h2>
          <p className="text-slate-400 font-bold text-sm uppercase tracking-widest mt-1">
            {user.role === UserRole.STUDENT ? user.matricNo : user.staffId}
          </p>
        </div>
        <button 
          onClick={onLogout}
          className="p-4 bg-red-50 text-red-600 rounded-2xl hover:bg-red-600 hover:text-white transition-all shadow-sm"
        >
          <LogOut size={20} />
        </button>
      </div>

      {/* Navigation Sections */}
      <div className="space-y-8">
        {sections.map(section => (
          <div key={section.label} className="space-y-3">
            <h3 className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{section.label}</h3>
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden divide-y divide-slate-50">
              {section.items.map(item => (
                <button 
                  key={item.id} 
                  onClick={item.onClick}
                  className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${item.color}`}>
                      <item.icon size={20} />
                    </div>
                    <span className="font-bold text-slate-800">{item.label}</span>
                  </div>
                  <ChevronRight size={18} className="text-slate-300 group-hover:text-slate-900 transition-colors" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-8 text-center">
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">EduStream Pro v4.2.0 • Institutional Build</p>
      </div>
    </div>
  );
};

export default You;
