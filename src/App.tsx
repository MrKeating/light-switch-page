import React, { Suspense } from 'react';
import { GeneratedApp } from './ai';

/**
 * LOVABLE MIRROR ENTRYPOINT
 * This forces Lovable to render your AI Studio project directly.
 */
function App() {
  return (
    <div className="lovable-bridge-container">
      <Suspense fallback={<div className="p-10 text-center">Loading AI Bridge...</div>}>
        <GeneratedApp />
      </Suspense>
    </div>
  );
}

export default App;
