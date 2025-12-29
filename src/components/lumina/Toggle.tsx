import React from 'react';

interface ToggleProps {
  isOn: boolean;
  onToggle: () => void;
}

const Toggle: React.FC<ToggleProps> = ({ isOn, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`relative inline-flex h-16 w-32 items-center rounded-full transition-all duration-500 ease-in-out focus:outline-none focus:ring-4 focus:ring-amber-400/20 ${
        isOn ? 'bg-amber-400 shadow-[0_0_30px_rgba(251,191,36,0.4)]' : 'bg-slate-800'
      }`}
    >
      <span className="sr-only">Toggle Light</span>
      <span
        className={`inline-block h-12 w-12 transform rounded-full bg-white transition-transform duration-500 ease-in-out ${
          isOn ? 'translate-x-[72px] shadow-lg scale-110' : 'translate-x-2'
        }`}
      />
      <div className="absolute inset-0 flex items-center justify-between px-6 pointer-events-none">
        <span className={`text-[10px] font-bold uppercase transition-opacity duration-300 ${isOn ? 'opacity-0' : 'opacity-40 text-white'}`}>Off</span>
        <span className={`text-[10px] font-bold uppercase transition-opacity duration-300 ${isOn ? 'opacity-100 text-amber-900' : 'opacity-0'}`}>On</span>
      </div>
    </button>
  );
};

export default Toggle;
