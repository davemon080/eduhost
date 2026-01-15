
import React, { useState } from 'react';
import { Course } from '../../types';
import { 
  ArrowLeft, 
  PlayCircle, 
  FileText, 
  Upload, 
  Trash2, 
  Check, 
  Video, 
  Edit3, 
  Save, 
  ExternalLink,
  Plus,
  Users,
  Search,
  Activity,
  MoreVertical
} from 'lucide-react';

interface ManageCourseProps {
  course: Course;
  onBack: () => void;
}

const ManageCourse: React.FC<ManageCourseProps> = ({ course, onBack }) => {
  const [activeSubTab, setActiveSubTab] = useState<'content' | 'students'>('content');
  const [youtubeId, setYoutubeId] = useState(course.youtubeId);
  const [isEditingId, setIsEditingId] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Mock student list
  const students = [
    { id: 'S101', name: 'John Doe', matric: 'U2021/304', engagement: '92%', lastSeen: '2h ago' },
    { id: 'S102', name: 'Emily White', matric: 'U2021/442', engagement: '88%', lastSeen: 'Today' },
    { id: 'S103', name: 'Michael Chen', matric: 'U2021/115', engagement: '45%', lastSeen: '3 days ago' },
  ];

  const handleSaveId = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsEditingId(false);
    }, 1000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold transition-colors group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Curriculum
        </button>
        <div className="flex bg-slate-200/50 p-1 rounded-2xl">
          <button 
            onClick={() => setActiveSubTab('content')}
            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase transition-all flex items-center gap-2 ${activeSubTab === 'content' ? 'bg-white text-blue-600 shadow-md' : 'text-slate-500'}`}
          >
            <FileText size={14} /> Materials
          </button>
          <button 
            onClick={() => setActiveSubTab('students')}
            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase transition-all flex items-center gap-2 ${activeSubTab === 'students' ? 'bg-white text-blue-600 shadow-md' : 'text-slate-500'}`}
          >
            <Users size={14} /> Student Roster
          </button>
        </div>
      </div>

      {activeSubTab === 'content' ? (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-8">
            {/* Video Management */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
              <div className="aspect-video bg-slate-900 flex items-center justify-center relative group">
                {youtubeId ? (
                  <iframe
                    className="w-full h-full pointer-events-none opacity-80"
                    src={`https://www.youtube.com/embed/${youtubeId}?controls=0`}
                    title="Lecture Preview"
                    frameBorder="0"
                  ></iframe>
                ) : (
                  <div className="text-center text-slate-500">
                     <Video size={48} className="mx-auto mb-4 opacity-20" />
                     <p className="text-sm font-bold uppercase tracking-widest">No Active Video Content</p>
                  </div>
                )}
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <button className="px-6 py-3 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-2xl">
                      <ExternalLink size={14}/> Test Link
                   </button>
                </div>
              </div>
              
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-black text-slate-900">Lecture Video Stream</h3>
                  {!isEditingId ? (
                    <button onClick={() => setIsEditingId(true)} className="flex items-center gap-2 text-xs font-black text-blue-600 hover:underline uppercase tracking-widest">
                      <Edit3 size={14} /> Update Source
                    </button>
                  ) : (
                     <button 
                      onClick={handleSaveId}
                      disabled={isSaving}
                      className="flex items-center gap-2 px-5 py-2 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg"
                     >
                      {isSaving ? <Check className="animate-pulse" size={14}/> : <Save size={14} />} Save ID
                    </button>
                  )}
                </div>
                
                {isEditingId ? (
                  <div className="space-y-4 animate-in slide-in-from-top-2">
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">Enter the unique 11-character YouTube Video ID found in the URL. For example: <span className="font-mono bg-slate-100 px-1">pTB0EiLXUC8</span></p>
                    <input 
                      type="text" 
                      value={youtubeId}
                      onChange={e => setYoutubeId(e.target.value)}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 font-mono transition-all"
                      placeholder="Enter Video ID..."
                    />
                  </div>
                ) : (
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                     <p className="text-sm font-mono text-slate-500">{youtubeId || 'No ID configured'}</p>
                     <span className="text-[10px] font-black uppercase text-blue-600 tracking-tighter">Active Source</span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
              <h3 className="text-xl font-black text-slate-900 mb-6">Course Description</h3>
              <textarea 
                defaultValue={course.description}
                rows={4}
                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 font-medium text-slate-600 resize-none transition-all"
              />
              <div className="mt-6 flex justify-end">
                 <button className="px-8 py-3 bg-slate-900 text-white rounded-2xl text-sm font-bold shadow-xl shadow-slate-200 hover:bg-slate-800 transition-colors">Update Description</button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                 <h3 className="font-black text-slate-900 flex items-center gap-3">
                  <FileText size={20} className="text-blue-500" />
                  Materials
                 </h3>
                 <button className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                    <Plus size={18} />
                 </button>
              </div>
              
              <div className="space-y-4">
                {course.modules.length > 0 ? course.modules.map(mod => (
                  <div key={mod.id} className="p-5 bg-slate-50 rounded-3xl border border-slate-100 group hover:border-blue-200 transition-all">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <p className="font-bold text-sm text-slate-800 leading-snug">{mod.title}</p>
                      <button className="p-2 text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
                    </div>
                    <div className="flex items-center justify-between">
                       <span className="text-[10px] font-black text-slate-400 px-3 py-1 bg-white border border-slate-100 rounded-lg uppercase tracking-widest">{mod.type}</span>
                       <button className="text-xs font-black text-blue-600 hover:underline">Edit</button>
                    </div>
                  </div>
                )) : (
                  <div className="py-12 text-center bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
                    <Upload size={24} className="mx-auto mb-4 text-slate-300" />
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Drop Assets</p>
                  </div>
                )}
              </div>
              <button className="w-full mt-8 py-4 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-slate-100 hover:bg-blue-600 transition-all">
                Upload New
              </button>
            </div>

            <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="font-black text-lg mb-2">Platform Visibility</h4>
                <p className="text-xs text-indigo-100 mb-8 leading-relaxed font-medium">Public visibility is active.</p>
                <div className="flex items-center justify-between bg-white/10 backdrop-blur-xl p-4 rounded-2xl border border-white/10">
                   <span className="text-xs font-black uppercase tracking-widest">Public Access</span>
                   <div className="w-12 h-6 bg-green-500 rounded-full relative shadow-inner">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Student Roster Tab */
        <div className="space-y-6 animate-in fade-in duration-500">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Total Registered</p>
                <h4 className="text-3xl font-black text-slate-900">124</h4>
             </div>
             <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Avg. Attendance</p>
                <h4 className="text-3xl font-black text-blue-600">84%</h4>
             </div>
             <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Assignments Submitted</p>
                <h4 className="text-3xl font-black text-slate-900">92/124</h4>
             </div>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
              <h3 className="font-black text-slate-900">Registered Students</h3>
              <div className="relative">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                <input type="text" placeholder="Search by name or matric..." className="pl-12 pr-6 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-xs outline-none w-64" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Student Name</th>
                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Matric No.</th>
                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Engagement</th>
                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Last Activity</th>
                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {students.map(s => (
                    <tr key={s.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-black text-xs">{s.name.charAt(0)}</div>
                          <span className="font-bold text-slate-800 text-sm">{s.name}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-sm font-medium text-slate-500">{s.matric}</td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden w-24">
                            <div className="h-full bg-blue-600" style={{ width: s.engagement }}></div>
                          </div>
                          <span className="text-xs font-bold text-slate-900">{s.engagement}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-xs text-slate-400 font-medium">{s.lastSeen}</td>
                      <td className="px-8 py-5">
                        <button className="p-2 text-slate-300 hover:text-slate-900 transition-colors"><MoreVertical size={16}/></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCourse;
