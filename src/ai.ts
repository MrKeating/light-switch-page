import React, { lazy, Suspense } from 'react';

const SyncPlaceholder = ({ error }: { error?: string }) => (
  <div style={{ 
    padding: '3rem', 
    textAlign: 'center', 
    fontFamily: 'system-ui, -apple-system, sans-serif',
    background: '#0f172a',
    color: '#f8fafc',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }}>
    <div style={{ 
      background: 'rgba(99, 102, 241, 0.1)', 
      border: '1px solid rgba(99, 102, 241, 0.2)',
      padding: '2rem',
      borderRadius: '1rem',
      maxWidth: '400px'
    }}>
      <h3 style={{ color: '#818cf8', margin: '0 0 1rem 0' }}>SyncBridge Active</h3>
      <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.5' }}>
        {error ? `Error: ${error}` : "Initializing the bridge to your AI Studio project. If this screen persists, ensure you have synced your code to the /src/ai-studio folder."}
      </p>
      <div style={{ marginTop: '1.5rem', fontSize: '0.8rem', color: '#64748b' }}>
        Looking for: App.tsx or index.tsx
      </div>
    </div>
  </div>
);

const loadGeneratedApp = async () => {
  const possiblePaths = [
    () => import('./ai-studio/App'),
    () => import('./ai-studio/index'),
    () => import('./ai-studio/src/App'),
    () => import('./ai-studio/src/main'),
  ];

  for (const attempt of possiblePaths) {
    try {
      const mod = await attempt();
      return mod.default ? { default: mod.default } : { default: mod.App || mod.Main || mod.root };
    } catch (e) {
      continue;
    }
  }
  
  return { default: () => <SyncPlaceholder /> };
};

export const GeneratedApp = lazy(loadGeneratedApp);
export * from './ai-studio';
