
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
  CreditCard,
  Video,
  Play,
  Trash2,
  Library,
  ArrowLeft,
  UserCircle
} from 'lucide-react';
import Profile from './Profile';
import BioData from './BioData';
import SettingsView from './Settings';
import Badges from './Badges';
import Fees from './Fees';
import HelpCenter from './HelpCenter';

interface YouProps {
  user: UserProfile;
  onUpdate: (user: UserProfile) => void;
  onLogout: () => void;
}

const You: React.FC<YouProps> = ({ user, onUpdate, onLogout }) => {
  const [subView, setSubView] = useState<'hub' | 'profile' | 'biodata' | 'settings' | 'library' | 'badges' | 'fees' | 'help'>('hub');

  const renderSubView = () => {
    switch (subView) {
      case 'profile':
        return <Profile user={user} onUpdate={onUpdate} onLogout={onLogout} />;
      case 'biodata':
        return <BioData user={user} onUpdate={onUpdate} />;
      case 'settings':
        return <SettingsView user={user} onUpdate={onUpdate} />;
      case 'badges':
        return <Badges />;
      case 'fees':
        return <Fees />;
      case 'help':
        return <HelpCenter />;
      default:
        return null;
    }
  };

  if (subView !== 'hub' && subView !== 'library') {
    return (
      <div className="animate-in fade-in slide-in-from-right-4 duration-300">
        <button 
          onClick={() => setSubView('hub')}
          className="mb-8 flex items-center gap-3 text-slate-500 font-black text-xs uppercase tracking-widest hover:text-slate-900 transition-all group"
        >
          <div className="p-2 bg-white rounded-xl shadow-sm group-hover:-translate-x-1 transition-transform">
            <ArrowLeft size={18} />
          </div>
          Back to Hub
        </button>
        {renderSubView()}
      </div>
    );
  }

  if (subView === 'library') {
    return (
      <div className="animate-in fade-in slide-in-from-right-4 duration-300 max-w-4xl mx-auto">
        <button 
          onClick={() => setSubView('hub')}
          className="mb-8 flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900 transition-colors"
        >
          <ChevronRight size={18} className="rotate-180" /> Back to Hub
        </button>
        
        <div className="flex items-center justify-between mb-8">
           <h2 className="text-3xl font-black text-slate-900 tracking-tight">Personal Library</h2>
           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{user.recordings?.length || 0} Recordings</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(user.recordings || []).map(rec => (
            <div key={rec.id} className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm group hover:shadow-xl transition-all">
              <div className="aspect-video relative overflow-hidden">
                <img src={rec.thumbnail} className="w-full h-full object-cover transition-transform group-hover:scale-105" alt={rec.title} />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-2xl">
                      <Play fill="currentColor" size={24} />
                   </div>
                </div>
                <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-lg text-white text-[10px] font-black uppercase tracking-widest">
                  {rec.duration}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{rec.courseCode}</span>
                  <span className="text-[10px] font-black text-slate-300 uppercase">{rec.date}</span>
                </div>
                <h4 className="font-black text-slate-800 leading-tight mb-4">{rec.title}</h4>
                <div className="flex gap-2">
                   <button className="flex-1 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-colors">Play Recording</button>
                   <button className="p-3 bg-slate-50 text-slate-300 hover:text-red-500 rounded-xl transition-colors"><Trash2 size={16}/></button>
                </div>
              </div>
            </div>
          ))}
          
          {(!user.recordings || user.recordings.length === 0) && (
            <div className="col-span-full py-24 text-center bg-white border-4 border-dashed border-slate-50 rounded-[3rem]">
               <Video size={48} className="mx-auto text-slate-100 mb-4" />
               <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Your library is currently empty</p>
               <p className="text-slate-300 text-[10px] font-bold mt-2 uppercase">Record live sessions to save them here</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  const sections = [
    { 
      label: 'Account & Identity', 
      items: [
        { id: 'profile', label: 'Detailed Profile', desc: 'Academic path and institutional records.', icon: User, color: 'text-blue-600 bg-blue-50', onClick: () => setSubView('profile') },
        { id: 'biodata', label: 'Bio Data', desc: 'Manage personal details and emergency contacts.', icon: UserCircle, color: 'text-indigo-600 bg-indigo-50', onClick: () => setSubView('biodata') },
        { id: 'badges', label: 'Academic Badges', desc: 'Achievements and learned milestones.', icon: Award, color: 'text-amber-600 bg-amber-50', onClick: () => setSubView('badges') },
      ]
    },
    { 
      label: 'Content Hub', 
      items: [
        { id: 'library', label: 'Learning Library', desc: 'Access your saved lecture recordings.', icon: Library, color: 'text-purple-600 bg-purple-50', onClick: () => setSubView('library') },
        { id: 'fees', label: 'Fees & Payments', desc: 'Institutional payments and invoices.', icon: CreditCard, color: 'text-emerald-600 bg-emerald-50', onClick: () => setSubView('fees') },
      ]
    },
    { 
      label: 'Portal Controls', 
      items: [
        { id: 'settings', label: 'App Settings', desc: 'Tailor the portal interface preferences.', icon: Settings, color: 'text-slate-600 bg-slate-100', onClick: () => setSubView('settings') },
        { id: 'help', label: 'Help Center', desc: 'Find answers and contact institutional support.', icon: HelpCircle, color: 'text-green-600 bg-green-50', onClick: () => setSubView('help') },
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
          title="Securely sign out"
        >
          <LogOut size={20} />
        </button>
      </div>

      <div className="space-y-8">
        {sections.map(section => (
          <div key={section.label} className="space-y-3">
            <h3 className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{section.label}</h3>
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden divide-y divide-slate-50">
              {section.items.map(item => (
                <button 
                  key={item.id} 
                  onClick={item.onClick}
                  className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors group text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${item.color} shrink-0`}>
                      <item.icon size={20} />
                    </div>
                    <div>
                      <span className="font-bold text-slate-800 block text-sm">{item.label}</span>
                      <span className="text-[10px] text-slate-400 font-medium block mt-0.5">{item.desc}</span>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-slate-300 group-hover:text-slate-900 transition-colors shrink-0" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden p-2">
         <button
          onClick={onLogout}
          className="w-full flex items-center justify-between p-5 bg-red-50/50 hover:bg-red-50 rounded-2xl transition-all group text-left"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-100 text-red-600 rounded-xl shrink-0">
              <LogOut size={20} />
            </div>
            <div>
              <span className="font-bold text-red-600 block text-sm">Secure Sign Out</span>
              <span className="text-[10px] text-red-400 font-medium block mt-0.5">Securely sign out of your portal.</span>
            </div>
          </div>
          <ChevronRight size={18} className="text-red-200 group-hover:text-red-600 transition-colors shrink-0" />
        </button>
      </div>

      <div className="pt-8 text-center">
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Paragon v4.2.0 • Institutional Build</p>
      </div>
    </div>
  );
};

export default You;
