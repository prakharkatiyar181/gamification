import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { X, ChevronDown, ChevronUp, Check } from 'lucide-react';
import { useAppDispatch } from '../../store';
import { toggleGamification } from '../../store/gamificationSlice';
import confetti from 'canvas-confetti';

interface CreateRewardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateRewardModal: React.FC<CreateRewardModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const [isTimeBound, setIsTimeBound] = useState(false);

  // Custom Dropdown State
  const [isEventDropdownOpen, setIsEventDropdownOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState('sales'); // default to 'sales' as per image
  const [editingOption, setEditingOption] = useState<string | null>(null);
  const [salesXValue, setSalesXValue] = useState('100');
  const [tempSalesXValue, setTempSalesXValue] = useState('');
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsEventDropdownOpen(false);
        setEditingOption(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isOpen) return null;

  const handleCreate = () => {
    // Enable gamification state
    dispatch(toggleGamification());

    // Confetti celebration
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#C530C5', '#561056', '#FBCFFB', '#FFFDFF'],
    });

    onClose();
  };

  const eventOptions = [
    { id: 'sales', label: 'Cross $X in sales', selectedLabel: `Cross $${salesXValue || 'X'} in sales` },
    { id: 'posts', label: 'Posts X times every Y period', selectedLabel: 'Posts X times every Y period' },
    { id: 'onboarded', label: 'Is Onboarded', selectedLabel: 'Is Onboarded' }
  ];

  const currentEvent = eventOptions.find(opt => opt.id === selectedEvent);

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/17 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-[400px] shadow-xl overflow-visible animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4">
          <h2 className="font-jakarta font-medium text-[18px] text-[#303030]">Create your reward system</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-6 px-6 py-2">
          
          {/* Custom Reward Event Dropdown */}
          <div className="flex flex-col gap-2 relative z-50" ref={dropdownRef}>
            <label className="font-inter font-normal text-[13px] text-[#303030]">
              Reward event <span className="text-[#E51C00]">*</span>
            </label>
            <div className="relative">
              {/* Dropdown Trigger */}
              <button
                type="button"
                onClick={() => {
                  if (isEventDropdownOpen) {
                    setIsEventDropdownOpen(false);
                    setEditingOption(null);
                  } else {
                    setIsEventDropdownOpen(true);
                  }
                }}
                className={`flex items-center justify-between w-full h-10 px-3 border rounded-lg text-[13px] transition-colors focus:outline-none ${
                  isEventDropdownOpen 
                    ? 'border-[#C530C5] text-[#303030] ring-1 ring-[#C530C5] ring-opacity-20' 
                    : 'border-slate-200 text-[#303030] hover:border-slate-300'
                }`}
              >
                <span className={selectedEvent ? '' : 'text-slate-500'}>
                  {currentEvent ? currentEvent.label : 'Select an event'}
                </span>
                <span className="text-slate-400">
                  {isEventDropdownOpen ? <ChevronUp size={16} strokeWidth={2} /> : <ChevronDown size={16} strokeWidth={2} />}
                </span>
              </button>

              {/* Dropdown Menu */}
              {isEventDropdownOpen && (
                <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-white border border-slate-100 rounded-xl shadow-lg z-[999] overflow-hidden py-1 animate-fade-in flex flex-col">
                  
                  {/* Options List */}
                  <div className="flex flex-col">
                    {eventOptions.map((option) => {
                      const isSelected = selectedEvent === option.id;
                      return (
                        <div key={option.id}>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedEvent(option.id);
                              if (option.id === 'sales') {
                                setEditingOption('sales');
                                setTempSalesXValue(salesXValue);
                              } else {
                                setEditingOption(null);
                                setIsEventDropdownOpen(false);
                              }
                            }}
                            className={`flex items-center justify-between w-full px-4 py-2.5 text-[13px] font-inter text-left transition-colors ${
                              isSelected 
                                ? 'bg-[#FCF0FC] text-[#C530C5]' 
                                : 'text-[#303030] hover:bg-slate-50'
                            }`}
                          >
                            <span>{option.label}</span>
                            {isSelected && <Check size={16} strokeWidth={2} className="text-[#C530C5]" />}
                          </button>
                          
                          {/* Inline Edit for Sales */}
                          {isSelected && editingOption === 'sales' && option.id === 'sales' && (
                            <div className="px-4 py-2 bg-white">
                              <div className="flex items-center w-full h-10 px-3 border border-[#C530C5] rounded-lg bg-white overflow-hidden shadow-sm">
                                <span className="text-[#616161] font-inter text-[14px]">$</span>
                                <div className="w-[1px] h-[18px] bg-[#E3E3E3] mx-2"></div>
                                <input
                                  type="number"
                                  placeholder="e.g. 100"
                                  value={tempSalesXValue}
                                  onChange={(e) => setTempSalesXValue(e.target.value)}
                                  className="flex-1 outline-none text-[13px] text-[#303030] bg-transparent font-inter placeholder:text-[#A0A0A0]"
                                  autoFocus
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Dropdown Footer for Edit Mode */}
                  {editingOption && (
                    <div className="flex items-center gap-3 px-4 pb-3 pt-2 bg-white">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingOption(null);
                          setIsEventDropdownOpen(false);
                        }}
                        className="flex-1 h-9 rounded-lg border border-[#E3E3E3] font-inter font-medium text-[13px] text-[#303030] hover:bg-slate-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (editingOption === 'sales') {
                            setSalesXValue(tempSalesXValue || '100');
                          }
                          setEditingOption(null);
                          setIsEventDropdownOpen(false);
                        }}
                        className="flex-1 h-9 rounded-lg bg-[#F57FF5] font-inter font-medium text-[13px] text-white hover:bg-[#EB6DEB] transition-colors"
                      >
                        Save
                      </button>
                    </div>
                  )}

                </div>
              )}
            </div>
          </div>

          {/* Reward With (Native Select for now, as not requested to be custom yet) */}
          <div className="flex flex-col gap-2 relative z-40">
            <label className="font-inter font-normal text-[13px] text-[#303030]">
              Reward with <span className="text-[#E51C00]">*</span>
            </label>
            <div className="relative">
              <select
                defaultValue=""
                className="w-full h-10 px-3 appearance-none border border-slate-200 rounded-lg text-[13px] text-slate-500 bg-white focus:outline-none focus:border-[#C530C5] focus:ring-1 focus:ring-[#C530C5] focus:ring-opacity-20"
              >
                <option value="" disabled>Select a reward</option>
                <option value="cash">Cash Commission</option>
                <option value="points">XP Points</option>
                <option value="discount">Discount Code</option>
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
                <ChevronDown size={16} strokeWidth={2} />
              </div>
            </div>
          </div>

          {/* Time Bound Toggle */}
          <div className="flex items-center justify-between mt-1">
            <div className="flex flex-col gap-0.5">
              <span className="font-inter font-medium text-[13px] text-[#303030]">Make the reward time bound</span>
              <span className="font-inter text-[12px] text-[#616161]">Choose an end date to stop this reward automatically.</span>
            </div>
            <button
              onClick={() => setIsTimeBound(!isTimeBound)}
              className={`relative inline-flex h-[24px] w-[42px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${isTimeBound ? 'bg-[#F282F3]' : 'bg-slate-300'}`}
            >
              <span
                className={`pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isTimeBound ? 'translate-x-[18px]' : 'translate-x-0'}`}
              />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-4 p-6 pt-8">
          <button
            onClick={onClose}
            className="flex-1 h-10 rounded-lg border border-[#E3E3E3] font-inter font-normal text-[14px] text-[#303030] hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            className="flex-1 h-10 rounded-lg bg-[#F57FF5] font-inter font-normal text-[14px] text-white hover:bg-[#EB6DEB] transition-colors"
          >
            Create Reward
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
