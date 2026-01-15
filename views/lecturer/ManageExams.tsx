
import React, { useState } from 'react';
import { FileText, Plus, Trash2, Save, Clock, HelpCircle, CheckCircle2 } from 'lucide-react';

const ManageExams: React.FC = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [examType, setExamType] = useState<'TEST' | 'EXAM'>('TEST');
  const [questions, setQuestions] = useState([{ id: 1, text: '', options: ['', '', '', ''], correct: 0 }]);

  const addQuestion = () => {
    setQuestions([...questions, { id: Date.now(), text: '', options: ['', '', '', ''], correct: 0 }]);
  };

  const removeQuestion = (id: number) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  if (!isCreating) {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-black text-slate-900">Assessment Center</h3>
            <p className="text-slate-500 font-medium">Manage your examination schedules and question banks.</p>
          </div>
          <button 
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-xl shadow-slate-200 hover:bg-blue-600 transition-all"
          >
            <Plus size={20} /> Create Assessment
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {['CSC 201 Mid-Term', 'MTH 101 Final'].map((exam, i) => (
            <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
              <div className="flex items-center justify-between mb-6">
                <div className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${i === 0 ? 'bg-amber-50 text-amber-600' : 'bg-green-50 text-green-600'}`}>
                  {i === 0 ? 'Draft' : 'Published'}
                </div>
                <FileText size={20} className="text-slate-300 group-hover:text-blue-600" />
              </div>
              <h4 className="text-lg font-black text-slate-900 mb-2">{exam}</h4>
              <p className="text-xs text-slate-400 font-medium mb-8">40 Questions • 60 Minutes • 120 Students</p>
              <div className="flex gap-2">
                <button className="flex-1 py-3 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-100 transition-colors">Edit</button>
                <button className="flex-1 py-3 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-100 transition-colors">Results</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-8 duration-500 pb-20">
      <div className="flex items-center justify-between">
        <button onClick={() => setIsCreating(false)} className="text-slate-400 font-bold hover:text-slate-900 transition-colors flex items-center gap-2">
          Cancel & Exit
        </button>
        <button className="px-8 py-3 bg-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-100 flex items-center gap-2">
          <Save size={18} /> Publish Assessment
        </button>
      </div>

      <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Assessment Title</label>
            <input type="text" placeholder="e.g. CSC 201 First Test" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 font-bold" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Type</label>
            <div className="flex bg-slate-50 p-1 rounded-2xl border border-slate-200">
              <button 
                onClick={() => setExamType('TEST')}
                className={`flex-1 py-3 rounded-xl text-xs font-black uppercase transition-all ${examType === 'TEST' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'}`}
              >
                C.A Test
              </button>
              <button 
                onClick={() => setExamType('EXAM')}
                className={`flex-1 py-3 rounded-xl text-xs font-black uppercase transition-all ${examType === 'EXAM' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'}`}
              >
                Semester Exam
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-50 space-y-8">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-black text-slate-900">Question Pool</h4>
            <span className="text-xs font-bold text-slate-400">{questions.length} Questions Added</span>
          </div>

          <div className="space-y-6">
            {questions.map((q, idx) => (
              <div key={q.id} className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 relative group">
                <button 
                  onClick={() => removeQuestion(q.id)}
                  className="absolute top-6 right-6 p-2 text-slate-300 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
                
                <div className="flex items-center gap-4 mb-6">
                  <span className="w-10 h-10 bg-white rounded-xl flex items-center justify-center font-black text-slate-400 shadow-sm border border-slate-100">
                    {idx + 1}
                  </span>
                  <input 
                    type="text" 
                    placeholder="Enter your question here..."
                    className="flex-1 bg-transparent border-b-2 border-slate-200 focus:border-blue-500 outline-none py-2 font-bold text-slate-800 transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[0, 1, 2, 3].map(opt => (
                    <div key={opt} className="relative">
                      <input 
                        type="text" 
                        placeholder={`Option ${String.fromCharCode(65 + opt)}`}
                        className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-blue-500 text-sm font-medium"
                      />
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-2 border-slate-200 flex items-center justify-center cursor-pointer hover:border-blue-500">
                        <div className="w-2.5 h-2.5 rounded-full bg-blue-500 opacity-0"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={addQuestion}
            className="w-full py-6 border-2 border-dashed border-slate-200 rounded-[2.5rem] text-slate-400 font-bold hover:border-blue-300 hover:text-blue-500 transition-all flex items-center justify-center gap-3"
          >
            <Plus size={20} /> Add Next Question
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageExams;
