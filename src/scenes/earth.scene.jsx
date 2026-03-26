import { gsap } from 'gsap';

/**
 * earth.scene.jsx - GSAP orchestration for Scene 1
 * 
 * Manages the complete animation timeline for the Earth scene:
 * - Logo fade-in with delay
 * - Globe rotation animation
 * - ASCII motion blur timing
 * - Scroll-triggered animations
 * 
 * Exports animation functions for integration with parallax scroll system.
 */

/**
 * Initialize Earth scene animations on mount
 * Creates timeline for scene load sequence
 * 
 * @param {object} elements - Refs to animated elements
 * @returns {object} - GSAP timeline instance
 */
export function initEarthScene(elements = {}) {
  const {
    globe = null,
    logo = null,
    asciiTrail = null
  } = elements;
  
  const tl = gsap.timeline();
  
  // Scene load sequence
  if (logo) {
    tl.to(logo, {
      opacity: 1,
      duration: 0.8,
      delay: 0.5,
      ease: 'power2.out',
      name: 'logoFadeIn'
    });
  }
  
  // Globe rotation animation
  if (globe) {
    tl.to(globe, {
      rotationY: 2 * Math.PI,
      duration: 20,
      ease: 'none',
      repeat: -1,
      name: 'globeRotate'
    }, 0); // Start at same time as logo fade
  }
  
  // ASCII motion trail animation
  if (asciiTrail) {
    tl.to(asciiTrail, {
      x: 100,
      opacity: 0.3,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      name: 'asciiMotion'
    }, 0);
  }
  
  // Add subtle pulse to entire scene
  tl.to('.scene-1', {
    boxShadow: 'inset 0 0 50px rgba(0, 255, 255, 0.1)',
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    name: 'scenePulse'
  }, 0);
  
  return tl;
}

/**
 * Create scroll-triggered animations for Earth scene
 * Integrates with GSAP ScrollTrigger for parallax effects
 * 
 * @param {object} scene - Scene element reference
 * @returns {object} - ScrollTrigger instance
 */
export function createScrollTriggers(scene) {
  if (!window.ScrollTrigger) {
    console.warn('ScrollTrigger not loaded');
    return null;
  }
  
  const triggers = [];
  
  // Fade globe based on scroll
  triggers.push(
    window.ScrollTrigger.create({
      trigger: `${scene} .globe-container`,
      start: 'top top',
      end: 'bottom top',
      onUpdate: (self) => {
        const progress = self.progress;
        const globe = document.querySelector('.scene-1 .globe-container canvas');
        
        if (globe) {
          // Fade out as we scroll down
          gsap.to(globe, {
            opacity: 1 - progress * 0.7,
            duration: 0.5,
            ease: 'power2.inOut'
          });
          
          // Slight scale effect
          gsap.to(globe, {
            scale: 1 + progress * 0.1,
            duration: 0.5,
            ease: 'power2.inOut'
          });
        }
      }
    })
  );
  
  // Logo appears as globe fades
  triggers.push(
    window.ScrollTrigger.create({
      trigger: `${scene} .logo-section`,
      start: 'top center',
      end: 'bottom center',
      onUpdate: (self) => {
        const logo = document.querySelector('.logo-section');
        if (logo) {
          gsap.to(logo, {
            opacity: self.progress,
            y: -20 * (1 - self.progress),
            duration: 0.5,
            ease: 'power2.inOut'
          });
        }
      }
    })
  );
  
  return triggers;
}

/**
 * Create Earth scene animations
 * Main orchestration function for parallax integration
 * 
 * @returns {object} - Object containing all animation functions
 */
export function sceneAnimations() {
  const animations = {
    timeline: null,
    scrollTriggers: [],
    
    /**
     * Initialize animations
     * @param {HTMLElement} sceneEl - Scene 1 element
     */
    init(sceneEl) {
      this.cleanup();
      
      // Get element references
      const globe = sceneEl.querySelector('.globe-container canvas');
      const logo = sceneEl.querySelector('.logo-section');
      const asciiTrail = sceneEl.querySelector('canvas');
      
      // Create scroll triggers
      if (window.ScrollTrigger) {
        this.scrollTriggers = createScrollTriggers(sceneEl);
      }
      
      return this;
    },
    
    /**
     * Animate globe rotation
     * @param {number} duration - Animation duration
     * @param {number} rotations - Number of rotations
     */
    rotateGlobe(duration = 20, rotations = 1) {
      const globe = document.querySelector('.scene-1 .globe-container canvas');
      if (globe) {
        gsap.to(globe, {
          rotationY: rotations * 2 * Math.PI,
          duration: duration,
          ease: 'none'
        });
      }
    },
    
    /**
     * Animate ASCII motion
     * @param {object} params - Animation parameters
     */
    animateAsciiMotion(params = {}) {
      const asciiTrail = document.querySelector('.scene-1 canvas');
      if (asciiTrail) {
        gsap.to(asciiTrail, params);
      }
    },
    
    /**
     * Control logo visibility
     * @param {boolean} visible - Whether to show logo
     */
    showLogo(visible = true) {
      const logo = document.querySelector('.logo-section');
      if (logo) {
        if (visible) {
          gsap.to(logo, {
            opacity: 1,
            duration: 0.8,
            delay: 0.5,
            ease: 'power2.out'
          });
        } else {
          gsap.to(logo, {
            opacity: 0,
            duration: 0.5
          });
        }
      }
    },
    
    /**
     * Update animation speeds based on scroll
     * @param {number} scrollProgress - 0-1 scroll progress
     */
    updateSpeed(scrollProgress) {
      const globe = document.querySelector('.scene-1 .globe-container canvas');
      if (globe) {
        // Speed up rotation as we scroll
        const speed = 1 + scrollProgress * 5;
        gsap.to(globe, {
          autoRotateSpeed: speed,
          duration: 1
        });
      }
    },
    
    /**
     * Clean up all animations
     */
    cleanup() {
      // Kill all GSAP tweens
      gsap.globalTimeline?.clear();
      
      // Kill all scroll triggers
      this.scrollTriggers?.forEach(trigger => trigger.kill());
      this.scrollTriggers = [];
    },
    
    /**
     * Get current animation state
     * @returns {object} - State object
     */
    getState() {
      return {
        scrollTriggersCount: this.scrollTriggers.length,
        hasTimeline: !!this.timeline,
        animations: {
          globe: !!document.querySelector('.scene-1 .globe-container'),
          logo: !!document.querySelector('.logo-section'),
          ascii: !!document.querySelector('.scene-1 canvas')
        }
      };
    }
  };
  
  return animations;
}

/**
 * Register scene animations globally
 * Called when app initializes
 */
export function registerEarthScene() {
  if (typeof window !== 'undefined') {
    window.wolfsiteScenes = window.wolfsiteScenes || {};
    window.wolfsiteScenes.earth = sceneAnimations();
  }
}

// Auto-register on import
registerEarthScene();

export default {
  initEarthScene,
  createScrollTriggers,
  sceneAnimations,
  registerEarthScene
};
