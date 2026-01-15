
import React, { useState, useEffect, useRef } from 'react';
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
  X, 
  Square, 
  VolumeX, 
  Settings, 
  ArrowLeft,
  Clock,
  Share2,
  Copy,
  CheckCircle2,
  Heart,
  ChevronRight,
  Smile,
  Plus,
  Hand,
  MoreVertical,
  Volume2,
  /* Added Play to fix the missing component error on line 455 */
  Play
} from 'lucide-react';

interface Reaction {
  id: number;
  emoji: string;
  left: number;
}

interface Participant {
  id: string;
  name: string;
  role: UserRole;
  isRaisingHand: boolean;
  isMuted: boolean;
  isCamOff: boolean;
}

interface LiveClassViewProps {
  user: UserProfile;
  onBack?: () => void;
  onSaveRecording?: (recording: any) => void;
}

const LiveClassView: React.FC<LiveClassViewProps> = ({ user, onBack, onSaveRecording }) => {
  const [isJoined, setIsJoined] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [isAllMuted, setIsAllMuted] = useState(false);
  const [isAllCamsOff, setIsAllCamsOff] = useState(false);
  const [comment, setComment] = useState('');
  const [activeSidebarTab, setActiveSidebarTab] = useState<'chat' | 'participants'>('chat');
  const [showChat, setShowChat] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showReactionsMenu, setShowReactionsMenu] = useState(false);
  const [showMoreEmojis, setShowMoreEmojis] = useState(false);
  const [copied, setCopied] = useState(false);
  const [reactions, setReactions] = useState<Reaction[]>([]);
  const [handRaised, setHandRaised] = useState(false);
  const [spotlightId, setSpotlightId] = useState<string | null>(null);

  // Mock participants
  const [participants, setParticipants] = useState<Participant[]>([
    { id: 'p1', name: 'Dr. Sarah', role: UserRole.LECTURER, isRaisingHand: false, isMuted: false, isCamOff: false },
    { id: 'p2', name: 'Alex Thompson', role: UserRole.STUDENT, isRaisingHand: true, isMuted: true, isCamOff: false },
    { id: 'p3', name: 'Maria Garcia', role: UserRole.STUDENT, isRaisingHand: false, isMuted: true, isCamOff: true },
    { id: 'p4', name: 'James Wilson', role: UserRole.STUDENT, isRaisingHand: true, isMuted: true, isCamOff: false },
    { id: 'p5', name: 'Linda Chen', role: UserRole.STUDENT, isRaisingHand: false, isMuted: true, isCamOff: false },
  ]);

  const [messages, setMessages] = useState<{user: string, text: string, role: string}[]>([
    { user: 'Dr. Sarah', text: 'Welcome everyone! Can you hear me clearly?', role: 'LECTURER' },
    { user: 'Alex Student', text: 'Yes, loud and clear prof!', role: 'STUDENT' }
  ]);

  const activeLive = LIVE_CLASSES.find(l => l.status === 'LIVE');
  const isLecturer = user.role === UserRole.LECTURER;

  const topEmojis = ['🔥', '👏', '❤️', '😂', '😮'];
  const moreEmojis = ['👍', '🎉', '💡', '💯', '🤔', '🚀', '🎓', '✍️', '🤫', '🤝'];

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setMessages([...messages, { user: user.name, text: comment, role: user.role }]);
    setComment('');
  };

  const triggerReaction = (emoji: string) => {
    const newReaction: Reaction = {
      id: Date.now(),
      emoji,
      left: Math.random() * 80 + 10 
    };
    setReactions(prev => [...prev, newReaction]);
    if (window.innerWidth < 768) {
      setShowReactionsMenu(false);
      setShowMoreEmojis(false);
    }
    setTimeout(() => {
      setReactions(prev => prev.filter(r => r.id !== newReaction.id));
    }, 3000);
  };

  const toggleHandRaise = () => {
    setHandRaised(!handRaised);
    // Update self in participants list for mock
    setParticipants(prev => prev.map(p => 
      p.name === user.name ? { ...p, isRaisingHand: !handRaised } : p
    ));
    if (!handRaised) {
      triggerReaction('✋');
    }
  };

  const handleSpotlight = (id: string) => {
    if (spotlightId === id) {
      setSpotlightId(null);
    } else {
      setSpotlightId(id);
      // Automatically lower hand when spotlighted
      setParticipants(prev => prev.map(p => p.id === id ? { ...p, isRaisingHand: false } : p));
    }
  };

  const handleGlobalMute = () => {
    setIsAllMuted(!isAllMuted);
    setParticipants(prev => prev.map(p => p.role === UserRole.STUDENT ? { ...p, isMuted: !isAllMuted } : p));
  };

  const handleGlobalCamOff = () => {
    setIsAllCamsOff(!isAllCamsOff);
    setParticipants(prev => prev.map(p => p.role === UserRole.STUDENT ? { ...p, isCamOff: !isAllCamsOff } : p));
  };

  const handleShare = () => {
    const link = `https://edustream.edu/live/${activeLive?.id}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleRecording = () => {
    if (isRecording) {
      if (!isLecturer && onSaveRecording) {
        onSaveRecording({
          id: Date.now().toString(),
          title: activeLive?.title || 'Personal Recording',
          courseCode: activeLive?.courseCode || 'CSC 000',
          date: new Date().toLocaleDateString(),
          duration: '45:12',
          thumbnail: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=400&h=225&fit=crop'
        });
      }
    }
    setIsRecording(!isRecording);
    setShowSettings(false);
  };

  const sortedParticipants = [...participants].sort((a, b) => {
    if (a.id === spotlightId) return -1;
    if (b.id === spotlightId) return 1;
    if (a.isRaisingHand && !b.isRaisingHand) return -1;
    if (!a.isRaisingHand && b.isRaisingHand) return 1;
    return 0;
  });

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
                <span className={`text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-widest ${cls.status === 'LIVE' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-slate-100 text-slate-500'}`}>{cls.status}</span>
                <span className="text-xs font-bold text-slate-400 flex items-center gap-1"><Clock size={14} /> {cls.startTime}</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2 leading-tight">{cls.title}</h3>
              <p className="text-xs font-black text-blue-600 uppercase tracking-widest mb-10">{cls.courseCode}</p>
              <button 
                onClick={() => cls.status === 'LIVE' && setIsJoined(true)}
                disabled={cls.status !== 'LIVE'}
                className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${cls.status === 'LIVE' ? 'bg-slate-900 text-white hover:bg-blue-600 shadow-xl shadow-slate-200' : 'bg-slate-100 text-slate-300 cursor-not-allowed'}`}
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
      {/* MOBILE HEADER */}
      <div className="md:hidden h-14 px-4 flex items-center justify-between bg-slate-900 border-b border-white/5 shrink-0">
        <button onClick={() => setIsJoined(false)} className="text-slate-400"><ArrowLeft size={20} /></button>
        <div className="flex flex-col items-center">
          <h2 className="text-xs font-black text-white leading-none tracking-tight">{activeLive?.courseCode}</h2>
          <div className="flex items-center gap-1.5 mt-0.5">
             <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
             <span className="text-[8px] font-black text-white/50 uppercase tracking-widest">142 Students Live</span>
          </div>
        </div>
        <button onClick={() => setShowChat(!showChat)} className={`p-2 rounded-lg ${showChat ? 'bg-blue-600 text-white' : 'text-slate-400'}`}><MessageCircle size={20} /></button>
      </div>

      {/* Main Broadcast Area */}
      <div className="flex-1 flex flex-col relative overflow-hidden bg-black">
        {/* DESKTOP TOP BAR */}
        <div className="hidden md:flex h-16 px-8 items-center justify-between bg-slate-900/50 backdrop-blur-xl border-b border-white/5 z-20">
          <div className="flex items-center gap-4">
             <div className="px-3 py-1 bg-red-600 text-[10px] font-black text-white rounded uppercase animate-pulse">Live</div>
             <h2 className="text-white font-black text-lg">{activeLive?.title}</h2>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-white text-xs font-black uppercase tracking-widest bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
              <Users size={16} className="text-blue-400" /> 142 Participants
            </div>
            {isRecording && (
              <div className="flex items-center gap-2 text-red-500 text-xs font-black uppercase tracking-widest">
                <Square size={12} fill="currentColor" className="animate-pulse" /> REC
              </div>
            )}
          </div>
        </div>

        {/* Video Canvas */}
        <div className="flex-1 relative flex items-center justify-center p-4 md:p-8 overflow-hidden">
          <div className="w-full h-full bg-slate-900 rounded-[2rem] md:rounded-[3rem] overflow-hidden relative shadow-2xl border border-white/5 group">
             <img src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=1600&h=900&fit=crop" className="w-full h-full object-cover opacity-80" alt="Stream" />
             
             {/* FLOATING REACTIONS LAYER */}
             <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {reactions.map(r => (
                  <div key={r.id} className="absolute bottom-0 text-3xl animate-float-up" style={{ left: `${r.left}%` }}>{r.emoji}</div>
                ))}
             </div>

             {/* HUD Overlays */}
             <div className="absolute top-6 left-6 flex flex-col gap-2">
                <div className="px-4 py-2 bg-black/40 backdrop-blur-md rounded-xl border border-white/10 text-white text-[10px] font-black uppercase tracking-widest">
                   Host: Dr. Sarah
                </div>
                {isRecording && (
                  <div className="px-4 py-2 bg-red-600/80 backdrop-blur-md rounded-xl text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span> {isLecturer ? 'Broadcasting & Recording' : 'Recording Session'}
                  </div>
                )}
             </div>

             {/* SPOTLIGHT Student View */}
             {spotlightId && (
               <div className="absolute top-6 right-6 w-48 h-64 md:w-64 md:h-80 bg-slate-800 rounded-[2rem] border-2 border-blue-500 overflow-hidden shadow-2xl z-20 animate-in zoom-in duration-300">
                  <div className="w-full h-full relative">
                    <img 
                      src={`https://ui-avatars.com/api/?name=${participants.find(p => p.id === spotlightId)?.name}&background=random&color=fff`} 
                      className="w-full h-full object-cover" 
                      alt="Spotlight" 
                    />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                       <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-black uppercase rounded-lg shadow-lg">Speaker</span>
                       <div className="flex gap-2">
                          <div className="w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white"><Mic size={14}/></div>
                       </div>
                    </div>
                  </div>
               </div>
             )}

             {/* Self-View */}
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
          </div>

          {/* DYNAMIC REACTION MENU */}
          {showReactionsMenu && (
            <div className="absolute bottom-32 md:bottom-40 left-1/2 -translate-x-1/2 z-[130] animate-in slide-in-from-bottom-4 duration-200">
               <div className="bg-slate-900/95 backdrop-blur-2xl p-2 rounded-[2.5rem] border border-white/20 shadow-2xl flex flex-col items-center gap-2">
                  <div className="flex gap-2 p-1">
                    {topEmojis.map(emoji => (
                      <button key={emoji} onClick={() => triggerReaction(emoji)} className="w-12 h-12 flex items-center justify-center text-2xl hover:bg-white/10 rounded-full transition-all active:scale-90">{emoji}</button>
                    ))}
                    <button onClick={() => setShowMoreEmojis(!showMoreEmojis)} className={`w-12 h-12 flex items-center justify-center rounded-full transition-all ${showMoreEmojis ? 'bg-blue-600 text-white rotate-45' : 'bg-white/5 text-white hover:bg-white/10'}`}><Plus size={20} /></button>
                  </div>
                  {showMoreEmojis && (
                    <div className="grid grid-cols-5 gap-2 p-3 border-t border-white/10 animate-in fade-in zoom-in-95 duration-200">
                      {moreEmojis.map(emoji => (
                        <button key={emoji} onClick={() => triggerReaction(emoji)} className="w-10 h-10 flex items-center justify-center text-xl hover:bg-white/10 rounded-full transition-all active:scale-90">{emoji}</button>
                      ))}
                    </div>
                  )}
                  <div className="w-full flex justify-center pb-1">
                    <button onClick={() => { setShowReactionsMenu(false); setShowMoreEmojis(false); }} className="text-[9px] font-black text-white/30 uppercase tracking-widest hover:text-white/60 py-1 transition-colors">Close Menu</button>
                  </div>
               </div>
            </div>
          )}
        </div>

        {/* BOTTOM ACTION BAR */}
        <div className="px-6 pb-10 md:pb-8 flex items-center justify-center shrink-0 z-20">
           <div className="bg-slate-900/90 backdrop-blur-2xl px-6 py-4 rounded-[2.5rem] border border-white/10 shadow-2xl flex items-center gap-3 md:gap-6">
              <button onClick={() => setMicOn(!micOn)} className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all ${micOn ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-red-600 text-white hover:bg-red-700'}`}>
                {micOn ? <Mic size={20} /> : <MicOff size={20} />}
              </button>
              <button onClick={() => setCamOn(!camOn)} className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all ${camOn ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-red-600 text-white hover:bg-red-700'}`}>
                {camOn ? <Camera size={20} /> : <CameraOff size={20} />}
              </button>
              <button onClick={() => setShowReactionsMenu(!showReactionsMenu)} className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all ${showReactionsMenu ? 'bg-blue-600 text-white' : 'bg-slate-800 text-white hover:bg-slate-700'}`}>
                <Smile size={20} />
              </button>
              {!isLecturer && (
                <button onClick={toggleHandRaise} className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all ${handRaised ? 'bg-amber-500 text-white animate-bounce-short' : 'bg-slate-800 text-white hover:bg-slate-700'}`}>
                  <Hand size={20} />
                </button>
              )}
              <button onClick={() => setIsJoined(false)} className="px-6 md:px-10 h-12 md:h-14 bg-red-600 text-white font-black text-[10px] md:text-xs uppercase tracking-widest rounded-2xl hover:bg-red-700 transition-all">Leave</button>
              <button onClick={() => setShowSettings(!showSettings)} className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all ${showSettings ? 'bg-blue-600 text-white' : 'bg-slate-800 text-white'}`}><Settings size={20} /></button>
           </div>
        </div>

        {/* SETTINGS DRAWER */}
        {showSettings && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-[120] flex items-end md:items-center md:justify-center p-4">
             <div className="w-full md:max-w-md bg-white rounded-[2.5rem] overflow-hidden animate-in slide-in-from-bottom-10 duration-300">
                <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                   <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs">Session Settings</h3>
                   <button onClick={() => setShowSettings(false)} className="text-slate-400"><X size={20} /></button>
                </div>
                <div className="p-8 space-y-4">
                   <button onClick={handleShare} className="w-full flex items-center justify-between p-5 bg-slate-50 rounded-2xl hover:bg-blue-50 transition-colors group">
                      <div className="flex items-center gap-4">
                         <div className="p-3 bg-white rounded-xl shadow-sm text-blue-600"><Share2 size={18} /></div>
                         <div className="text-left"><p className="font-bold text-slate-800 text-sm">Share Broadcast Link</p><p className="text-[10px] font-black text-slate-400 uppercase">Invite peers to join</p></div>
                      </div>
                      {copied ? <CheckCircle2 size={18} className="text-green-500" /> : <Copy size={18} className="text-slate-300" />}
                   </button>
                   <button onClick={handleToggleRecording} className="w-full flex items-center justify-between p-5 bg-slate-50 rounded-2xl hover:bg-red-50 transition-colors group">
                      <div className="flex items-center gap-4">
                         <div className={`p-3 bg-white rounded-xl shadow-sm ${isRecording ? 'text-red-600' : 'text-slate-400'}`}><Radio size={18} className={isRecording ? 'animate-pulse' : ''} /></div>
                         <div className="text-left"><p className="font-bold text-slate-800 text-sm">{isRecording ? 'Stop Recording' : 'Record for Library'}</p><p className="text-[10px] font-black text-slate-400 uppercase">Personal study copy</p></div>
                      </div>
                      <ChevronRight size={18} className="text-slate-300" />
                   </button>
                   {isLecturer && (
                      <>
                        <button onClick={handleGlobalMute} className="w-full flex items-center justify-between p-5 bg-slate-50 rounded-2xl hover:bg-amber-50 transition-colors group">
                           <div className="flex items-center gap-4">
                              <div className={`p-3 bg-white rounded-xl shadow-sm ${isAllMuted ? 'text-amber-600' : 'text-slate-400'}`}><VolumeX size={18} /></div>
                              <div className="text-left"><p className="font-bold text-slate-800 text-sm">{isAllMuted ? 'Unmute All Students' : 'Mute All Students'}</p><p className="text-[10px] font-black text-slate-400 uppercase">Faculty Control</p></div>
                           </div>
                           <ChevronRight size={18} className="text-slate-300" />
                        </button>
                        <button onClick={handleGlobalCamOff} className="w-full flex items-center justify-between p-5 bg-slate-50 rounded-2xl hover:bg-slate-200 transition-colors group">
                           <div className="flex items-center gap-4">
                              <div className={`p-3 bg-white rounded-xl shadow-sm ${isAllCamsOff ? 'text-slate-900' : 'text-slate-400'}`}><CameraOff size={18} /></div>
                              <div className="text-left"><p className="font-bold text-slate-800 text-sm">{isAllCamsOff ? 'Allow All Cameras' : 'Disable All Cameras'}</p><p className="text-[10px] font-black text-slate-400 uppercase">Faculty Control</p></div>
                           </div>
                           <ChevronRight size={18} className="text-slate-300" />
                        </button>
                      </>
                   )}
                </div>
             </div>
          </div>
        )}
      </div>

      {/* SIDEBAR (Chat & Participants) */}
      {showChat && (
        <div className={`fixed md:relative inset-0 md:inset-auto md:w-[22rem] bg-slate-900 border-l border-white/5 flex flex-col z-[110] md:z-auto transition-transform duration-300 transform ${showChat ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}`}>
          <div className="h-16 px-2 shrink-0 flex items-center border-b border-white/5 bg-slate-900/50 backdrop-blur-xl">
             <button onClick={() => setActiveSidebarTab('chat')} className={`flex-1 py-2 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all ${activeSidebarTab === 'chat' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-slate-500'}`}><MessageCircle size={16}/> Discussions</button>
             <button onClick={() => setActiveSidebarTab('participants')} className={`flex-1 py-2 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all ${activeSidebarTab === 'participants' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-slate-500'}`}><Users size={16}/> Students ({participants.length})</button>
             <button onClick={() => setShowChat(false)} className="md:hidden px-4 text-slate-500"><X size={20}/></button>
          </div>

          <div className="flex-1 overflow-hidden flex flex-col">
            {activeSidebarTab === 'chat' ? (
              <div className="flex-1 flex flex-col">
                <div className="flex-1 p-6 space-y-6 overflow-y-auto custom-scrollbar bg-slate-950/20">
                  {messages.map((m, i) => (
                    <div key={i} className={`flex flex-col ${m.user === user.name ? 'items-end' : 'items-start'}`}>
                      <span className={`text-[9px] font-black uppercase tracking-widest mb-1 ${m.role === 'LECTURER' ? 'text-blue-400' : 'text-slate-500'}`}>{m.user}</span>
                      <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${m.user === user.name ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-slate-800 text-slate-200 rounded-tl-none border border-white/5'}`}>{m.text}</div>
                    </div>
                  ))}
                </div>
                <div className="p-6 bg-slate-900/50 border-t border-white/5 pb-12 md:pb-6">
                  <form onSubmit={handleSendComment} className="relative">
                    <input type="text" value={comment} onChange={e => setComment(e.target.value)} placeholder="Ask a question..." className="w-full pl-5 pr-12 py-4 bg-slate-800 border border-white/5 rounded-[1.5rem] text-white text-sm outline-none" />
                    <button type="submit" disabled={!comment.trim()} className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center disabled:opacity-50"><Send size={18} /></button>
                  </form>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col">
                <div className="p-4 border-b border-white/5 flex items-center justify-between">
                   <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Roster</h4>
                   {isLecturer && (
                     <button onClick={handleGlobalMute} className="text-[10px] font-black text-blue-500 uppercase hover:underline">Mute All</button>
                   )}
                </div>
                <div className="flex-1 p-4 space-y-3 overflow-y-auto custom-scrollbar">
                  {sortedParticipants.map(p => (
                    <div key={p.id} className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${p.id === spotlightId ? 'bg-blue-600/10 border-blue-500/50' : 'bg-slate-800/50 border-white/5'}`}>
                       <div className="flex items-center gap-3">
                          <div className="relative">
                            <img src={`https://ui-avatars.com/api/?name=${p.name}&background=random&color=fff`} className="w-10 h-10 rounded-xl" alt={p.name} />
                            {p.id === spotlightId && <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-slate-900 flex items-center justify-center"><Volume2 size={8} className="text-white"/></div>}
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-white text-xs truncate">{p.name}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className={`text-[8px] font-black px-1.5 py-0.5 rounded uppercase ${p.role === UserRole.LECTURER ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-700 text-slate-400'}`}>{p.role}</span>
                              {p.isRaisingHand && <span className="flex items-center gap-1 text-[8px] font-black text-amber-500 uppercase"><Hand size={8}/> Raised</span>}
                            </div>
                          </div>
                       </div>
                       
                       <div className="flex items-center gap-1">
                          {isLecturer && p.role === UserRole.STUDENT && (
                            <button 
                              onClick={() => handleSpotlight(p.id)}
                              className={`p-2 rounded-lg transition-colors ${p.id === spotlightId ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-white hover:bg-white/10'}`}
                              title="Spotlight Speaker"
                            >
                              <Play size={14} fill={p.id === spotlightId ? "currentColor" : "none"} />
                            </button>
                          )}
                          <div className="flex items-center gap-1 opacity-50 px-2">
                             {p.isMuted ? <MicOff size={12} className="text-red-500"/> : <Mic size={12} className="text-green-500"/>}
                             {p.isCamOff ? <CameraOff size={12} className="text-slate-500"/> : <Camera size={12} className="text-slate-300"/>}
                          </div>
                       </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes float-up {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(-500px); opacity: 0; }
        }
        .animate-float-up {
          animation: float-up 3s ease-out forwards;
        }
        .animate-bounce-short {
          animation: bounce 0.5s infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
};

export default LiveClassView;
