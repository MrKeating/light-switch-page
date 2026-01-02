
import React, { useState, useCallback } from 'react';
import LightBulb from './components/LightBulb';
import Toggle from './components/Toggle';
import Dimmer from './components/Dimmer';
import { getSmartResponse } from './services/geminiService';
import { LightStatus } from './types';

const App: React.FC = () => {
  const [isOn, setIsOn] = useState(false);
  const [brightness, setBrightness] = useState(80);
  const [aiMessage, setAiMessage] = useState("Darkness is efficient.");
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = useCallback(async () => {
    const newState = !isOn;
    setIsOn(newState);
    setIsLoading(true);

    // Call Gemini for a witty response based on the new state
    const status = newState ? LightStatus.ON : LightStatus.OFF;
    const message = await getSmartResponse(status);
    setAiMessage(message);
    setIsLoading(false);
  }, [isOn]);

  const handleBrightnessChange = (value: number) => {
    setBrightness(value);
  };

  // Calculate background color based on brightness
  const bgOpacity = isOn ? (brightness / 100) * 0.15 : 0;
  const bgColor = isOn 
    ? `rgba(255, 250, 240, 1)` 
    : `rgba(15, 23, 42, 1)`;

  return (
    <div 
      className="min-h-screen w-full transition-colors duration-1000 flex flex-col items-center justify-center p-6"
      style={{ backgroundColor: isOn ? '#fffaf0' : '#0f172a' }}
    >
      {/* Dynamic Background Overlay for extra brightness feel */}
      <div 
        className="fixed inset-0 pointer-events-none transition-opacity duration-700"
        style={{ 
          backgroundColor: 'white', 
          opacity: isOn ? (brightness / 100) * 0.4 : 0 
        }}
      />

      {/* Background Ambience Radial */}
      <div className={`fixed inset-0 pointer-events-none transition-opacity duration-1000 ${isOn ? 'opacity-30' : 'opacity-10'}`}>
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle,rgba(251,191,36,0.15)_0%,transparent_70%)]" 
          style={{ transform: `translate(-50%, -50%) scale(${0.8 + (brightness/100) * 0.4})` }}
        />
      </div>

      {/* Main Container */}
      <main className="relative z-10 w-full max-w-md flex flex-col items-center space-y-10">
        <header className="text-center space-y-2">
          <h1 className={`text-4xl font-extralight tracking-tighter transition-colors duration-700 ${
            isOn ? 'text-slate-900' : 'text-slate-100'
          }`}>
            Lumina
          </h1>
          <p className={`text-sm font-light transition-colors duration-700 ${
            isOn ? 'text-slate-500' : 'text-slate-400'
          }`}>
            A smarter way to shed light.
          </p>
        </header>

        {/* Visual Light Section */}
        <div className="pt-4">
          <LightBulb isOn={isOn} brightness={brightness} />
        </div>

        {/* Control Section */}
        <div className="flex flex-col items-center space-y-8 w-full">
          <div className="flex flex-col items-center space-y-10 w-full bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 shadow-xl">
            <Toggle isOn={isOn} onToggle={handleToggle} />
            <Dimmer 
              value={brightness} 
              onChange={handleBrightnessChange} 
              disabled={!isOn} 
            />
          </div>
          
          <div className="h-12 flex items-center justify-center text-center px-4">
            <p className={`text-lg italic transition-all duration-500 ${
              isLoading ? 'opacity-50 blur-sm' : 'opacity-100'
            } ${isOn ? 'text-amber-800' : 'text-blue-300'}`}>
              "{aiMessage}"
            </p>
          </div>
        </div>
      </main>

      {/* Footer Branding */}
      <footer className={`absolute bottom-8 text-[10px] font-bold tracking-[0.2em] uppercase transition-colors duration-700 ${
        isOn ? 'text-slate-400' : 'text-slate-600'
      }`}>
        Gemini Intelligence Powered
      </footer>
    </div>
  );
};

export default App;
