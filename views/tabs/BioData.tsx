
import React, { useState } from 'react';
import { UserProfile } from '../../types';
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  Users, 
  HeartPulse, 
  ShieldCheck, 
  Globe,
  Contact,
  Edit3,
  Save,
  X,
  Loader2,
  CheckCircle2
} from 'lucide-react';

interface BioDataProps {
  user: UserProfile;
  onUpdate?: (user: UserProfile) => void;
}

const BioData: React.FC<BioDataProps> = ({ user, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<UserProfile>({ ...user });

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API delay
    setTimeout(() => {
      onUpdate?.(formData);
      setIsSaving(false);
      setIsEditing(false);
    }, 1200);
  };

  const handleDiscard = () => {
    setFormData({ ...user });
    setIsEditing(false);
  };

  const updateField = (key: keyof UserProfile, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const updateNOKField = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      nextOfKin: {
        ...(prev.nextOfKin || { name: '', relationship: '', phone: '' }),
        [key]: value
      }
    }));
  };

  // Field sub-component adaptive to editing state
  const BioField = ({ 
    label, 
    value, 
    id,
    icon: Icon, 
    type = "text", 
    options,
    isNOK = false
  }: { 
    label: string, 
    value?: string, 
    id: string,
    icon?: any, 
    type?: string,
    options?: string[],
    isNOK?: boolean
  }) => (
    <div className="space-y-1.5 w-full">
      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide ml-1">{label}</p>
      <div className={`w-full px-4 py-3.5 rounded-xl flex items-center gap-3 transition-all ${
        isEditing ? 'bg-white border-2 border-blue-100 shadow-inner' : 'bg-slate-50 border border-slate-100'
      }`}>
        {Icon && <Icon size={16} className={`${isEditing ? 'text-blue-400' : 'text-slate-300'} shrink-0`} />}
        
        {!isEditing ? (
          <p className="text-sm font-black text-slate-700 truncate">{value || 'Not Provided'}</p>
        ) : (
          type === 'select' ? (
            <select 
              value={value || ''}
              onChange={(e) => isNOK ? updateNOKField(id, e.target.value) : updateField(id as any, e.target.value)}
              className="w-full bg-transparent text-sm font-black text-slate-700 outline-none cursor-pointer"
            >
              <option value="" disabled>Select {label}</option>
              {options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          ) : (
            <input 
              type={type}
              value={value || ''}
              onChange={(e) => isNOK ? updateNOKField(id, e.target.value) : updateField(id as any, e.target.value)}
              placeholder={`Enter ${label}`}
              className="w-full bg-transparent text-sm font-black text-slate-700 outline-none placeholder:text-slate-300"
            />
          )
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto pb-12 animate-in fade-in duration-500 space-y-8">
      {/* 1. Header Hero */}
      <div className="bg-slate-900 rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h2 className="text-3xl md:text-5xl font-black mb-2 tracking-tighter">Bio Data</h2>
            <p className="text-white/40 font-medium text-sm md:text-base leading-relaxed max-w-lg">
              Official institutional record of your personal identification and contact information.
            </p>
          </div>
          <div className="flex gap-3">
             {!isEditing ? (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 border border-white/10 shadow-xl"
                >
                   <Edit3 size={16} /> Modify Profile
                </button>
             ) : (
                <>
                  <button 
                    onClick={handleDiscard}
                    disabled={isSaving}
                    className="px-6 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 border border-red-500/20 disabled:opacity-50"
                  >
                     <X size={16} /> Discard
                  </button>
                  <button 
                    onClick={handleSave}
                    disabled={isSaving}
                    className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 shadow-2xl shadow-blue-500/20 disabled:opacity-50 min-w-[140px] justify-center"
                  >
                     {isSaving ? <Loader2 className="animate-spin" size={16} /> : <><Save size={16} /> Save Changes</>}
                  </button>
                </>
             )}
          </div>
        </div>
        <User size={220} className="absolute -right-8 -bottom-12 text-white/5 pointer-events-none" />
      </div>

      {/* 2. Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Personal Details Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 px-1 border-b border-slate-100 pb-3">
            <User size={18} className="text-blue-600" />
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide">Personal Details</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <BioField 
              label="Gender" 
              id="gender"
              value={formData.gender || 'Male'} 
              icon={Users} 
              type="select" 
              options={['Male', 'Female', 'Other']} 
            />
            <BioField 
              label="Date of Birth" 
              id="dob"
              value={formData.dob || '2004-01-23'} 
              icon={Calendar} 
              type="date" 
            />
            <BioField 
              label="Nationality" 
              id="nationality"
              value={formData.nationality || 'Nigerian'} 
              icon={Globe} 
            />
            <BioField 
              label="Marital Status" 
              id="maritalStatus"
              value={formData.maritalStatus || 'Single'} 
              type="select" 
              options={['Single', 'Married', 'Divorced', 'Widowed']} 
            />
            <div className="sm:col-span-2">
              <BioField 
                label="Religion" 
                id="religion"
                value={formData.religion || 'Christianity'} 
              />
            </div>
          </div>
        </div>

        {/* Physical Identity Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 px-1 border-b border-slate-100 pb-3">
            <HeartPulse size={18} className="text-red-500" />
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide">Physical Identity</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <BioField 
              label="Blood Group" 
              id="bloodGroup"
              value={formData.bloodGroup || 'O+'} 
              type="select"
              options={['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']}
            />
            <BioField 
              label="Genotype" 
              id="genotype"
              value={formData.genotype || 'AA'} 
              type="select"
              options={['AA', 'AS', 'AC', 'SS']}
            />
            <div className="sm:col-span-2">
              <BioField 
                label="State of Origin" 
                id="state"
                value={formData.state || 'Kogi'} 
                icon={MapPin} 
              />
            </div>
            <div className="sm:col-span-2">
              <BioField 
                label="L.G.A" 
                id="lga"
                value={formData.lga || 'Dekina'} 
                icon={MapPin} 
              />
            </div>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="md:col-span-2 space-y-6">
          <div className="flex items-center gap-3 px-1 border-b border-slate-100 pb-3">
            <Contact size={18} className="text-emerald-500" />
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide">Contact Information</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <BioField 
              label="Phone Number" 
              id="phone"
              value={formData.phone || '+234 812 345 6789'} 
              icon={Phone} 
              type="tel"
            />
            <div className="md:col-span-2">
              <BioField 
                label="Permanent Contact Address" 
                id="contactAddress"
                value={formData.contactAddress || 'No. 12 University Road, Lafia, Nasarawa State'} 
                icon={MapPin} 
              />
            </div>
          </div>
        </div>

        {/* Emergency Contact Section */}
        <div className="md:col-span-2 space-y-6">
          <div className="flex items-center gap-3 px-1 border-b border-slate-100 pb-3">
            <ShieldCheck size={18} className="text-amber-500" />
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide">Emergency Contact (Next of Kin)</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <BioField 
              label="Next of Kin Name" 
              id="name"
              value={formData.nextOfKin?.name || 'Michael Thompson'} 
              isNOK
            />
            <BioField 
              label="Relationship" 
              id="relationship"
              value={formData.nextOfKin?.relationship || 'Father'} 
              isNOK
            />
            <BioField 
              label="Contact Phone" 
              id="phone"
              value={formData.nextOfKin?.phone || '+234 803 111 2222'} 
              icon={Phone} 
              type="tel"
              isNOK
            />
          </div>
        </div>
      </div>

      {/* 3. Verification Footer */}
      <div className="pt-10 flex flex-col items-center justify-center text-center space-y-4">
        <div className="flex items-center gap-2 text-blue-600 font-black text-[10px] md:text-xs uppercase bg-blue-50 px-5 py-2.5 rounded-full border border-blue-100 shadow-sm">
           <ShieldCheck size={18} /> Verified Institutional Record
        </div>
        <p className="text-[10px] text-slate-400 italic max-w-md">
          {isEditing 
            ? "Ensure all details provided match your legal identification documents to avoid verification issues." 
            : "This information is synchronized with the University Admissions Board. If any details are incorrect, please contact the MIS Unit."}
        </p>
      </div>
    </div>
  );
};

export default BioData;
