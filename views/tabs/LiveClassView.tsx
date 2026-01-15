
import React, { useState } from 'react';
import { LIVE_CLASSES } from '../../mockData';
import { UserProfile, UserRole } from '../../types';
import { 
  Video, 
  Users, 
  Mic, 
  MicOff, 
  Camera, 
  CameraOff, 
  Send, 
  MessageCircle, 
  Radio, 
  ChevronDown, 
  X, 
  Square, 
  VolumeX, 
  Settings, 
  ArrowLeft,
  // Fix: Added missing Clock import
  Clock 
} from 'lucide-react';

interface LiveClassViewProps {
  user: UserProfile;
  onBack?: () => void;
}

const LiveClassView: React.FC<LiveClassViewProps> = ({ user, onBack }) => {
  const [isJoined, setIsJoined] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [isAllMuted, setIsAllMuted] = useState(false);
  const [comment, setComment] = useState('');
  const [showChat, setShowChat] = useState(true);
  const [messages, setMessages] = useState<{user: string, text: string, role: string}[]>([
    { user: 'Dr. Sarah', text: 'Welcome everyone! Can you hear me clearly?', role: 'LECTURER' },
    { user: 'Student X', text: 'Yes, loud and clear prof!', role: 'STUDENT' }
  ]);

  const activeLive = LIVE_CLASSES.find(l => l.status === 'LIVE');
  const isLecturer = user.role === UserRole.LECTURER;

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setMessages([...messages, { user: user.name, text: comment, role: user.role }]);
    setComment('');
  };

  if (!isJoined) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 p-4 md:p-0">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Virtual Classrooms</h2>
          <span className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1.5 rounded-full">
            <Radio size={12} className="text-red-500 animate-pulse" /> Live Now
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {LIVE_CLASSES.map(cls => (
            <div key={cls.id} className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm flex flex-col group hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-6">
                <span className={`text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-widest ${
                  cls.status === 'LIVE' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-slate-100 text-slate-500'
                }`}>
                  {cls.status}
                </span>
                <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                  <Clock size={14} /> {cls.startTime}
                </span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2 leading-tight">{cls.title}</h3>
              <p className="text-xs font-black text-blue-600 uppercase tracking-widest mb-10">{cls.courseCode}</p>
              
              <button 
                onClick={() => cls.status === 'LIVE' && setIsJoined(true)}
                disabled={cls.status !== 'LIVE'}
                className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${
                  cls.status === 'LIVE' 
                    ? 'bg-slate-900 text-white hover:bg-blue-600 shadow-xl shadow-slate-200' 
                    : 'bg-slate-100 text-slate-300 cursor-not-allowed'
                }`}
              >
                {cls.status === 'LIVE' ? 'Enter Classroom' : 'Session Ended'}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-slate-950 z-[100] flex flex-col md:flex-row overflow-hidden select-none">
      {/* MOBILE-FIRST HEADER (Always top) */}
      <div className="md:hidden h-14 px-4 flex Tournament-center justify-between bg-slate-900 border-b border-white/5 shrink-0">
        <button onClick={() => setIsJoined(false)} className="text-slate-400">
          <ArrowLeft size={20} />
        </button>
        <div className="flex flex-col items-center">
          <h2 className="text-xs font-black text-white leading-none tracking-tight">{activeLive?.courseCode}</h2>
          <span className="text-[8px] font-black text-red-500 uppercase tracking-widest mt-0.5">Live Broadcast</span>
        </div>
        <button onClick={() => setShowChat(!showChat)} className={`p-2 rounded-lg ${showChat ? 'bg-blue-600 text-white' : 'text-slate-400'}`}>
          <MessageCircle size={20} />
        </button>
      </div>

      {/* Main Broadcast Area */}
      <div className="flex-1 flex flex-col relative overflow-hidden bg-black">
        {/* DESKTOP TOP BAR (Hidden on mobile) */}
        <div className="hidden md:flex h-16 px-8 items-center justify-between bg-slate-900/50 backdrop-blur-xl border-b border-white/5 z-20">
          <div className="flex items-center gap-4">
             <div className="px-3 py-1 bg-red-600 text-[10px] font-black text-white rounded uppercase animate-pulse">Live</div>
             <h2 className="text-white font-black text-lg">{activeLive?.title}</h2>
             <span className="text-slate-500 font-bold text-sm">/ {activeLive?.courseCode}</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-black uppercase tracking-widest">
              <Users size={16} /> 124 Participants
            </div>
            {isRecording && (
              <div className="flex items-center gap-2 text-red-500 text-xs font-black uppercase tracking-widest">
                <Square size={12} fill="currentColor" /> REC
              </div>
            )}
          </div>
        </div>

        {/* Video Canvas */}
        <div className="flex-1 relative flex items-center justify-center p-4 md:p-8">
          <div className="w-full h-full bg-slate-900 rounded-[2rem] md:rounded-[3rem] overflow-hidden relative shadow-2xl border border-white/5 group">
             {/* Main Stream (Placeholder) */}
             <img src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=1600&h=900&fit=crop" className="w-full h-full object-cover opacity-80" alt="Stream" />
             
             {/* Stream HUD Overlays */}
             <div className="absolute top-6 left-6 flex flex-col gap-2">
                <div className="px-4 py-2 bg-black/40 backdrop-blur-md rounded-xl border border-white/10 text-white text-[10px] font-black uppercase tracking-widest">
                   Host: Dr. Sarah
                </div>
                {isRecording && (
                  <div className="px-4 py-2 bg-red-600/80 backdrop-blur-md rounded-xl text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span> Recording Session
                  </div>
                )}
             </div>

             {/* Self-View (Picture in Picture) */}
             <div className="absolute bottom-6 right-6 w-32 h-44 md:w-56 md:h-40 bg-slate-800 rounded-2xl md:rounded-3xl border-2 border-white/10 overflow-hidden shadow-2xl z-10 transition-transform hover:scale-105">
               {camOn ? (
                 <img src={`https://ui-avatars.com/api/?name=${user.name}&background=random&color=fff`} className="w-full h-full object-cover" alt="Me" />
               ) : (
                 <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900">
                    <CameraOff size={24} className="text-slate-700 mb-2" />
                    <span className="text-[8px] font-black text-slate-600 uppercase">Camera Off</span>
                 </div>
               )}
               <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/50 text-white text-[8px] font-black uppercase rounded">You</div>
             </div>

             {/* Centered Controls Overlay (Desktop Only hover) */}
             <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex items-center justify-center">
                <p className="text-white/50 text-xs font-black uppercase tracking-[0.3em]">Institutional Broadcast Node</p>
             </div>
          </div>
        </div>

        {/* BOTTOM ACTION BAR (Mobile & Desktop) */}
        <div className="px-6 pb-10 md:pb-8 flex items-center justify-center shrink-0 z-20">
           <div className="bg-slate-900/90 backdrop-blur-2xl px-6 py-4 rounded-[2.5rem] border border-white/10 shadow-2xl flex items-center gap-3 md:gap-6">
              
              {/* Common Controls */}
              <button 
                onClick={() => setMicOn(!micOn)}
                className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all ${
                  micOn ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-red-600 text-white hover:bg-red-700'
                }`}
              >
                {micOn ? <Mic size={20} /> : <MicOff size={20} />}
              </button>

              <button 
                onClick={() => setCamOn(!camOn)}
                className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all ${
                  camOn ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-red-600 text-white hover:bg-red-700'
                }`}
              >
                {camOn ? <Camera size={20} /> : <CameraOff size={20} />}
              </button>

              {/* LECTURER SPECIFIC CONTROLS */}
              {isLecturer && (
                <>
                  <div className="w-px h-8 bg-white/10 hidden md:block"></div>
                  
                  <button 
                    onClick={() => setIsRecording(!isRecording)}
                    className={`hidden md:flex w-14 h-14 rounded-full items-center justify-center transition-all ${
                      isRecording ? 'bg-red-600 text-white animate-pulse' : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                    title={isRecording ? "Stop Recording" : "Record Session"}
                  >
                    <Radio size={22} />
                  </button>

                  <button 
                    onClick={() => setIsAllMuted(!isAllMuted)}
                    className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all ${
                      isAllMuted ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                    title="Mute All Students"
                  >
                    <VolumeX size={20} />
                  </button>
                </>
              )}

              <button 
                onClick={() => setIsJoined(false)}
                className="px-6 md:px-10 h-12 md:h-14 bg-red-600 text-white font-black text-[10px] md:text-xs uppercase tracking-widest rounded-2xl hover:bg-red-700 transition-all shadow-xl shadow-red-950/20"
              >
                Leave
              </button>

              {/* Mobile More Toggle */}
              <button className="md:hidden w-12 h-12 rounded-full bg-slate-800 text-white flex items-center justify-center">
                <Settings size={20} />
              </button>
           </div>
        </div>
      </div>

      {/* Responsive Chat Sidebar */}
      {showChat && (
        <div className={`
          fixed md:relative inset-0 md:inset-auto md:w-[22rem] bg-slate-900 border-l border-white/5 flex flex-col z-[110] md:z-auto
          transition-transform duration-300 transform 
          ${showChat ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
        `}>
          {/* Chat Header */}
          <div className="h-16 px-6 shrink-0 flex items-center justify-between border-b border-white/5 bg-slate-900/50 backdrop-blur-xl">
             <div className="flex items-center gap-3">
                <MessageCircle size={18} className="text-blue-500" />
                <h3 className="text-white font-black text-xs uppercase tracking-widest">Class Discussions</h3>
             </div>
             <button onClick={() => setShowChat(false)} className="md:hidden text-slate-500">
                <X size={20} />
             </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-6 space-y-6 overflow-y-auto custom-scrollbar bg-slate-950/20">
            {messages.map((m, i) => (
              <div key={i} className={`flex flex-col ${m.user === user.name ? 'items-end' : 'items-start'}`}>
                <div className="flex items-center gap-2 mb-1">
                   <span className={`text-[9px] font-black uppercase tracking-tighter ${m.role === 'LECTURER' ? 'text-blue-400' : 'text-slate-500'}`}>
                    {m.user} {m.role === 'LECTURER' && '• Faculty'}
                   </span>
                </div>
                <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  m.user === user.name 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-slate-800 text-slate-200 rounded-tl-none border border-white/5'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            <div className="h-4"></div>
          </div>

          {/* Input Area */}
          <div className="p-6 bg-slate-900/50 border-t border-white/5 pb-12 md:pb-6">
             <form onSubmit={handleSendComment} className="relative">
                <input 
                  type="text" 
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  placeholder="Ask a question..."
                  className="w-full pl-5 pr-12 py-4 bg-slate-800 border border-white/5 rounded-[1.5rem] text-white text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all"
                />
                <button 
                  type="submit" 
                  disabled={!comment.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-500 transition-colors disabled:opacity-50"
                >
                   <Send size={18} />
                </button>
             </form>
             <p className="mt-3 text-[9px] font-black text-slate-500 text-center uppercase tracking-widest">
               Session comments are recorded for playback
             </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveClassView;
