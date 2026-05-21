import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from './store';
import { hideToast } from './store/gamificationSlice';
import { Sidebar } from './components/layout/Sidebar';
import { Navbar } from './components/layout/Navbar';
import { GamificationCard } from './features/gamification/GamificationCard';
import { FeatureGrid } from './features/gamification/FeatureGrid';
import { Check } from 'lucide-react';

// Import new modular tab components
import { HomeTab } from './features/dashboard/HomeTab';
import { InsightsTab } from './features/dashboard/InsightsTab';
import { ApplicationsTab } from './features/dashboard/ApplicationsTab';
import { PaymentsTab } from './features/dashboard/PaymentsTab';
import { SettingsTab } from './features/dashboard/SettingsTab';

interface SuccessToastProps {
  message: string;
  onClose: () => void;
}

const SuccessToast: React.FC<SuccessToastProps> = ({ message, onClose }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const autoHideTimer = setTimeout(() => {
      setIsExiting(true);
    }, 3200);

    const closeTimer = setTimeout(() => {
      onClose();
    }, 3500);

    return () => {
      clearTimeout(autoHideTimer);
      clearTimeout(closeTimer);
    };
  }, [onClose]);

  const handleManualClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 250); // Wait for exit animation to complete (250ms)
  };

  return (
    <div
      onClick={handleManualClose}
      className={`fixed top-6 left-1/2 z-[10000] flex items-center w-[183px] h-[48px] bg-[#303030] rounded-[16px] pl-[13px] pr-[15px] select-none pointer-events-auto cursor-pointer border-none transition-all duration-200 hover:opacity-95 ${isExiting ? 'animate-toast-slide-out' : 'animate-toast-slide-in'
        }`}
      style={{
        transform: 'translateX(-50%)',
        boxShadow: '0px 4px 2px rgba(48, 48, 48, 0.16)'
      }}
    >
      <div className="w-[26px] h-[26px] flex items-center justify-center rounded-full bg-[#2ED389] text-black shrink-0">
        <Check size={14} strokeWidth={3} />
      </div>
      <span className="font-inter font-medium text-[14px] text-[#FCFDFF] tracking-wide whitespace-nowrap ml-[10px] flex-1 leading-none select-none">
        {message}
      </span>
    </div>
  );
};

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const activeTab = useAppSelector((state) => state.gamification.activeTab);
  const dispatch = useAppDispatch();
  const toastMessage = useAppSelector((state) => state.gamification.toastMessage);

  // Content switcher depending on selected sidebar item
  const renderContent = () => {
    switch (activeTab) {
      case 'Gamification':
        return (
          <div className="flex flex-col items-center w-full max-w-[960px] mx-auto animate-fade-in">
            {/* Gamification Core Container */}
            <GamificationCard />
            {/* Promo / Control Cards Grid */}
            <div className="relative z-10 -mt-[70px] w-full flex justify-center p-[0_16px]">
              <FeatureGrid />
            </div>
          </div>
        );

      case 'Home':
        return <HomeTab />;

      case 'Insights':
        return <InsightsTab />;

      case 'Applications':
        return <ApplicationsTab />;

      case 'Payments':
        return <PaymentsTab />;

      case 'Settings':
        return <SettingsTab />;

      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* 1. Reusable Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* 2. Main content container */}
      <div className="flex-1 flex flex-col min-h-screen lg:pl-[188px]">
        {/* Reusable Navbar */}
        <Navbar onMenuOpen={() => setIsSidebarOpen(true)} />

        {/* Content Panel Area */}
        <main className="flex-1 px-4 lg:px-8 py-12 flex flex-col gap-16 relative overflow-hidden select-none bg-white">
          {renderContent()}
        </main>
      </div>

      {/* Success Toast Notification */}
      {toastMessage && (
        <SuccessToast message={toastMessage} onClose={() => dispatch(hideToast())} />
      )}
    </div>
  );
};

export default App;
