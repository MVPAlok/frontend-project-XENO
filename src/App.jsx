import React, { useState } from 'react';
import LandingPage from './LandingPage';
import DashboardMain from './components/Dashboard/DashboardMain';

export default function App() {
  const [currentView, setCurrentView] = useState('landing');

  return (
    <div className="w-full min-h-screen">
      {currentView === 'landing' ? (
        <LandingPage onLaunch={() => setCurrentView('dashboard')} />
      ) : (
        <DashboardMain onBack={() => setCurrentView('landing')} />
      )}
    </div>
  );
}

