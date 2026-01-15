
import React from 'react';
import { LIVE_CLASSES } from '../../mockData';
import { Calendar as CalendarIcon, Clock, MapPin, Video, ArrowRight } from 'lucide-react';

interface ScheduleProps {
  onJoinLive?: () => void;
}

const Schedule: React.FC<ScheduleProps> = ({ onJoinLive }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
          <CalendarIcon className="text-blue-500" />
          Weekly Timetable
        </h2>

        <div className="space-y-6">
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
            <div key={day} className="flex gap-6 group">
              <div className="w-24 pt-2">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest group-hover:text-blue-600 transition-colors">{day}</span>
              </div>
              <div className="flex-1 space-y-4 pb-6 border-l border-slate-100 pl-6 relative">
                <div className="absolute top-3 -left-[5px] w-2 h-2 rounded-full bg-slate-200 group-hover:bg-blue-500 transition-colors"></div>
                
                {day === 'Monday' && (
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-200 transition-all cursor-default">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-bold text-slate-800">CSC 201: Algorithms</h4>
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">200L</span>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex flex-wrap gap-6 text-sm text-slate-500">
                        <div className="flex items-center gap-2">
                          <Clock size={16} />
                          08:00 AM - 10:00 AM
                        </div>
                        <div className="flex items-center gap-2 text-blue-600 font-bold">
                          <Video size={16} />
                          Virtual (Live Class)
                        </div>
                      </div>
                      
                      <button 
                        onClick={onJoinLive}
                        className="flex items-center justify-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-900 transition-all shadow-lg shadow-blue-200"
                      >
                        Join Now
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                )}

                {day === 'Tuesday' && (
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-200 transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-bold text-slate-800">MTH 101: Mathematics</h4>
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">100L</span>
                    </div>
                    <div className="flex flex-wrap gap-6 text-sm text-slate-500">
                      <div className="flex items-center gap-2">
                        <Clock size={16} />
                        12:00 PM - 02:00 PM
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        Faculty Hall B
                      </div>
                    </div>
                  </div>
                )}
                
                {!['Monday', 'Tuesday'].includes(day) && (
                  <p className="text-sm text-slate-400 italic pt-2">No classes scheduled.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Schedule;
