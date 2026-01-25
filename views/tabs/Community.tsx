
import React from 'react';
import { FEED_POSTS } from '../../mockData';
import { UserProfile, University } from '../../types';
import { Heart, MessageSquare, Share2, Info } from 'lucide-react';

interface CommunityProps {
  user: UserProfile;
  university?: University;
}

const Community: React.FC<CommunityProps> = ({ user, university }) => {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div 
        className="rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-lg"
        style={{ backgroundColor: university?.primaryColor || '#2563eb', boxShadow: `0 10px 15px -3px ${university?.primaryColor || '#2563eb'}33` }}
      >
        <div className="relative z-10">
          <h1 className="text-3xl font-black mb-2 leading-tight">Welcome back, {user.name.split(' ')[0]}!</h1>
          <p className="text-white/80 font-medium">Access your classes, track assignments, and stay updated with announcements from your lecturers.</p>
        </div>
        <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      <div className="flex items-center gap-3 p-5 bg-amber-50 border border-amber-200 rounded-3xl text-amber-700">
        <Info size={20} className="shrink-0" />
        <p className="text-sm font-medium">Get timely updates from your lecturers and faculty leaders here.</p>
      </div>

      <div className="space-y-8">
        <div className="px-4">
           <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Latest Broadcasts</h3>
        </div>
        
        {FEED_POSTS.map(post => (
          <article key={post.id} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden hover:shadow-xl transition-all group">
            <div className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center font-bold text-slate-400 border border-slate-200">
                  {post.authorName.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{post.authorName}</h4>
                  <p className="text-xs text-slate-400 font-medium">{post.authorRole} • {post.timestamp}</p>
                </div>
              </div>
              <p className="text-slate-700 leading-relaxed mb-8 whitespace-pre-wrap text-lg font-medium">
                {post.content}
              </p>
              <div className="flex items-center gap-6 pt-6 border-t border-slate-50">
                <button className="flex items-center gap-2 text-slate-400 hover:text-red-500 transition-colors">
                  <Heart size={18} />
                  <span className="text-sm font-bold">{post.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-slate-400 hover:text-blue-500 transition-colors">
                  <MessageSquare size={18} />
                  <span className="text-sm font-bold">Comments</span>
                </button>
                <button className="flex items-center gap-2 text-slate-400 hover:text-green-500 transition-colors ml-auto">
                  <Share2 size={18} />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Community;
