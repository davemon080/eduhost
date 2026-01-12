
import React from 'react';
import { University } from '../types';
import { Search, GraduationCap, Building2, ChevronRight } from 'lucide-react';

interface LandingProps {
  universities: University[];
  onSelect: (uni: University) => void;
}

const Landing: React.FC<LandingProps> = ({ universities, onSelect }) => {
  return (
    <div className="min-h-screen bg-white selection:bg-blue-100 selection:text-blue-600">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white pt-24 pb-32 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
           <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[120px]"></div>
           <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-indigo-500 rounded-full blur-[120px]"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-bold uppercase tracking-widest mb-10">
            <GraduationCap size={16} />
            Multi-Tenant Education Platform
          </div>
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
            The Hub for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Digital Scholars</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-12">
            Experience the future of university education. Integrated classrooms, live lectures, and community learning—all in one secure institutional portal.
          </p>
        </div>
      </section>

      {/* Selection Section */}
      <section className="max-w-6xl mx-auto px-6 -mt-16 pb-24">
        <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-200/50 p-8 md:p-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Institutional Onboarding</h2>
              <p className="text-slate-500 font-medium">Find your university to access your secure portal.</p>
            </div>
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" 
                placeholder="Search institutional code..."
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:bg-white focus:border-blue-500 outline-none transition-all shadow-inner"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {universities.map((uni) => (
              <button
                key={uni.id}
                onClick={() => onSelect(uni)}
                className="group relative bg-white border border-slate-100 p-8 rounded-[32px] hover:border-blue-600 hover:shadow-2xl hover:shadow-blue-600/10 transition-all duration-500 text-left flex flex-col items-start"
              >
                <div className="w-16 h-16 rounded-3xl overflow-hidden mb-6 shadow-sm ring-4 ring-slate-50 group-hover:ring-blue-100 transition-all">
                  <img src={uni.logo} alt={uni.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">{uni.name}</h3>
                <div className="flex items-center gap-2 text-slate-400 group-hover:text-blue-500 transition-colors mt-auto">
                   <span className="text-xs font-bold uppercase tracking-widest">Enter Portal</span>
                   <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
                
                {/* Decorative background element */}
                <div className="absolute top-4 right-4 text-slate-50 group-hover:text-blue-50 transition-colors">
                  <Building2 size={32} />
                </div>
              </button>
            ))}
            
            {/* Onboard new University Card */}
            <div className="bg-slate-50 border-2 border-dashed border-slate-200 p-8 rounded-[32px] flex flex-col items-center justify-center text-center opacity-70 hover:opacity-100 transition-all">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-slate-400 mb-4">
                <Building2 size={24} />
              </div>
              <p className="text-sm font-bold text-slate-600 mb-1 uppercase tracking-tight">Onboard Your School</p>
              <p className="text-xs text-slate-400 max-w-[140px]">Contact platform administration to list your institution.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Footer */}
      <footer className="border-t border-slate-100 py-12 bg-slate-50/50">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
             <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Secure</p>
             <p className="text-sm font-medium text-slate-600">Encrypted student data and identity verification.</p>
          </div>
          <div>
             <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Live</p>
             <p className="text-sm font-medium text-slate-600">Low-latency virtual lecture halls with live Q&A.</p>
          </div>
          <div>
             <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Mobile</p>
             <p className="text-sm font-medium text-slate-600">Native-like experience across all devices.</p>
          </div>
          <div>
             <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Modular</p>
             <p className="text-sm font-medium text-slate-600">Flexible curriculum management for faculties.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
