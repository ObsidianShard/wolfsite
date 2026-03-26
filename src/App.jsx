import Scene1Earth from './components/scenes/Scene1-Earth';
import Scene2Atmosphere from './components/scenes/Scene2-Atmosphere';
import Scene3NeTokyo from './components/scenes/Scene3-NeTokyo';
import Scene4PEPEScene from './components/scenes/Scene4-PEPEScene';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  return (
    <div className="wolfsite-app">
      <Scene1Earth className="scene scene-1" />
      <Scene2Atmosphere className="scene scene-2" />
      <Scene3NeTokyo className="scene scene-3" />
      <Scene4PEPEScene className="scene scene-4" />
    </div>
  );
}

export default App;
