
import React, { useState } from 'react';
import { Course, Lesson, Module } from '../../types';
import { 
  ArrowLeft, 
  FileText, 
  Upload, 
  Trash2, 
  Check, 
  Video, 
  Edit3, 
  Save, 
  Plus, 
  Users, 
  Search, 
  MoreVertical, 
  Clock, 
  Layout,
  ChevronRight,
  ChevronDown
} from 'lucide-react';

interface ManageCourseProps {
  course: Course;
  onBack: () => void;
}

const ManageCourse: React.FC<ManageCourseProps> = ({ course, onBack }) => {
  const [activeSubTab, setActiveSubTab] = useState<'content' | 'students'>('content');
  const [lessons, setLessons] = useState<Lesson[]>(course.lessons || []);
  const [expandedLessonId, setExpandedLessonId] = useState<string | null>(lessons[0]?.id || null);

  const handleAddLesson = () => {
    const newLesson: Lesson = {
      id: Math.random().toString(36).substr(2, 9),
      title: 'New Lesson Title',
      description: 'Describe what students will learn in this lecture...',
      youtubeId: '',
      modules: [],
      timestamps: []
    };
    setLessons([...lessons, newLesson]);
    setExpandedLessonId(newLesson.id);
  };

  const updateLesson = (id: string, updates: Partial<Lesson>) => {
    setLessons(prev => prev.map(l => l.id === id ? { ...l, ...updates } : l));
  };

  const handleAddModuleToLesson = (lessonId: string) => {
    const newMod: Module = {
      id: Math.random().toString(36).substr(2, 9),
      title: 'Supplemental Reading.pdf',
      fileUrl: '#',
      type: 'PDF'
    };
    setLessons(prev => prev.map(l => l.id === lessonId ? { ...l, modules: [...l.modules, newMod] } : l));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Top Controls: Integrated back and switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <button onClick={onBack} className="flex items-center gap-3 text-slate-500 hover:text-slate-900 font-black transition-colors group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="uppercase text-xs tracking-widest">To Curriculum List</span>
        </button>
        <div className="flex bg-slate-200/50 p-1.5 rounded-[1.8rem] shadow-inner">
          <button 
            onClick={() => setActiveSubTab('content')}
            className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeSubTab === 'content' ? 'bg-white text-blue-600 shadow-xl shadow-slate-200 ring-1 ring-slate-100' : 'text-slate-500'}`}
          >
            <Layout size={16} /> Content Builder
          </button>
          <button 
            onClick={() => setActiveSubTab('students')}
            className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeSubTab === 'students' ? 'bg-white text-blue-600 shadow-xl shadow-slate-200 ring-1 ring-slate-100' : 'text-slate-500'}`}
          >
            <Users size={16} /> Registered Roster
          </button>
        </div>
      </div>

      {activeSubTab === 'content' ? (
        <div className="space-y-8 max-w-5xl mx-auto">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black text-slate-900">Curriculum Architecture</h3>
            <button 
              onClick={handleAddLesson}
              className="px-6 py-3 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-slate-200 hover:bg-blue-600 transition-all flex items-center gap-2"
            >
              <Plus size={18} /> New Lesson
            </button>
          </div>

          <div className="space-y-4">
            {lessons.map((lesson, idx) => (
              <div key={lesson.id} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden transition-all duration-300">
                <button 
                  onClick={() => setExpandedLessonId(expandedLessonId === lesson.id ? null : lesson.id)}
                  className="w-full flex items-center justify-between p-8 hover:bg-slate-50/50 transition-colors"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black text-xs">
                      {idx + 1}
                    </div>
                    <div className="text-left">
                      <h4 className="font-black text-slate-900 text-lg leading-none">{lesson.title}</h4>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">{lesson.modules.length} Attached PDF Modules</p>
                    </div>
                  </div>
                  {expandedLessonId === lesson.id ? <ChevronDown size={24} className="text-slate-300"/> : <ChevronRight size={24} className="text-slate-300"/>}
                </button>

                {expandedLessonId === lesson.id && (
                  <div className="px-8 pb-10 space-y-8 animate-in slide-in-from-top-4 duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-50">
                      {/* Video Embed Section */}
                      <div className="space-y-6">
                         <div className="flex items-center justify-between">
                            <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Video Stream Asset</h5>
                            {lesson.youtubeId && <span className="text-[10px] font-black text-green-500 uppercase">Linked</span>}
                         </div>
                         <div className="space-y-4">
                            <input 
                              type="text" 
                              value={lesson.youtubeId}
                              onChange={e => updateLesson(lesson.id, { youtubeId: e.target.value })}
                              placeholder="YouTube Video ID (e.g. pTB0EiLXUC8)"
                              className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 font-mono text-sm"
                            />
                            {lesson.youtubeId && (
                              <div className="aspect-video bg-slate-900 rounded-2xl overflow-hidden shadow-inner">
                                <iframe
                                  className="w-full h-full opacity-60"
                                  src={`https://www.youtube.com/embed/${lesson.youtubeId}`}
                                  frameBorder="0"
                                  allowFullScreen
                                ></iframe>
                              </div>
                            )}
                         </div>
                      </div>

                      {/* Content & Modules Section */}
                      <div className="space-y-6">
                         <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Lesson Metadata</h5>
                         <div className="space-y-4">
                            <input 
                              type="text" 
                              value={lesson.title}
                              onChange={e => updateLesson(lesson.id, { title: e.target.value })}
                              placeholder="Lesson Title"
                              className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 font-bold"
                            />
                            <textarea 
                              value={lesson.description}
                              onChange={e => updateLesson(lesson.id, { description: e.target.value })}
                              placeholder="Brief description for students..."
                              className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 font-medium text-sm h-32 resize-none"
                            />
                         </div>
                      </div>
                    </div>

                    <div className="pt-8 border-t border-slate-50">
                      <div className="flex items-center justify-between mb-6">
                         <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Attached Modules for this Video</h5>
                         <button 
                           onClick={() => handleAddModuleToLesson(lesson.id)}
                           className="text-xs font-black text-blue-600 flex items-center gap-1.5 hover:underline"
                         >
                           <Plus size={14}/> Add PDF Resource
                         </button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {lesson.modules.map(mod => (
                          <div key={mod.id} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between group">
                            <div className="flex items-center gap-3">
                              <FileText size={16} className="text-blue-500"/>
                              <span className="text-xs font-bold text-slate-700 truncate max-w-[120px]">{mod.title}</span>
                            </div>
                            <button className="p-1 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                               <Trash2 size={14}/>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                       <button 
                        onClick={() => setLessons(lessons.filter(l => l.id !== lesson.id))}
                        className="flex items-center gap-2 text-[10px] font-black text-red-400 uppercase tracking-widest hover:text-red-600"
                       >
                          <Trash2 size={14}/> Permanently Delete Lesson
                       </button>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {lessons.length === 0 && (
              <div className="py-24 text-center bg-white border-4 border-dashed border-slate-100 rounded-[3rem]">
                 <Video size={48} className="mx-auto text-slate-200 mb-4"/>
                 <h4 className="text-slate-400 font-black uppercase tracking-widest text-xs">The curriculum is empty.</h4>
                 <p className="text-slate-300 text-sm mt-2">Start building your course structure by adding your first lesson.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Roster Tab logic... */
        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8">
           <h3 className="text-xl font-black text-slate-900 mb-4">Student Roster Management</h3>
           <p className="text-slate-500 font-medium">Coming soon: Advanced attendance and individual progress tracking.</p>
        </div>
      )}
    </div>
  );
};

export default ManageCourse;
