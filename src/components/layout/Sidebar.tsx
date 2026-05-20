import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { setActiveTab } from '../../store/gamificationSlice';
import { X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const activeTab = useAppSelector((state) => state.gamification.activeTab);
  const dispatch = useAppDispatch();

  const menuItems = [
    { name: 'Home', icon: '/assets/menu_home.svg' },
    { name: 'Insights', icon: '/assets/menu_insights.svg' },
    { name: 'Gamification', icon: '/assets/menu_gamification.svg' },
    { name: 'Applications', icon: '/assets/menu_applications.svg' },
    { name: 'Payments', icon: '/assets/menu_payments.svg' },
  ];

  const handleTabClick = (tabName: string) => {
    dispatch(setActiveTab(tabName));
    setIsOpen(false); // Close on mobile
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Panel */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 flex flex-col justify-between w-[200px] lg:w-[188px] h-screen p-4 bg-[#FDEFFD] border-r border-primary-light transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col gap-6">
          {/* Logo and Mobile Header */}
          <div className="flex items-center justify-between h-[34.32px] px-2">
            <div className="flex items-center gap-2 select-none">
              <img 
                src="/assets/logo.svg" 
                alt="SaTHI Logo" 
                className="w-8 h-8 select-none pointer-events-none transition-transform duration-300 hover:rotate-12"
              />
              <span className="font-syne font-bold text-[24px] lg:text-[28px] tracking-[1.5%] text-[#340634]">
                SaTHI
              </span>
            </div>
            
            <button 
              className="p-1 text-primary-dark lg:hidden rounded-lg hover:bg-primary-light/50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className="flex flex-col gap-1">
            {menuItems.map((item) => {
              const isActive = activeTab === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => handleTabClick(item.name)}
                  className={`flex items-center gap-2 w-full p-2 rounded-[10px] transition-all duration-300 font-jakarta font-medium text-[14px] leading-[130%] group ${
                    isActive
                      ? 'bg-[#FFFDFF] text-[#C530C5] shadow-sm font-semibold'
                      : 'text-[#616161] hover:bg-[#FFFDFF]/60 hover:text-[#C530C5]'
                  }`}
                >
                  <img
                    src={item.icon}
                    alt={`${item.name} Icon`}
                    className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 select-none pointer-events-none ${
                      isActive ? 'filter-primary' : 'opacity-80 group-hover:opacity-100'
                    }`}
                    style={{
                      filter: isActive 
                        ? 'invert(27%) sepia(87%) saturate(2311%) hue-rotate(278deg) brightness(88%) contrast(92%)' 
                        : 'none'
                    }}
                  />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Settings at the bottom */}
        <div className="flex flex-col gap-1">
          <button
            onClick={() => handleTabClick('Settings')}
            className={`flex items-center gap-2 w-full p-2 rounded-[10px] transition-all duration-300 font-jakarta font-medium text-[14px] leading-[130%] group ${
              activeTab === 'Settings'
                ? 'bg-[#FFFDFF] text-[#C530C5] shadow-sm font-semibold'
                : 'text-[#616161] hover:bg-[#FFFDFF]/60 hover:text-[#C530C5]'
            }`}
          >
            <img
              src="/assets/menu_settings.svg"
              alt="Settings Icon"
              className={`w-5 h-5 transition-transform duration-300 group-hover:rotate-45 select-none pointer-events-none ${
                activeTab === 'Settings' ? 'filter-primary' : 'opacity-80 group-hover:opacity-100'
              }`}
              style={{
                filter: activeTab === 'Settings'
                  ? 'invert(27%) sepia(87%) saturate(2311%) hue-rotate(278deg) brightness(88%) contrast(92%)'
                  : 'none'
              }}
            />
            <span>Settings</span>
          </button>
        </div>
      </aside>
    </>
  );
};
