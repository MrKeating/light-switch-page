import React, { lazy, Suspense } from 'react';
const SyncPlaceholder = () => (
  <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'sans-serif' }}>
    <h3 style={{ color: '#6366f1' }}>Syncing AI Studio Content...</h3>
    <p style={{ color: '#94a3b8' }}>Checking <b>App.tsx</b> or <b>index.tsx</b> in the managed folder.</p>
  </div>
);
const loadGeneratedApp = async () => {
  try {
    const mod = await import('./ai-studio/App');
    return mod.default ? { default: mod.default } : { default: mod.App };
  } catch (e1) {
    try {
      const mod = await import('./ai-studio/index');
      return mod.default ? { default: mod.default } : { default: mod.App || mod.Main };
    } catch (e2) {
      return { default: SyncPlaceholder };
    }
  }
};
export const GeneratedApp = lazy(loadGeneratedApp);
export * from './ai-studio';
