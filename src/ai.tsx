
import React, { lazy, Suspense, Component } from 'react';

class DesignErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) { 
    return { hasError: true, error }; 
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', background: '#020617', color: '#3b82f6', border: '1px solid #1e293b', borderRadius: '1.5rem', margin: '20px', fontFamily: 'monospace' }}>
          <h2 style={{ color: '#ef4444', margin: '0 0 10px 0' }}>[SyncBridge] Bridge Failure</h2>
          <p style={{ fontSize: '14px', color: '#94a3b8' }}>Vite could not resolve dependencies in <b>src/ai-studio</b>.</p>
          <div style={{ background: '#000', padding: '15px', borderRadius: '12px', fontSize: '11px', marginTop: '15px', overflowX: 'auto', border: '1px solid #334155' }}>
            <div style={{ color: '#ef4444', fontWeight: 'bold' }}>Error Details:</div>
            {this.state.error?.message}
          </div>
          <div style={{ marginTop: '20px', fontSize: '12px', color: '#64748b' }}>
            <b>Probable Cause:</b> Missing packages (e.g., @google/genai) or missing Vite aliases.<br/><br/>
            <b>Resolution Steps:</b><br/>
            1. Run <code>npm install @google/genai</code> in Lovable terminal.<br/>
            2. Click "Patch Vite Config" in the SyncBridge Hub.<br/>
            3. Ensure your App entry point exists in /src/ai-studio.
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Optimized entry point resolution for mirrored designs
const DesignEntry = lazy(() => {
  return import('./ai-studio/App.tsx')
    .catch(() => import('./ai-studio/App.jsx'))
    .catch(() => import('./ai-studio/index.tsx'))
    .catch(() => import('./ai-studio/index.jsx'))
    .then(mod => {
      // Prioritize default export, fallback to any valid React component found in exports
      return { default: mod.default || Object.values(mod).find(v => typeof v === 'function') };
    });
});

export const AiBridge = (props: any) => (
  <DesignErrorBoundary>
    <Suspense fallback={
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#020617', color: '#3b82f6' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontWeight: '900', letterSpacing: '0.2em' }}>SYNCBRIDGE</p>
          <p style={{ fontSize: '11px', opacity: 0.5 }}>Mounting: /src/ai-studio...</p>
        </div>
      </div>
    }>
      <DesignEntry {...props} />
    </Suspense>
  </DesignErrorBoundary>
);
