
import React, { useState } from 'react';
import { Course, Lesson } from '../../types';
import { ArrowLeft, PlayCircle, FileText, Download, CheckCircle2, Clock, ChevronRight, Video, ListTree, BookOpen, Layers } from 'lucide-react';

interface ClassroomProps {
  course: Course;
  onBack: () => void;
}

const Classroom: React.FC<ClassroomProps> = ({ course, onBack }) => {
  const lessons = course.lessons && course.lessons.length > 0 
    ? course.lessons 
    : [{
        id: 'default',
        title: 'Main Lecture Content',
        description: course.description,
        youtubeId: course.youtubeId,
        modules: course.modules
      } as Lesson];

  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const activeLesson = lessons[activeLessonIndex];

  return (
    <div className="max-w-[1400px] mx-auto animate-in fade-in duration-700 pb-20">
      {/* 1. Header & Exit Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-3 bg-white border border-slate-200 text-slate-500 hover:text-red-500 rounded-2xl shadow-sm transition-all group"
            title="Exit Classroom"
          >
            <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-none">
              {course.code}: {course.title}
            </h1>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mt-2 flex items-center gap-2">
              <BookOpen size={12} /> {course.lecturerName} • Stage {activeLessonIndex + 1} of {lessons.length}
            </p>
          </div>
        </div>
        
        {/* Course Progress Summary */}
        <div className="hidden md:flex items-center gap-6 bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-sm">
           <div className="text-right">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Your Progress</p>
             <p className="text-sm font-black text-slate-900">{Math.round(((activeLessonIndex + 1) / lessons.length) * 100)}% Complete</p>
           </div>
           <div className="w-12 h-12 rounded-full border-4 border-slate-50 flex items-center justify-center relative">
              <svg className="w-full h-full -rotate-90">
                <circle cx="24" cy="24" r="20" fill="transparent" stroke="currentColor" strokeWidth="4" className="text-slate-100" />
                <circle cx="24" cy="24" r="20" fill="transparent" stroke="currentColor" strokeWidth="4" strokeDasharray={125.6} strokeDashoffset={125.6 * (1 - (activeLessonIndex + 1) / lessons.length)} className="text-blue-600" />
              </svg>
           </div>
        </div>
      </div>

      {/* 2. TOP CURRICULUM NAVIGATOR */}
      <div className="mb-10 space-y-4">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
            <Layers size={14} /> Learning Path
          </h3>
          <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md uppercase tracking-wider">Select a lesson to begin</span>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-6 pt-2 px-2 custom-scrollbar snap-x">
          {lessons.map((lesson, index) => (
            <button 
              key={lesson.id}
              onClick={() => setActiveLessonIndex(index)}
              className={`flex-shrink-0 w-64 p-6 rounded-[2rem] border-2 transition-all duration-300 text-left snap-start group relative overflow-hidden ${
                activeLessonIndex === index 
                  ? 'bg-slate-900 border-slate-900 text-white shadow-2xl shadow-slate-900/20 -translate-y-1' 
                  : 'bg-white border-slate-100 text-slate-500 hover:border-blue-200 hover:bg-slate-50/50'
              }`}
            >
              {activeLessonIndex === index && (
                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl"></div>
              )}
              <div className="flex items-center justify-between mb-4">
                <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-lg ${
                  activeLessonIndex === index ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'
                }`}>
                  Lesson {index + 1}
                </span>
                {activeLessonIndex === index ? (
                  <PlayCircle size={18} className="text-blue-400 animate-pulse" />
                ) : (
                  <CheckCircle2 size={18} className="text-slate-200 group-hover:text-blue-200" />
                )}
              </div>
              <h4 className={`font-black text-sm leading-tight line-clamp-2 ${activeLessonIndex === index ? 'text-white' : 'text-slate-800'}`}>
                {lesson.title}
              </h4>
            </button>
          ))}
        </div>
      </div>

      {/* 3. MAIN STAGE: PLAYER & CONTENT */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left: Player & Description */}
        <div className="xl:col-span-2 space-y-8">
          <div className="bg-slate-950 rounded-[3rem] overflow-hidden shadow-2xl border border-white/5 relative group">
            <div className="aspect-video relative">
              {activeLesson.youtubeId ? (
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${activeLesson.youtubeId}?autoplay=1&modestbranding=1&rel=0`}
                  title={activeLesson.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-900">
                  <div className="text-center">
                    <Video size={64} className="mx-auto text-slate-800 mb-4" />
                    <p className="text-slate-600 font-black uppercase tracking-widest text-xs">Awaiting broadcast stream</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-8 border-b border-slate-50">
               <div>
                  <h2 className="text-2xl font-black text-slate-900">{activeLesson.title}</h2>
                  <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-2 flex items-center gap-2">
                    <Clock size={14} className="text-blue-500" /> {activeLesson.modules.length} Study Resources Attached
                  </p>
               </div>
               <button className="px-6 py-3 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-blue-600 transition-all flex items-center gap-2 shadow-lg shadow-slate-100">
                  Mark as Completed
               </button>
            </div>
            <p className="text-slate-600 font-medium leading-[1.8] text-lg max-w-3xl">
              {activeLesson.description || "In this session, we dive deep into the core concepts and methodologies required for mastering this module. Follow along with the provided materials."}
            </p>
          </div>
        </div>

        {/* Right: Resources & Chapters */}
        <div className="space-y-8">
          {/* RESOURCES BOX */}
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
               <h3 className="font-black text-slate-900 flex items-center gap-3 uppercase tracking-widest text-xs">
                <FileText size={18} className="text-blue-600" />
                Lesson Resources
               </h3>
               <span className="text-[10px] font-black text-slate-400">{activeLesson.modules.length} PDF</span>
            </div>
            
            <div className="space-y-3">
              {activeLesson.modules.length > 0 ? activeLesson.modules.map(mod => (
                <div key={mod.id} className="p-4 bg-slate-50 border border-slate-100 rounded-[1.5rem] group hover:border-blue-200 transition-all">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-500 shadow-sm border border-slate-100">
                       <FileText size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-sm text-slate-800 truncate leading-none mb-1">{mod.title}</p>
                      <p className="text-[10px] font-black text-slate-400 uppercase">Module PDF</p>
                    </div>
                  </div>
                  <button className="w-full flex items-center justify-center gap-2 text-[10px] font-black text-slate-600 uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all bg-white py-3 rounded-xl border border-slate-200">
                    <Download size={14} /> Download Document
                  </button>
                </div>
              )) : (
                <div className="py-12 text-center bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-100">
                   <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">No resources for this stage</p>
                </div>
              )}
            </div>
          </div>

          {/* CHAPTERS BOX (IF AVAILABLE) */}
          {activeLesson.timestamps && activeLesson.timestamps.length > 0 && (
            <div className="bg-blue-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-blue-200">
              <h3 className="font-black flex items-center gap-3 uppercase tracking-widest text-xs mb-6">
                <ListTree size={18} />
                Video Chapters
              </h3>
              <div className="space-y-2">
                {activeLesson.timestamps.map((ts, i) => (
                  <button key={i} className="w-full flex items-center justify-between p-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-all group">
                     <span className="text-sm font-bold text-blue-50">{ts.label}</span>
                     <span className="text-[10px] font-black text-white/40 group-hover:text-white transition-colors">{ts.time}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* QUICK HELP */}
          <div className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-100">
             <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-2">Need Assistance?</h4>
             <p className="text-xs text-slate-500 font-medium mb-6 leading-relaxed">If you have questions about this lesson, join the discussion hub or contact the lecturer.</p>
             <button className="w-full py-4 bg-white text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-slate-200 hover:bg-slate-900 hover:text-white transition-all shadow-sm">
                Open Discussion
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Classroom;
