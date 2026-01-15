
import React, { useState } from 'react';
import { CreditCard, DollarSign, Download, ArrowUpRight, History, ShieldCheck, Wallet, ChevronRight, CheckCircle2 } from 'lucide-react';

const TRANSACTIONS = [
  { id: 't1', title: '1st Semester Tuition', date: 'Jan 12, 2025', amount: '$4,200.00', status: 'Paid', type: 'Tuition' },
  { id: 't2', title: 'Hostel Accommodation', date: 'Jan 14, 2025', amount: '$850.00', status: 'Paid', type: 'Service' },
  { id: 't3', title: 'Lab Materials Fee', date: 'Jan 20, 2025', amount: '$120.00', status: 'Pending', type: 'Lab' },
  { id: 't4', title: 'Student Union Dues', date: 'Feb 02, 2025', amount: '$50.00', status: 'Failed', type: 'Dues' },
];

const Fees: React.FC = () => {
  const [showPayment, setShowPayment] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Balance Card */}
        <div className="bg-blue-600 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-blue-200 relative overflow-hidden flex flex-col justify-between">
          <div className="relative z-10">
            <p className="text-blue-100/60 text-xs font-black uppercase tracking-widest mb-2">Outstanding Balance</p>
            <h2 className="text-5xl font-black">$120.00</h2>
          </div>
          <div className="relative z-10 pt-10 flex gap-4">
             <button 
              onClick={() => setShowPayment(true)}
              className="flex-1 py-4 bg-white text-blue-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-colors shadow-xl"
             >
                Pay Now
             </button>
             <button className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center hover:bg-white/20 transition-all">
                <Wallet size={24} />
             </button>
          </div>
          <DollarSign className="absolute -right-6 -bottom-6 text-white/10" size={180} />
        </div>

        {/* Info Card */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm flex flex-col justify-between">
           <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                    <ShieldCheck size={20} />
                 </div>
                 <p className="font-bold text-slate-800 text-sm">Merit Scholarship Applied</p>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">Your account reflects a 20% academic excellence discount for the 2025 session.</p>
           </div>
           <button className="w-full mt-6 py-4 bg-slate-50 text-slate-600 rounded-2xl font-black text-[10px] uppercase tracking-widest border border-slate-100 hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
              <Download size={16} /> Download 2025 Invoice
           </button>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex items-center justify-between">
           <h3 className="font-black text-slate-900 flex items-center gap-3 uppercase tracking-widest text-xs">
            <History size={18} className="text-blue-600" />
            Transaction History
           </h3>
           <button className="text-[10px] font-black text-blue-600 uppercase hover:underline">View All</button>
        </div>
        <div className="divide-y divide-slate-50">
          {TRANSACTIONS.map(tx => (
            <div key={tx.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
               <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    tx.status === 'Paid' ? 'bg-emerald-50 text-emerald-600' : tx.status === 'Failed' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
                  }`}>
                    <ArrowUpRight size={20} className={tx.status === 'Paid' ? '' : 'rotate-90'} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{tx.title}</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase">{tx.date} • {tx.type}</p>
                  </div>
               </div>
               <div className="text-right">
                  <p className="font-black text-slate-900 text-sm">{tx.amount}</p>
                  <p className={`text-[10px] font-black uppercase ${
                    tx.status === 'Paid' ? 'text-emerald-500' : tx.status === 'Failed' ? 'text-red-500' : 'text-amber-500'
                  }`}>{tx.status}</p>
               </div>
            </div>
          ))}
        </div>
      </div>

      {showPayment && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[150] flex items-center justify-center p-6">
           <div className="bg-white rounded-[3rem] max-w-md w-full p-10 shadow-2xl animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                 <CreditCard size={32} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">Institutional Payment</h3>
              <p className="text-slate-500 mb-8 font-medium">You are about to pay <span className="text-slate-900 font-black">$120.00</span> for Lab Materials Fee via the secure university gateway.</p>
              
              <div className="space-y-4 mb-10">
                 <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4" alt="Visa" />
                       <span className="text-sm font-bold text-slate-700">Visa •••• 4242</span>
                    </div>
                    <ChevronRight size={16} className="text-slate-300" />
                 </div>
              </div>

              <div className="flex gap-4">
                 <button onClick={() => setShowPayment(false)} className="flex-1 py-4 text-slate-500 font-bold hover:bg-slate-50 rounded-2xl transition-all">Cancel</button>
                 <button className="flex-1 py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-200">Confirm Pay</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Fees;
