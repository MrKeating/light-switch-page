/**
 * THE BRIDGE ENTRYPOINT
 * This file translates AI Studio exports into your main app.
 */
import React, { lazy, Suspense } from 'react';

// Fallback component while syncing or if entrypoint is missing
const SyncPlaceholder = () => (
  <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'sans-serif' }}>
    <h3>Syncing AI Studio Content...</h3>
    <p>If this persists, check that your AI repo has an <b>App.tsx</b> or <b>index.tsx</b>.</p>
  </div>
);

/**
 * LOVABLE MIRROR: Exported for src/App.tsx
 * We use dynamic import to prevent build errors if files are temporarily missing.
 */
export const GeneratedApp = lazy(() => 
  import('./ai-studio/App').catch(() => 
    import('./ai-studio/index').catch(() => ({ default: SyncPlaceholder }))
  )
);

export * from './ai-studio';
