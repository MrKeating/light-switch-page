import React, { Suspense } from 'react';
import { GeneratedApp } from './ai';

function App() {
  return (
    <div id="lovable-bridge-container">
      <Suspense fallback={<div style={{padding: '50px', textAlign: 'center', color: '#64748b', background: '#0f172a', minHeight: '100vh'}}>Linking AI Assets...</div>}>
        <GeneratedApp />
      </Suspense>
    </div>
  );
}

export default App;
