
import React, { useState, useEffect } from 'react';
import { University, UserProfile, UserRole } from './types';
import Landing from './views/Landing';
import Profiling from './views/Profiling';
import Dashboard from './views/Dashboard';
import Auth from './views/Auth';
import { UNIVERSITIES } from './mockData';

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
    </div>
  );
};

export default App;
