import { useEffect, lazy, Suspense } from 'react';

const Scene1Earth = lazy(() => import('./components/scenes/Scene1-Earth'));
const Scene2Atmosphere = lazy(() => import('./components/scenes/Scene2-Atmosphere'));
const Scene3NeTokyo = lazy(() => import('./components/scenes/Scene3-NeTokyo'));
const Scene4PEPEScene = lazy(() => import('./components/scenes/Scene4-PEPEScene'));

function App() {
  return (
    <div className="wolfsite-app">
      <Suspense fallback={<div style={{minHeight: '100vh', background: '#0a0a0f', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00f5ff', fontSize: '24px'}}>Loading Wolfsite...</div>}>
        <Scene1Earth className="scene scene-1" />
        <Scene2Atmosphere className="scene scene-2" />
        <Scene3NeTokyo className="scene scene-3" />
        <Scene4PEPEScene className="scene scene-4" />
      </Suspense>
    </div>
  );
}

export default App;
