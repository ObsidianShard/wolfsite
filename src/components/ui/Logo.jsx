import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * WOLFSKIND Logo Component
 * 
 * Animated logo with:
 * - Fade-in on mount
 * - Neon cyan/magenta glow effect
 * - Subtle pulse animation
 * - Wolf emoji/icon integration
 * 
 * @param {object} props
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.visible] - Control visibility
 * @param {string} [props.text="WOLFSKIND"] - Logo text
 */
export function Logo({ className = '', visible = true, text = 'WOLFSKIND' }) {
  const logoRef = useRef(null);
  const glowRef = useRef(null);
  
  useEffect(() => {
    if (!visible || !logoRef.current) return;
    
    const logo = logoRef.current;
    const glow = glowRef.current;
    
    // Timeline for logo animation
    const tl = gsap.timeline();
    
    // Fade in logo
    tl.to(logo, {
      opacity: 1,
      duration: 0.8,
      delay: 0.5,
      ease: 'power2.out'
    });
    
    // Cleanup
    return () => {
      tl.kill();
    };
  }, [visible]);
  
  if (!visible) return null;
  
  return (
    <div className={`wolfskind-logo ${className}`} ref={logoRef} style={{ opacity: 0 }}>
      <div className="logo-glow" ref={glowRef}></div>
      <div className="logo-content">
        <span className="logo-emoji">🐺</span>
        <span className="logo-text">{text}</span>
        <span className="logo-emoji">🐺</span>
      </div>
      <style jsx>{`
        .wolfskind-logo {
          position: relative;
          text-align: center;
          padding: 1.5rem 3rem;
          background: linear-gradient(135deg, #0a0a0f 0%, #0a1a4a 50%, #0a0a0f 100%);
          border-radius: 16px;
          display: inline-block;
          border: 1px solid rgba(0, 255, 255, 0.3);
          backdrop-filter: blur(10px);
        }
        
        .logo-glow {
          position: absolute;
          inset: -4px;
          border-radius: 16px;
          background: linear-gradient(135deg, #00ffff, #ff00ff, #00ffff);
          opacity: 0.3;
          z-index: -1;
          filter: blur(10px);
          animation: glowPulse 3s ease-in-out infinite;
        }
        
        @keyframes glowPulse {
          0%, 100% {
            opacity: 0.2;
            filter: blur(10px);
          }
          50% {
            opacity: 0.4;
            filter: blur(15px);
          }
        }
        
        .logo-content {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          font-size: 1.75rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }
        
        .logo-emoji {
          font-size: 1.5rem;
          filter: drop-shadow(0 0 10px rgba(0, 255, 255, 0.6));
          animation: emojiFloat 3s ease-in-out infinite;
        }
        
        .logo-emoji:nth-child(2) {
          animation-delay: 0.5s;
        }
        
        @keyframes emojiFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        
        .logo-text {
          background: linear-gradient(135deg, #00ffff, #ff00ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 0 20px rgba(0, 255, 255, 0.3),
                       0 0 40px rgba(255, 0, 255, 0.2);
        }
        
        /* Neon cyan/magenta gradient text effect */
        .logo-text::after {
          content: attr(data-text);
          position: absolute;
          color: rgba(0, 255, 255, 0.3);
          filter: blur(8px);
          z-index: -1;
        }
      `}</style>
    </div>
  );
}

export default Logo;
