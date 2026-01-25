
import React, { useState, useMemo } from 'react';
import { University, UserProfile, UserRole } from '../../types';
import { 
  RotateCw, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowUpCircle, 
  Calendar, 
  Users, 
  BookOpen, 
  TrendingUp, 
  Loader2, 
  History,
  ShieldCheck,
  Play
} from 'lucide-react';

interface SemesterControlProps {
  university: University;
  onUpdateUser: (user: UserProfile) => void;
}

const SemesterControl: React.FC<SemesterControlProps> = ({ university, onUpdateUser }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [success, setSuccess] = useState(false);

  // For prototype demonstration, we'll "find" the current student from local storage
  const currentStudent: UserProfile | null = useMemo(() => {
    const stored = localStorage.getItem('auth_user');
    if (!stored) return null;
    const user = JSON.parse(stored);
    return user.role === UserRole.STUDENT ? user : null;
  }, [success]);

  const handleConcludeSemester = () => {
    if (!currentStudent) return;
    setIsProcessing(true);

    // Progression Logic
    setTimeout(() => {
      const nextSemester = currentStudent.currentSemester === 'First' ? 'Second' : 'First';
      let nextLevel = currentStudent.level || '100L';
      let nextSession = currentStudent.currentSession || '2024/2025';

      // Promotion Logic: If finishing Second Semester, move up a level
      if (currentStudent.currentSemester === 'Second') {
        const levelNum = parseInt(nextLevel);
        if (levelNum < 500) {
          nextLevel = `${levelNum + 100}L`;
        } else {
          nextLevel = 'GRADUATED';
        }

        // Increment Session (e.g., 2024/2025 -> 2025/2026)
        const years = nextSession.split('/');
        const start = parseInt(years[0]) + 1;
        const end = parseInt(years[1]) + 1;
        nextSession = `${start}/${end}`;
      }

      // Record Archiving
      const newHistory = [
        ...(currentStudent.progress || []),
        {
          semester: `${currentStudent.currentSession} ${currentStudent.currentSemester} Sem.`,
          gpa: 4.25, // Mock calculated GPA
          completedCourses: currentStudent.courses
        }
      ];

      const updatedProfile: UserProfile = {
        ...currentStudent,
        level: nextLevel,
        currentSemester: nextSemester,
        currentSession: nextSession,
        courses: [], // Clear current courses for new registration
        pendingCourses: [],
        registrationStatus: 'Not Started',
        progress: newHistory,
        currentStatus: nextLevel === 'GRADUATED' ? 'Inactive' : 'Active'
      };

      onUpdateUser(updatedProfile);
      setIsProcessing(false);
      setShowConfirm(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 2000);
  };

  if (!currentStudent) {
    return (
      <div className="p-12 text-center bg-white rounded-[3rem] border border-slate-100">
         <Users size={48} className="mx-auto text-slate-200 mb-4" />
         <h3 className="text-xl font-black text-slate-400 uppercase tracking-widest">No Student Profile Linked</h3>
         <p className="text-slate-300 mt-2">Log in as a student first to test progression logic.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* 1. Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
           <div className="relative z-10 flex flex-col justify-between h-full">
              <div>
                <h2 className="text-3xl font-black mb-1">Semester Management</h2>
                <p className="text-white/40 font-medium">Coordinate term conclusions and automated student promotions.</p>
              </div>
              <div className="mt-12 flex flex-wrap gap-4">
                 <div className="px-5 py-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
                    <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">Active Session</p>
                    <p className="text-xl font-black">{currentStudent.currentSession}</p>
                 </div>
                 <div className="px-5 py-3 bg-blue-600 rounded-2xl shadow-xl shadow-blue-500/20">
                    <p className="text-[10px] font-black text-white/50 uppercase tracking-widest mb-1">Current Term</p>
                    <p className="text-xl font-black">{currentStudent.currentSemester} Semester</p>
                 </div>
              </div>
           </div>
           <RotateCw className="absolute -right-12 -bottom-12 text-white/5" size={240} />
        </div>

        <div className="bg-white rounded-[3rem] border border-slate-100 p-8 shadow-sm flex flex-col justify-between">
           <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
              <Users size={14} /> Population Health
           </h3>
           <div className="space-y-4">
              <div className="flex items-center justify-between">
                 <span className="text-xs font-bold text-slate-500">Exams Completed</span>
                 <span className="text-sm font-black text-emerald-500">100%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                 <div className="h-full bg-emerald-500 w-full"></div>
              </div>
              <div className="flex items-center justify-between">
                 <span className="text-xs font-bold text-slate-500">Grading Finalized</span>
                 <span className="text-sm font-black text-blue-600">98.2%</span>
              </div>
           </div>
           <div className="pt-4 border-t border-slate-50">
              <p className="text-[10px] font-medium text-slate-400 leading-relaxed italic">Readiness: System is ready for semester conclusion.</p>
           </div>
        </div>
      </div>

      {/* 2. Action Zone */}
      <div className="bg-white rounded-[3rem] border border-slate-100 p-10 shadow-sm">
         <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="w-24 h-24 bg-amber-50 text-amber-600 rounded-[2rem] flex items-center justify-center shrink-0">
               <RotateCw size={40} />
            </div>
            <div className="flex-1 text-center md:text-left">
               <h3 className="text-2xl font-black text-slate-900 mb-2">Conclude Academic Term</h3>
               <p className="text-slate-500 font-medium leading-relaxed max-w-xl">
                  This action will archive the current semester's results, move the academic calendar forward, and promote eligible students to their next level. 
                  <span className="text-amber-600 font-bold"> This action is irreversible.</span>
               </p>
            </div>
            <button 
               onClick={() => setShowConfirm(true)}
               className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-blue-600 transition-all"
            >
               Conclude Semester
            </button>
         </div>
      </div>

      {/* 3. Logic Breakdown / Smart Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="space-y-6">
            <h4 className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Promotion Chain</h4>
            <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 space-y-4">
               {[
                 { from: '100L', to: '200L', status: 'Active' },
                 { from: '200L', to: '300L', status: 'Active' },
                 { from: '300L', to: '400L', status: 'Active' },
                 { from: '400L', to: '500L', status: 'Active' },
                 { from: '500L', to: 'GRADUATED', status: 'Active' },
               ].map((l, i) => (
                 <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                    <div className="flex items-center gap-4">
                       <span className="text-sm font-black text-slate-900">{l.from}</span>
                       <ArrowUpCircle size={16} className="text-blue-500" />
                       <span className="text-sm font-black text-slate-900">{l.to}</span>
                    </div>
                    <CheckCircle2 size={16} className="text-emerald-500" />
                 </div>
               ))}
            </div>
         </div>

         <div className="space-y-6">
            <h4 className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Automated Tasks</h4>
            <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 space-y-6">
               <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><History size={20}/></div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">GPA Archival</p>
                    <p className="text-xs text-slate-400 mt-1">Calculates and saves term GPA to permanent record.</p>
                  </div>
               </div>
               <div className="flex items-start gap-4">
                  <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl"><BookOpen size={20}/></div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">Curriculum Reset</p>
                    <p className="text-xs text-slate-400 mt-1">Clears registered modules for next term enrollment.</p>
                  </div>
               </div>
               <div className="flex items-start gap-4">
                  <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><TrendingUp size={20}/></div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">Status Advancement</p>
                    <p className="text-xs text-slate-400 mt-1">Updates Level, Semester, and Session metadata.</p>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl z-[200] flex items-center justify-center p-4">
           <div className="bg-white rounded-[3rem] max-w-md w-full p-10 shadow-2xl animate-in zoom-in-95 duration-300">
              <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-[2rem] flex items-center justify-center mb-8 mx-auto shadow-2xl shadow-amber-500/10">
                 <AlertTriangle size={32} />
              </div>
              <h3 className="text-3xl font-black text-slate-900 text-center mb-4 tracking-tighter">Confirm Transition</h3>
              <p className="text-slate-500 text-center font-medium leading-relaxed mb-10">
                 You are about to conclude the <span className="text-slate-900 font-bold">{currentStudent.currentSemester} Semester</span> of <span className="text-slate-900 font-bold">{currentStudent.currentSession}</span>. This will force all students to re-register for the new term.
              </p>
              
              <div className="space-y-3">
                 <button 
                  onClick={handleConcludeSemester}
                  disabled={isProcessing}
                  className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-blue-600 transition-all flex items-center justify-center gap-3"
                 >
                    {isProcessing ? <Loader2 className="animate-spin" size={18} /> : 'Execute Progression Logic'}
                 </button>
                 <button 
                  onClick={() => setShowConfirm(false)}
                  disabled={isProcessing}
                  className="w-full py-5 text-slate-400 font-black text-xs uppercase tracking-widest hover:bg-slate-50 rounded-2xl transition-all"
                 >
                    Cancel Action
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* Success Notification */}
      {success && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[210] animate-in slide-in-from-top-4">
           <div className="bg-emerald-600 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-emerald-500">
              <CheckCircle2 size={24} />
              <div>
                 <p className="font-black uppercase tracking-widest text-xs">Calendar Advanced</p>
                 <p className="text-[10px] opacity-80">Students promoted to their next academic stage.</p>
              </div>
           </div>
        </div>
      )}

      <div className="pt-12 flex flex-col items-center justify-center text-center space-y-4">
         <div className="flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase bg-blue-50 px-5 py-2.5 rounded-full border border-blue-100">
            <ShieldCheck size={18} /> Administrative Security Oversight
         </div>
      </div>
    </div>
  );
};

export default SemesterControl;
