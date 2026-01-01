
import React, { lazy, Suspense, Component, ReactNode, ErrorInfo } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class DesignErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  
  static getDerivedStateFromError(error: Error): ErrorBoundaryState { 
    return { hasError: true, error }; 
  }
  
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('DesignErrorBoundary caught error:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', background: '#020617', color: '#3b82f6', border: '1px solid #1e293b', borderRadius: '1.5rem', margin: '20px', fontFamily: 'monospace' }}>
          <h2 style={{ color: '#ef4444', margin: '0 0 10px 0' }}>[SyncBridge] Bridge Failure</h2>
          <p style={{ fontSize: '14px', color: '#94a3b8' }}>Could not load the design components.</p>
          <div style={{ background: '#000', padding: '15px', borderRadius: '12px', fontSize: '11px', marginTop: '15px', overflowX: 'auto', border: '1px solid #334155' }}>
            <div style={{ color: '#ef4444', fontWeight: 'bold' }}>Error Details:</div>
            {this.state.error?.message}
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Load the AI Studio App component
const DesignEntry = lazy(() => import('./ai-studio/App'));

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
