
import React, { useState } from 'react';
import { University, UserProfile, UserRole, Course } from '../types';
import { COURSES } from '../mockData';
import { ArrowLeft, ArrowRight, CheckCircle, GraduationCap, Building2, BookOpen, Check, ShieldCheck } from 'lucide-react';

interface ProfilingProps {
  university: University;
  onComplete: (profile: UserProfile) => void;
  onBack: () => void;
  role: UserRole;
}

const LEVELS = ['100L', '200L', '300L', '400L', '500L'];
const FACULTIES = ['Science', 'Engineering', 'Social Sciences', 'Art'];
const DEPARTMENTS: Record<string, string[]> = {
  'Science': ['Computer Science', 'Mathematics', 'Biology', 'Chemistry'],
  'Engineering': ['Civil Engineering', 'Mechanical Engineering', 'Electrical Engineering'],
  'Social Sciences': ['Economics', 'Political Science', 'Psychology'],
  'Art': ['Fine Arts', 'Philosophy', 'Literature']
};

const Profiling: React.FC<ProfilingProps> = ({ university, onComplete, onBack, role }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    level: role === UserRole.STUDENT ? '' : 'Staff',
    faculty: '',
    department: '',
    selectedCourses: [] as string[]
  });

  const availableCourses = COURSES.filter(c => 
    (role === UserRole.LECTURER || c.level === formData.level) && 
    c.department === formData.department
  );

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => step > 1 ? setStep(s => s - 1) : onBack();

  const toggleCourse = (id: string) => {
    setFormData(prev => ({
      ...prev,
      selectedCourses: prev.selectedCourses.includes(id)
        ? prev.selectedCourses.filter(cid => cid !== id)
        : [...prev.selectedCourses, id]
    }));
  };

  const handleFinish = () => {
    onComplete({
      id: (role === UserRole.STUDENT ? 's-' : 'l-') + Math.random().toString(36).substr(2, 4),
      email: formData.name.toLowerCase().replace(/\s/g, '') + `@${role === UserRole.STUDENT ? 'student' : 'staff'}.` + university.name.toLowerCase().replace(/\s/g, '') + '.edu',
      name: formData.name || (role === UserRole.STUDENT ? 'New Student' : 'Dr. New Faculty'),
      universityId: university.id,
      role: role,
      level: role === UserRole.STUDENT ? formData.level : undefined,
      faculty: formData.faculty,
      department: formData.department,
      courses: formData.selectedCourses,
      progress: [],
      settings: {
        notifications: true,
        darkMode: false,
        twoFactor: false
      }
    });
  };

  const totalSteps = role === UserRole.STUDENT ? 4 : 3;
  const progressPercentage = (step / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 md:p-8 relative">
      {/* Universal Top Left Back Button */}
      <button 
        onClick={onBack}
        className="absolute top-8 left-8 p-3 bg-white rounded-2xl text-slate-900 shadow-sm border border-slate-100 hover:bg-slate-50 transition-colors hidden md:flex items-center justify-center"
      >
        <ArrowLeft size={20} />
      </button>

      <div className="max-w-2xl w-full bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-slate-100">
        <div className="h-2 bg-slate-100">
          <div 
            className={`h-full transition-all duration-500 ease-out ${role === UserRole.LECTURER ? 'bg-slate-900' : 'bg-blue-600'}`} 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        <div className="p-8 md:p-12">
          {/* Mobile Back Header */}
          <div className="md:hidden flex items-center mb-8">
            <button onClick={onBack} className="p-2 -ml-2 text-slate-500 hover:text-slate-900">
              <ArrowLeft size={20} />
            </button>
            <span className="ml-2 text-xs font-bold text-slate-400 uppercase tracking-widest">Back to Auth</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h2 className="text-2xl font-black text-slate-900 leading-tight">
                {role === UserRole.STUDENT ? 'Student Profiling' : 'Faculty Onboarding'}
              </h2>
              <p className="text-slate-500 font-medium mt-1">
                {role === UserRole.STUDENT ? 'Setup your academic learning path.' : 'Configure your instructional dashboard.'}
              </p>
            </div>
            <div className="flex -space-x-3">
              {Array.from({length: totalSteps}).map((_, i) => (
                <div key={i} className={`w-10 h-10 rounded-full border-4 border-white flex items-center justify-center font-bold text-xs shadow-sm ${step > i ? (role === UserRole.LECTURER ? 'bg-slate-900 text-white' : 'bg-blue-600 text-white') : 'bg-slate-200 text-slate-400'}`}>
                  {step > i + 1 ? <Check size={14} strokeWidth={4} /> : i + 1}
                </div>
              ))}
            </div>
          </div>

          <div className="min-h-[300px]">
            {step === 1 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                <div className={`flex items-center gap-4 ${role === UserRole.LECTURER ? 'text-slate-900' : 'text-blue-600'}`}>
                  <div className={`p-3 rounded-2xl ${role === UserRole.LECTURER ? 'bg-slate-100' : 'bg-blue-50'}`}>
                    {role === UserRole.LECTURER ? <ShieldCheck size={24} /> : <GraduationCap size={24} />}
                  </div>
                  <h3 className="text-xl font-bold">Personal Identity</h3>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">Full Legal Name</label>
                  <input 
                    type="text"
                    autoFocus
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-lg font-medium"
                    placeholder={role === UserRole.LECTURER ? "e.g. Dr. Emily Carter" : "Enter your full name"}
                  />
                </div>
              </div>
            )}

            {(step === 2 && role === UserRole.STUDENT) && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                <div className="flex items-center gap-4 text-blue-600">
                  <div className="p-3 bg-blue-50 rounded-2xl"><Building2 size={24} /></div>
                  <h3 className="text-xl font-bold">Academic Placement</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">Level</label>
                    <select 
                      value={formData.level}
                      onChange={e => setFormData({...formData, level: e.target.value})}
                      className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all font-bold cursor-pointer"
                    >
                      <option value="">Select Level</option>
                      {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">Faculty</label>
                    <select 
                      value={formData.faculty}
                      onChange={e => setFormData({...formData, faculty: e.target.value, department: ''})}
                      className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all font-bold cursor-pointer"
                    >
                      <option value="">Select Faculty</option>
                      {FACULTIES.map(f => <option key={f} value={f}>{f}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {((step === 2 && role === UserRole.LECTURER) || (step === 3 && role === UserRole.STUDENT)) && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                <div className={`flex items-center gap-4 ${role === UserRole.LECTURER ? 'text-slate-900' : 'text-blue-600'}`}>
                  <div className={`p-3 rounded-2xl ${role === UserRole.LECTURER ? 'bg-slate-100' : 'bg-blue-50'}`}>
                    <Building2 size={24} />
                  </div>
                  <h3 className="text-xl font-bold">{role === UserRole.LECTURER ? 'Assign Faculty & Department' : 'Specify Department'}</h3>
                </div>
                <div className="space-y-4">
                  {role === UserRole.LECTURER && (
                    <select 
                      value={formData.faculty}
                      onChange={e => setFormData({...formData, faculty: e.target.value, department: ''})}
                      className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl outline-none mb-4 font-bold"
                    >
                      <option value="">Select Faculty</option>
                      {FACULTIES.map(f => <option key={f} value={f}>{f}</option>)}
                    </select>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {formData.faculty ? DEPARTMENTS[formData.faculty].map(dept => (
                      <button
                        key={dept}
                        onClick={() => setFormData({...formData, department: dept})}
                        className={`p-5 rounded-2xl border-2 text-left transition-all ${
                          formData.department === dept 
                            ? (role === UserRole.LECTURER ? 'bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-200' : 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-200')
                            : 'bg-white border-slate-100 text-slate-600 hover:border-blue-200'
                        }`}
                      >
                        <p className="font-bold">{dept}</p>
                      </button>
                    )) : (
                      <p className="col-span-full text-slate-400 italic">Please select a faculty first.</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {((step === 3 && role === UserRole.LECTURER) || (step === 4 && role === UserRole.STUDENT)) && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                <div className={`flex items-center gap-4 ${role === UserRole.LECTURER ? 'text-slate-900' : 'text-blue-600'}`}>
                  <div className={`p-3 rounded-2xl ${role === UserRole.LECTURER ? 'bg-slate-100' : 'bg-blue-50'}`}>
                    <BookOpen size={24} />
                  </div>
                  <h3 className="text-xl font-bold">{role === UserRole.LECTURER ? 'Select Courses to Manage' : 'Register for Courses'}</h3>
                </div>
                <div className="space-y-4">
                  <div className="space-y-3 max-h-72 overflow-y-auto pr-2 custom-scrollbar">
                    {availableCourses.length > 0 ? availableCourses.map(course => (
                      <button
                        key={course.id}
                        onClick={() => toggleCourse(course.id)}
                        className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all ${
                          formData.selectedCourses.includes(course.id)
                            ? (role === UserRole.LECTURER ? 'bg-slate-50 border-slate-900' : 'bg-blue-50 border-blue-500')
                            : 'bg-slate-50 border-slate-50 hover:border-slate-200'
                        }`}
                      >
                        <div className="text-left">
                          <p className="font-black text-slate-900">{course.code}</p>
                          <p className="text-sm text-slate-500 font-medium">{course.title} {role === UserRole.LECTURER && `(${course.level})`}</p>
                        </div>
                        {formData.selectedCourses.includes(course.id) && (
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${role === UserRole.LECTURER ? 'bg-slate-900' : 'bg-blue-600'}`}>
                            <Check size={14} strokeWidth={4} />
                          </div>
                        )}
                      </button>
                    )) : (
                      <div className="py-12 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                        <p className="text-slate-400 font-medium">No courses found for this level/department combination.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-12 pt-8 border-t border-slate-100">
            <button onClick={handleBack} className="order-2 sm:order-1 flex-1 py-4 border-2 border-slate-100 text-slate-500 font-bold rounded-2xl hover:bg-slate-50 transition-colors">Back</button>
            {step < totalSteps ? (
              <button 
                onClick={handleNext}
                disabled={step === 1 && !formData.name}
                className={`order-1 sm:order-2 flex-[2] py-4 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 shadow-xl disabled:opacity-50 ${role === UserRole.LECTURER ? 'bg-slate-900 shadow-slate-100 hover:bg-slate-800' : 'bg-blue-600 shadow-blue-100 hover:bg-blue-700'}`}
              >
                Continue <ArrowRight size={18} />
              </button>
            ) : (
              <button 
                onClick={handleFinish}
                disabled={formData.selectedCourses.length === 0}
                className={`order-1 sm:order-2 flex-[2] py-4 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 shadow-xl disabled:opacity-50 ${role === UserRole.LECTURER ? 'bg-slate-900 shadow-slate-100' : 'bg-blue-600 shadow-blue-100'}`}
              >
                {role === UserRole.LECTURER ? 'Launch Admin Portal' : 'Complete Registration'} <CheckCircle size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profiling;
