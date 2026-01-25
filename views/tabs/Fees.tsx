
import React, { useState, useMemo } from 'react';
import { 
  CreditCard, 
  History, 
  ShieldCheck, 
  Printer, 
  Search, 
  AlertCircle, 
  X, 
  BadgeCheck, 
  Building2, 
  Sparkles, 
  CalendarDays, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight, 
  Receipt, 
  DownloadCloud, 
  Banknote,
  ChevronDown
} from 'lucide-react';

interface PaymentItem {
  id: string;
  title: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Failed';
  date?: string;
  category: string;
  receiptNo?: string;
  type: 'INSTITUTIONAL' | 'HUB';
  session: string;
  semester: '1st' | '2nd';
}

const ALL_PAYMENTS: PaymentItem[] = [
  // Institutional Fees (Updated to strictly 1st or 2nd)
  { id: 'f10', title: 'School fees receipt', amount: 45000, status: 'Paid', date: 'Oct 12, 2024', category: 'Tuition', receiptNo: 'FUL-REC-2024-001', type: 'INSTITUTIONAL', session: '2024/2025', semester: '1st' },
  { id: 'f11', title: 'Acceptance payment', amount: 15000, status: 'Paid', date: 'Sept 14, 2024', category: 'Admission', receiptNo: 'FUL-REC-2024-002', type: 'INSTITUTIONAL', session: '2024/2025', semester: '1st' },
  { id: 'f12', title: 'Faculty Charges', amount: 5000, status: 'Paid', date: 'Oct 15, 2024', category: 'Faculty', receiptNo: 'FUL-REC-2024-003', type: 'INSTITUTIONAL', session: '2024/2025', semester: '1st' },
  { id: 'f13', title: 'Departmental payment', amount: 3500, status: 'Pending', category: 'Department', type: 'INSTITUTIONAL', session: '2024/2025', semester: '1st' },
  { id: 'f14', title: 'E-learning', amount: 10000, status: 'Paid', date: 'Oct 15, 2024', category: 'Portal', receiptNo: 'FUL-REC-2024-004', type: 'INSTITUTIONAL', session: '2024/2025', semester: '1st' },
  { id: 'f15', title: 'Online Examination', amount: 2500, status: 'Pending', category: 'Portal', type: 'INSTITUTIONAL', session: '2024/2025', semester: '1st' },
  { id: 'f16', title: 'Portal Charge', amount: 5000, status: 'Paid', date: 'Oct 15, 2024', category: 'Portal', receiptNo: 'FUL-REC-2024-005', type: 'INSTITUTIONAL', session: '2024/2025', semester: '1st' },
  { id: 'f17', title: 'Accreditation levy', amount: 2000, status: 'Pending', category: 'Institutional', type: 'INSTITUTIONAL', session: '2024/2025', semester: '1st' },
  { id: 'f18', title: 'NUGA', amount: 1500, status: 'Paid', date: 'Oct 16, 2024', category: 'Sports', receiptNo: 'FUL-REC-2024-006', type: 'INSTITUTIONAL', session: '2024/2025', semester: '1st' },
  { id: 'f19', title: 'SUG levy', amount: 1000, status: 'Pending', category: 'Union', type: 'INSTITUTIONAL', session: '2024/2025', semester: '1st' },
  { id: 'f20', title: 'GST', amount: 3000, status: 'Paid', date: 'Oct 20, 2024', category: 'Academic', receiptNo: 'FUL-REC-2024-007', type: 'INSTITUTIONAL', session: '2024/2025', semester: '1st' },
  { id: 'f21', title: 'TISHIP', amount: 2000, status: 'Pending', category: 'Health', type: 'INSTITUTIONAL', session: '2024/2025', semester: '1st' },
  { id: 'f22', title: 'Environmental Management', amount: 1500, status: 'Pending', category: 'Campus', type: 'INSTITUTIONAL', session: '2024/2025', semester: '1st' },
  { id: 'f23', title: 'Faculty Association Fee', amount: 2000, status: 'Pending', category: 'Association', type: 'INSTITUTIONAL', session: '2024/2025', semester: '1st' },
  { id: 'f25', title: 'MIS', amount: 5000, status: 'Paid', date: 'Oct 21, 2024', category: 'Portal', receiptNo: 'FUL-REC-2024-008', type: 'INSTITUTIONAL', session: '2024/2025', semester: '1st' },
  { id: 'f26', title: 'Matriculation fees', amount: 5000, status: 'Paid', date: 'Nov 05, 2024', category: 'Institutional', receiptNo: 'FUL-REC-2024-009', type: 'INSTITUTIONAL', session: '2024/2025', semester: '1st' },
  { id: 'f28', title: 'Library', amount: 2000, status: 'Pending', category: 'Academic', type: 'INSTITUTIONAL', session: '2024/2025', semester: '1st' },
  
  // 2nd Semester items
  { id: 'f30', title: 'Second Semester Examination', amount: 2500, status: 'Pending', category: 'Portal', type: 'INSTITUTIONAL', session: '2024/2025', semester: '2nd' },
  { id: 'f31', title: 'Departmental Dues', amount: 2000, status: 'Pending', category: 'Department', type: 'INSTITUTIONAL', session: '2024/2025', semester: '2nd' },

  // Student Hub Payments
  { id: 'h1', title: 'Hostel Accommodation (Main Campus)', amount: 45000, status: 'Paid', date: 'Sept 20, 2024', category: 'Housing', receiptNo: 'HUB-REC-24-001', type: 'HUB', session: '2024/2025', semester: '1st' },
  { id: 'h2', title: 'Medical Certificate Verification', amount: 5000, status: 'Pending', category: 'Health', type: 'HUB', session: '2024/2025', semester: '1st' },
  { id: 'h3', title: 'Transcript Processing (International)', amount: 25000, status: 'Pending', category: 'Records', type: 'HUB', session: '2024/2025', semester: '1st' },
  { id: 'h4', title: 'Student ID Replacement', amount: 2500, status: 'Pending', category: 'Service', type: 'HUB', session: '2024/2025', semester: '2nd' },
  { id: 'h5', title: 'Post-UTME Screening Fee', amount: 2000, status: 'Paid', date: 'July 10, 2024', category: 'Admission', receiptNo: 'HUB-REC-24-002', type: 'HUB', session: '2024/2025', semester: '1st' },
];

const SESSIONS = ['2023/2024', '2024/2025'];
const SEMESTERS = ['1st', '2nd'];

const Fees: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'INSTITUTIONAL' | 'HUB'>('INSTITUTIONAL');
  const [selectedSession, setSelectedSession] = useState('2024/2025');
  const [selectedSemester, setSelectedSemester] = useState('1st');
  const [searchQuery, setSearchQuery] = useState('');
  const [showReceipt, setShowReceipt] = useState<PaymentItem | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<PaymentItem | null>(null);
  const [filterStatus, setFilterStatus] = useState<'All' | 'Paid' | 'Pending'>('All');

  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const filteredItems = useMemo(() => {
    return ALL_PAYMENTS.filter(p => {
      const matchType = p.type === activeTab;
      const matchSession = p.session === selectedSession;
      const matchSemester = p.semester === selectedSemester;
      const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = filterStatus === 'All' || p.status === filterStatus;
      return matchType && matchSession && matchSemester && matchSearch && matchStatus;
    });
  }, [activeTab, selectedSession, selectedSemester, searchQuery, filterStatus]);

  const stats = useMemo(() => {
    const relevant = ALL_PAYMENTS.filter(p => p.session === selectedSession && p.semester === selectedSemester);
    return {
      outstanding: relevant.filter(p => p.status === 'Pending').reduce((a, b) => a + b.amount, 0),
      paid: relevant.filter(p => p.status === 'Paid').reduce((a, b) => a + b.amount, 0),
    };
  }, [selectedSession, selectedSemester]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 md:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-32 px-4 md:px-0">
      
      {/* 1. Dashboard Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900 rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[220px] md:min-h-[260px]">
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-white/40 mb-3">
              <Banknote size={14} className="md:w-4 md:h-4" />
              <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em]">Semester Balance Due</p>
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-4">
              {formatNaira(stats.outstanding)}
            </h2>
            <div className="flex flex-wrap gap-2 md:gap-4">
              <div className="px-3 md:px-5 py-2 md:py-2.5 bg-emerald-500/10 backdrop-blur-md rounded-xl md:rounded-2xl border border-emerald-500/20 flex items-center gap-2 md:gap-3">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                 <div>
                    <p className="text-[7px] md:text-[8px] font-black text-emerald-400 uppercase tracking-widest leading-none mb-0.5">Paid This Term</p>
                    <p className="text-xs md:text-sm font-black">{formatNaira(stats.paid)}</p>
                 </div>
              </div>
              <div className="px-3 md:px-5 py-2 md:py-2.5 bg-white/5 backdrop-blur-md rounded-xl md:rounded-2xl border border-white/10 flex items-center gap-2 md:gap-3">
                 <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                 <div>
                    <p className="text-[7px] md:text-[8px] font-black text-white/40 uppercase tracking-widest leading-none mb-0.5">Selected Term</p>
                    <p className="text-xs md:text-sm font-black">{selectedSemester} Sem • {selectedSession}</p>
                 </div>
              </div>
            </div>
          </div>
          
          <div className="relative z-10 pt-6 flex flex-wrap gap-4 items-center">
            <button 
              onClick={() => { setSelectedPayment(filteredItems.find(p => p.status === 'Pending') || null); setShowPaymentModal(true); }}
              className="w-full sm:w-auto px-6 md:px-8 py-3.5 bg-white text-slate-900 rounded-xl font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] shadow-2xl hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-3 group"
            >
              Pay Outstanding <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
          <div className="absolute -right-24 -bottom-24 w-64 md:w-96 h-64 md:h-96 bg-blue-600/20 rounded-full blur-[80px] md:blur-[120px]"></div>
        </div>

        <div className="bg-white rounded-[2rem] md:rounded-[3rem] border border-slate-100 p-6 md:p-8 shadow-sm flex flex-col justify-between">
           <div>
              <h3 className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2 mb-6">
                <History size={14} /> Quick History
              </h3>
              <div className="space-y-3 overflow-y-auto max-h-[120px] custom-scrollbar pr-1">
                {ALL_PAYMENTS.filter(p => p.status === 'Paid').slice(0, 3).map(rec => (
                  <button 
                    key={rec.id} 
                    onClick={() => setShowReceipt(rec)}
                    className="w-full flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl hover:bg-white transition-all group"
                  >
                    <div className="flex items-center gap-3 truncate">
                       <Receipt size={14} className="text-slate-400 group-hover:text-blue-600 shrink-0" />
                       <p className="text-xs font-black text-slate-800 truncate">{rec.title}</p>
                    </div>
                    <ChevronDown size={14} className="-rotate-90 text-slate-200" />
                  </button>
                ))}
              </div>
           </div>
           <div className="mt-6 pt-6 border-t border-slate-50">
              <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Payment Help</p>
              <p className="text-[10px] font-medium text-slate-500">Need an RRR code? Select a fee item to generate one.</p>
           </div>
        </div>
      </div>

      {/* 2. Responsively Aligned Toolbar */}
      <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] border border-slate-100 p-4 shadow-sm space-y-4 md:space-y-6">
        {/* Category Tabs */}
        <div className="flex bg-slate-100 p-1 rounded-2xl md:w-fit">
           <button 
            onClick={() => setActiveTab('INSTITUTIONAL')}
            className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${activeTab === 'INSTITUTIONAL' ? 'bg-white text-slate-900 shadow-md ring-1 ring-slate-200' : 'text-slate-400'}`}
           >
              <Building2 size={14} /> Institutional
           </button>
           <button 
            onClick={() => setActiveTab('HUB')}
            className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${activeTab === 'HUB' ? 'bg-white text-slate-900 shadow-md ring-1 ring-slate-200' : 'text-slate-400'}`}
           >
              <Sparkles size={14} /> Student Hub
           </button>
        </div>

        {/* Filters Group */}
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
           {/* Session & Semester (Responsible Alignment) */}
           <div className="flex flex-col sm:flex-row gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-100">
              <div className="flex-1 flex flex-col gap-1">
                 <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest ml-1">Session</span>
                 <select 
                    value={selectedSession} 
                    onChange={(e) => setSelectedSession(e.target.value)}
                    className="w-full sm:w-40 px-3 py-2 bg-white border border-slate-200 rounded-lg text-[10px] font-black uppercase tracking-widest outline-none focus:ring-2 focus:ring-blue-500/20"
                 >
                    {SESSIONS.map(s => <option key={s} value={s}>{s}</option>)}
                 </select>
              </div>
              <div className="flex-1 flex flex-col gap-1">
                 <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest ml-1">Semester</span>
                 <select 
                    value={selectedSemester} 
                    onChange={(e) => setSelectedSemester(e.target.value as any)}
                    className="w-full sm:w-40 px-3 py-2 bg-white border border-slate-200 rounded-lg text-[10px] font-black uppercase tracking-widest outline-none focus:ring-2 focus:ring-blue-500/20"
                 >
                    {SEMESTERS.map(sem => <option key={sem} value={sem}>{sem} Semester</option>)}
                 </select>
              </div>
           </div>

           {/* Search & Status Filters */}
           <div className="flex flex-col sm:flex-row gap-3 lg:flex-1 lg:justify-end items-stretch sm:items-end">
              <div className="relative flex-1 lg:max-w-xs">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                 <input 
                    type="text" 
                    placeholder="Search records..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-[10px] md:text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500/20"
                 />
              </div>
              <div className="flex bg-slate-100 p-1 rounded-xl h-fit">
                 {(['All', 'Paid', 'Pending'] as const).map(s => (
                    <button 
                       key={s} 
                       onClick={() => setFilterStatus(s)}
                       className={`px-4 py-2 rounded-lg text-[8px] md:text-[9px] font-black uppercase tracking-tighter transition-all ${filterStatus === s ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}
                    >
                       {s}
                    </button>
                 ))}
              </div>
           </div>
        </div>
      </div>

      {/* 3. Payment Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredItems.map((item) => (
          <div 
            key={item.id} 
            className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group flex flex-col overflow-hidden"
          >
            <div className={`h-1.5 ${item.status === 'Paid' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
            <div className="p-6 md:p-8 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                 <div className="p-2.5 bg-slate-50 rounded-xl text-slate-400 group-hover:text-blue-600 transition-colors">
                   {item.type === 'INSTITUTIONAL' ? <Building2 size={18}/> : <Sparkles size={18}/>}
                 </div>
                 <div className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-[0.15em] flex items-center gap-1.5 border ${item.status === 'Paid' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${item.status === 'Paid' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                    {item.status}
                 </div>
              </div>
              
              <div className="flex-1">
                 <h4 className="text-lg font-black text-slate-900 leading-tight mb-2 group-hover:text-blue-600 transition-colors">{item.title}</h4>
                 <div className="flex flex-wrap items-center gap-2 mb-6">
                    <span className="text-[8px] font-black text-slate-400 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded uppercase">{item.category}</span>
                    <span className="text-[8px] font-bold text-slate-300 uppercase flex items-center gap-1">
                       <CalendarDays size={12}/> {item.semester} Sem.
                    </span>
                    {item.date && (
                      <span className="text-[8px] font-bold text-emerald-600 uppercase flex items-center gap-1">
                        <CheckCircle2 size={12}/> {item.date}
                      </span>
                    )}
                 </div>
              </div>

              <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                 <div>
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">Amount</p>
                    <p className="text-base md:text-xl font-black text-slate-900 tracking-tight">{formatNaira(item.amount)}</p>
                 </div>
                 {item.status === 'Paid' ? (
                   <button 
                    onClick={() => setShowReceipt(item)}
                    className="p-3 md:p-4 bg-slate-900 text-white rounded-xl md:rounded-2xl hover:bg-blue-600 transition-all shadow-lg flex items-center justify-center gap-2 group/btn"
                   >
                      <Printer size={16} />
                   </button>
                 ) : (
                   <button 
                    onClick={() => { setSelectedPayment(item); setShowPaymentModal(true); }}
                    className="px-6 md:px-8 py-3 bg-blue-600 text-white rounded-xl text-[8px] md:text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl"
                   >
                      Settle
                   </button>
                 )}
              </div>
            </div>
          </div>
        ))}

        {filteredItems.length === 0 && (
          <div className="col-span-full py-16 text-center bg-white rounded-[2rem] border border-slate-100 border-dashed">
             <AlertCircle size={40} className="mx-auto text-slate-100 mb-4" />
             <h4 className="text-slate-400 font-black uppercase tracking-widest text-xs">No Records Found</h4>
             <p className="text-slate-300 text-[9px] mt-1 uppercase">No records match your selected filters</p>
          </div>
        )}
      </div>

      {/* 4. Receipt Modal */}
      {showReceipt && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl z-[200] flex items-center justify-center p-4 animate-in fade-in duration-300">
           <div className="bg-white rounded-[2rem] md:rounded-[3rem] w-full max-w-2xl shadow-2xl relative flex flex-col max-h-[95vh] overflow-hidden no-print-bg">
              <div id="receipt-print-area" className="flex-1 overflow-y-auto p-8 md:p-14 print:p-0">
                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 border-b border-slate-100 pb-8">
                    <div className="flex items-center gap-4">
                       <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center shrink-0">
                          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Federal_University_Lafia_logo.png/220px-Federal_University_Lafia_logo.png" className="w-10 h-10 object-contain" alt="FUL" />
                       </div>
                       <div>
                          <h2 className="text-xl md:text-2xl font-black text-slate-900">University of Lafia</h2>
                          <p className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">Electronic Receipt</p>
                       </div>
                    </div>
                    <div className="text-left md:text-right">
                       <p className="text-[8px] font-black text-slate-300 uppercase mb-1">Receipt ID</p>
                       <p className="text-lg font-black text-slate-900 font-mono truncate">{showReceipt.receiptNo}</p>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-12 mb-10">
                    <div>
                       <p className="text-[8px] font-black text-slate-400 uppercase mb-1.5">Student Name</p>
                       <p className="text-sm md:text-base font-black text-slate-900">Alex Student</p>
                    </div>
                    <div>
                       <p className="text-[8px] font-black text-slate-400 uppercase mb-1.5">Matric No.</p>
                       <p className="text-sm md:text-base font-black text-slate-900">FUL/SCI/22/1004</p>
                    </div>
                    <div>
                       <p className="text-[8px] font-black text-slate-400 uppercase mb-1.5">Academic Session</p>
                       <p className="text-sm md:text-base font-black text-slate-900">{showReceipt.session} • {showReceipt.semester} Sem.</p>
                    </div>
                    <div>
                       <p className="text-[8px] font-black text-slate-400 uppercase mb-1.5">Date Paid</p>
                       <p className="text-sm md:text-base font-black text-slate-900">{showReceipt.date}</p>
                    </div>
                 </div>

                 <div className="bg-slate-50 rounded-2xl md:rounded-[3rem] p-6 md:p-10 mb-10 border border-slate-100">
                    <div className="flex items-center justify-between mb-6 border-b border-slate-200 pb-6">
                       <p className="text-[10px] font-black text-slate-900 uppercase">Item Description</p>
                       <span className="text-[8px] md:text-[10px] font-black text-blue-600 bg-white border border-blue-500/10 px-3 py-1 rounded-full uppercase shrink-0">{showReceipt.category}</span>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                       <span className="text-slate-500 font-bold text-sm md:text-lg">{showReceipt.title}</span>
                       <span className="font-black text-slate-900 text-sm md:text-lg">{formatNaira(showReceipt.amount)}</span>
                    </div>
                    <div className="mt-8 pt-8 border-t-2 border-dashed border-slate-200 flex items-center justify-between">
                       <span className="text-lg font-black text-slate-900">Total</span>
                       <span className="text-2xl md:text-4xl font-black text-emerald-600">{formatNaira(showReceipt.amount)}</span>
                    </div>
                 </div>

                 <div className="flex flex-col items-center justify-center text-center space-y-4">
                    <div className="flex items-center gap-2 text-emerald-600 font-black text-[10px] md:text-sm uppercase bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
                       <BadgeCheck size={20} /> Payment Verified
                    </div>
                    <p className="text-[9px] md:text-xs text-slate-400 italic">Valid for physical bursary clearance.</p>
                 </div>
              </div>

              <div className="p-6 md:p-10 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row gap-3 no-print">
                 <button onClick={() => setShowReceipt(null)} className="w-full sm:flex-1 py-3 text-slate-500 font-black text-[9px] uppercase hover:bg-white rounded-xl transition-all">Close</button>
                 <button onClick={handlePrint} className="w-full sm:flex-[2] py-3 bg-slate-900 text-white rounded-xl font-black text-[9px] uppercase shadow-xl hover:bg-blue-600 transition-all flex items-center justify-center gap-2"><Printer size={16} /> Print</button>
                 <button className="hidden sm:flex w-full sm:flex-1 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl font-black text-[9px] uppercase hover:bg-slate-100 items-center justify-center gap-2"><DownloadCloud size={16} /> PDF</button>
              </div>
           </div>
        </div>
      )}

      {/* 5. Checkout Modal */}
      {showPaymentModal && selectedPayment && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-[200] flex items-center justify-center p-4">
           <div className="bg-white rounded-[2.5rem] md:rounded-[4rem] max-w-md w-full p-8 md:p-12 shadow-2xl animate-in zoom-in-95 duration-300 relative overflow-hidden">
              <button onClick={() => setShowPaymentModal(false)} className="absolute top-6 right-6 text-slate-300 hover:text-slate-900 transition-colors"><X size={24} /></button>
              <div className="w-16 h-16 md:w-24 md:h-24 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-2xl shadow-blue-500/30"><CreditCard size={32} /></div>
              <h3 className="text-2xl md:text-4xl font-black text-slate-900 mb-2 tracking-tighter">Checkout</h3>
              <p className="text-[12px] text-slate-500 mb-8 font-medium">Paying for <span className="text-slate-900 font-black">{selectedPayment.title}</span>. Total: <span className="text-blue-600 font-black">{formatNaira(selectedPayment.amount)}</span>.</p>
              
              <div className="space-y-3 mb-8">
                 <div className="p-4 bg-slate-50 rounded-2xl border-2 border-slate-100 flex items-center justify-between group hover:border-blue-600 hover:bg-white transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                       <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-50"><img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-3" alt="Visa" /></div>
                       <span className="text-xs font-black text-slate-800">Visa •••• 4242</span>
                    </div>
                    <div className="w-5 h-5 rounded-full border-2 border-slate-200 group-hover:bg-blue-600 transition-all"></div>
                 </div>
                 <div className="p-4 bg-slate-50 rounded-2xl border-2 border-slate-100 flex items-center justify-between group hover:border-blue-600 hover:bg-white transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                       <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-50"><img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-5" alt="Mastercard" /></div>
                       <span className="text-xs font-black text-slate-800">Mastercard •••• 1092</span>
                    </div>
                    <div className="w-5 h-5 rounded-full border-2 border-slate-200 group-hover:bg-blue-600 transition-all"></div>
                 </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                 <button onClick={() => setShowPaymentModal(false)} className="w-full sm:flex-1 py-4 text-slate-500 font-black text-[9px] uppercase hover:bg-slate-50 rounded-xl transition-all">Cancel</button>
                 <button className="w-full sm:flex-[2] py-4 bg-slate-900 text-white font-black text-[9px] uppercase rounded-xl hover:bg-blue-600 transition-all shadow-2xl">Confirm Payment</button>
              </div>
           </div>
        </div>
      )}

      <style>{`
        @media print {
          body * { visibility: hidden; background: white !important; color: black !important; }
          #receipt-print-area, #receipt-print-area * { visibility: visible; }
          #receipt-print-area { position: absolute; left: 0; top: 0; width: 100%; margin: 0; padding: 2cm !important; border: none !important; box-shadow: none !important; }
          .no-print { display: none !important; }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default Fees;
