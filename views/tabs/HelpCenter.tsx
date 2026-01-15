
import React from 'react';
import { Search, HelpCircle, MessageCircle, FileText, ChevronRight, Mail, Phone, ExternalLink, LifeBuoy } from 'lucide-react';

const FAQS = [
  { q: 'How do I register for a new semester?', a: 'Go to your Profile Hub > Migration Modal to select your new level. Courses will update automatically.', category: 'Academic' },
  { q: 'Can I watch lectures offline?', a: 'Recordings saved to your Personal Library can be accessed anytime as long as you have a session active.', category: 'Technical' },
  { q: 'Where do I find my exam results?', a: 'Check the "Tests & Exams" tab from your sidebar for a detailed breakdown of all assessment scores.', category: 'Results' },
  { q: 'What payment methods are supported?', a: 'We support Visa, Mastercard, and Direct Institutional Bank Transfer via the secure gateway.', category: 'Financial' },
];

const HelpCenter: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="text-center space-y-6">
        <h2 className="text-4xl font-black text-slate-900 tracking-tight">How can we help?</h2>
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search for articles, guides..." 
            className="w-full pl-14 pr-6 py-5 bg-white border border-slate-100 rounded-[2rem] shadow-sm outline-none focus:ring-4 focus:ring-blue-500/5 transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { icon: HelpCircle, label: 'Academic Help', color: 'text-blue-600 bg-blue-50' },
          { icon: MessageCircle, label: 'Live Support', color: 'text-emerald-600 bg-emerald-50' },
          { icon: FileText, label: 'User Manual', color: 'text-amber-600 bg-amber-50' },
        ].map(card => (
          <button key={card.label} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all text-center group">
            <div className={`w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center ${card.color} group-hover:scale-110 transition-transform`}>
              <card.icon size={24} />
            </div>
            <p className="font-black text-slate-800 text-sm uppercase tracking-widest">{card.label}</p>
          </button>
        ))}
      </div>

      <div className="space-y-6">
        <h3 className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Frequent Questions</h3>
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm divide-y divide-slate-50">
          {FAQS.map((faq, i) => (
            <div key={i} className="p-8 group hover:bg-slate-50 transition-colors cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                 <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase">{faq.category}</span>
              </div>
              <h4 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors">{faq.q}</h4>
              <p className="text-slate-500 text-sm mt-3 leading-relaxed font-medium">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-900 rounded-[3rem] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-2xl font-black mb-2 leading-tight">Still need assistance?</h3>
          <p className="text-slate-400 font-medium">Our IT helpdesk is available 24/7 for technical issues.</p>
        </div>
        <div className="relative z-10 flex gap-4 w-full md:w-auto">
           <button className="flex-1 md:flex-none px-8 py-4 bg-blue-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20">
              Open Ticket
           </button>
           <button className="flex-1 md:flex-none px-8 py-4 bg-white/10 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/20 transition-all">
              Contact Us
           </button>
        </div>
        <LifeBuoy className="absolute -left-10 -bottom-10 text-white/5" size={200} />
      </div>
    </div>
  );
};

export default HelpCenter;
