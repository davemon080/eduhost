
import React, { useState, useMemo } from 'react';
import { UserProfile, UserRole } from '../../types';
import { COURSES } from '../../mockData';
import { 
  User, 
  Mail, 
  GraduationCap, 
  Building2, 
  ChevronRight, 
  TrendingUp, 
  Settings, 
  LogOut, 
  CheckCircle2, 
  Printer, 
  BookOpen, 
  FileText, 
  X,
  BadgeCheck,
  DownloadCloud,
  ShieldCheck,
  Monitor,
  Clock,
  ClipboardCheck,
  Search,
  Check,
  Loader2,
  Info
} from 'lucide-react';

interface ProfileProps {
  user: UserProfile;
  onUpdate: (user: UserProfile) => void;
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdate, onLogout }) => {
  const [activeSubTab, setActiveSubTab] = useState<'info' | 'progress' | 'registration'>('info');
  const [showMigration, setShowMigration] = useState(false);
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [nextLevel, setNextLevel] = useState('');
  
  // Registration States
  const [selectedIds, setSelectedIds] = useState<string[]>(user.pendingCourses || []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [regSearch, setRegSearch] = useState('');

  // Strictly filter for APPROVED courses for the Course Form
  const myApprovedCourses = useMemo(() => {
    return COURSES.filter(c => user.courses.includes(c.id));
  }, [user.courses]);

  // Available courses for the student's level/dept
  const availableCourses = useMemo(() => {
    return COURSES.filter(c => c.department === user.department && c.level === user.level);
  }, [user.department, user.level]);

  const filteredRegCourses = useMemo(() => {
    return availableCourses.filter(c => 
      c.title.toLowerCase().includes(regSearch.toLowerCase()) || 
      c.code.toLowerCase().includes(regSearch.toLowerCase())
    );
  }, [availableCourses, regSearch]);

  const hasPending = (user.pendingCourses?.length || 0) > 0;

  const handleMigrate = () => {
    if (!nextLevel) return;
    onUpdate({
      ...user,
      level: nextLevel,
    });
    setShowMigration(false);
  };

  const handleRegisterSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      onUpdate({
        ...user,
        pendingCourses: selectedIds
      });
      setIsSubmitting(false);
      setActiveSubTab('info');
    }, 1500);
  };

  const toggleCourseSelection = (id: string) => {
    if (user.courses.includes(id)) return;
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handlePrint = () => {
    window.print();
  };

  const levels = ['100L', '200L', '300L', '400L', '500L'];

  // Sub-component for the label-value pairs in the academic info section
  const AcademicField = ({ label, value, isBadge = false }: { label: string, value: string, isBadge?: boolean }) => (
    <div className="space-y-1.5 w-full">
      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide ml-1">{label}</p>
      <div className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl flex items-center">
        {isBadge ? (
          <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${value === 'Active' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
            {value}
          </span>
        ) : (
          <p className="text-sm font-black text-slate-700">{value || 'N/A'}</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto pb-12 px-2 sm:px-4 md:px-0">
      <div className="bg-white rounded-[1.5rem] sm:rounded-[2.5rem] md:rounded-[3rem] border border-slate-100 overflow-hidden shadow-sm">
        {/* Cover */}
        <div className="h-28 sm:h-32 md:h-48 bg-gradient-to-r from-blue-600 to-indigo-700 relative overflow-hidden">
           <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        </div>
        
        {/* Profile Header */}
        <div className="px-4 sm:px-6 md:px-12 pb-8 md:pb-12">
          <div className="relative flex flex-col md:flex-row md:items-end gap-4 sm:gap-6 -mt-10 sm:-mt-12 md:-mt-16 mb-8 md:mb-10">
            <div className="flex justify-center md:block">
              <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-white rounded-[1.8rem] sm:rounded-[2.5rem] md:rounded-[3rem] p-1.5 shadow-2xl relative z-10">
                <div className="w-full h-full bg-slate-50 rounded-[1.5rem] sm:rounded-[2.2rem] md:rounded-[2.8rem] flex items-center justify-center text-blue-600 font-black text-3xl sm:text-4xl md:text-6xl border-4 border-white shadow-inner">
                  {user.name.charAt(0)}
                </div>
              </div>
            </div>
            
            <div className="flex-1 text-center md:text-left min-w-0">
              <h2 className="text-xl sm:text-2xl md:text-4xl font-black text-slate-900 tracking-tight truncate">{user.name}</h2>
              <p className="text-slate-400 font-bold flex items-center justify-center md:justify-start gap-2 mt-1 md:mt-2 text-xs sm:text-sm md:text-base">
                {user.role === UserRole.STUDENT ? (
                  <><GraduationCap size={16} className="text-blue-500" /> {user.matricNo}</>
                ) : (
                  <><ShieldCheck size={16} className="text-blue-500" /> {user.staffId}</>
                )}
              </p>
            </div>

            <div className="flex bg-slate-100 p-1 rounded-xl sm:rounded-2xl md:rounded-[2rem] w-full md:w-auto overflow-x-auto no-scrollbar">
              <button 
                onClick={() => setActiveSubTab('info')}
                className={`flex-1 md:flex-none px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl md:rounded-[1.5rem] text-[9px] sm:text-[10px] md:text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeSubTab === 'info' ? 'bg-white text-blue-600 shadow-md ring-1 ring-slate-200' : 'text-slate-400'}`}
              >
                Info
              </button>
              <button 
                onClick={() => setActiveSubTab('progress')}
                className={`flex-1 md:flex-none px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl md:rounded-[1.5rem] text-[9px] sm:text-[10px] md:text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeSubTab === 'progress' ? 'bg-white text-blue-600 shadow-md ring-1 ring-slate-200' : 'text-slate-400'}`}
              >
                Progress
              </button>
              {user.role === UserRole.STUDENT && (
                <button 
                  onClick={() => setActiveSubTab('registration')}
                  className={`flex-1 md:flex-none px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl md:rounded-[1.5rem] text-[9px] sm:text-[10px] md:text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeSubTab === 'registration' ? 'bg-white text-blue-600 shadow-md ring-1 ring-slate-200' : 'text-slate-400'}`}
                >
                  Registration
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="lg:col-span-2 space-y-6 md:space-y-8 min-w-0">
              {activeSubTab === 'info' && (
                <div className="space-y-10 animate-in fade-in duration-500">
                  
                  {/* Academic Information Section (from image) */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 px-1 border-b border-slate-100 pb-3">
                      <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide">Academic Information</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                      <AcademicField label="State" value={user.state || 'Kogi'} />
                      <AcademicField label="Local Government" value={user.lga || 'Dekina'} />
                      <AcademicField label="Year of Admission" value={user.yearOfAdmission || '2025/2026'} />
                      <AcademicField label="Programme Type" value={user.programmeType || 'Full Time'} />
                      <div className="sm:col-span-2">
                        <AcademicField label="Faculty" value={user.faculty || 'FACULTY OF PHYSICAL SCIENCES'} />
                      </div>
                      <div className="sm:col-span-2">
                        <AcademicField label="Department" value={user.department || 'CHEMISTRY'} />
                      </div>
                      <div className="sm:col-span-2">
                        <AcademicField label="Programme" value={user.programme || 'B.Sc. Industrial Chemistry'} />
                      </div>
                      <AcademicField label="Current Status" value={user.currentStatus || 'Active'} isBadge />
                    </div>
                  </div>

                  {/* Current Academic Status Section (from image) */}
                  <div className="space-y-5">
                    <div className="flex items-center gap-3 px-1 border-b border-slate-100 pb-3">
                      <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide">Current Academic Status</h3>
                    </div>
                    
                    <div className="p-6 rounded-[1.5rem] border-2 border-amber-100 bg-amber-50/10 space-y-5 shadow-sm">
                      <div className="space-y-1">
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Current Session</p>
                        <p className="text-lg font-black text-slate-800">{user.currentSession || '2025/2026'}</p>
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Current Semester</p>
                        <p className="text-lg font-black text-slate-800">{user.currentSemester || 'First'}</p>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Registration Status</p>
                        <span className={`inline-flex px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${user.registrationStatus === 'Registered' || !user.registrationStatus ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white shadow-lg shadow-amber-200'}`}>
                          {user.registrationStatus || 'Registered'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Security Section (Original) */}
                  <div className="p-5 sm:p-8 border border-slate-100 rounded-[1.5rem] sm:rounded-[2.5rem] space-y-6">
                    <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                       <User size={12} /> Security Identity
                    </h3>
                    <div className="space-y-2 md:space-y-4">
                      <div className="flex items-center gap-3 sm:gap-4 py-3 sm:py-4 border-b border-slate-50 min-w-0">
                        <Mail className="text-slate-300 shrink-0" size={16} />
                        <div className="flex-1 min-w-0">
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Address</p>
                          <p className="text-xs sm:text-sm font-bold text-slate-800 truncate">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 sm:gap-4 py-3 sm:py-4 min-w-0">
                        <ShieldCheck className="text-slate-300 shrink-0" size={16} />
                        <div className="flex-1 min-w-0">
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Authority</p>
                          <p className="text-xs sm:text-sm font-bold text-slate-800">{user.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSubTab === 'progress' && (
                <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500">
                  <div className="p-6 sm:p-8 md:p-12 bg-slate-900 rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[3rem] text-white relative overflow-hidden shadow-2xl">
                    <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 md:gap-8">
                      <div>
                        <p className="text-white/40 text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] mb-3 md:mb-4">Cumulative Performance</p>
                        <h4 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter">4.35</h4>
                        <div className="flex items-center gap-2 md:gap-3 mt-3 md:mt-4">
                           <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-lg text-[8px] sm:text-[10px] font-black uppercase tracking-widest">First Class</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 md:gap-3 shrink-0">
                        <div className="bg-white/5 backdrop-blur-md p-3 sm:p-5 rounded-xl md:rounded-2xl border border-white/10">
                          <p className="text-[7px] sm:text-[8px] font-black uppercase opacity-40 mb-1">Total Units</p>
                          <p className="text-lg sm:text-xl font-black">104</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-md p-3 sm:p-5 rounded-xl md:rounded-2xl border border-white/10">
                          <p className="text-[7px] sm:text-[8px] font-black uppercase opacity-40 mb-1">Semesters</p>
                          <p className="text-lg sm:text-xl font-black">04</p>
                        </div>
                      </div>
                    </div>
                    <TrendingUp size={100} className="absolute -right-4 -bottom-4 opacity-5 text-white hidden sm:block" />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2 flex items-center gap-2">
                       <CheckCircle2 size={12} /> Academic History
                    </h3>
                    <div className="grid grid-cols-1 gap-3 sm:gap-4">
                      {user.progress?.map((record, i) => (
                        <div key={i} className="flex items-center justify-between p-4 sm:p-6 bg-white border border-slate-100 rounded-xl sm:rounded-[2rem] shadow-sm hover:shadow-md transition-shadow group min-w-0">
                          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                             <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-50 rounded-lg sm:rounded-2xl flex items-center justify-center font-black text-slate-300 border border-slate-100 group-hover:text-blue-600 transition-all shrink-0">
                                {i + 1}
                             </div>
                             <div className="min-w-0">
                                <p className="text-xs sm:text-sm font-black text-slate-800 truncate">{record.semester}</p>
                                <p className="text-[8px] sm:text-[10px] font-bold text-slate-400 mt-0.5 uppercase tracking-tighter">{record.completedCourses.length} Modules Cleared</p>
                             </div>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-lg sm:text-xl font-black text-blue-600 tracking-tight">{record.gpa.toFixed(2)}</p>
                            <p className="text-[7px] sm:text-[8px] font-black text-slate-300 uppercase tracking-widest leading-none mt-0.5">GPA</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeSubTab === 'registration' && (
                <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500 min-w-0">
                  <div className="bg-blue-600 rounded-[1.5rem] sm:rounded-[2.5rem] p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden">
                    <div className="relative z-10">
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-black mb-1 md:mb-2 tracking-tighter">Semester Registration</h2>
                      <p className="text-blue-100 font-medium text-[10px] sm:text-sm md:text-base leading-relaxed max-w-lg">
                        Select your modules for the upcoming term. Your Course Advisor will authorize your selection.
                      </p>
                    </div>
                    <ClipboardCheck className="absolute -right-8 -bottom-8 text-white/10 hidden sm:block" size={160} />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4 sm:items-center justify-between">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                        <input 
                          type="text" 
                          placeholder="Search curriculum..."
                          value={regSearch}
                          onChange={(e) => setRegSearch(e.target.value)}
                          className="w-full pl-10 sm:pl-12 pr-4 sm:pr-6 py-3 sm:py-4 bg-slate-50 border border-slate-100 rounded-xl sm:rounded-2xl shadow-inner outline-none focus:ring-4 focus:ring-blue-500/5 transition-all font-bold text-xs sm:text-sm"
                        />
                    </div>
                    <div className="px-4 sm:px-6 py-2.5 sm:py-4 bg-white rounded-xl sm:rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between sm:justify-start gap-4">
                       <span className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Load</span>
                       <span className="text-sm sm:text-lg font-black text-blue-600">{selectedIds.length * 3}.0 CR</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-2 sm:gap-3">
                    {filteredRegCourses.map(course => {
                      const isApproved = user.courses.includes(course.id);
                      const isPending = user.pendingCourses?.includes(course.id);
                      const isSelected = selectedIds.includes(course.id);

                      return (
                        <button 
                          key={course.id}
                          onClick={() => toggleCourseSelection(course.id)}
                          disabled={isApproved}
                          className={`w-full text-left p-4 sm:p-5 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 flex items-center justify-between group min-w-0 ${
                            isSelected ? 'bg-blue-50 border-blue-500 shadow-lg' : 
                            isApproved ? 'bg-slate-50 border-slate-100 opacity-60' :
                            'bg-white border-slate-100 hover:border-blue-200'
                          }`}
                        >
                          <div className="flex items-center gap-3 sm:gap-5 min-w-0">
                             <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center font-black text-[9px] sm:text-[10px] border transition-colors shrink-0 ${
                               isSelected ? 'bg-blue-600 text-white border-blue-600' : 
                               isApproved ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                               'bg-slate-50 text-slate-400 border-slate-100 group-hover:bg-blue-50 group-hover:text-blue-600'
                             }`}>
                                {course.code.split(' ')[0]}
                             </div>
                             <div className="min-w-0">
                                <h4 className="font-black text-slate-900 text-xs sm:text-sm mb-0.5 truncate">{course.code}: {course.title}</h4>
                                <p className="text-[8px] sm:text-[9px] font-black text-slate-400 uppercase tracking-widest truncate">3.0 Units • {course.lecturerName}</p>
                             </div>
                          </div>
                          
                          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                             {isApproved ? (
                               <CheckCircle2 size={18} className="text-emerald-500" />
                             ) : isPending && !isSelected ? (
                               <Clock size={18} className="text-amber-500" />
                             ) : (
                               <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                                 isSelected ? 'bg-blue-600 border-blue-600' : 'border-slate-200 group-hover:border-blue-300'
                               }`}>
                                  {isSelected && <Check size={12} className="text-white" strokeWidth={4} />}
                               </div>
                             )}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-6 md:pt-8 border-t border-slate-100">
                    <button 
                      onClick={handleRegisterSubmit}
                      disabled={isSubmitting || selectedIds.length === 0}
                      className="w-full py-4 sm:py-5 bg-slate-900 text-white rounded-xl sm:rounded-[1.5rem] font-black text-[9px] sm:text-[10px] uppercase tracking-[0.2em] shadow-2xl hover:bg-blue-600 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : (
                        <><ClipboardCheck size={18} /> Finalize Selection</>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Col: Quick Actions */}
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-slate-900 rounded-[1.5rem] sm:rounded-[2.5rem] p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden">
                <h4 className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-4 sm:mb-6 flex items-center gap-2">
                  <Settings size={12} /> Portal Actions
                </h4>
                <div className="space-y-2 relative z-10">
                  <button className="w-full flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4 bg-white/5 rounded-xl sm:rounded-2xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all group">
                    Security Center
                    <ChevronRight size={14} className="text-white/20 group-hover:text-white transition-all" />
                  </button>
                  <button className="w-full flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4 bg-white/5 rounded-xl sm:rounded-2xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all group">
                    Notification Prefs
                    <ChevronRight size={14} className="text-white/20 group-hover:text-white transition-all" />
                  </button>
                  <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 sm:px-5 py-3 sm:py-4 text-red-400 font-black text-[9px] sm:text-[10px] uppercase tracking-widest hover:bg-red-500/10 rounded-xl sm:rounded-2xl transition-all mt-4 border border-red-500/10">
                    <LogOut size={16} />
                    Secure Sign Out
                  </button>
                </div>
                <Settings size={120} className="absolute -left-12 -bottom-12 opacity-5 text-white hidden md:block" />
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-[1.5rem] sm:rounded-[2.5rem] p-6 sm:p-8">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg shrink-0">
                   <Monitor size={18} />
                </div>
                <h4 className="font-black text-slate-900 text-xs sm:text-sm mb-1.5 md:mb-2">Portal Helpdesk</h4>
                <p className="text-[10px] sm:text-xs text-slate-500 leading-relaxed font-medium mb-4 sm:mb-6">Need assistance with your portal or registration records?</p>
                <button className="w-full py-3 sm:py-4 bg-white border border-blue-100 text-blue-600 rounded-xl sm:rounded-2xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                   Open Support Ticket
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Migration Modal */}
      {showMigration && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] sm:rounded-[3rem] max-w-md w-full p-8 sm:p-10 md:p-14 shadow-2xl animate-in zoom-in-95 duration-300 relative overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-600 text-white rounded-2xl sm:rounded-[2rem] flex items-center justify-center mb-6 sm:mb-8 shadow-2xl shadow-blue-500/20">
              <TrendingUp size={32} />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2 md:mb-3 tracking-tighter">Academic Progression</h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-8 sm:mb-10 font-medium leading-relaxed">Select your new level to proceed with registration for the upcoming semester.</p>
            
            <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-8 sm:mb-10">
              {levels.map(l => (
                <button 
                  key={l}
                  onClick={() => setNextLevel(l)}
                  className={`py-3 sm:py-4 rounded-xl sm:rounded-2xl border-2 font-black text-[10px] sm:text-xs transition-all ${nextLevel === l ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-slate-100 text-slate-400 hover:border-slate-200'}`}
                >
                  {l}
                </button>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <button 
                onClick={() => setShowMigration(false)}
                className="flex-1 py-4 sm:py-5 text-slate-400 font-black text-[9px] sm:text-[10px] uppercase tracking-widest hover:bg-slate-50 rounded-xl sm:rounded-2xl transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={handleMigrate}
                className="flex-[2] py-4 sm:py-5 bg-slate-900 text-white font-black text-[9px] sm:text-[10px] uppercase tracking-[0.2em] rounded-xl sm:rounded-2xl hover:bg-blue-600 transition-all shadow-2xl shadow-slate-100"
              >
                Apply
              </button>
            </div>
            <button onClick={() => setShowMigration(false)} className="absolute top-6 right-6 sm:top-10 sm:right-10 text-slate-300 hover:text-slate-900 transition-colors">
              <X size={24} />
            </button>
          </div>
        </div>
      )}

      {/* COURSE FORM MODAL */}
      {showCourseForm && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl z-[200] flex items-center justify-center p-2 sm:p-4 md:p-8 animate-in fade-in duration-300">
           <div className="bg-white rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[3rem] w-full max-w-3xl shadow-2xl relative flex flex-col h-full sm:h-auto max-h-[95vh] overflow-hidden no-print-bg">
              <div id="course-form-print-area" className="flex-1 overflow-y-auto p-4 sm:p-8 md:p-14 print:p-0">
                 {/* Logo & Header */}
                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-8 mb-8 sm:mb-14 border-b border-slate-100 pb-6 sm:pb-10">
                    <div className="flex items-center gap-4 sm:gap-6">
                       <div className="w-14 h-14 sm:w-20 sm:h-20 bg-slate-50 border border-slate-100 rounded-[1.5rem] sm:rounded-[2.5rem] flex items-center justify-center shadow-inner shrink-0">
                          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Federal_University_Lafia_logo.png/220px-Federal_University_Lafia_logo.png" className="w-8 h-8 sm:w-12 sm:h-12 object-contain" alt="FUL" />
                       </div>
                       <div className="min-w-0">
                          <h2 className="text-lg sm:text-2xl font-black text-slate-900 leading-tight truncate">University of Lafia</h2>
                          <p className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Course Registration Record</p>
                       </div>
                    </div>
                    <div className="text-left md:text-right shrink-0">
                       <p className="text-[8px] sm:text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-1 sm:mb-2">Session / Term</p>
                       <p className="text-sm sm:text-xl font-black text-slate-900 tracking-tighter">2024/2025 • 1st Sem.</p>
                    </div>
                 </div>

                 {/* Student Bio-data Grid */}
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 sm:gap-y-10 gap-x-4 sm:gap-x-8 mb-8 sm:mb-14">
                    <div className="min-w-0">
                       <p className="text-[8px] sm:text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 sm:mb-2">Full Name</p>
                       <p className="text-[10px] sm:text-sm font-black text-slate-900 truncate">{user.name}</p>
                    </div>
                    <div className="min-w-0">
                       <p className="text-[8px] sm:text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 sm:mb-2">Matric Number</p>
                       <p className="text-[10px] sm:text-sm font-black text-slate-900 truncate">{user.matricNo}</p>
                    </div>
                    <div className="min-w-0">
                       <p className="text-[8px] sm:text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 sm:mb-2">Level</p>
                       <p className="text-[10px] sm:text-sm font-black text-slate-900">{user.level}</p>
                    </div>
                    <div className="min-w-0">
                       <p className="text-[8px] sm:text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 sm:mb-2">Department</p>
                       <p className="text-[10px] sm:text-sm font-black text-slate-900 truncate">{user.department}</p>
                    </div>
                 </div>

                 {/* Responsive Table Container */}
                 <div className="mb-8 sm:mb-14 overflow-hidden border border-slate-100 rounded-xl sm:rounded-[2rem]">
                    <div className="overflow-x-auto no-scrollbar">
                      <table className="w-full text-left border-collapse min-w-[500px]">
                        <thead>
                            <tr className="bg-slate-50">
                              <th className="px-4 sm:px-6 py-3 sm:py-4 text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Code</th>
                              <th className="px-4 sm:px-6 py-3 sm:py-4 text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Course Title</th>
                              <th className="px-4 sm:px-6 py-3 sm:py-4 text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 text-center">Units</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {myApprovedCourses.map(course => (
                              <tr key={course.id}>
                                <td className="px-4 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-xs font-black text-slate-900">{course.code}</td>
                                <td className="px-4 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-xs font-bold text-slate-600">{course.title}</td>
                                <td className="px-4 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-xs font-black text-slate-900 text-center">3.0</td>
                              </tr>
                            ))}
                            <tr className="bg-slate-900 text-white">
                              <td colSpan={2} className="px-4 sm:px-6 py-4 sm:py-5 text-[10px] sm:text-xs font-black uppercase tracking-widest text-right">Total Credits</td>
                              <td className="px-4 sm:px-6 py-4 sm:py-5 text-sm sm:text-base font-black text-center">{myApprovedCourses.length * 3}.0</td>
                            </tr>
                        </tbody>
                      </table>
                    </div>
                 </div>

                 {/* Signatures */}
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-12 text-center pt-6 sm:pt-10">
                    <div className="space-y-3 sm:space-y-4">
                       <div className="h-px bg-slate-200 w-full mb-1"></div>
                       <p className="text-[7px] sm:text-[9px] font-black text-slate-400 uppercase tracking-widest">Student Signature</p>
                    </div>
                    <div className="space-y-3 sm:space-y-4">
                       <div className="h-px bg-slate-200 w-full mb-1"></div>
                       <p className="text-[7px] sm:text-[9px] font-black text-slate-400 uppercase tracking-widest">Course Adviser</p>
                    </div>
                    <div className="space-y-3 sm:space-y-4 hidden md:block">
                       <div className="h-px bg-slate-200 w-full mb-1"></div>
                       <p className="text-[7px] sm:text-[9px] font-black text-slate-400 uppercase tracking-widest">Bursary Clearance</p>
                    </div>
                 </div>

                 <div className="mt-8 sm:mt-14 flex flex-col items-center justify-center text-center space-y-4 sm:space-y-6">
                    <div className="flex items-center gap-2 sm:gap-3 text-blue-600 font-black text-[8px] sm:text-[10px] uppercase tracking-widest bg-blue-50 px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-blue-100">
                       <BadgeCheck size={20} className="shrink-0" /> Officially Authenticated
                    </div>
                    <p className="text-[8px] sm:text-[10px] text-slate-400 max-w-sm leading-relaxed font-medium italic">Document confirms eligibility for lectures. Valid only when signed and stamped.</p>
                 </div>
              </div>

              {/* Action Footer */}
              <div className="p-4 sm:p-6 md:p-10 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row gap-3 no-print">
                 <button 
                  onClick={() => setShowCourseForm(false)}
                  className="flex-1 py-3 sm:py-5 text-slate-500 font-black text-[9px] sm:text-[10px] uppercase tracking-widest hover:bg-white rounded-xl sm:rounded-2xl transition-all"
                 >
                    Discard
                 </button>
                 <button 
                  onClick={handlePrint}
                  className="flex-[2] py-3 sm:py-5 bg-slate-900 text-white rounded-xl sm:rounded-2xl font-black text-[9px] sm:text-[10px] uppercase tracking-[0.2em] shadow-xl hover:bg-blue-600 transition-all flex items-center justify-center gap-2"
                 >
                    <Printer size={16} /> Hard Copy
                 </button>
                 <button className="flex-1 py-3 sm:py-5 bg-white border border-slate-200 text-slate-600 rounded-xl sm:rounded-2xl font-black text-[9px] sm:text-[10px] uppercase tracking-widest hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
                    <DownloadCloud size={16} /> PDF
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* Global Print Layout Styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
            background: white !important;
            color: black !important;
          }
          #course-form-print-area, #course-form-print-area * {
            visibility: visible;
          }
          #course-form-print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 1.5cm !important;
            border: none !important;
            box-shadow: none !important;
          }
          .no-print {
            display: none !important;
          }
          .no-print-bg {
            background: white !important;
          }
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Profile;
