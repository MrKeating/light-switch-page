
import React from 'react';
import { AiBridge } from './ai';

/**
 * SyncBridge Managed App
 * This file redirects your app to the AI Studio design folder.
 * 
 * Safety: minHeight is applied to prevent layout collapse.
 */
function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AiBridge />
    </div>
  );
}

export default App;
