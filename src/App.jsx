import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import DSATracker from './pages/DSATracker';
import SystemDesignTracker from './pages/SystemDesignTracker';
import ResumeChecklist from './pages/ResumeChecklist';
import MockInterviewLogger from './pages/MockInterviewLogger';
import Roadmap from './pages/Roadmap';

const AppContent = () => {
  const { user, isLoading } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <DataProvider>
      <div className={`app ${isDarkMode ? 'dark-theme' : 'light-theme'}`} data-bs-theme={isDarkMode ? 'dark' : 'light'}>
        <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <div className="container-fluid">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dsa-tracker" element={<DSATracker />} />
            <Route path="/system-design" element={<SystemDesignTracker />} />
            <Route path="/resume-checklist" element={<ResumeChecklist />} />
            <Route path="/mock-interviews" element={<MockInterviewLogger />} />
            <Route path="/roadmap" element={<Roadmap />} />
          </Routes>
        </div>
      </div>
    </DataProvider>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;