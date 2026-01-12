
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
  // Added missing Plus import
  Plus 
} from 'lucide-react';

interface ManageCourseProps {
  course: Course;
  onBack: () => void;
}

const ManageCourse: React.FC<ManageCourseProps> = ({ course, onBack }) => {
  const [youtubeId, setYoutubeId] = useState(course.youtubeId);
  const [isEditingId, setIsEditingId] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveId = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsEditingId(false);
      // In real app, dispatch update to backend/state
    }, 1000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold transition-colors group">
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        Back to Curriculum
      </button>

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

        {/* Modules Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
               <h3 className="font-black text-slate-900 flex items-center gap-3">
                <FileText size={20} className="text-blue-500" />
                Lecture Materials
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
                     <button className="text-xs font-black text-blue-600 hover:underline">Edit Resource</button>
                  </div>
                </div>
              )) : (
                <div className="py-12 text-center bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
                  <Upload size={24} className="mx-auto mb-4 text-slate-300" />
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Drop PDFs here</p>
                </div>
              )}
            </div>
            
            <button className="w-full mt-8 py-4 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-slate-100 hover:bg-blue-600 transition-all">
              Upload New Asset
            </button>
          </div>

          <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h4 className="font-black text-lg mb-2">Platform Visibility</h4>
              <p className="text-xs text-indigo-100 mb-8 leading-relaxed font-medium">This course is currently visible to students. You can toggle visibility if you need to perform significant updates.</p>
              <div className="flex items-center justify-between bg-white/10 backdrop-blur-xl p-4 rounded-2xl border border-white/10">
                 <span className="text-xs font-black uppercase tracking-widest">Public Access</span>
                 <div className="w-12 h-6 bg-green-500 rounded-full relative shadow-inner">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                 </div>
              </div>
            </div>
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageCourse;
