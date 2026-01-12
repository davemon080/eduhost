
import React, { useState } from 'react';
import { LIVE_CLASSES } from '../../mockData';
import { Video, Users, Mic, MicOff, Camera, CameraOff, Send, MessageCircle } from 'lucide-react';

const LiveClassView: React.FC = () => {
  const [isJoined, setIsJoined] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [comment, setComment] = useState('');
  const [messages, setMessages] = useState<{user: string, text: string}[]>([
    { user: 'Dr. Sarah', text: 'Welcome everyone! Can you hear me clearly?' },
    { user: 'Student X', text: 'Yes, loud and clear prof!' }
  ]);

  const activeLive = LIVE_CLASSES.find(l => l.status === 'LIVE');

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setMessages([...messages, { user: 'Me', text: comment }]);
    setComment('');
  };

  if (!isJoined) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-2xl font-bold text-slate-800">Live Classes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {LIVE_CLASSES.map(cls => (
            <div key={cls.id} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${
                  cls.status === 'LIVE' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-slate-100 text-slate-500'
                }`}>
                  {cls.status}
                </span>
                <span className="text-xs text-slate-400">{cls.startTime}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">{cls.title}</h3>
              <p className="text-sm text-slate-500 mb-6">{cls.courseCode}</p>
              
              <button 
                onClick={() => cls.status === 'LIVE' && setIsJoined(true)}
                disabled={cls.status !== 'LIVE'}
                className={`w-full py-4 rounded-xl font-bold text-sm transition-all ${
                  cls.status === 'LIVE' 
                    ? 'bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-100' 
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                {cls.status === 'LIVE' ? 'Join Stream' : 'Available Later'}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-slate-900 z-[60] flex flex-col">
      {/* Top Header */}
      <div className="h-16 px-6 flex items-center justify-between bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="bg-red-600 w-3 h-3 rounded-full animate-pulse"></div>
          <h2 className="text-white font-bold">{activeLive?.title} <span className="text-slate-500 ml-2 font-normal">({activeLive?.courseCode})</span></h2>
        </div>
        <div className="flex items-center gap-4 text-slate-400 text-sm">
          <Users size={18} />
          <span>124 Students watching</span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="flex-1 flex overflow-hidden">
        {/* Stream Area */}
        <div className="flex-1 p-6 flex flex-col gap-6 relative">
          <div className="flex-1 bg-slate-800 rounded-3xl overflow-hidden relative group">
            <img src="https://picsum.photos/seed/lecturer/1200/800" className="w-full h-full object-cover opacity-60" alt="Lecturer" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-slate-600">
                  <Video className="text-slate-500" size={32} />
                </div>
                <p className="text-slate-400 font-medium">Lecturer Stream active</p>
              </div>
            </div>
            {/* Self View Overlay */}
            <div className="absolute bottom-6 right-6 w-48 h-32 bg-slate-700 rounded-2xl border-2 border-slate-600 overflow-hidden shadow-2xl">
              {camOn ? (
                 <img src="https://picsum.photos/seed/me/200/200" className="w-full h-full object-cover" alt="Me" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <CameraOff size={24} className="text-slate-600" />
                </div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 py-2">
            <button 
              onClick={() => setMicOn(!micOn)}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                micOn ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              {micOn ? <Mic size={24} /> : <MicOff size={24} />}
            </button>
            <button 
              onClick={() => setCamOn(!camOn)}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                camOn ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              {camOn ? <Camera size={24} /> : <CameraOff size={24} />}
            </button>
            <button 
              onClick={() => setIsJoined(false)}
              className="px-8 h-14 bg-red-600 text-white font-bold rounded-2xl hover:bg-red-700 shadow-xl shadow-red-900/40"
            >
              Leave Class
            </button>
          </div>
        </div>

        {/* Chat Sidebar */}
        <div className="w-96 bg-slate-800/50 border-l border-slate-800 flex flex-col">
          <div className="p-6 border-b border-slate-800 flex items-center gap-2">
            <MessageCircle className="text-blue-500" size={20} />
            <h3 className="text-white font-bold">Live Comments</h3>
          </div>
          <div className="flex-1 p-6 space-y-6 overflow-y-auto">
            {messages.map((m, i) => (
              <div key={i} className="space-y-1">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{m.user}</p>
                <div className={`p-3 rounded-2xl text-sm ${
                  m.user === 'Me' ? 'bg-blue-600 text-white ml-8' : 'bg-slate-700 text-slate-200 mr-8'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSendComment} className="p-6 bg-slate-900 border-t border-slate-800">
            <div className="relative">
              <input 
                type="text" 
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder="Type your comment..."
                className="w-full pl-4 pr-12 py-4 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none focus:border-blue-500 transition-colors"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-400">
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LiveClassView;
