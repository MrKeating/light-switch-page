
import React, { lazy, Suspense } from 'react';

// Resilient Loader: AI Studio often changes entry point names
const loadDesign = async () => {
  const paths = [
    () => import('./ai-studio/App.tsx'),
    () => import('./ai-studio/index.tsx'),
    () => import('./ai-studio/src/App.tsx'),
  ];
  
  for (const loader of paths) {
    try {
      const mod = await loader();
      return { default: mod.default || Object.values(mod).find(v => typeof v === 'function') };
    } catch (e) { continue; }
  }
  throw new Error("Design entry point not found in /src/ai-studio");
};

const DesignEntry = lazy(loadDesign);

export const AiBridge = (props: any) => (
  <Suspense fallback={
    <div style={{
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      background: '#0f172a', 
      color: '#64748b',
      fontFamily: 'sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontWeight: 'bold', letterSpacing: '0.1em' }}>SYNCBRIDGE</p>
        <p style={{ fontSize: '12px', opacity: 0.6 }}>Loading AI Design components...</p>
      </div>
    </div>
  }>
    <DesignEntry {...props} />
  </Suspense>
);
