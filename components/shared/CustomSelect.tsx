'use client';

import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { ChevronDown, Check, Search, GraduationCap } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface OptionGroup {
  groupName: string;
  options: SelectOption[];
}

interface CustomSelectProps {
  options?: SelectOption[];
  groups?: OptionGroup[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  searchable?: boolean;
  placement?: 'bottom' | 'top' | 'auto';
}

export default function CustomSelect({
  options,
  groups,
  value,
  onChange,
  placeholder = 'Select an option',
  disabled = false,
  className = '',
  searchable,
  placement = 'auto',
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [openUpwards, setOpenUpwards] = useState(placement === 'top');
  const [maxDropdownHeight, setMaxDropdownHeight] = useState<number>(240);

  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Flatten all available options across groups or flat options list
  const allOptions = useMemo<SelectOption[]>(() => {
    if (groups && groups.length > 0) {
      return groups.flatMap((g) => g.options);
    }
    return options || [];
  }, [groups, options]);

  const selectedOption = allOptions.find((opt) => opt.value === value);

  // Auto-enable search if total items > 6 unless explicitly overridden
  const isSearchEnabled = searchable !== undefined ? searchable : allOptions.length > 6;

  // Filtered groups by search term
  const filteredGroups = useMemo(() => {
    if (!groups) return undefined;
    if (!searchTerm.trim()) return groups;
    const term = searchTerm.toLowerCase();
    return groups
      .map((g) => {
        const groupMatches = g.groupName.toLowerCase().includes(term);
        const matchingOptions = g.options.filter(
          (opt) => groupMatches || opt.label.toLowerCase().includes(term)
        );
        return {
          ...g,
          options: matchingOptions,
        };
      })
      .filter((g) => g.options.length > 0);
  }, [groups, searchTerm]);

  // Filtered flat options by search term
  const filteredOptions = useMemo(() => {
    if (!options) return undefined;
    if (!searchTerm.trim()) return options;
    const term = searchTerm.toLowerCase();
    return options.filter((opt) => opt.label.toLowerCase().includes(term));
  }, [options, searchTerm]);

  // Dynamic placement calculation to prevent pushing the page up/down
  const calculatePlacement = useCallback(() => {
    if (!containerRef.current) return;
    if (placement === 'top') {
      setOpenUpwards(true);
      return;
    }
    if (placement === 'bottom') {
      setOpenUpwards(false);
      return;
    }

    const rect = containerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    // Prefer opening upwards if space below is tight (< 240px) and there's more room above
    const preferUp = spaceBelow < 240 && spaceAbove > spaceBelow;
    setOpenUpwards(preferUp);

    const availableSpace = preferUp ? spaceAbove - 20 : spaceBelow - 20;
    setMaxDropdownHeight(Math.max(140, Math.min(240, Math.floor(availableSpace))));
  }, [placement]);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        setSearchTerm('');
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Reposition on window resize or scroll while open
  useEffect(() => {
    if (!isOpen) return;

    const onReposition = () => {
      calculatePlacement();
    };

    window.addEventListener('resize', onReposition);
    window.addEventListener('scroll', onReposition, true);
    return () => {
      window.removeEventListener('resize', onReposition);
      window.removeEventListener('scroll', onReposition, true);
    };
  }, [isOpen, calculatePlacement]);

  // Auto-focus search input without scrolling the viewport
  useEffect(() => {
    if (isOpen && isSearchEnabled) {
      const timer = setTimeout(() => {
        searchInputRef.current?.focus({ preventScroll: true });
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isSearchEnabled]);

  const toggleDropdown = () => {
    if (disabled) return;
    setIsOpen((prev) => {
      const next = !prev;
      if (next) {
        setSearchTerm('');
        calculatePlacement();
      }
      return next;
    });
  };

  const selectOption = (optValue: string) => {
    onChange(optValue);
    setIsOpen(false);
    setSearchTerm('');
  };

  const hasItems = groups
    ? filteredGroups && filteredGroups.some((g) => g.options.length > 0)
    : filteredOptions && filteredOptions.length > 0;

  return (
    <div ref={containerRef} className={`relative ${isOpen ? 'z-30' : 'z-10'} ${className}`}>
      <button
        type="button"
        disabled={disabled}
        onClick={toggleDropdown}
        className={`w-full px-4 py-3 bg-white border rounded-xl text-sm flex items-center justify-between text-left transition-all cursor-pointer ${
          isOpen
            ? 'border-green-600 ring-2 ring-green-600/10'
            : 'border-gray-200 hover:border-gray-300'
        } ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span
          className={`truncate block ${
            selectedOption ? 'text-gray-900 font-medium' : 'text-gray-400'
          }`}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 shrink-0 ml-2 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-green-600' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div
          className={`absolute left-0 right-0 bg-white border border-[#E2EBE5] rounded-2xl shadow-xl z-50 p-2 overflow-y-auto overscroll-contain animate-in fade-in zoom-in-95 duration-150 ${
            openUpwards ? 'bottom-full mb-1.5' : 'top-full mt-1.5'
          }`}
          style={{ maxHeight: `${maxDropdownHeight}px` }}
        >
          {/* Search bar inside dropdown */}
          {isSearchEnabled && (
            <div className="p-1 pb-2 sticky top-0 bg-white z-10 border-b border-gray-100 mb-1">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-green-600 focus:bg-white transition-colors"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
          )}

          {!hasItems ? (
            <div className="px-3.5 py-4 text-xs text-gray-400 text-center">
              {searchTerm ? 'No matching results found' : 'No options available'}
            </div>
          ) : groups ? (
            /* Grouped / Cascading Dropdown Layout (Faculty -> Departments) */
            filteredGroups?.map((group, groupIdx) => {
              if (group.options.length === 0) return null;
              return (
                <div
                  key={group.groupName || groupIdx}
                  className={groupIdx > 0 ? 'mt-2.5 pt-2 border-t border-gray-100' : ''}
                >
                  {/* Faculty / School Category Header (Non-selectable) */}
                  <div className="px-3 py-1.5 text-[11px] font-bold text-gray-500 uppercase tracking-wider select-none flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span className="truncate">{group.groupName}</span>
                  </div>

                  {/* Indented Selectable Departments */}
                  <div className="mt-1 space-y-0.5">
                    {group.options.map((opt) => {
                      const isSelected = opt.value === value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => selectOption(opt.value)}
                          className={`w-full pl-7 pr-3.5 py-2 text-sm rounded-xl text-left cursor-pointer transition-colors flex items-center justify-between ${
                            isSelected
                              ? 'bg-[#F0FDF4] text-[#15803D] font-semibold'
                              : 'text-gray-700 hover:bg-[#F0FDF4] hover:text-[#15803D]'
                          }`}
                          role="option"
                          aria-selected={isSelected}
                        >
                          <span className="truncate">{opt.label}</span>
                          {isSelected && <Check className="w-4 h-4 text-green-600 shrink-0 ml-2" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })
          ) : (
            /* Flat Dropdown Layout */
            <div className="space-y-0.5">
              {filteredOptions?.map((opt) => {
                const isSelected = opt.value === value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => selectOption(opt.value)}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl text-left cursor-pointer transition-colors flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#F0FDF4] text-[#15803D] font-semibold'
                        : 'text-gray-700 hover:bg-[#F0FDF4] hover:text-[#15803D]'
                    }`}
                    role="option"
                    aria-selected={isSelected}
                  >
                    <span className="truncate">{opt.label}</span>
                    {isSelected && <Check className="w-4 h-4 text-green-600 shrink-0 ml-2" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
