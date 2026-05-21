import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { X, ChevronDown, Check, Calendar, ChevronLeft, ChevronRight, Pencil } from 'lucide-react';
import { useAppDispatch } from '../../store';
import { showToast } from '../../store/gamificationSlice';

interface CreateRewardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateRewardModal: React.FC<CreateRewardModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();

  // Custom Form States
  const [selectedEvent, setSelectedEvent] = useState<string>('');
  const [selectedReward, setSelectedReward] = useState<string>('');
  const [isTimeBound, setIsTimeBound] = useState(false);
  const [endDate, setEndDate] = useState('');
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(new Date().getMonth());
  const [calendarYear, setCalendarYear] = useState(new Date().getFullYear());
  const calendarRef = useRef<HTMLDivElement>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showSalesSaveTooltip, setShowSalesSaveTooltip] = useState(false);
  const [showOrdersSaveTooltip, setShowOrdersSaveTooltip] = useState(false);
  const [showRewardSaveTooltip, setShowRewardSaveTooltip] = useState(false);

  // Upgrade Commission Tier Modal States
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [tempUpgradeTier, setTempUpgradeTier] = useState('Tier 1');
  const [savedUpgradeTier, setSavedUpgradeTier] = useState('');
  const [isUpgradeDropdownOpen, setIsUpgradeDropdownOpen] = useState(false);
  const upgradeDropdownRef = useRef<HTMLDivElement>(null);

  // Helper to check if a date is in the future (disallowing today or previous dates)
  const isFutureDate = (day: number, month: number, year: number) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(year, month, day);
    return target.getTime() > today.getTime();
  };

  const getMonthName = (monthIdx: number) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[monthIdx];
  };

  // Helper to generate the 42 days grid for the calendar
  const generateDays = (year: number, month: number) => {
    const firstDayIndex = new Date(year, month, 1).getDay(); // 0 = Sunday, 1 = Monday...
    const totalDays = new Date(year, month + 1, 0).getDate();
    const prevTotalDays = new Date(year, month, 0).getDate();

    const days = [];

    // Previous month padding days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const prevMonth = month === 0 ? 11 : month - 1;
      const prevYear = month === 0 ? year - 1 : year;
      const dayNum = prevTotalDays - i;
      days.push({
        day: dayNum,
        month: prevMonth,
        year: prevYear,
        isCurrentMonth: false,
        isFuture: isFutureDate(dayNum, prevMonth, prevYear),
      });
    }

    // Current month days
    for (let i = 1; i <= totalDays; i++) {
      days.push({
        day: i,
        month: month,
        year: year,
        isCurrentMonth: true,
        isFuture: isFutureDate(i, month, year),
      });
    }

    // Next month padding days to fill 42 cells (6 rows * 7 cols)
    const remainingCells = 42 - days.length;
    for (let i = 1; i <= remainingCells; i++) {
      const nextMonth = month === 11 ? 0 : month + 1;
      const nextYear = month === 11 ? year + 1 : year;
      days.push({
        day: i,
        month: nextMonth,
        year: nextYear,
        isCurrentMonth: false,
        isFuture: isFutureDate(i, nextMonth, nextYear),
      });
    }

    return days;
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    try {
      const [year, month, day] = dateStr.split('-');
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const mIdx = parseInt(month, 10) - 1;
      if (mIdx >= 0 && mIdx < 12) {
        return `${months[mIdx]} ${parseInt(day, 10)}, ${year}`;
      }
      return dateStr;
    } catch {
      return dateStr;
    }
  };

  // Dropdown Open/Close States
  const [isEventDropdownOpen, setIsEventDropdownOpen] = useState(false);
  const [isRewardDropdownOpen, setIsRewardDropdownOpen] = useState(false);

  // Sales Editing State
  const [salesXValue, setSalesXValue] = useState('');
  const [tempSalesXValue, setTempSalesXValue] = useState('');
  const [editingOption, setEditingOption] = useState<string | null>(null);

  // Orders Editing State
  const [ordersYValue, setOrdersYValue] = useState('');
  const [tempOrdersYValue, setTempOrdersYValue] = useState('');
  const [ordersDuration, setOrdersDuration] = useState('');
  const [tempOrdersDuration, setTempOrdersDuration] = useState('');
  const [isDurationDropdownOpen, setIsDurationDropdownOpen] = useState(false);

  // Reward Editing State
  const [rewardValue, setRewardValue] = useState('');
  const [tempRewardValue, setTempRewardValue] = useState('');
  const [editingRewardOption, setEditingRewardOption] = useState<string | null>(null);

  // Refs for Click Outside Detection
  const eventDropdownRef = useRef<HTMLDivElement>(null);
  const rewardDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (eventDropdownRef.current && !eventDropdownRef.current.contains(event.target as Node)) {
        setIsEventDropdownOpen(false);
        setEditingOption(null);
        setIsDurationDropdownOpen(false);
        if (selectedEvent === 'sales' && !salesXValue) {
          setSelectedEvent('');
        } else if (selectedEvent === 'orders' && (!ordersYValue || !ordersDuration)) {
          setSelectedEvent('');
        }
      }
      if (rewardDropdownRef.current && !rewardDropdownRef.current.contains(event.target as Node)) {
        setIsRewardDropdownOpen(false);
        setEditingRewardOption(null);
        if (selectedReward === 'cash' && !rewardValue) {
          setSelectedReward('');
        }
      }
      if (upgradeDropdownRef.current && !upgradeDropdownRef.current.contains(event.target as Node)) {
        setIsUpgradeDropdownOpen(false);
      }
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setIsCalendarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [selectedEvent, salesXValue, ordersYValue, ordersDuration, selectedReward, rewardValue]);

  useEffect(() => {
    if (selectedEvent !== 'sales' && selectedReward === 'commission_tier') {
      setSelectedReward('');
      setSavedUpgradeTier('');
    }
  }, [selectedEvent, selectedReward]);

  // Auto-hide tooltip after 3.5 seconds
  useEffect(() => {
    if (showTooltip) {
      const timer = setTimeout(() => {
        setShowTooltip(false);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [showTooltip]);

  // Auto-hide Sales Save Tooltip after 3.5 seconds
  useEffect(() => {
    if (showSalesSaveTooltip) {
      const timer = setTimeout(() => {
        setShowSalesSaveTooltip(false);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [showSalesSaveTooltip]);

  // Auto-hide Orders Save Tooltip after 3.5 seconds
  useEffect(() => {
    if (showOrdersSaveTooltip) {
      const timer = setTimeout(() => {
        setShowOrdersSaveTooltip(false);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [showOrdersSaveTooltip]);

  // Auto-hide Reward Save Tooltip after 3.5 seconds
  useEffect(() => {
    if (showRewardSaveTooltip) {
      const timer = setTimeout(() => {
        setShowRewardSaveTooltip(false);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [showRewardSaveTooltip]);

  if (!isOpen) return null;

  const handleCreate = () => {
    if (!isFormValid) {
      setShowTooltip(true);
      return;
    }

    // Dispatch success toast
    dispatch(showToast('Reward Created!'));

    onClose();
  };

  const eventOptions = [
    {
      id: 'sales',
      label: `Cross $${(editingOption === 'sales' ? tempSalesXValue : salesXValue) || 'X'} in sales`
    },
    {
      id: 'orders',
      label: `Brings more than ${(editingOption === 'orders' ? tempOrdersYValue : ordersYValue) || 'Y'} orders in ${(editingOption === 'orders' ? tempOrdersDuration : ordersDuration) || 'duration'}`
    },
    { id: 'onboarded', label: 'Is Onboarded' }
  ];

  const rewardOptions = [
    {
      id: 'cash',
      label: `Flat $${(editingRewardOption === 'cash' ? tempRewardValue : rewardValue) || 'X'} bonus`
    },
    {
      id: 'commission_tier',
      label: savedUpgradeTier ? `Update to (${savedUpgradeTier})` : 'Upgrade Commission Tier',
      disabled: selectedEvent !== 'sales'
    }
  ];

  const durationOptions = ['14 days', '1 month', '2 months', '3 months', '1 year'];

  const isSalesValid = selectedEvent !== 'sales' || (salesXValue.trim() !== '' && !isNaN(Number(salesXValue)) && Number(salesXValue) > 0);
  const isOrdersValid = selectedEvent !== 'orders' || (
    ordersYValue.trim() !== '' && !isNaN(Number(ordersYValue)) && Number(ordersYValue) > 0 &&
    ordersDuration !== ''
  );
  const isRewardValid =
    selectedReward === 'cash'
      ? (rewardValue.trim() !== '' && !isNaN(Number(rewardValue)) && Number(rewardValue) > 0)
      : selectedReward === 'commission_tier'
        ? savedUpgradeTier !== ''
        : selectedReward !== '';
  const isFormValid = selectedEvent !== '' && selectedReward !== '' && isSalesValid && isOrdersValid && isRewardValid && (!isTimeBound || endDate !== '');

  const getValidationError = () => {
    if (!selectedEvent) {
      return 'Choose a reward trigger and a reward to continue';
    }
    if (selectedEvent === 'sales' && !isSalesValid) {
      return 'Please enter a valid sales amount';
    }
    if (selectedEvent === 'orders') {
      if (!ordersYValue.trim() || isNaN(Number(ordersYValue)) || Number(ordersYValue) <= 0) {
        return 'Please enter target order count';
      }
      if (!ordersDuration) {
        return 'Please select an order duration';
      }
    }

    if (!selectedReward) {
      return 'Please select a reward type';
    }
    if (selectedReward === 'cash' && !isRewardValid) {
      return 'Please enter a valid cash bonus amount';
    }
    if (selectedReward === 'commission_tier' && !savedUpgradeTier) {
      return 'Please select a commission tier to upgrade to';
    }

    if (isTimeBound && !endDate) {
      return 'Choose reward end date to continue';
    }

    return '';
  };

  return ReactDOM.createPortal(
    <>
      <div className="pt-50 fixed inset-0 z-[9999] flex items-start justify-center p-4 bg-[#0000002b] backdrop-blur-sm animate-fade-in">
        <div className="bg-white rounded-[12px] w-full max-w-[400px] shadow-[0px_4px_2px_0px_rgba(48,48,48,0.04),0px_16px_32px_-4px_rgba(48,48,48,0.1)] overflow-visible animate-scale-in flex flex-col gap-6 p-6">

          {/* Main Body Container */}
          <div className="flex flex-col gap-4 w-full">

            {/* Header */}
            <div className="flex items-center justify-between w-full">
              <h2 className="font-jakarta font-medium text-[20px] leading-[28px] text-[#303030]">
                Create your reward system
              </h2>
              <button
                onClick={onClose}
                className="w-6 h-6 flex items-center justify-center text-[#303030] hover:opacity-70 transition-opacity cursor-pointer"
              >
                <X size={20} strokeWidth={2} />
              </button>
            </div>

            {/* Reward Event Dropdown */}
            <div className="flex flex-col gap-2 relative z-50" ref={eventDropdownRef}>
              <label className="font-jakarta font-normal text-[14px] leading-[19.6px] text-[#616161]">
                Reward event <span className="text-[#E51C00]">*</span>
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setIsEventDropdownOpen(!isEventDropdownOpen);
                    setIsRewardDropdownOpen(false);
                    if (!isEventDropdownOpen) {
                      if (selectedEvent === 'sales') {
                        setEditingOption('sales');
                        setTempSalesXValue(salesXValue);
                      } else if (selectedEvent === 'orders') {
                        setEditingOption('orders');
                        setTempOrdersYValue(ordersYValue);
                        setTempOrdersDuration(ordersDuration);
                        setIsDurationDropdownOpen(false);
                      }
                    }
                  }}
                  className={`flex items-center justify-between w-full h-10 px-3 border rounded-[8px] text-[16px] leading-[22.4px] transition-all duration-150 focus:outline-none bg-white cursor-pointer ${isEventDropdownOpen
                    ? 'border-[3px] border-[#C530C5] px-[10px]' // Subtract 2px padding to prevent layout shift from 3px border
                    : 'border border-[#E3E3E3] hover:border-[#CCCCCC]'
                    }`}
                >
                  <span className={selectedEvent ? 'text-[#303030]' : 'text-[#B5B5B5]'}>
                    {selectedEvent
                      ? eventOptions.find(o => o.id === selectedEvent)?.label
                      : 'Select an event'}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-[#B5B5B5] transition-transform duration-200 ${isEventDropdownOpen ? 'rotate-180 text-[#303030]' : ''}`}
                  />
                </button>

                {isEventDropdownOpen && (
                  <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-white border border-[#E3E3E3] rounded-lg shadow-lg z-[999] overflow-visible p-1 animate-fade-in flex flex-col gap-0.5">
                    {eventOptions.map((option) => {
                      const isSelected = selectedEvent === option.id;
                      const isTempSalesValid = tempSalesXValue.trim() !== '' && !isNaN(Number(tempSalesXValue)) && Number(tempSalesXValue) > 0;
                      const isTempOrdersValid = tempOrdersYValue.trim() !== '' && !isNaN(Number(tempOrdersYValue)) && Number(tempOrdersYValue) > 0 && tempOrdersDuration !== '';
                      return (
                        <div key={option.id} className="flex flex-col">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedEvent(option.id);
                              if (option.id === 'sales') {
                                setEditingOption('sales');
                                setTempSalesXValue(salesXValue);
                              } else if (option.id === 'orders') {
                                setEditingOption('orders');
                                setTempOrdersYValue(ordersYValue);
                                setTempOrdersDuration(ordersDuration);
                                setIsDurationDropdownOpen(false);
                              } else {
                                setEditingOption(null);
                                setIsEventDropdownOpen(false);
                                setIsRewardDropdownOpen(true);
                              }
                            }}
                            className={`flex items-center justify-between w-full px-3 py-2 text-[14px] font-inter text-left rounded-lg transition-colors duration-150 cursor-pointer ${isSelected
                              ? 'bg-[#FFF5FF] text-[#C530C5] font-medium'
                              : 'text-[#303030] hover:bg-[#F9F9F9]'
                              }`}
                          >
                            <span>{option.label}</span>
                            {isSelected && <Check size={20} strokeWidth={2} className="text-[#C530C5]" />}
                          </button>

                          {/* Inline editing for Sales */}
                          {isSelected && editingOption === 'sales' && option.id === 'sales' && (
                            <div className="px-3 py-2 bg-white flex flex-col gap-2">
                              <div className="flex items-center w-full h-10 px-3 border border-[#E3E3E3] rounded-[8px] bg-white overflow-hidden shadow-sm transition-all duration-150 focus-within:outline-none focus-within:border-[3px] focus-within:border-[#C530C5] focus-within:px-[10px]">
                                <span className="text-[#616161] font-inter text-[16px]">$</span>
                                <div className="w-[1px] h-4 bg-[#E3E3E3] mx-2"></div>
                                <input
                                  type="number"
                                  placeholder="e.g. 100"
                                  value={tempSalesXValue}
                                  onChange={(e) => setTempSalesXValue(e.target.value)}
                                  className="flex-1 outline-none text-[16px] text-[#303030] bg-transparent font-inter placeholder:text-[#B5B5B5]"
                                  autoFocus
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter' && isTempSalesValid) {
                                      setSalesXValue(tempSalesXValue);
                                      setEditingOption(null);
                                      setIsEventDropdownOpen(false);
                                      setIsRewardDropdownOpen(true);
                                    }
                                  }}
                                />
                              </div>

                              {/* Action Buttons for Edit */}
                              <div className="flex items-center gap-2 mt-1">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingOption(null);
                                    setIsEventDropdownOpen(false);
                                    if (!salesXValue) {
                                      setSelectedEvent('');
                                    }
                                  }}
                                  className="flex-1 h-8 rounded-lg border border-[#E3E3E3] font-inter font-medium text-[12px] text-[#303030] hover:bg-slate-50 transition-colors cursor-pointer"
                                >
                                  Cancel
                                </button>
                                <div className="relative flex-1">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (!isTempSalesValid) {
                                        setShowSalesSaveTooltip(true);
                                        return;
                                      }
                                      setSalesXValue(tempSalesXValue);
                                      setEditingOption(null);
                                      setIsEventDropdownOpen(false);
                                      setIsRewardDropdownOpen(true);
                                    }}
                                    onMouseEnter={() => {
                                      if (!isTempSalesValid) setShowSalesSaveTooltip(true);
                                    }}
                                    onMouseLeave={() => {
                                      setShowSalesSaveTooltip(false);
                                    }}
                                    className={`w-full h-8 rounded-lg font-inter font-medium text-[12px] text-white transition-all duration-200 flex items-center justify-center ${isTempSalesValid
                                      ? 'bg-[#C530C5] shadow-sm hover:shadow-md cursor-pointer'
                                      : 'bg-[#F68DF6] cursor-not-allowed border-none shadow-none'
                                      }`}
                                  >
                                    Save
                                  </button>

                                  {/* Sales Save Tooltip */}
                                  {showSalesSaveTooltip && !isTempSalesValid && (
                                    <div className="absolute top-[calc(100%+6px)] left-1/2 -translate-x-1/2 z-[9999] bg-[#242424] text-white text-[10px] font-inter rounded-md py-1 px-2 shadow-[0px_4px_12px_rgba(0,0,0,0.15)] whitespace-nowrap animate-fade-in text-center">
                                      Enter the sales target amount to continue
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Inline editing for Orders */}
                          {isSelected && editingOption === 'orders' && option.id === 'orders' && (
                            <div className="px-3 py-2 bg-white flex flex-col gap-2">
                              <div className="flex flex-row gap-2 items-center">
                                {/* Order count input */}
                                <input
                                  type="number"
                                  placeholder="eg: 4"
                                  value={tempOrdersYValue}
                                  onChange={(e) => setTempOrdersYValue(e.target.value)}
                                  className="w-1/2 h-10 px-3 border border-[#E3E3E3] rounded-[8px] bg-white outline-none focus:outline-none transition-all duration-150 focus:border-[3px] focus:border-[#C530C5] focus:px-[10px] text-[16px] text-[#303030] font-inter placeholder:text-[#B5B5B5] shadow-sm"
                                  autoFocus
                                />

                                {/* Duration dropdown */}
                                <div className="w-1/2 relative">
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setIsDurationDropdownOpen(!isDurationDropdownOpen);
                                    }}
                                    className={`flex items-center justify-between w-full h-10 px-2 border rounded-[8px] bg-white text-[16px] leading-[22.4px] font-inter transition-all duration-150 focus:outline-none cursor-pointer ${isDurationDropdownOpen
                                      ? 'border-[3px] border-[#C530C5] px-[9px]'
                                      : 'border-[#E3E3E3] hover:border-[#CCCCCC]'
                                      } ${tempOrdersDuration ? 'text-[#303030]' : 'text-[#B5B5B5]'}`}
                                  >
                                    <span>{tempOrdersDuration || 'Select duration'}</span>
                                    <ChevronDown size={18} className={`text-[#B5B5B5] transition-transform duration-200 ${isDurationDropdownOpen ? 'rotate-180 text-[#303030]' : ''}`} />
                                  </button>

                                  {isDurationDropdownOpen && (
                                    <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-white border border-[#E3E3E3] rounded-lg shadow-lg z-[1000] p-1 flex flex-col gap-0.5">
                                      {durationOptions.map((dur) => {
                                        const isDurSelected = tempOrdersDuration === dur;
                                        return (
                                          <button
                                            key={dur}
                                            type="button"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setTempOrdersDuration(dur);
                                              setIsDurationDropdownOpen(false);
                                            }}
                                            className={`flex items-center justify-between w-full px-3 py-2 text-[14px] font-inter text-left rounded-lg transition-colors duration-150 cursor-pointer ${isDurSelected
                                              ? 'bg-[#FFF5FF] text-[#C530C5] font-medium'
                                              : 'text-[#303030] hover:bg-[#F9F9F9]'
                                              }`}
                                          >
                                            <span>{dur}</span>
                                            {isDurSelected && <Check size={20} strokeWidth={2} className="text-[#C530C5]" />}
                                          </button>
                                        );
                                      })}
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Action Buttons for Edit */}
                              <div className="flex items-center gap-2 mt-1">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingOption(null);
                                    setIsEventDropdownOpen(false);
                                    if (!ordersYValue || !ordersDuration) {
                                      setSelectedEvent('');
                                    }
                                  }}
                                  className="flex-1 h-8 rounded-lg border border-[#E3E3E3] font-inter font-medium text-[12px] text-[#303030] hover:bg-slate-50 transition-colors cursor-pointer"
                                >
                                  Cancel
                                </button>
                                <div className="relative flex-1">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (!isTempOrdersValid) {
                                        setShowOrdersSaveTooltip(true);
                                        return;
                                      }
                                      setOrdersYValue(tempOrdersYValue);
                                      setOrdersDuration(tempOrdersDuration);
                                      setEditingOption(null);
                                      setIsEventDropdownOpen(false);
                                      setIsRewardDropdownOpen(true);
                                    }}
                                    onMouseEnter={() => {
                                      if (!isTempOrdersValid) setShowOrdersSaveTooltip(true);
                                    }}
                                    onMouseLeave={() => {
                                      setShowOrdersSaveTooltip(false);
                                    }}
                                    className={`w-full h-8 rounded-lg font-inter font-medium text-[12px] text-white transition-all duration-200 flex items-center justify-center ${isTempOrdersValid
                                      ? 'bg-[#C530C5] shadow-sm hover:shadow-md cursor-pointer'
                                      : 'bg-[#F68DF6] cursor-not-allowed border-none shadow-none'
                                      }`}
                                  >
                                    Save
                                  </button>

                                  {/* Orders Save Tooltip */}
                                  {showOrdersSaveTooltip && !isTempOrdersValid && (
                                    <div className="absolute top-[calc(100%+6px)] left-1/2 -translate-x-1/2 z-[9999] bg-[#242424] text-white text-[10px] font-inter rounded-md py-1 px-2 shadow-[0px_4px_12px_rgba(0,0,0,0.15)] whitespace-nowrap animate-fade-in text-center">
                                      {!tempOrdersYValue.trim() || isNaN(Number(tempOrdersYValue)) || Number(tempOrdersYValue) <= 0
                                        ? "Enter target order count to continue"
                                        : "Select an order duration to continue"}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Reward With Dropdown */}
            <div className="flex flex-col gap-2 relative z-40" ref={rewardDropdownRef}>
              <label className="font-jakarta font-normal text-[14px] leading-[19.6px] text-[#616161]">
                Reward with <span className="text-[#E51C00]">*</span>
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setIsRewardDropdownOpen(!isRewardDropdownOpen);
                    setIsEventDropdownOpen(false);
                    if (!isRewardDropdownOpen) {
                      if (selectedReward === 'cash') {
                        setEditingRewardOption('cash');
                        setTempRewardValue(rewardValue);
                      }
                    }
                  }}
                  className={`flex items-center justify-between w-full h-10 px-3 border rounded-[8px] text-[16px] leading-[22.4px] transition-all duration-150 focus:outline-none bg-white cursor-pointer ${isRewardDropdownOpen
                    ? 'border-[3px] border-[#C530C5] px-[10px]' // Subtract 2px padding to prevent layout shift from 3px border
                    : 'border border-[#E3E3E3] hover:border-[#CCCCCC]'
                    }`}
                >
                  <span className={selectedReward ? 'text-[#303030]' : 'text-[#B5B5B5]'}>
                    {selectedReward
                      ? rewardOptions.find(o => o.id === selectedReward)?.label
                      : 'Select a reward'}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-[#B5B5B5] transition-transform duration-200 ${isRewardDropdownOpen ? 'rotate-180 text-[#303030]' : ''}`}
                  />
                </button>

                {isRewardDropdownOpen && (
                  <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-white border border-[#E3E3E3] rounded-lg shadow-lg z-[999] overflow-visible p-1 animate-fade-in flex flex-col gap-0.5">
                    {rewardOptions.map((option) => {
                      const isSelected = selectedReward === option.id;
                      const isDisabled = 'disabled' in option && option.disabled;
                      const isTempRewardValid = tempRewardValue.trim() !== '' && !isNaN(Number(tempRewardValue)) && Number(tempRewardValue) > 0;
                      return (
                        <div key={option.id} className="flex flex-col">
                          <button
                            key={option.id}
                            type="button"
                            disabled={isDisabled}
                            onClick={() => {
                              setSelectedReward(option.id);
                              if (option.id === 'cash') {
                                setEditingRewardOption('cash');
                                setTempRewardValue(rewardValue);
                              } else if (option.id === 'commission_tier') {
                                setEditingRewardOption(null);
                                setIsRewardDropdownOpen(false);
                                setTempUpgradeTier(savedUpgradeTier || 'Tier 1');
                                setIsUpgradeModalOpen(true);
                              } else {
                                setEditingRewardOption(null);
                                setIsRewardDropdownOpen(false);
                              }
                            }}
                            className={`group flex items-center justify-between w-full px-3 py-2 text-[14px] font-inter text-left rounded-lg transition-colors duration-150 ${isDisabled
                              ? 'opacity-40 cursor-not-allowed text-[#B5B5B5]'
                              : isSelected
                                ? 'bg-[#FFF5FF] text-[#C530C5] font-medium cursor-pointer'
                                : 'text-[#303030] hover:bg-[#F9F9F9] cursor-pointer'
                              }`}
                          >
                            <span>{option.label}</span>
                            <div className="flex items-center">
                              {isSelected && <Check size={20} strokeWidth={2} className={`text-[#C530C5] ${option.id === 'commission_tier' && savedUpgradeTier ? 'group-hover:hidden' : ''}`} />}
                              {option.id === 'commission_tier' && savedUpgradeTier && (
                                <Pencil size={20} className="hidden group-hover:block text-[#8A8A8A]" />
                              )}
                            </div>
                          </button>

                          {/* Inline editing for cash/Flat bonus */}
                          {isSelected && editingRewardOption === 'cash' && option.id === 'cash' && (
                            <div className="px-3 py-2 bg-white flex flex-col gap-2">
                              <div className="flex items-center w-full h-10 px-3 border border-[#E3E3E3] rounded-[8px] bg-white overflow-hidden shadow-sm transition-all duration-150 focus-within:outline-none focus-within:border-[3px] focus-within:border-[#C530C5] focus-within:px-[10px]">
                                <span className="text-[#616161] font-inter text-[16px]">$</span>
                                <div className="w-[1px] h-4 bg-[#E3E3E3] mx-2"></div>
                                <input
                                  type="number"
                                  placeholder="e.g. 100"
                                  value={tempRewardValue}
                                  onChange={(e) => setTempRewardValue(e.target.value)}
                                  className="flex-1 outline-none text-[16px] text-[#303030] bg-transparent font-inter placeholder:text-[#B5B5B5]"
                                  autoFocus
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter' && isTempRewardValid) {
                                      setRewardValue(tempRewardValue);
                                      setEditingRewardOption(null);
                                      setIsRewardDropdownOpen(false);
                                    }
                                  }}
                                />
                              </div>

                              {/* Action Buttons for Edit */}
                              <div className="flex items-center gap-2 mt-1">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingRewardOption(null);
                                    setIsRewardDropdownOpen(false);
                                    if (!rewardValue) {
                                      setSelectedReward('');
                                    }
                                  }}
                                  className="flex-1 h-8 rounded-lg border border-[#E3E3E3] font-inter font-medium text-[12px] text-[#303030] hover:bg-slate-50 transition-colors cursor-pointer"
                                >
                                  Cancel
                                </button>
                                <div className="relative flex-1">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (!isTempRewardValid) {
                                        setShowRewardSaveTooltip(true);
                                        return;
                                      }
                                      setRewardValue(tempRewardValue);
                                      setEditingRewardOption(null);
                                      setIsRewardDropdownOpen(false);
                                    }}
                                    onMouseEnter={() => {
                                      if (!isTempRewardValid) setShowRewardSaveTooltip(true);
                                    }}
                                    onMouseLeave={() => {
                                      setShowRewardSaveTooltip(false);
                                    }}
                                    className={`w-full h-8 rounded-lg font-inter font-medium text-[12px] text-white transition-all duration-200 flex items-center justify-center ${isTempRewardValid
                                      ? 'bg-[#C530C5] shadow-sm hover:shadow-md cursor-pointer'
                                      : 'bg-[#F68DF6] cursor-not-allowed border-none shadow-none'
                                      }`}
                                  >
                                    Save
                                  </button>

                                  {/* Reward Save Tooltip */}
                                  {showRewardSaveTooltip && !isTempRewardValid && (
                                    <div className="absolute top-[calc(100%+6px)] left-1/2 -translate-x-1/2 z-[9999] bg-[#242424] text-white text-[10px] font-inter rounded-md py-1 px-2 shadow-[0px_4px_12px_rgba(0,0,0,0.15)] whitespace-nowrap animate-fade-in text-center">
                                      Enter the bonus amount to continue
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Time Bound Toggle */}
            <div className="flex flex-col gap-2 relative z-30">
              <div className="flex items-center justify-between w-full mt-1">
                <span className="font-jakarta font-medium text-[14px] leading-[19.6px] text-[#303030]">
                  Make the reward time bound
                </span>
                <button
                  type="button"
                  onClick={() => setIsTimeBound(!isTimeBound)}
                  className={`relative inline-flex h-[16px] w-[28px] shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${isTimeBound ? 'bg-[#C530C5]' : 'bg-[#CCCCCC]'
                    }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-[12px] w-[12px] transform rounded-full bg-white shadow-md transition duration-200 ease-in-out absolute top-[2px] ${isTimeBound ? 'left-[14px]' : 'left-[2px]'
                      }`}
                  />
                </button>
              </div>

              <p className="font-inter font-normal text-[12px] leading-[18px] text-[#616161]">
                Choose an end date to stop this reward automatically.
              </p>

              {/* Premium Date Picker Input */}
              {isTimeBound && (
                <div className="flex flex-col gap-2 mt-2 animate-fade-in relative" ref={calendarRef}>
                  <label className="font-jakarta font-normal text-[14px] leading-[19.6px] text-[#616161]">
                    End date <span className="text-[#E51C00]">*</span>
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => {
                        setIsCalendarOpen(!isCalendarOpen);
                        setIsEventDropdownOpen(false);
                        setIsRewardDropdownOpen(false);
                        // If open, initialize month and year to current date or selected date
                        if (!isCalendarOpen) {
                          const initDate = endDate ? new Date(endDate) : new Date();
                          setCalendarMonth(initDate.getMonth());
                          setCalendarYear(initDate.getFullYear());
                        }
                      }}
                      className={`flex items-center justify-start gap-2 w-full h-10 px-3 border rounded-[8px] font-inter text-[16px] transition-all duration-150 focus:outline-none bg-white cursor-pointer ${isCalendarOpen
                        ? 'border-[3px] border-[#C530C5] px-[10px]' // Subtract 2px padding to prevent layout shift from 3px border
                        : 'border border-[#E3E3E3] hover:border-[#CCCCCC]'
                        }`}
                    >
                      <Calendar
                        size={22}
                        className={`text-[#4A4A4A] transition-colors duration-150 ${isCalendarOpen ? 'text-[#C530C5]' : ''}`}
                      />
                      <span className={endDate ? 'text-[#303030]' : 'text-[#B5B5B5]'}>
                        {endDate ? formatDate(endDate) : 'Select End Date'}
                      </span>
                    </button>

                    {isCalendarOpen && (
                      <div className="absolute top-[calc(100%+4px)] left-0 w-70 bg-white border border-[#E3E3E3] rounded-lg shadow-[0px_4px_20px_rgba(48,48,48,0.08)] z-[999] p-3 flex flex-col gap-2 animate-fade-in select-none">
                        {/* Calendar Header with navigation */}
                        <div className="flex justify-between items-center w-full px-1">
                          <button
                            type="button"
                            onClick={() => {
                              if (calendarMonth === 0) {
                                setCalendarMonth(11);
                                setCalendarYear(calendarYear - 1);
                              } else {
                                setCalendarMonth(calendarMonth - 1);
                              }
                            }}
                            className="w-7 h-7 flex items-center justify-center rounded-md border border-[#E3E3E3] hover:bg-[#F9F9F9] text-[#616161] hover:text-[#303030] transition-all duration-150 cursor-pointer"
                          >
                            <ChevronLeft size={16} />
                          </button>
                          <span className="font-jakarta font-medium text-[14px] text-[#303030]">
                            {getMonthName(calendarMonth)} {calendarYear}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              if (calendarMonth === 11) {
                                setCalendarMonth(0);
                                setCalendarYear(calendarYear + 1);
                              } else {
                                setCalendarMonth(calendarMonth + 1);
                              }
                            }}
                            className="w-7 h-7 flex items-center justify-center rounded-md border border-[#E3E3E3] hover:bg-[#F9F9F9] text-[#616161] hover:text-[#303030] transition-all duration-150 cursor-pointer"
                          >
                            <ChevronRight size={16} />
                          </button>
                        </div>

                        {/* Weekday Names */}
                        <div className="grid grid-cols-7 justify-items-center text-center font-inter font-medium text-[11px] text-[#B5B5B5]">
                          <div className="w-8 h-8 flex items-center justify-center">Su</div>
                          <div className="w-8 h-8 flex items-center justify-center">Mo</div>
                          <div className="w-8 h-8 flex items-center justify-center">Tu</div>
                          <div className="w-8 h-8 flex items-center justify-center">We</div>
                          <div className="w-8 h-8 flex items-center justify-center">Th</div>
                          <div className="w-8 h-8 flex items-center justify-center">Fr</div>
                          <div className="w-8 h-8 flex items-center justify-center">Sa</div>
                        </div>

                        {/* Days Grid */}
                        <div className="grid grid-cols-7 justify-items-center gap-y-0.5 text-center font-inter text-[13px]">
                          {generateDays(calendarYear, calendarMonth).map((d, index) => {
                            const pad = (num: number) => num.toString().padStart(2, '0');
                            const dateString = `${d.year}-${pad(d.month + 1)}-${pad(d.day)}`;
                            const isSelected = endDate === dateString;

                            // Determine styles based on selection, month, and selectability
                            let dayStyle = "w-8 h-8 flex items-center justify-center transition-all duration-150 ";
                            if (!d.isFuture) {
                              dayStyle += "rounded-full text-[#D4D4D4] opacity-50 cursor-not-allowed";
                            } else if (isSelected) {
                              dayStyle += "rounded-[8px] bg-[#C530C5] text-white font-medium cursor-pointer shadow-sm";
                            } else {
                              dayStyle += "rounded-full cursor-pointer ";
                              if (d.isCurrentMonth) {
                                dayStyle += "text-[#303030] hover:bg-[#FFF5FF] hover:text-[#C530C5]";
                              } else {
                                dayStyle += "text-[#CCCCCC] hover:bg-[#FFF5FF] hover:text-[#C530C5]";
                              }
                            }

                            return (
                              <button
                                key={`${d.year}-${d.month}-${d.day}-${index}`}
                                type="button"
                                disabled={!d.isFuture}
                                onClick={() => {
                                  setEndDate(dateString);
                                  setIsCalendarOpen(false);
                                }}
                                className={dayStyle}
                              >
                                {d.day}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Footer Actions */}
          <div className="flex flex-row gap-4 items-center w-full">
            <button
              onClick={onClose}
              className="flex-1 h-10 px-4 py-2 border border-[#E3E3E3] rounded-[10px] font-inter font-normal text-[16px] leading-[22.4px] text-[#303030] bg-white hover:bg-[#F9F9F9] active:bg-[#F2F2F2] transition-colors flex items-center justify-center focus:outline-none cursor-pointer"
            >
              Cancel
            </button>
            <div className="relative flex-1">
              <button
                type="button"
                onClick={handleCreate}
                onMouseEnter={() => {
                  if (!isFormValid) setShowTooltip(true);
                }}
                onMouseLeave={() => {
                  setShowTooltip(false);
                }}
                className={`w-full h-10 px-4 py-2 rounded-[10px] font-inter font-normal text-[16px] leading-[22.4px] flex items-center justify-center transition-all duration-200 focus:outline-none ${isFormValid
                  ? 'bg-[#C530C5] text-white shadow-sm hover:shadow-md cursor-pointer'
                  : 'bg-[#F68DF6] text-white cursor-not-allowed border-none shadow-none'
                  }`}
              >
                Create Reward
              </button>

              {/* Tooltip Popup */}
              {showTooltip && !isFormValid && (
                <div className="absolute top-[calc(100%+6px)] left-1/2 -translate-x-1/2 z-[9999] bg-[#242424] text-white text-[12px] font-inter rounded-md py-1.5 px-3 shadow-[0px_4px_12px_rgba(0,0,0,0.15)] whitespace-nowrap animate-fade-in text-center">
                  {getValidationError()}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {isUpgradeModalOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-[#0000004d] backdrop-blur-sm animate-fade-in select-none">
          <div className="bg-white rounded-[12px] w-full max-w-[340px] shadow-[0px_4px_2px_0px_rgba(48,48,48,0.04),0px_16px_32px_-4px_rgba(48,48,48,0.1)] p-6 animate-scale-in flex flex-col gap-5">
            {/* Header */}
            <div className="flex items-center justify-between w-full">
              <h3 className="font-jakarta font-medium text-[18px] leading-[26px] text-[#303030]">
                Upgrade Commission Tier
              </h3>
              <button
                type="button"
                onClick={() => {
                  setIsUpgradeModalOpen(false);
                  if (!savedUpgradeTier) {
                    setSelectedReward('');
                  }
                }}
                className="w-6 h-6 flex items-center justify-center text-[#303030] hover:opacity-70 transition-opacity cursor-pointer"
              >
                <X size={18} strokeWidth={2} />
              </button>
            </div>

            {/* Dropdown Container */}
            <div className="flex flex-col gap-2 relative" ref={upgradeDropdownRef}>
              <label className="font-jakarta font-normal text-[14px] leading-[19.6px] text-[#616161]">
                upgrade to <span className="text-[#E51C00]">*</span>
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsUpgradeDropdownOpen(!isUpgradeDropdownOpen)}
                  className={`flex items-center justify-between w-full h-10 px-3 border rounded-[8px] text-[16px] leading-[22.4px] transition-all duration-150 focus:outline-none bg-white cursor-pointer ${isUpgradeDropdownOpen
                    ? 'border-[3px] border-[#C530C5] px-[10px]'
                    : 'border border-[#E3E3E3] hover:border-[#CCCCCC]'
                    }`}
                >
                  <span className="text-[#303030]">{tempUpgradeTier}</span>
                  <ChevronDown
                    size={18}
                    className={`text-[#B5B5B5] transition-transform duration-200 ${isUpgradeDropdownOpen ? 'rotate-180 text-[#303030]' : ''
                      }`}
                  />
                </button>

                {isUpgradeDropdownOpen && (
                  <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-white border border-[#E3E3E3] rounded-lg shadow-lg z-[10001] p-1 flex flex-col gap-0.5 animate-fade-in">
                    {['Tier 1', 'Tier 2', 'Tier 3', 'Tier 4', 'Tier 5'].map((tier) => {
                      const isSelected = tempUpgradeTier === tier;
                      return (
                        <button
                          key={tier}
                          type="button"
                          onClick={() => {
                            setTempUpgradeTier(tier);
                            setIsUpgradeDropdownOpen(false);
                          }}
                          className={`flex items-center justify-between w-full px-3 py-2 text-[14px] font-inter text-left rounded-lg transition-colors duration-150 cursor-pointer ${isSelected
                            ? 'bg-[#FFF5FF] text-[#C530C5] font-medium'
                            : 'text-[#303030] hover:bg-[#F9F9F9]'
                            }`}
                        >
                          <span>{tier}</span>
                          {isSelected && <Check size={20} strokeWidth={2} className="text-[#C530C5]" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-row gap-3 items-center w-full mt-2">
              <button
                type="button"
                onClick={() => {
                  setIsUpgradeModalOpen(false);
                  if (!savedUpgradeTier) {
                    setSelectedReward('');
                  }
                }}
                className="flex-1 h-9 px-4 py-1.5 border border-[#E3E3E3] rounded-[8px] font-inter font-normal text-[14px] leading-[20px] text-[#303030] bg-white hover:bg-[#F9F9F9] active:bg-[#F2F2F2] transition-colors flex items-center justify-center focus:outline-none cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setSavedUpgradeTier(tempUpgradeTier);
                  setIsUpgradeModalOpen(false);
                }}
                className="flex-1 h-9 px-4 py-1.5 rounded-[8px] bg-[#C530C5] text-white font-inter font-normal text-[14px] leading-[20px] flex items-center justify-center hover:shadow-md transition-all focus:outline-none cursor-pointer"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>,
    document.body
  );
};
