
import React, { useState } from 'react';
import { Calendar, Clock, Plus, Monitor, MapPin, MoreVertical, X } from 'lucide-react';

const ManageSchedule: React.FC = () => {
  const [slots, setSlots] = useState([
    { day: 'Monday', time: '08:00 - 10:00', type: 'VIRTUAL', course: 'CSC 201' },
    { day: 'Wednesday', time: '14:00 - 16:00', type: 'PHYSICAL', course: 'CSC 301' },
  ]);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-black text-slate-900">Lecture Timetable</h3>
          <p className="text-slate-500 font-medium">Coordinate your weekly sessions and office hours.</p>
        </div>
        <div className="flex gap-3">
           <button className="px-6 py-3 border-2 border-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-all">Download PDF</button>
           <button className="px-8 py-3 bg-slate-900 text-white rounded-2xl font-bold shadow-xl shadow-slate-200 hover:bg-blue-600 transition-all flex items-center gap-2">
            <Plus size={18} /> New Slot
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-7 gap-4">
        {days.map(day => (
          <div key={day} className="space-y-4">
            <div className="text-center py-4 bg-slate-900 rounded-2xl text-white text-xs font-black uppercase tracking-widest shadow-lg">
              {day}
            </div>
            <div className="min-h-[400px] space-y-3">
              {slots.filter(s => s.day === day).map((slot, i) => (
                <div key={i} className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm relative group">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[8px] font-black px-2 py-0.5 rounded-md ${slot.type === 'VIRTUAL' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'}`}>
                      {slot.type}
                    </span>
                    <button className="text-slate-300 hover:text-slate-900"><MoreVertical size={14}/></button>
                  </div>
                  <h5 className="font-bold text-slate-800 text-sm">{slot.course}</h5>
                  <p className="text-[10px] text-slate-400 font-medium mt-1 flex items-center gap-1">
                    <Clock size={10} /> {slot.time}
                  </p>
                </div>
              ))}
              <button className="w-full py-8 border-2 border-dashed border-slate-100 rounded-2xl text-slate-300 flex items-center justify-center hover:border-blue-200 hover:text-blue-400 transition-all">
                <Plus size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageSchedule;
