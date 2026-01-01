
import React from 'react';
import { AiBridge } from './ai';

function App() {
  return (
    <div className="syncbridge-mirror-root" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        html, body, #root { height: 100% !important; min-height: 100vh !important; margin: 0 !important; }
      `}</style>
      <AiBridge />
    </div>
  );
}

export default App;
