import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Scene1Earth from './components/scenes/Scene1-Earth';
import Scene2Atmosphere from './components/scenes/Scene2-Atmosphere';
import Scene3NeTokyo from './components/scenes/Scene3-NeTokyo';
import Scene4PEPEScene from './components/scenes/Scene4-PEPEScene';
import gsap from 'gsap';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    const scenes = [
      document.querySelector('.scene-1'),
      document.querySelector('.scene-2'),
      document.querySelector('.scene-3'),
      document.querySelector('.scene-4'),
    ];

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
    });

    scenes.forEach((scene, index) => {
      if (scene) {
        tl.to(scene, {
          opacity: 1,
          ease: 'none',
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

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
