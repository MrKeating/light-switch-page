
import React from 'react';
import { AIPersonality } from '../types';

interface SettingsMenuProps {
  isOpen: boolean;
  onClose: () => void;
  ambientSoundEnabled: boolean;
  setAmbientSoundEnabled: (val: boolean) => void;
  personality: AIPersonality;
  setPersonality: (val: AIPersonality) => void;
  isOn: boolean;
}

const SettingsMenu: React.FC<SettingsMenuProps> = ({ 
  isOpen, 
  onClose, 
  ambientSoundEnabled, 
  setAmbientSoundEnabled, 
  personality, 
  setPersonality,
  isOn
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className={`relative w-full max-w-sm p-8 rounded-[2.5rem] border border-white/10 shadow-2xl transition-all duration-500 ${
        isOn ? 'bg-white/90 text-slate-900' : 'bg-slate-900/90 text-slate-100'
      }`}>
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-black/5 transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <h2 className="text-2xl font-light mb-8 tracking-tight">Settings</h2>

        <div className="space-y-8">
          {/* Sounds Toggle */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <label className="text-sm font-semibold uppercase tracking-wider opacity-60">UI Sounds</label>
              <p className="text-xs opacity-40">Audio feedback on interaction</p>
            </div>
            <button 
              onClick={() => setAmbientSoundEnabled(!ambientSoundEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                ambientSoundEnabled ? 'bg-amber-400' : 'bg-slate-700'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                ambientSoundEnabled ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          {/* Personality Select */}
          <div className="space-y-3">
            <label className="text-sm font-semibold uppercase tracking-wider opacity-60">AI Personality</label>
            <div className="grid grid-cols-3 gap-2">
              {Object.values(AIPersonality).map((p) => (
                <button
                  key={p}
                  onClick={() => setPersonality(p)}
                  className={`py-2 px-1 rounded-xl text-xs font-medium border transition-all ${
                    personality === p 
                      ? 'bg-amber-400/20 border-amber-400 text-amber-500' 
                      : 'border-white/10 hover:border-white/30 opacity-60'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Placeholder for future settings */}
          <div className="pt-4 border-t border-white/5 opacity-30">
            <p className="text-[10px] uppercase tracking-[0.2em] text-center">More settings coming soon</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsMenu;
