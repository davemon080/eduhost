
import React, { useState } from 'react';
import { UserProfile } from '../../types';
import { MessageSquare, Send, Sparkles, AlertCircle, Info } from 'lucide-react';

interface ManageCommunityProps {
  user: UserProfile;
}

const ManageCommunity: React.FC<ManageCommunityProps> = ({ user }) => {
  const [content, setContent] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    setIsPosting(true);
    setTimeout(() => {
      setIsPosting(false);
      setContent('');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="bg-blue-600 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10">
          <h2 className="text-3xl font-black mb-2">Faculty Broadcasting</h2>
          <p className="text-blue-100 font-medium">Direct announcements to all students in your assigned departments.</p>
        </div>
        <Sparkles className="absolute top-8 right-8 text-white/10" size={120} />
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 p-10 shadow-sm">
        <div className="flex items-center gap-4 mb-8">
           <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center font-black text-slate-400 border border-slate-200">
              {user.name.charAt(0)}
           </div>
           <div>
              <p className="font-black text-slate-900">{user.name}</p>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{user.role} Authority</p>
           </div>
        </div>

        <form onSubmit={handlePost} className="space-y-6">
          <div className="relative">
             <textarea 
               value={content}
               onChange={e => setContent(e.target.value)}
               placeholder="Write your institutional update here..."
               className="w-full px-8 py-8 bg-slate-50 border border-slate-100 rounded-[2rem] outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 text-slate-700 font-medium min-h-[200px] resize-none transition-all placeholder:text-slate-300"
               maxLength={1000}
             />
             <div className="absolute bottom-6 right-8 text-[10px] font-black text-slate-300 uppercase tracking-widest">
                {content.length} / 1000
             </div>
          </div>

          {showSuccess && (
            <div className="p-4 bg-green-50 border border-green-100 text-green-600 rounded-2xl text-xs font-bold flex items-center gap-3 animate-in zoom-in-95">
               <Info size={16}/> Announcement Broadcasted Successfully!
            </div>
          )}

          <div className="flex items-center justify-between pt-4">
             <div className="flex items-center gap-2 text-amber-600 text-[10px] font-black uppercase tracking-widest">
                <AlertCircle size={14}/> Permanent Record
             </div>
             <button 
               disabled={isPosting || !content.trim()}
               className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-slate-100 hover:bg-blue-600 transition-all flex items-center gap-3 disabled:opacity-50"
             >
                {isPosting ? 'Transmitting...' : (
                  <>Broadcast Message <Send size={16}/></>
                )}
             </button>
          </div>
        </form>
      </div>

      <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 border-dashed">
         <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Broadcast History</h4>
         <p className="text-sm text-slate-400 italic">No recent broadcasts found for this session.</p>
      </div>
    </div>
  );
};

export default ManageCommunity;
