
import React, { useState, useCallback, useRef, useEffect } from 'react';
import LightBulb from './components/LightBulb';
import Toggle from './components/Toggle';
import Dimmer from './components/Dimmer';
import SettingsMenu from './components/SettingsMenu';
import { getSmartResponse } from './services/geminiService';
import { audioService } from './services/audioService';
import { LightStatus, AIPersonality } from './types';

const STORAGE_KEYS = {
  BRIGHTNESS: 'lumina_brightness',
  SOUNDS_ENABLED: 'lumina_sounds_enabled',
  PERSONALITY: 'lumina_personality',
};

const App: React.FC = () => {
  const [isOn, setIsOn] = useState(false);
  const [brightness, setBrightness] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.BRIGHTNESS);
    return saved !== null ? parseInt(saved, 10) : 80;
  });
  
  // Settings States
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [soundsEnabled, setSoundsEnabled] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SOUNDS_ENABLED);
    return saved !== null ? saved === 'true' : true;
  });
  const [personality, setPersonality] = useState<AIPersonality>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PERSONALITY);
    return (saved as AIPersonality) || AIPersonality.SASSY;
  });

  const [aiMessage, setAiMessage] = useState("Darkness is efficient.");
  const [isLoading, setIsLoading] = useState(false);
  const lastTickValue = useRef(brightness);

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SOUNDS_ENABLED, soundsEnabled.toString());
  }, [soundsEnabled]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PERSONALITY, personality);
  }, [personality]);

  const handleToggle = useCallback(async () => {
    const newState = !isOn;
    setIsOn(newState);
    setIsLoading(true);

    // Play Sound if enabled
    if (soundsEnabled) {
      audioService.playToggleSound(newState);
    }

    // Call Gemini with current personality
    const status = newState ? LightStatus.ON : LightStatus.OFF;
    const message = await getSmartResponse(status, personality);
    setAiMessage(message);
    setIsLoading(false);
  }, [isOn, soundsEnabled, personality]);

  const handleBrightnessChange = (value: number) => {
    setBrightness(value);
    localStorage.setItem(STORAGE_KEYS.BRIGHTNESS, value.toString());
    
    // Play a subtle tick if enabled
    if (soundsEnabled && Math.abs(value - lastTickValue.current) >= 2) {
      audioService.playDimmerTick(value);
      lastTickValue.current = value;
    }
  };

  return (
    <div 
      className="min-h-screen w-full transition-colors duration-1000 flex flex-col items-center justify-center p-6 relative"
      style={{ backgroundColor: isOn ? '#fffaf0' : '#0f172a' }}
    >
      {/* Settings Trigger */}
      <button 
        onClick={() => setIsSettingsOpen(true)}
        className={`absolute top-8 right-8 p-3 rounded-full backdrop-blur-md border transition-all duration-500 z-40 ${
          isOn 
            ? 'bg-slate-900/5 border-slate-900/10 text-slate-900 hover:bg-slate-900/10' 
            : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
        }`}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      </button>

      {/* Settings Menu Component */}
      <SettingsMenu 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        ambientSoundEnabled={soundsEnabled}
        setAmbientSoundEnabled={setSoundsEnabled}
        personality={personality}
        setPersonality={setPersonality}
        isOn={isOn}
      />

      {/* Dynamic Background Overlay */}
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
          <div className="flex flex-col items-center space-y-8 w-full bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-xl">
            <Toggle isOn={isOn} onToggle={handleToggle} />
            <div className="w-full space-y-6 flex flex-col items-center">
              <Dimmer 
                value={brightness} 
                onChange={handleBrightnessChange} 
                disabled={!isOn} 
              />
            </div>
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
