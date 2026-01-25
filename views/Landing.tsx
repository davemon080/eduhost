
import React from 'react';
import { University } from '../types';
import { Search, GraduationCap, Building2, ChevronRight, Sparkles } from 'lucide-react';

interface LandingProps {
  universities: University[];
  onSelect: (uni: University) => void;
}

const Landing: React.FC<LandingProps> = ({ universities, onSelect }) => {
  return (
    <div className="min-h-screen bg-white selection:bg-brand-100 selection:text-brand-600 font-sans">
      <header className="px-8 py-10 max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center text-white shadow-lg">
            <Sparkles size={22} />
          </div>
          <span className="text-xl font-extrabold tracking-tighter text-slate-900">Paragon</span>
        </div>
        <button className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">Institutional Access</button>
      </header>

      <section className="pt-20 pb-32 px-8 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-brand-50 border border-brand-100 rounded-full text-brand-600 text-[10px] font-black uppercase tracking-[0.2em] mb-10 animate-in slide-in-from-bottom-4">
            <GraduationCap size={16} />
            The Peerless Learning Standard
          </div>
          <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight text-slate-900 mb-10 leading-[0.9] animate-in slide-in-from-bottom-6">
            Remarkable Learning <br/> for <span className="text-brand-600">Future Leaders.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed mb-16 animate-in slide-in-from-bottom-8">
            Welcome to your central hub for courses, schedules, assessments, and campus updates. Excellence starts here.
          </p>
          
          <div className="relative max-w-xl mx-auto mb-20 group">
            <div className="absolute inset-0 bg-brand-200 blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <div className="relative bg-white border border-slate-200 rounded-[2.5rem] shadow-2xl p-2 flex items-center ring-1 ring-slate-100">
              <div className="flex-1 flex items-center px-6">
                <Search size={22} className="text-slate-300 mr-4" />
                <input 
                  type="text" 
                  placeholder="Find your university..." 
                  className="w-full bg-transparent border-none focus:ring-0 text-slate-900 font-bold placeholder:text-slate-300 py-5"
                />
              </div>
              <button className="bg-slate-900 text-white px-8 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-brand-600 transition-all shadow-xl">Connect</button>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-8 pb-40">
        <div className="flex items-center justify-between mb-12 border-b border-slate-100 pb-8">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Participating Schools</h2>
            <p className="text-sm text-slate-500 font-medium mt-1">Select your institution to access your secure student portal.</p>
          </div>
          <div className="hidden md:flex gap-4">
            <div className="h-2 w-16 bg-slate-900 rounded-full"></div>
            <div className="h-2 w-2 bg-slate-200 rounded-full"></div>
            <div className="h-2 w-2 bg-slate-200 rounded-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {universities.map((uni) => (
            <button
              key={uni.id}
              onClick={() => onSelect(uni)}
              className="group relative bg-white border border-slate-200/60 p-10 rounded-[3rem] hover:border-brand-600 hover:shadow-[0_32px_64px_-16px_rgba(37,99,235,0.12)] transition-all duration-500 text-left flex flex-col items-start overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-brand-600 opacity-0 group-hover:opacity-100 transition-all"></div>
              <div className="w-20 h-20 rounded-[2rem] overflow-hidden mb-8 shadow-inner ring-8 ring-slate-50 group-hover:ring-brand-50 transition-all">
                <img src={uni.logo} alt={uni.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2 leading-tight group-hover:text-brand-600 transition-colors">{uni.name}</h3>
              <p className="text-slate-400 text-sm font-medium mb-10 max-w-[200px]">Secure portal for academic activities.</p>
              
              <div className="flex items-center gap-3 text-brand-600 font-black text-[10px] uppercase tracking-widest mt-auto">
                 <span>Secure Login</span>
                 <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
          
          <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[3rem] p-10 flex flex-col items-center justify-center text-center opacity-70 hover:opacity-100 transition-all">
            <Building2 size={32} className="text-slate-300 mb-4" />
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">Register School</h4>
            <p className="text-xs text-slate-500 font-medium max-w-[160px] mt-2">Bring Paragon to your campus today.</p>
          </div>
        </div>
      </section>

      <footer className="bg-slate-50 border-t border-slate-100 py-20 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
           <div>
             <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Security</h5>
             <p className="text-sm text-slate-600 font-medium leading-relaxed">256-bit encryption for all scholar records.</p>
           </div>
           <div>
             <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Delivery</h5>
             <p className="text-sm text-slate-600 font-medium leading-relaxed">Optimized for low-latency lecture streaming.</p>
           </div>
           <div>
             <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Standard</h5>
             <p className="text-sm text-slate-600 font-medium leading-relaxed">Global data protection compliance.</p>
           </div>
           <div>
             <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">About</h5>
             <p className="text-sm text-slate-600 font-medium leading-relaxed">Paragon: A model of academic excellence.</p>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
