
import React from 'react';

interface LightBulbProps {
  isOn: boolean;
  brightness: number;
  colorTemp: number; // 0 (warm) to 100 (cool)
}

const LightBulb: React.FC<LightBulbProps> = ({ isOn, brightness, colorTemp }) => {
  const effectiveBrightness = isOn ? brightness / 100 : 0;
  
  // Interpolate color based on temperature
  // Warm: Amber (251, 191, 36) -> Neutral: White (255, 255, 255) -> Cool: Blue (153, 204, 255)
  const getBulbColor = () => {
    if (colorTemp <= 50) {
      // Warm to Neutral
      const ratio = colorTemp / 50;
      const r = 251 + (255 - 251) * ratio;
      const g = 191 + (255 - 191) * ratio;
      const b = 36 + (255 - 36) * ratio;
      return `rgb(${r}, ${g}, ${b})`;
    } else {
      // Neutral to Cool
      const ratio = (colorTemp - 50) / 50;
      const r = 255 - (255 - 153) * ratio;
      const g = 255 - (255 - 204) * ratio;
      const b = 255;
      return `rgb(${r}, ${g}, ${b})`;
    }
  };

  const currentColor = getBulbColor();
  const baseOffColor = '#334155';
  
  return (
    <div className="relative flex flex-col items-center">
      {/* Glow Effect */}
      <div 
        className="absolute -top-32 w-64 h-64 rounded-full blur-[100px] transition-all duration-700 ease-out"
        style={{
          backgroundColor: isOn ? currentColor : 'rgba(30, 58, 138, 1)',
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
            color: isOn ? currentColor : baseOffColor,
            filter: isOn ? `drop-shadow(0 0 ${5 + effectiveBrightness * 20}px ${currentColor})` : 'none'
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
