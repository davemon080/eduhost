
import React from 'react';
import { Trophy, Star, Target, Zap, BookOpen, Award, Flame, CheckCircle2 } from 'lucide-react';

const BADGES = [
  { id: 'b1', title: 'Dean\'s List', desc: 'Maintained a GPA above 4.5 for two semesters.', icon: Trophy, color: 'from-amber-400 to-orange-500', date: 'June 2024' },
  { id: 'b2', title: 'Early Bird', desc: 'Joined 90% of live classes within the first 5 minutes.', icon: Flame, color: 'from-orange-500 to-red-600', date: 'Sept 2024' },
  { id: 'b3', title: 'Code Ninja', desc: 'Completed all CSC 101 assignments with 100% accuracy.', icon: Zap, color: 'from-blue-400 to-indigo-600', date: 'Aug 2024' },
  { id: 'b4', title: 'Community Pillar', desc: 'Helped 50+ students in the discussion forums.', icon: Star, color: 'from-purple-400 to-fuchsia-600', date: 'Active' },
  { id: 'b5', title: 'Fast Learner', desc: 'Finished the "Operating Systems" module in record time.', icon: Target, color: 'from-emerald-400 to-teal-600', date: 'Oct 2024' },
  { id: 'b6', title: 'Archivist', desc: 'Saved and revisited 20+ personal recordings.', icon: BookOpen, color: 'from-cyan-400 to-blue-500', date: 'Nov 2024' },
];

const Badges: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10">
          <h2 className="text-3xl font-black mb-2">Academic Badges</h2>
          <p className="text-slate-400 font-medium">Your achievements and certifications earned on EduStream Pro.</p>
        </div>
        <Award className="absolute -right-8 -bottom-8 text-white/5" size={240} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {BADGES.map((badge) => (
          <div key={badge.id} className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${badge.color} flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
              <badge.icon size={32} />
            </div>
            <h3 className="text-lg font-black text-slate-900 mb-1">{badge.title}</h3>
            <p className="text-xs text-slate-400 font-medium leading-relaxed mb-6">{badge.desc}</p>
            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
               <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Earned: {badge.date}</span>
               <CheckCircle2 size={16} className="text-blue-500" />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2.5rem] p-12 text-center">
        <p className="text-slate-400 font-black text-xs uppercase tracking-widest">Keep learning to unlock more!</p>
        <p className="text-slate-300 text-[10px] mt-1 font-bold">Upcoming: "Master Orator" for high participation in live sessions.</p>
      </div>
    </div>
  );
};

export default Badges;
