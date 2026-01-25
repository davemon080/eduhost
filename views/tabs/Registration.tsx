
import React, { useState, useMemo } from 'react';
import { UserProfile, Course } from '../../types';
import { COURSES } from '../../mockData';
import { 
  ClipboardCheck, 
  Search, 
  Info, 
  Check, 
  AlertCircle, 
  BookOpen, 
  ShieldAlert, 
  CheckCircle2, 
  Loader2,
  Clock
} from 'lucide-react';

interface RegistrationProps {
  user: UserProfile;
  onUpdate: (user: UserProfile) => void;
}

const Registration: React.FC<RegistrationProps> = ({ user, onUpdate }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(user.pendingCourses || []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const availableCourses = useMemo(() => {
    return COURSES.filter(c => c.department === user.department && c.level === user.level);
  }, [user.department, user.level]);

  const filteredCourses = useMemo(() => {
    return availableCourses.filter(c => 
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      c.code.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [availableCourses, searchQuery]);

  const toggleCourse = (id: string) => {
    if (user.courses.includes(id)) return; // Already approved
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleRegister = () => {
    setIsSubmitting(true);
    // Mock API call
    setTimeout(() => {
      onUpdate({
        ...user,
        pendingCourses: selectedIds
      });
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    }, 1500);
  };

  const totalCredits = selectedIds.length * 3;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
      {/* Header Card */}
      <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-black mb-2 tracking-tighter">Semester Registration</h2>
          <p className="text-white/60 font-medium text-sm md:text-base leading-relaxed max-w-lg">
            Select the courses you are offering for this semester. Your selections will be sent to your <span className="text-white font-bold">Course Advisor</span> for verification and approval.
          </p>
        </div>
        <ClipboardCheck className="absolute -right-8 -bottom-8 text-white/5" size={200} />
      </div>

      {/* Info Notice */}
      <div className="flex items-start gap-4 p-6 bg-blue-50 border border-blue-100 rounded-[2rem] text-blue-700">
        <Info size={24} className="shrink-0 mt-0.5" />
        <div className="text-sm">
           <p className="font-black uppercase tracking-widest mb-1 text-[10px]">Registration Policy</p>
           <p className="font-medium leading-relaxed">Once submitted, you cannot modify your selection until the Advisor reviews it. Approved courses will automatically appear on your official Course Form.</p>
        </div>
      </div>

      {/* Search & Stats Bar */}
      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
         <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            <input 
              type="text" 
              placeholder="Search curriculum..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-white border border-slate-100 rounded-2xl shadow-sm outline-none focus:ring-4 focus:ring-blue-500/5 transition-all font-bold text-sm"
            />
         </div>
         <div className="flex items-center gap-4 bg-white px-6 py-4 rounded-2xl border border-slate-100 shadow-sm">
            <div className="text-right">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Load</p>
               <p className="text-sm font-black text-slate-900">{totalCredits} Credits</p>
            </div>
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-black">
               {selectedIds.length}
            </div>
         </div>
      </div>

      {/* Course List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredCourses.map(course => {
          const isApproved = user.courses.includes(course.id);
          const isPending = user.pendingCourses?.includes(course.id);
          const isSelected = selectedIds.includes(course.id);

          return (
            <button 
              key={course.id}
              onClick={() => toggleCourse(course.id)}
              disabled={isApproved}
              className={`w-full text-left p-6 md:p-8 rounded-[2rem] border-2 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 group ${
                isSelected ? 'bg-blue-50 border-blue-500 shadow-lg shadow-blue-500/5' : 
                isApproved ? 'bg-slate-50 border-slate-100 opacity-60' :
                'bg-white border-slate-100 hover:border-blue-200'
              }`}
            >
              <div className="flex items-start md:items-center gap-6">
                 <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-sm font-black border transition-colors ${
                   isSelected ? 'bg-blue-600 text-white border-blue-600' : 
                   isApproved ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                   'bg-slate-50 text-slate-400 border-slate-100 group-hover:bg-blue-50 group-hover:text-blue-600'
                 }`}>
                    {course.code.split(' ')[0]}
                 </div>
                 <div>
                    <div className="flex items-center gap-2 mb-1">
                       <h4 className="font-black text-slate-900 leading-none">{course.code}: {course.title}</h4>
                       {isApproved && <CheckCircle2 size={16} className="text-emerald-500" />}
                       {isPending && !isSelected && <Clock size={16} className="text-amber-500" />}
                    </div>
                    <p className="text-xs font-medium text-slate-400">Department of {course.department} • 3.0 Units</p>
                 </div>
              </div>
              
              <div className="flex items-center gap-4">
                 {isApproved ? (
                   <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full uppercase tracking-widest border border-emerald-100">Approved</span>
                 ) : isPending && !isSelected ? (
                   <span className="text-[10px] font-black text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full uppercase tracking-widest border border-amber-100">Awaiting Approval</span>
                 ) : (
                   <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                     isSelected ? 'bg-blue-600 border-blue-600' : 'border-slate-200 group-hover:border-blue-300'
                   }`}>
                      {isSelected && <Check size={14} className="text-white" strokeWidth={4} />}
                   </div>
                 )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Floating Action Bar */}
      <div className="fixed bottom-24 left-4 right-4 md:left-auto md:right-12 md:bottom-12 z-[100] animate-in slide-in-from-bottom-8">
         <div className="bg-slate-900 rounded-[2rem] p-4 pr-4 pl-8 flex items-center justify-between gap-8 shadow-2xl border border-white/10 max-w-lg">
            <div className="hidden sm:block">
               <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Selected Courses</p>
               <p className="text-sm font-black text-white">{selectedIds.length} Total Modules</p>
            </div>
            <button 
              onClick={handleRegister}
              disabled={isSubmitting || selectedIds.length === 0}
              className="flex-1 sm:flex-none px-10 py-4 bg-blue-600 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : 'Register for Semester'}
            </button>
         </div>
      </div>

      {showSuccess && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[200] animate-in slide-in-from-top-4">
           <div className="bg-emerald-600 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-emerald-500">
              <CheckCircle2 size={24} />
              <div className="text-sm">
                 <p className="font-black uppercase tracking-widest leading-none mb-1">Registration Sent</p>
                 <p className="font-medium opacity-80">Pending advisor approval. Form will update soon.</p>
              </div>
           </div>
        </div>
      )}

      <div className="pt-20 text-center opacity-40">
         <AlertCircle size={24} className="mx-auto mb-2" />
         <p className="text-[10px] font-black uppercase tracking-[0.2em]">End of Semester List</p>
      </div>
    </div>
  );
};

export default Registration;
