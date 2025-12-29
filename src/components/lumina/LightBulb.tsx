import React from 'react';

interface LightBulbProps {
  isOn: boolean;
  brightness: number;
}

const LightBulb: React.FC<LightBulbProps> = ({ isOn, brightness }) => {
  const effectiveBrightness = isOn ? brightness / 100 : 0;
  
  return (
    <div className="relative flex flex-col items-center">
      {/* Glow Effect */}
      <div 
        className="absolute -top-32 w-64 h-64 rounded-full blur-[100px] transition-all duration-700 ease-out"
        style={{
          backgroundColor: isOn ? 'rgba(251, 191, 36, 1)' : 'rgba(30, 58, 138, 1)',
          opacity: isOn ? 0.2 + (effectiveBrightness * 0.6) : 0.1,
          transform: `scale(${isOn ? 1 + (effectiveBrightness * 0.8) : 1})`,
        }}
      />
      
      {/* Light Bulb SVG */}
      <div className={`relative z-10 transition-transform duration-700 ${isOn ? 'scale-110' : 'scale-100'}`}>
        <svg 
          width="120" 
          height="120" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="transition-colors duration-700"
          style={{
            color: isOn ? `rgba(251, 191, 36, ${0.4 + (effectiveBrightness * 0.6)})` : '#334155',
            filter: isOn ? `drop-shadow(0 0 ${5 + effectiveBrightness * 20}px rgba(251, 191, 36, ${0.5 + effectiveBrightness * 0.5}))` : 'none'
          }}
        >
          <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5" />
          <line x1="9" y1="18" x2="15" y2="18" />
          <line x1="10" y1="22" x2="14" y2="22" />
        </svg>
      </div>

      {/* Decorative Cable */}
      <div className="w-0.5 h-48 bg-gradient-to-b from-slate-900 via-slate-700 to-transparent -mt-1 opacity-50" />
    </div>
  );
};

export default LightBulb;
