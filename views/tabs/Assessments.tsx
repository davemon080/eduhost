
import React, { useState } from 'react';
import { GraduationCap, FileText, ClipboardList, Clock, CheckCircle2, AlertCircle, Calendar, ChevronRight, Upload, MapPin, Trophy, FileDown, ExternalLink } from 'lucide-react';

type SubTab = 'exams' | 'tests' | 'assignments';

const Assessments: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('assignments');

  const exams = [
    { id: 'e1', title: 'First Semester Examination', course: 'CSC 101', date: 'Dec 12, 2025', time: '09:00 AM', venue: 'Faculty Hall A', status: 'Scheduled' },
    { id: 'e2', title: 'Logic & Philosophy Final', course: 'CSC 102', date: 'Dec 15, 2025', time: '01:00 PM', venue: 'Main Auditorium', status: 'Scheduled' },
  ];

  const tests = [
    { id: 't1', title: 'Continuous Assessment 1', course: 'MTH 101', duration: '30 mins', status: 'Live', deadline: 'Ends in 2h' },
    { id: 't2', title: 'Programming Quiz', course: 'CSC 101', duration: '15 mins', status: 'Completed', score: '18/20' },
  ];

  const assignments = [
    { 
      id: 'a1', 
      title: 'Algorithm Complexity Analysis', 
      course: 'CSC 201', 
      deadline: 'Today, 11:59 PM', 
      status: 'Pending', 
      priority: 'High',
      questionFile: 'csc201_hw1_questions.pdf' 
    },
    { 
      id: 'a2', 
      title: 'Calculus Problem Set 3', 
      course: 'MTH 102', 
      deadline: 'Tomorrow', 
      status: 'Turned In', 
      submittedAt: 'Oct 24',
      questionFile: 'mth102_set3.pdf'
    },
    { 
      id: 'a3', 
      title: 'Database Design Schema', 
      course: 'CSC 301', 
      deadline: 'Oct 30', 
      status: 'Pending', 
      priority: 'Normal',
      questionFile: 'csc301_lab_schema.pdf'
    },
  ];

  const renderContent = () => {
    switch (activeSubTab) {
      case 'exams':
        return (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {exams.map(exam => (
              <div key={exam.id} className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center shrink-0 shadow-inner">
                    <GraduationCap size={28} />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-slate-900 leading-tight">{exam.title}</h4>
                    <p className="text-sm font-bold text-blue-600 uppercase tracking-tight mt-1">{exam.course}</p>
                    <div className="flex flex-wrap gap-4 mt-4">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                        <Calendar size={14} /> {exam.date}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                        <Clock size={14} /> {exam.time}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                        <MapPin size={14} /> {exam.venue}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-4 md:pt-0">
                  <span className="px-5 py-2 bg-slate-100 text-slate-500 rounded-full text-[10px] font-black uppercase tracking-widest border border-slate-200 shadow-sm">
                    {exam.status}
                  </span>
                  <button className="p-3 bg-slate-900 text-white rounded-2xl hover:bg-blue-600 transition-all shadow-lg shadow-slate-200">
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            ))}
            {exams.length === 0 && (
              <div className="py-20 text-center bg-white rounded-[2.5rem] border border-slate-100 border-dashed">
                <GraduationCap className="mx-auto text-slate-200 mb-4" size={48} />
                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No upcoming examinations</p>
              </div>
            )}
          </div>
        );
      case 'tests':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {tests.map(test => (
              <div key={test.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
                <div className={`absolute top-0 right-0 w-32 h-32 blur-3xl opacity-10 ${test.status === 'Live' ? 'bg-red-500' : 'bg-green-500'}`}></div>
                <div className="flex items-center justify-between mb-8">
                  <div className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.1em] shadow-sm border ${test.status === 'Live' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-green-50 text-green-600 border-green-100'}`}>
                    {test.status}
                  </div>
                  <FileText size={20} className="text-slate-300 group-hover:text-blue-600 transition-colors" />
                </div>
                <h4 className="text-xl font-black text-slate-900 mb-1">{test.title}</h4>
                <p className="text-sm font-bold text-slate-400 mb-10">{test.course}</p>
                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                   <div className="flex items-center gap-2 text-xs font-black text-slate-500 bg-slate-50 px-3 py-2 rounded-xl">
                    <Clock size={16} className="text-blue-500"/> {test.duration}
                   </div>
                   {test.status === 'Completed' ? (
                     <div className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-xl font-black text-xs">
                        <Trophy size={14}/> {test.score}
                     </div>
                   ) : (
                     <button className="px-6 py-2 bg-slate-900 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg">
                        Start
                     </button>
                   )}
                </div>
              </div>
            ))}
          </div>
        );
      case 'assignments':
        return (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {assignments.map(item => (
              <div key={item.id} className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-5">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-inner ${item.status === 'Turned In' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'}`}>
                    {item.status === 'Turned In' ? <CheckCircle2 size={28} /> : <ClipboardList size={28} />}
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-slate-900 leading-tight">{item.title}</h4>
                    <p className="text-sm font-bold text-slate-400 mt-1">{item.course}</p>
                    <div className="flex items-center gap-4 mt-3">
                       <p className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${item.priority === 'High' ? 'text-red-500 bg-red-50' : 'text-slate-400 bg-slate-50'}`}>
                        {item.status === 'Turned In' ? 'Finished' : `${item.priority} Priority`}
                      </p>
                      <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                        Due: {item.deadline}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  {/* View Question PDF Button */}
                  <button className="flex items-center gap-2 px-5 py-3 bg-slate-100 text-slate-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-50 hover:text-blue-600 transition-all border border-slate-200 group">
                    <FileDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
                    View Questions (PDF)
                  </button>

                  <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-4 md:pt-0">
                    <div className="text-right hidden sm:block">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</p>
                      <p className={`text-sm font-black ${item.status === 'Turned In' ? 'text-green-600' : 'text-amber-500'}`}>{item.status}</p>
                    </div>
                    {item.status !== 'Turned In' ? (
                      <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-200">
                        <Upload size={16} /> Submit PDF Solution
                      </button>
                    ) : (
                      <div className="px-6 py-3 bg-slate-50 text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-slate-100">
                        View Submission
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
    }
  };

  const tabs = [
    { id: 'exams', label: 'Exams', icon: GraduationCap },
    { id: 'tests', label: 'Tests', icon: FileText },
    { id: 'assignments', label: 'Assignments', icon: ClipboardList },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in duration-700">
      {/* Sub-navigation Segmented Control */}
      <div className="flex bg-slate-200/50 p-1.5 rounded-[1.8rem] w-full md:w-fit mx-auto shadow-inner">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as SubTab)}
            className={`flex-1 md:flex-none flex items-center justify-center gap-3 px-8 py-3.5 rounded-2xl text-sm font-black uppercase tracking-widest transition-all duration-300 ${
              activeSubTab === tab.id 
                ? 'bg-white text-slate-900 shadow-xl shadow-slate-200 ring-1 ring-slate-100' 
                : 'text-slate-400 hover:text-slate-600 hover:bg-white/40'
            }`}
          >
            <tab.icon size={18} className={activeSubTab === tab.id ? 'text-blue-600' : ''} />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {/* Dynamic Section Header */}
        <div className="flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
             <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
             <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Institutional {activeSubTab} Dashboard</h3>
          </div>
          <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Academic Session 2025</p>
        </div>

        {renderContent()}
      </div>

      {/* Analytics Footer Placeholder */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 mt-10 border-t border-slate-200">
         <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Tasks</p>
            <h4 className="text-2xl font-black text-slate-900">14</h4>
         </div>
         <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Completion Rate</p>
            <h4 className="text-2xl font-black text-blue-600">85%</h4>
         </div>
         <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Avg Score</p>
            <h4 className="text-2xl font-black text-slate-900">4.1 <span className="text-[10px] text-slate-400">GPA</span></h4>
         </div>
      </div>
    </div>
  );
};

export default Assessments;
