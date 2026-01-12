
import React, { useState } from 'react';
import { University, UserProfile, UserRole } from '../types';
import { ShieldCheck, GraduationCap, ArrowLeft, Lock, Loader2, ChevronRight, Eye, EyeOff, UserPlus, CheckCircle } from 'lucide-react';

interface AuthProps {
  university: University;
  onLogin: (user: UserProfile) => void;
  onRegister: (role: UserRole) => void;
  onBack: () => void;
}

const Auth: React.FC<AuthProps> = ({ university, onLogin, onRegister, onBack }) => {
  const [mode, setMode] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  const [role, setRole] = useState<UserRole>(UserRole.STUDENT);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [secretPass, setSecretPass] = useState('');
  const [isSecretVerified, setIsSecretVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const LECTURER_SECRET = 'EDU-PROF-2025';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      if (mode === 'LOGIN') {
        if (id && password) {
          // Mock login logic
          onLogin({
            id: 'u-' + Math.random().toString(36).substr(2, 4),
            name: role === UserRole.STUDENT ? 'Alex Student' : 'Dr. Samantha Reed',
            email: id.toLowerCase() + '@' + university.name.toLowerCase().replace(/\s/g, '') + '.edu',
            [role === UserRole.STUDENT ? 'matricNo' : 'staffId']: id,
            universityId: university.id,
            role: role,
            faculty: 'Science',
            department: 'Computer Science',
            level: role === UserRole.STUDENT ? '200L' : undefined,
            courses: ['c1', 'c2'],
            progress: role === UserRole.STUDENT ? [
              { semester: 'Year 1, Sem 1', gpa: 4.1, completedCourses: ['MTH 101'] }
            ] : undefined
          });
        } else {
          setError('Please fill in all fields.');
          setIsLoading(false);
        }
      } else {
        // Registration Mode
        if (role === UserRole.STUDENT) {
          // Student proceeds to Profiling view
          onRegister(UserRole.STUDENT);
          setIsLoading(false);
        } else {
          // Lecturer completes registration here
          if (name && id && password) {
            setSuccessMsg('Lecturer account created! You can now log in.');
            setMode('LOGIN');
            setIsLoading(false);
            // Pre-fill ID for convenience
            setId(id);
            setPassword('');
            setName('');
            setIsSecretVerified(false);
          } else {
            setError('Please fill in all fields for lecturer registration.');
            setIsLoading(false);
          }
        }
      }
    }, 1200);
  };

  const handleLecturerGate = () => {
    if (secretPass === LECTURER_SECRET) {
      setIsSecretVerified(true);
      setError('');
    } else {
      setError('Invalid Access Key for Lecturer Registration.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      {/* Brand Sidebar (Responsive) */}
      <div className="hidden md:flex md:w-[40%] bg-blue-600 relative overflow-hidden flex-col justify-between p-12 text-white shadow-2xl">
        <div className="absolute inset-0 bg-blue-700/30 backdrop-blur-3xl"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-[100px]"></div>
        
        <div className="relative z-10">
          <button onClick={onBack} className="flex items-center gap-2 text-blue-100 hover:text-white mb-16 transition-colors group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-semibold">Switch University</span>
          </button>
          
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-xl">
              <img src={university.logo} alt={university.name} className="w-10 h-10 object-contain rounded" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{university.name}</h1>
              <p className="text-blue-100/60 text-sm font-medium">Official Portal</p>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-4xl font-extrabold leading-tight">Your Journey to <span className="text-blue-300 underline decoration-blue-400/30">Knowledge</span> starts here.</h2>
            <p className="text-blue-100 text-lg leading-relaxed max-w-sm">Secure, integrated, and professional virtual learning environment for {university.name}.</p>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-4 text-sm text-blue-200 font-medium">
          <ShieldCheck size={18} />
          <span>Secured by EduStream Pro Platform</span>
        </div>
      </div>

      {/* Main Interface */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="max-w-md w-full space-y-8 animate-in fade-in duration-700">
          <div className="text-center md:text-left">
            <h3 className="text-3xl font-black text-slate-900 mb-2">
              {mode === 'LOGIN' ? 'Welcome Back' : 'Get Started'}
            </h3>
            <p className="text-slate-500 font-medium">Enter your credentials to access your dashboard.</p>
          </div>

          {/* Role Toggle */}
          <div className="flex bg-slate-200/50 p-1.5 rounded-2xl">
            <button 
              onClick={() => { setRole(UserRole.STUDENT); setError(''); setIsSecretVerified(false); setMode('LOGIN'); setSuccessMsg(''); }}
              className={`flex-1 flex items-center justify-center gap-3 py-3 rounded-xl text-sm font-bold transition-all ${role === UserRole.STUDENT ? 'bg-white text-blue-600 shadow-md' : 'text-slate-500 hover:bg-slate-200'}`}
            >
              <GraduationCap size={18} />
              Student
            </button>
            <button 
              onClick={() => { setRole(UserRole.LECTURER); setError(''); setSuccessMsg(''); }}
              className={`flex-1 flex items-center justify-center gap-3 py-3 rounded-xl text-sm font-bold transition-all ${role === UserRole.LECTURER ? 'bg-white text-blue-600 shadow-md' : 'text-slate-500 hover:bg-slate-200'}`}
            >
              <ShieldCheck size={18} />
              Lecturer
            </button>
          </div>

          {/* Alert Messages */}
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl text-sm font-bold flex items-center gap-3 animate-bounce-short">
              <Lock size={16} />
              {error}
            </div>
          )}
          {successMsg && (
            <div className="bg-green-50 border border-green-100 text-green-600 p-4 rounded-2xl text-sm font-bold flex items-center gap-3 animate-in zoom-in-95">
              <CheckCircle size={16} />
              {successMsg}
            </div>
          )}

          {/* Lecturer Register Gating (Step 1) */}
          {mode === 'REGISTER' && role === UserRole.LECTURER && !isSecretVerified ? (
            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Lock size={28} />
                </div>
                <h4 className="text-xl font-bold text-slate-900">Verification Required</h4>
                <p className="text-sm text-slate-500 mt-2">Only authorized personnel can create lecturer accounts. Please enter the institutional secret key.</p>
              </div>
              <div className="space-y-4">
                <input 
                  type="password"
                  value={secretPass}
                  onChange={e => setSecretPass(e.target.value)}
                  placeholder="Institutional Secret Key"
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 font-mono transition-all text-center placeholder:font-sans"
                />
                <button 
                  onClick={handleLecturerGate}
                  className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-blue-600 transition-all shadow-xl shadow-slate-200"
                >
                  Verify Access
                </button>
              </div>
            </div>
          ) : (
            /* Forms: Student Login/Reg & Lecturer Login/Reg (Step 2) */
            <form className="space-y-5" onSubmit={handleSubmit}>
              {mode === 'REGISTER' && role === UserRole.LECTURER && (
                <div className="space-y-1.5 animate-in slide-in-from-bottom-2 duration-300">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
                    placeholder="e.g. Dr. Jane Smith"
                  />
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                  {role === UserRole.STUDENT ? 'Matriculation Number' : 'Staff Identification ID'}
                </label>
                <input 
                  type="text" 
                  required
                  value={id}
                  onChange={e => setId(e.target.value)}
                  className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
                  placeholder={role === UserRole.STUDENT ? "e.g. U2018/30402" : "STF-9902"}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
                    placeholder="••••••••"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {mode === 'LOGIN' && (
                <div className="flex justify-end">
                  <button type="button" className="text-xs font-bold text-blue-600 hover:underline">Trouble Logging In?</button>
                </div>
              )}

              <button 
                type="submit" 
                disabled={isLoading}
                className={`w-full py-5 text-white font-black rounded-2xl transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-50 ${mode === 'REGISTER' ? 'bg-slate-900 hover:bg-blue-600 shadow-slate-100' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-100'}`}
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    {mode === 'LOGIN' ? 'Secure Login' : (role === UserRole.STUDENT ? 'Start Profiling' : 'Register Account')}
                    {mode === 'REGISTER' && role === UserRole.LECTURER ? <UserPlus size={18} /> : <ChevronRight size={18} />}
                  </>
                )}
              </button>
            </form>
          )}

          <div className="pt-6 border-t border-slate-200 text-center">
            {mode === 'LOGIN' ? (
              <p className="text-sm text-slate-500 font-medium">
                New user? <button onClick={() => { setMode('REGISTER'); setSuccessMsg(''); }} className="text-blue-600 font-bold hover:underline">Create Account</button>
              </p>
            ) : (
              <p className="text-sm text-slate-500 font-medium">
                Already have an account? <button onClick={() => { setMode('LOGIN'); setIsSecretVerified(false); setSuccessMsg(''); }} className="text-blue-600 font-bold hover:underline">Log In</button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
