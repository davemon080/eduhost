
import React, { useState, useEffect } from 'react';
import { University, UserProfile, UserRole } from './types';
import Landing from './views/Landing';
import Profiling from './views/Profiling';
import Dashboard from './views/Dashboard';
import Auth from './views/Auth';
import { UNIVERSITIES } from './mockData';
import { Download, X, Sparkles } from 'lucide-react';

const PwaInstallPrompt: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handlePrompt = () => {
      // Small delay to ensure UI is ready
      setTimeout(() => setIsVisible(true), 2000);
    };

    // Check if prompt is already stashed (e.g. navigation within SPA)
    if ((window as any).deferredPrompt) {
      setIsVisible(true);
    }

    window.addEventListener('pwa-can-install', handlePrompt);
    return () => window.removeEventListener('pwa-can-install', handlePrompt);
  }, []);

  const handleInstall = async () => {
    const promptEvent = (window as any).deferredPrompt;
    if (!promptEvent) return;

    // Show the install prompt
    promptEvent.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await promptEvent.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    
    // We've used the prompt, and can't use it again, throw it away
    (window as any).deferredPrompt = null;
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 z-[200] w-[calc(100%-2rem)] max-w-md animate-in slide-in-from-bottom-8 duration-700">
      <div className="bg-slate-900/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-5 shadow-2xl flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0" style={{ backgroundColor: 'var(--primary-brand)' }}>
            <Sparkles size={24} />
          </div>
          <div className="min-w-0">
            <h4 className="text-white font-black text-sm leading-none">Install Paragon Pro</h4>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1.5 truncate">Access your portal instantly from your home screen</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={handleInstall}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 transition-colors flex items-center gap-2"
            style={{ backgroundColor: 'var(--primary-brand)' }}
          >
            <Download size={14} /> Install
          </button>
          <button 
            onClick={() => setIsVisible(false)}
            className="p-2.5 text-slate-500 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [currentAuthRole, setCurrentAuthRole] = useState<UserRole>(UserRole.STUDENT);
  const [step, setStep] = useState<'LANDING' | 'AUTH' | 'PROFILING' | 'DASHBOARD'>('LANDING');

  useEffect(() => {
    const storedUniId = localStorage.getItem('onboarded_uni_id');
    const storedUser = localStorage.getItem('auth_user');
    
    if (storedUniId) {
      const uni = UNIVERSITIES.find(u => u.id === storedUniId);
      if (uni) {
        setSelectedUniversity(uni);
        if (storedUser) {
          setUserProfile(JSON.parse(storedUser));
          setStep('DASHBOARD');
        } else {
          setStep('AUTH');
        }
      }
    }
  }, []);

  // Sync brand colors with CSS variables
  useEffect(() => {
    if (selectedUniversity) {
      document.documentElement.style.setProperty('--primary-brand', selectedUniversity.primaryColor);
      document.documentElement.style.setProperty('--accent-brand', selectedUniversity.accentColor || selectedUniversity.primaryColor);
    } else {
      document.documentElement.style.setProperty('--primary-brand', '#2563eb');
      document.documentElement.style.setProperty('--accent-brand', '#2563eb');
    }
  }, [selectedUniversity]);

  const handleUniversitySelect = (uni: University) => {
    setSelectedUniversity(uni);
    localStorage.setItem('onboarded_uni_id', uni.id);
    setStep('AUTH');
  };

  const handleLogin = (user: UserProfile) => {
    setUserProfile(user);
    localStorage.setItem('auth_user', JSON.stringify(user));
    setStep('DASHBOARD');
  };

  const handleRegister = (role: UserRole) => {
    setCurrentAuthRole(role);
    setStep('PROFILING');
  };

  const handleProfileComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    localStorage.setItem('auth_user', JSON.stringify(profile));
    setStep('DASHBOARD');
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_user');
    setUserProfile(null);
    setStep('AUTH');
  };

  const handleResetUniversity = () => {
    localStorage.removeItem('onboarded_uni_id');
    localStorage.removeItem('auth_user');
    setSelectedUniversity(null);
    setUserProfile(null);
    setStep('LANDING');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900">
      {step === 'LANDING' && (
        <Landing universities={UNIVERSITIES} onSelect={handleUniversitySelect} />
      )}
      
      {step === 'AUTH' && selectedUniversity && (
        <Auth 
          university={selectedUniversity} 
          onLogin={handleLogin}
          onRegister={handleRegister}
          onBack={handleResetUniversity}
        />
      )}

      {step === 'PROFILING' && selectedUniversity && (
        <Profiling 
          university={selectedUniversity} 
          onComplete={handleProfileComplete}
          onBack={() => setStep('AUTH')}
          role={currentAuthRole}
        />
      )}

      {step === 'DASHBOARD' && selectedUniversity && userProfile && (
        <Dashboard 
          university={selectedUniversity} 
          user={userProfile} 
          onLogout={handleLogout}
          onUpdateUser={(updated) => {
            setUserProfile(updated);
            localStorage.setItem('auth_user', JSON.stringify(updated));
          }}
        />
      )}

      <PwaInstallPrompt />
    </div>
  );
};

export default App;
