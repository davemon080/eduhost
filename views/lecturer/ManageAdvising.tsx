
import React, { useState } from 'react';
import { University, UserProfile, UserRole } from '../../types';
import { COURSES } from '../../mockData';
import { 
  UserCheck, 
  Search, 
  ChevronRight, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  MoreVertical, 
  ArrowRight,
  BookOpen,
  ClipboardCheck,
  AlertCircle
} from 'lucide-react';

interface ManageAdvisingProps {
  university: University;
}

// Mock student data for advising
const MOCK_PENDING_STUDENTS = [
  { 
    id: 's-1001', 
    name: 'Alex Thompson', 
    matricNo: 'FUL/SCI/22/1004', 
    level: '200L', 
    department: 'Computer Science', 
    pendingCourses: ['c1', 'c2', 'c3'] 
  },
  { 
    id: 's-1002', 
    name: 'Maria Garcia', 
    matricNo: 'FUL/SCI/22/2012', 
    level: '200L', 
    department: 'Computer Science', 
    pendingCourses: ['c1', 'c4'] 
  },
  { 
    id: 's-1003', 
    name: 'James Wilson', 
    matricNo: 'FUL/SCI/22/1056', 
    level: '200L', 
    department: 'Computer Science', 
    pendingCourses: ['c1', 'c2', 'ch1'] 
  }
];

const ManageAdvising: React.FC<ManageAdvisingProps> = ({ university }) => {
  const [students, setStudents] = useState(MOCK_PENDING_STUDENTS);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleApprove = (studentId: string) => {
    // In a real app, this would call an API
    setStudents(prev => prev.filter(s => s.id !== studentId));
    setSelectedStudentId(null);
  };

  const activeStudent = students.find(s => s.id === selectedStudentId);

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Registration Advising</h2>
            <p className="text-slate-500 font-medium">Review and verify student course registration requests for this semester.</p>
         </div>
         <div className="flex bg-white px-6 py-4 rounded-2xl border border-slate-100 shadow-sm items-center gap-4">
            <div className="text-right">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pending Review</p>
               <p className="text-sm font-black text-slate-900">{students.length} Requests</p>
            </div>
            <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
               <Clock size={20} />
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Student List Sidebar */}
        <div className="lg:col-span-1 space-y-4">
           <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
              <input 
                type="text" 
                placeholder="Find student..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-100 rounded-xl text-xs font-bold shadow-sm outline-none focus:ring-4 focus:ring-blue-500/5"
              />
           </div>
           
           <div className="space-y-2">
              {students.map(student => (
                <button 
                  key={student.id}
                  onClick={() => setSelectedStudentId(student.id)}
                  className={`w-full p-5 rounded-2xl border-2 text-left transition-all ${
                    selectedStudentId === student.id 
                      ? 'bg-slate-900 border-slate-900 text-white shadow-xl' 
                      : 'bg-white border-slate-100 text-slate-600 hover:border-blue-200'
                  }`}
                >
                   <p className="font-black text-sm mb-1">{student.name}</p>
                   <p className={`text-[10px] font-black uppercase tracking-widest ${selectedStudentId === student.id ? 'text-white/40' : 'text-slate-400'}`}>
                    {student.matricNo}
                   </p>
                   <div className="flex items-center justify-between mt-4">
                      <span className={`text-[9px] font-black px-2 py-1 rounded-md uppercase ${selectedStudentId === student.id ? 'bg-white/10 text-white' : 'bg-slate-50 text-slate-400'}`}>
                        {student.pendingCourses.length} Courses
                      </span>
                      <ChevronRight size={14} className={selectedStudentId === student.id ? 'text-white' : 'text-slate-200'} />
                   </div>
                </button>
              ))}
              
              {students.length === 0 && (
                <div className="py-12 text-center bg-white rounded-[2rem] border-2 border-dashed border-slate-50">
                   <CheckCircle2 size={32} className="mx-auto text-emerald-100 mb-3" />
                   <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Queue Clear</p>
                </div>
              )}
           </div>
        </div>

        {/* Detailed Review Panel */}
        <div className="lg:col-span-2">
           {activeStudent ? (
             <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden animate-in slide-in-from-right-4 duration-500">
                <div className="p-8 md:p-10 border-b border-slate-50 bg-slate-50/50">
                   <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-5">
                         <div className="w-16 h-16 bg-white rounded-[1.5rem] flex items-center justify-center text-slate-900 text-2xl font-black shadow-xl border border-slate-100">
                            {activeStudent.name.charAt(0)}
                         </div>
                         <div>
                            <h3 className="text-2xl font-black text-slate-900 tracking-tight">{activeStudent.name}</h3>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">{activeStudent.matricNo}</p>
                         </div>
                      </div>
                      <div className="hidden sm:block text-right">
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Status</p>
                         <p className="text-xs font-black text-amber-500 uppercase flex items-center gap-1 justify-end">
                            <Clock size={12}/> Reviewing
                         </p>
                      </div>
                   </div>

                   <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                      <div>
                         <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Academic Level</p>
                         <p className="text-sm font-black text-slate-800">{activeStudent.level}</p>
                      </div>
                      <div>
                         <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Department</p>
                         <p className="text-sm font-black text-slate-800">{activeStudent.department}</p>
                      </div>
                      <div>
                         <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Total Credits</p>
                         <p className="text-sm font-black text-slate-800">{activeStudent.pendingCourses.length * 3}.0 Units</p>
                      </div>
                   </div>
                </div>

                <div className="p-8 md:p-10">
                   <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                      <BookOpen size={14} /> Course Selection Review
                   </h4>
                   <div className="space-y-3">
                      {activeStudent.pendingCourses.map(cid => {
                        const course = COURSES.find(c => c.id === cid);
                        return (
                          <div key={cid} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between group hover:border-blue-200 transition-all">
                             <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center font-black text-[10px] text-slate-400 border border-slate-100">
                                   {course?.code.split(' ')[0]}
                                </div>
                                <div>
                                   <p className="text-xs font-black text-slate-800">{course?.code}: {course?.title}</p>
                                   <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter mt-0.5">Core Curriculum Module</p>
                                </div>
                             </div>
                             <span className="text-[10px] font-black text-slate-400 bg-white px-3 py-1 rounded-lg border border-slate-100">3.0 CR</span>
                          </div>
                        );
                      })}
                   </div>

                   <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
                      <button className="flex-1 py-4 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 rounded-2xl transition-all border border-slate-100">
                         Reject Selection
                      </button>
                      <button 
                        onClick={() => handleApprove(activeStudent.id)}
                        className="flex-[2] py-4 bg-slate-900 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl hover:bg-blue-600 transition-all shadow-2xl flex items-center justify-center gap-3"
                      >
                         <UserCheck size={18} /> Approve Course Registration
                      </button>
                   </div>
                </div>
             </div>
           ) : (
             <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center bg-white rounded-[3rem] border-4 border-dashed border-slate-50 p-12">
                <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center text-slate-200 mb-6">
                   <ClipboardCheck size={40} />
                </div>
                <h3 className="text-xl font-black text-slate-400 uppercase tracking-widest">Select a Request</h3>
                <p className="text-slate-300 text-sm mt-2 max-w-xs">Please select a student from the sidebar to review their semester course load.</p>
             </div>
           )}
        </div>
      </div>
      
      {/* Help Note */}
      <div className="p-8 bg-blue-50 border border-blue-100 rounded-[2.5rem] flex items-start gap-5">
         <AlertCircle className="text-blue-600 mt-1" size={24} />
         <div>
            <h4 className="font-black text-blue-900 text-sm mb-1 uppercase tracking-widest">Advisory Note</h4>
            <p className="text-blue-700/70 text-sm font-medium leading-relaxed">Approving a registration automatically populates the student's Course Form and grants them access to virtual lecture materials. Please ensure the credit load adheres to institutional limits.</p>
         </div>
      </div>
    </div>
  );
};

export default ManageAdvising;
