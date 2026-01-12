
import React from 'react';
import { Course } from '../../types';
import { Book, User as UserIcon, ArrowRight } from 'lucide-react';

interface CoursesProps {
  courses: Course[];
  onSelectCourse: (id: string) => void;
}

const Courses: React.FC<CoursesProps> = ({ courses, onSelectCourse }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map(course => (
        <div key={course.id} className="bg-white rounded-3xl border border-slate-100 overflow-hidden flex flex-col hover:shadow-lg transition-all group">
          <div className="h-2 bg-blue-500"></div>
          <div className="p-6 flex-1 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                <Book size={20} />
              </div>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md uppercase">
                {course.code}
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
              {course.title}
            </h3>
            <p className="text-sm text-slate-500 line-clamp-2 mb-6 flex-1">
              {course.description}
            </p>
            <div className="flex items-center gap-2 text-slate-400 mb-6">
              <UserIcon size={14} />
              <span className="text-xs font-medium">{course.lecturerName}</span>
            </div>
            <button 
              onClick={() => onSelectCourse(course.id)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-slate-200"
            >
              Enter Classroom
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      ))}
      {courses.length === 0 && (
        <div className="col-span-full py-20 text-center">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
            <Book size={40} />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">No Courses Registered</h3>
          <p className="text-slate-500">You haven't added any courses to your profile yet.</p>
        </div>
      )}
    </div>
  );
};

export default Courses;
