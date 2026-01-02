
import React from 'react';

interface DimmerProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

const Dimmer: React.FC<DimmerProps> = ({ value, onChange, disabled }) => {
  return (
    <div className={`w-full max-w-[200px] flex flex-col items-center space-y-3 transition-opacity duration-500 ${disabled ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
      <div className="flex justify-between w-full px-1">
        <span className="text-[10px] uppercase tracking-widest font-semibold text-slate-500">Dim</span>
        <span className="text-[10px] uppercase tracking-widest font-semibold text-slate-500">{value}%</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
        className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500 hover:accent-amber-400 transition-all"
        style={{
          background: `linear-gradient(to right, #f59e0b 0%, #f59e0b ${value}%, #e2e8f0 ${value}%, #e2e8f0 100%)`
        }}
      />
    </div>
  );
};

export default Dimmer;
