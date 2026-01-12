
import React, { useState } from 'react';
import { UserProfile } from '../../types';
import { User, Bell, Shield, Moon, Monitor, ChevronRight, Check, Key, Mail, Globe, Lock } from 'lucide-react';

interface SettingsProps {
  user: UserProfile;
  onUpdate: (user: UserProfile) => void;
}

const Settings: React.FC<SettingsProps> = ({ user, onUpdate }) => {
  const [activeSection, setActiveSection] = useState<'account' | 'notifications' | 'security'>('account');

  const updateSetting = (key: string, value: any) => {
    onUpdate({
      ...user,
      settings: {
        ...(user.settings || { notifications: true, darkMode: false, twoFactor: false }),
        [key]: value
      }
    });
  };

  const sections = [
    { id: 'account', icon: User, label: 'Account Identity' },
    { id: 'notifications', icon: Bell, label: 'Preferences' },
    { id: 'security', icon: Shield, label: 'Privacy & Security' },
  ];

  return (
    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Settings Navigation */}
      <div className="w-full lg:w-72 space-y-2 shrink-0">
        <h3 className="px-4 text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Portal Settings</h3>
        {sections.map(s => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id as any)}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-sm transition-all text-left ${
              activeSection === s.id 
                ? 'bg-white text-blue-600 shadow-xl shadow-blue-500/5 ring-1 ring-slate-100' 
                : 'text-slate-500 hover:bg-white/50 hover:text-slate-800'
            }`}
          >
            <div className={`p-2 rounded-lg ${activeSection === s.id ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
              <s.icon size={18} />
            </div>
            {s.label}
          </button>
        ))}
      </div>

      {/* Settings Panel */}
      <div className="flex-1 min-w-0 space-y-8">
        {activeSection === 'account' && (
          <div className="space-y-6">
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-8 lg:p-10 border-b border-slate-50 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black text-slate-900">Personal Information</h3>
                  <p className="text-slate-500 text-sm mt-1">Manage your institutional identity and contact details.</p>
                </div>
              </div>
              <div className="p-8 lg:p-10 space-y-10">
                <div className="flex flex-col sm:flex-row items-center gap-8 pb-8 border-b border-slate-50">
                  <div className="relative group">
                    <div className="w-28 h-28 bg-blue-100 text-blue-600 rounded-[2.5rem] flex items-center justify-center font-black text-3xl border-4 border-white shadow-2xl transition-transform group-hover:scale-105">
                      {user.name.charAt(0)}
                    </div>
                    <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-xl hover:bg-blue-600 transition-colors border-2 border-white">
                      <Monitor size={16} />
                    </button>
                  </div>
                  <div className="text-center sm:text-left">
                    <h4 className="text-lg font-black text-slate-900">{user.name}</h4>
                    <p className="text-sm text-slate-400 font-medium">{user.role} • {user.universityId === '1' ? 'UniTech' : 'Institutional'} Portal</p>
                    <button className="mt-4 px-6 py-2 bg-slate-100 text-slate-600 text-xs font-bold rounded-full hover:bg-slate-200 transition-colors">Change Profile Photo</button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Display Name</label>
                    <div className="relative">
                      <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                      <input type="text" defaultValue={user.name} className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-blue-500 font-bold text-slate-700" />
                    </div>
                  </div>
                  <div className="space-y-2 opacity-60">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Academic Email (Read Only)</label>
                    <div className="relative">
                      <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                      <input type="email" readOnly value={user.email} className="w-full pl-12 pr-4 py-4 bg-slate-100 border border-slate-100 rounded-2xl outline-none font-bold text-slate-500 cursor-not-allowed" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'notifications' && (
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-8 lg:p-10 border-b border-slate-50">
              <h3 className="text-xl font-black text-slate-900">App Preferences</h3>
              <p className="text-slate-500 text-sm mt-1">Tailor the learning platform to your personal needs.</p>
            </div>
            <div className="p-8 lg:p-10 space-y-4">
              {[
                { id: 'announcements', label: 'Push Notifications', desc: 'Real-time alerts for faculty news.', icon: Bell, color: 'text-blue-600 bg-blue-50' },
                { id: 'darkMode', label: 'Dark Interface', desc: 'Switch to a high-contrast dark theme.', icon: Moon, color: 'text-indigo-600 bg-indigo-50' },
                { id: 'emailSub', label: 'Email Digest', desc: 'Weekly summary of your academic progress.', icon: Mail, color: 'text-amber-600 bg-amber-50' }
              ].map(item => (
                <div key={item.id} className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl group hover:bg-white hover:ring-2 hover:ring-blue-500/10 transition-all">
                  <div className="flex items-center gap-5">
                    <div className={`p-3 rounded-2xl ${item.color}`}>
                      <item.icon size={22} />
                    </div>
                    <div>
                      <p className="font-black text-slate-900 leading-tight">{item.label}</p>
                      <p className="text-xs text-slate-400 mt-1 font-medium">{item.desc}</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      onChange={(e) => updateSetting(item.id, e.target.checked)}
                      defaultChecked={item.id === 'announcements' || (user.settings as any)?.[item.id]} 
                    />
                    <div className="w-14 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'security' && (
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-8 lg:p-10 border-b border-slate-50">
              <h3 className="text-xl font-black text-slate-900">Security Center</h3>
              <p className="text-slate-500 text-sm mt-1">Manage your password and account authorization.</p>
            </div>
            <div className="p-8 lg:p-10 space-y-6">
              <button className="w-full flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] hover:bg-slate-100 transition-colors group">
                <div className="flex items-center gap-5">
                  <div className="p-4 bg-white rounded-2xl shadow-sm text-blue-600 group-hover:scale-110 transition-transform"><Key size={24}/></div>
                  <div className="text-left">
                    <p className="font-black text-slate-900">Change Portal Password</p>
                    <p className="text-xs text-slate-400 font-medium">Protect your data with a strong passphrase.</p>
                  </div>
                </div>
                <div className="p-2 bg-white rounded-xl shadow-sm"><ChevronRight size={20} className="text-slate-400" /></div>
              </button>
              
              <div className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
                 <div className="flex items-center gap-5">
                  <div className="p-4 bg-white rounded-2xl shadow-sm text-green-600"><Lock size={24}/></div>
                  <div className="text-left">
                    <p className="font-black text-slate-900">Two-Factor Authentication</p>
                    <p className="text-xs text-green-600 font-bold uppercase tracking-tight">Active & Secured</p>
                  </div>
                </div>
                <button className="px-6 py-2 bg-white text-slate-900 rounded-full text-xs font-black shadow-sm hover:bg-slate-50">Configure</button>
              </div>

              <div className="pt-6">
                <p className="text-xs text-center text-slate-400 font-medium">Last successful login: Today at 08:42 AM from San Francisco, CA</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
