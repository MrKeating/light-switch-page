
import React from 'react';

interface ColorTempSliderProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

const ColorTempSlider: React.FC<ColorTempSliderProps> = ({ value, onChange, disabled }) => {
  return (
    <div className={`w-full max-w-[200px] flex flex-col items-center space-y-3 transition-opacity duration-500 ${disabled ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
      <div className="flex justify-between w-full px-1">
        <span className="text-[10px] uppercase tracking-widest font-semibold text-slate-500">Temp</span>
        <span className="text-[10px] uppercase tracking-widest font-semibold text-slate-500">
          {value < 33 ? 'Warm' : value < 66 ? 'Neutral' : 'Cool'}
        </span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
        className="w-full h-1.5 rounded-lg appearance-none cursor-pointer transition-all accent-slate-400"
        style={{
          background: `linear-gradient(to right, #ffcc33 0%, #ffffff 50%, #99ccff 100%)`
        }}
      />
    </div>
  );
};

export default ColorTempSlider;
