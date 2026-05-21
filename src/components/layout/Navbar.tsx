import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { clearNotifications } from '../../store/gamificationSlice';
import { Menu } from 'lucide-react';

interface NavbarProps {
  onMenuOpen: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onMenuOpen }) => {
  const activeTab = useAppSelector((state) => state.gamification.activeTab);
  const notificationsCount = useAppSelector((state) => state.gamification.notificationsCount);
  const dispatch = useAppDispatch();

  return (
    <header className="flex justify-center w-full h-[64px] px-4 lg:px-8 bg-white border-b border-[#F5F5F5] select-none">
      <div className="flex items-center justify-between w-full max-w-[960px]">
        {/* Left side: Hamburger + Dynamic Tab Title */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onMenuOpen}
            className="p-1.5 text-neutral-dark lg:hidden rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Open Sidebar"
          >
            <Menu size={22} />
          </button>
          
          <h1 className="font-jakarta font-semibold text-[18px] leading-[140%] text-[#303030]">
            {activeTab}
          </h1>
        </div>

        {/* Right side: Bell Notification + Profile */}
        <div className="flex items-center gap-4">
          {/* Bell Icon with Badge */}
          <button 
            onClick={() => dispatch(clearNotifications())}
            className="relative p-2 rounded-lg hover:bg-slate-50 transition-all duration-300 group cursor-pointer"
            aria-label="View Notifications"
          >
            <img 
              src="/assets/bell.svg" 
              alt="Notification Bell"
              className="w-6 h-6 transition-transform duration-300 group-hover:rotate-12 select-none pointer-events-none"
            />
            {notificationsCount > 0 && (
              <span className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 rounded-full bg-[#E51C00] font-inter font-medium text-[11.43px] leading-[140%] text-[#FFFBFB] select-none pointer-events-none animate-pulse-subtle">
                {notificationsCount}
              </span>
            )}
          </button>

          {/* Profile Avatar */}
          <div className="relative group cursor-pointer select-none">
            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary/20 hover:border-primary transition-all duration-300 select-none">
              <img 
                src="/assets/avatar.png" 
                alt="User Profile" 
                className="w-full h-full object-cover select-none pointer-events-none"
              />
            </div>
            <div className="absolute right-0 top-10 hidden group-hover:flex flex-col w-48 p-2 bg-white rounded-lg border border-slate-100 shadow-lg text-[13px] font-jakarta z-50 animate-fade-in">
              <p className="font-semibold text-neutral-dark px-2 py-1">Prakhar Katiyar</p>
              <p className="text-neutral-gray px-2 py-0.5 text-[11px] mb-1">Campaign Manager</p>
              <hr className="border-slate-100 my-1" />
              <button className="text-left px-2 py-1 rounded hover:bg-primary-light hover:text-primary transition-colors cursor-pointer">My Profile</button>
              <button className="text-left px-2 py-1 rounded hover:bg-red-50 hover:text-red-500 transition-colors cursor-pointer">Sign Out</button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
