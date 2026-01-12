
import React from 'react';
import { FEED_POSTS } from '../../mockData';
import { UserProfile } from '../../types';
import { Heart, MessageSquare, Share2, Info } from 'lucide-react';

interface CommunityProps {
  user: UserProfile;
}

const Community: React.FC<CommunityProps> = ({ user }) => {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-blue-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-lg shadow-blue-200">
        <div className="relative z-10">
          <h1 className="text-2xl font-bold mb-2">Welcome, {user.name.split(' ')[0]}!</h1>
          <p className="text-blue-100">Stay updated with the latest news from your lecturers and faculty heads.</p>
        </div>
        <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
      </div>

      <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-700">
        <Info size={20} />
        <p className="text-sm">Only authorized faculty members and lecturers can post in this community.</p>
      </div>

      <div className="space-y-6">
        {FEED_POSTS.map(post => (
          <article key={post.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-400">
                  {post.authorName.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">{post.authorName}</h4>
                  <p className="text-xs text-slate-500">{post.authorRole} • {post.timestamp}</p>
                </div>
              </div>
              <p className="text-slate-700 leading-relaxed mb-6 whitespace-pre-wrap">
                {post.content}
              </p>
              <div className="flex items-center gap-6 pt-4 border-t border-slate-50">
                <button className="flex items-center gap-2 text-slate-400 hover:text-red-500 transition-colors">
                  <Heart size={18} />
                  <span className="text-sm font-medium">{post.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-slate-400 hover:text-blue-500 transition-colors">
                  <MessageSquare size={18} />
                  <span className="text-sm font-medium">Comments</span>
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
