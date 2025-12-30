import React, { Suspense } from 'react';
import { GeneratedApp } from './ai';
function App() {
  return (
    <div id="lovable-bridge-container">
      <Suspense fallback={<div style={{padding: '50px', textAlign: 'center', color: '#64748b'}}>Initializing Bridge...</div>}>
        <GeneratedApp />
      </Suspense>
    </div>
  );
}
export default App;
