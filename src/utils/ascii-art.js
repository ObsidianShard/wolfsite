/**
 * ascii-art.js - ASCII motion blur helper for Earth scene
 * Creates elegant ASCII character trails that simulate motion blur
 */

// ASCII characters ordered by density (lightest to darkest)
export const ASCII_CHARS = '@#%&*+~-. ';

/**
 * Generate ASCII motion blur effect
 * Creates a trail of characters that fade in/out smoothly
 * 
 * @param {number} progress - Scroll progress (0-1)
 * @param {number} density - Character density multiplier (0.1-1.0)
 * @param {number} width - Canvas width in characters
 * @param {number} height - Canvas height in characters
 * @returns {string[]} - Array of character rows
 */
export function generateAsciiTrail(progress, density, width = 40, height = 20) {
  const result = [];
  
  // Map progress to motion
  const motionPhase = (progress * Math.PI * 2) % (Math.PI * 2);
  const fadeOutSpeed = 0.03;
  const fadeInSpeed = 0.02;
  
  for (let y = 0; y < height; y++) {
    let row = '';
    for (let x = 0; x < width; x++) {
      // Create wave-like motion pattern
      const wave = Math.sin((x / width) * Math.PI + motionPhase + (y / height) * Math.PI * 2);
      
      // Determine if this position should have a character
      const hasChar = wave > 0.3 && Math.random() < 0.4;
      
      if (hasChar) {
        // Select character based on wave intensity
        const charIndex = Math.min(
          ASCII_CHARS.length - 1,
          Math.floor((wave - 0.3) / 0.7 * (ASCII_CHARS.length - 1))
        );
        
        // Add opacity variation
        const opacity = Math.max(0.1, Math.min(1, wave * density));
        const char = ASCII_CHARS[charIndex];
        
        row += `<span style="opacity: ${opacity}">${char}</span>`;
      } else {
        row += '&nbsp;';
      }
    }
    result.push(row);
  }
  
  return result;
}

/**
 * Create procedural earth texture using canvas
 * Generates a blue/green gradient with subtle variation
 * 
 * @param {number} width - Texture width
 * @param {number} height - Texture height
 * @returns {HTMLCanvasElement} - Canvas with earth texture
 */
export function createEarthTexture(width = 512, height = 256) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  // Deep ocean base
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#0a1a4a');
  gradient.addColorStop(0.5, '#1a4a8a');
  gradient.addColorStop(1, '#0a2a5a');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  // Add subtle continents (procedural noise-like)
  for (let i = 0; i < 15; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const radius = 20 + Math.random() * 40;
    const green = 0.3 + Math.random() * 0.4;
    
    const landGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    landGradient.addColorStop(0, `rgba(46, 139, 87, ${0.2 + Math.random() * 0.3})`);
    landGradient.addColorStop(1, 'transparent');
    
    ctx.fillStyle = landGradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // Add subtle cloud-like streaks
  for (let i = 0; i < 8; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const widthStreak = 50 + Math.random() * 100;
    const heightStreak = 10 + Math.random() * 20;
    
    const cloudGradient = ctx.createLinearGradient(x, y, x + widthStreak, y);
    cloudGradient.addColorStop(0, 'rgba(255, 255, 255, 0.05)');
    cloudGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.1)');
    cloudGradient.addColorStop(1, 'rgba(255, 255, 255, 0.05)');
    
    ctx.fillStyle = cloudGradient;
    ctx.fillRect(x, y, widthStreak, heightStreak);
  }
  
  // Add horizon glow
  const glowGradient = ctx.createLinearGradient(0, 0, 0, height);
  glowGradient.addColorStop(0, 'transparent');
  glowGradient.addColorStop(0.3, 'rgba(0, 100, 255, 0.1)');
  glowGradient.addColorStop(0.5, 'rgba(0, 150, 255, 0.15)');
  glowGradient.addColorStop(0.7, 'rgba(0, 100, 255, 0.1)');
  glowGradient.addColorStop(1, 'transparent');
  
  ctx.fillStyle = glowGradient;
  ctx.fillRect(0, 0, width, height);
  
  return canvas;
}

/**
 * Map scroll position to ASCII motion parameters
 * Returns dynamic values based on user scroll
 * 
 * @param {number} scrollY - Current scroll position
 * @param {number} scrollHeight - Total scrollable height
 * @returns {object} - Motion parameters
 */
export function getAsciiMotionParams(scrollY, scrollHeight) {
  const progress = scrollY / Math.max(scrollHeight - window.innerHeight, 1);
  
  return {
    density: 0.3 + progress * 0.7, // 0.3 to 1.0
    motionSpeed: 0.5 + progress * 2,
    fadeOutSpeed: 0.03 + progress * 0.02,
    fadeInSpeed: 0.02 + progress * 0.03,
    characterOpacity: 0.1 + progress * 0.6 // 0.1 to 0.7
  };
}
