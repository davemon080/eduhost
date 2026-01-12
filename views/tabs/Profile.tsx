
import React, { useState } from 'react';
import { UserProfile, UserRole } from '../../types';
import { User, Mail, GraduationCap, Building2, ChevronRight, TrendingUp, Settings, LogOut, CheckCircle2 } from 'lucide-react';

interface ProfileProps {
  user: UserProfile;
  onUpdate: (user: UserProfile) => void;
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdate, onLogout }) => {
  const [activeSubTab, setActiveSubTab] = useState<'info' | 'progress' | 'settings'>('info');
  const [showMigration, setShowMigration] = useState(false);
  const [nextLevel, setNextLevel] = useState('');

  const handleMigrate = () => {
    if (!nextLevel) return;
    onUpdate({
      ...user,
      level: nextLevel,
      // In a real app, we'd prompt for new course selection here
    });
    setShowMigration(false);
  };

  const levels = ['100L', '200L', '300L', '400L', '500L'];

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
        {/* Cover */}
        <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700"></div>
        
        {/* Profile Header */}
        <div className="px-8 pb-8">
          <div className="relative flex flex-col md:flex-row md:items-end gap-6 -mt-12 mb-8">
            <div className="w-24 h-24 bg-white rounded-3xl p-1 shadow-lg">
              <div className="w-full h-full bg-slate-100 rounded-2xl flex items-center justify-center text-blue-600 font-bold text-2xl border-4 border-white">
                {user.name.charAt(0)}
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-slate-900">{user.name}</h2>
              <p className="text-slate-500 font-medium flex items-center gap-2">
                {user.role === UserRole.STUDENT ? `Student • ${user.matricNo}` : `Lecturer • ${user.staffId}`}
              </p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setActiveSubTab('info')}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeSubTab === 'info' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-50'}`}
              >
                Profile Info
              </button>
              <button 
                onClick={() => setActiveSubTab('progress')}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeSubTab === 'progress' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-50'}`}
              >
                Academic Progress
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Col: Info Card */}
            <div className="md:col-span-2 space-y-6">
              {activeSubTab === 'info' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="text-slate-400 mb-2 flex items-center gap-2">
                        <GraduationCap size={16} />
                        <span className="text-xs font-bold uppercase tracking-widest">Level</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-lg font-bold text-slate-800">{user.level || 'Staff'}</p>
                        {user.role === UserRole.STUDENT && (
                          <button 
                            onClick={() => setShowMigration(true)}
                            className="text-xs font-bold text-blue-600 hover:underline"
                          >
                            Migrate Level
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="text-slate-400 mb-2 flex items-center gap-2">
                        <Building2 size={16} />
                        <span className="text-xs font-bold uppercase tracking-widest">Department</span>
                      </div>
                      <p className="text-lg font-bold text-slate-800">{user.department}</p>
                    </div>
                  </div>

                  <div className="p-8 border border-slate-100 rounded-3xl space-y-4">
                    <h3 className="font-bold text-slate-800">Account Details</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 py-3 border-b border-slate-50">
                        <Mail className="text-slate-400" size={18} />
                        <div className="flex-1">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email Address</p>
                          <p className="text-sm font-medium text-slate-800">{user.email}</p>
                        </div>
                        <button className="text-xs text-blue-600 font-bold">Edit</button>
                      </div>
                      <div className="flex items-center gap-4 py-3 border-b border-slate-50">
                        <User className="text-slate-400" size={18} />
                        <div className="flex-1">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Display Name</p>
                          <p className="text-sm font-medium text-slate-800">{user.name}</p>
                        </div>
                        <button className="text-xs text-blue-600 font-bold">Edit</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSubTab === 'progress' && (
                <div className="space-y-6">
                  <div className="p-6 bg-gradient-to-br from-indigo-600 to-blue-700 rounded-3xl text-white">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <p className="text-indigo-100 text-sm font-medium">Cumulative GPA</p>
                        <h4 className="text-4xl font-bold">4.35</h4>
                      </div>
                      <TrendingUp size={48} className="opacity-20" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md">
                        <p className="text-xs font-bold uppercase opacity-60">Completed Units</p>
                        <p className="text-lg font-bold">18</p>
                      </div>
                      <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md">
                        <p className="text-xs font-bold uppercase opacity-60">Standing</p>
                        <p className="text-lg font-bold">Excellent</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-bold text-slate-800">Semester History</h3>
                    {user.progress?.map((record, i) => (
                      <div key={i} className="flex items-center justify-between p-6 bg-white border border-slate-100 rounded-3xl shadow-sm">
                        <div>
                          <p className="text-sm font-bold text-slate-800">{record.semester}</p>
                          <p className="text-xs text-slate-400">{record.completedCourses.join(', ')}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-blue-600">{record.gpa}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase">GPA</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Col: Quick Actions */}
            <div className="space-y-6">
              <div className="bg-slate-900 rounded-3xl p-6 text-white">
                <h4 className="font-bold mb-4 flex items-center gap-2">
                  <Settings size={18} />
                  Settings
                </h4>
                <div className="space-y-2">
                  <button className="w-full flex items-center justify-between px-4 py-3 bg-white/5 rounded-xl text-sm hover:bg-white/10 transition-colors">
                    Notifications
                    <ChevronRight size={14} className="opacity-50" />
                  </button>
                  <button className="w-full flex items-center justify-between px-4 py-3 bg-white/5 rounded-xl text-sm hover:bg-white/10 transition-colors">
                    Security
                    <ChevronRight size={14} className="opacity-50" />
                  </button>
                  <button onClick={onLogout} className="w-full flex items-center gap-2 px-4 py-3 text-red-400 font-bold text-sm hover:bg-red-500/10 rounded-xl transition-colors mt-4">
                    <LogOut size={16} />
                    Logout Account
                  </button>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-3xl p-6">
                <h4 className="font-bold text-blue-900 mb-2">Platform Support</h4>
                <p className="text-xs text-blue-700 leading-relaxed mb-4">Facing issues with your course registration or portal access? Contact our IT helpdesk.</p>
                <button className="w-full py-3 bg-blue-600 text-white rounded-xl text-xs font-bold">Send Support Ticket</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Migration Modal */}
      {showMigration && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <TrendingUp size={32} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Advance Level</h3>
            <p className="text-slate-500 mb-8">Ready to move to the next academic level? Select your new level below. This will refresh your available courses.</p>
            
            <div className="grid grid-cols-3 gap-3 mb-8">
              {levels.map(l => (
                <button 
                  key={l}
                  onClick={() => setNextLevel(l)}
                  className={`py-3 rounded-xl border-2 font-bold text-sm transition-all ${nextLevel === l ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-slate-100 text-slate-400 hover:border-slate-200'}`}
                >
                  {l}
                </button>
              ))}
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => setShowMigration(false)}
                className="flex-1 py-4 text-slate-500 font-bold hover:bg-slate-50 rounded-2xl transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleMigrate}
                className="flex-1 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
              >
                Confirm Migration
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
