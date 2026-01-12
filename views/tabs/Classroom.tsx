
import React from 'react';
import { Course } from '../../types';
import { ArrowLeft, PlayCircle, FileText, Download } from 'lucide-react';

interface ClassroomProps {
  course: Course;
  onBack: () => void;
}

const Classroom: React.FC<ClassroomProps> = ({ course, onBack }) => {
  return (
    <div className="max-w-5xl mx-auto">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-medium mb-6 transition-colors"
      >
        <ArrowLeft size={18} />
        Back to Courses
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Video Section */}
          <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm">
            <div className="aspect-video bg-slate-900 flex items-center justify-center">
              {course.youtubeId ? (
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${course.youtubeId}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="text-white text-center p-8">
                  <PlayCircle size={48} className="mx-auto mb-4 opacity-20" />
                  <p className="text-slate-400">No video lecture available for this course yet.</p>
                </div>
              )}
            </div>
            <div className="p-8">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">{course.code}</span>
                <span className="text-xs font-bold text-slate-400">• Lecture Session 1</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">{course.title}</h2>
              <p className="text-slate-600 leading-relaxed">{course.description}</p>
            </div>
          </div>

          {/* About Lecturer */}
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4">Instructor</h3>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center font-bold text-slate-400">
                {course.lecturerName.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-slate-800">{course.lecturerName}</h4>
                <p className="text-sm text-slate-500">Department of {course.department}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modules Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
              <FileText size={20} className="text-blue-500" />
              Course Modules
            </h3>
            
            <div className="space-y-4">
              {course.modules.length > 0 ? course.modules.map(mod => (
                <div key={mod.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-blue-200 transition-all">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <p className="font-bold text-sm text-slate-800 leading-snug">{mod.title}</p>
                    <span className="text-[10px] font-bold text-slate-400 px-2 py-0.5 border border-slate-200 rounded uppercase">{mod.type}</span>
                  </div>
                  <button className="flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors">
                    <Download size={14} />
                    Download Resource
                  </button>
                </div>
              )) : (
                <div className="py-12 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                  <p className="text-xs text-slate-400">No modules uploaded yet.</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-indigo-600 rounded-3xl p-8 text-white">
            <h4 className="font-bold mb-2">Need help?</h4>
            <p className="text-xs text-indigo-100 mb-6 leading-relaxed">If you have questions regarding this module, please post in the course discussion forum.</p>
            <button className="w-full py-3 bg-white text-indigo-600 rounded-xl text-sm font-bold hover:bg-indigo-50 transition-colors">
              Join Discussion
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Classroom;
