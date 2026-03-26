import { useState, useEffect, useCallback } from 'react';

/**
 * useScrollPosition - Track scroll position with debounce for performance
 * Returns current scrollY and whether user is actively scrolling
 * 
 * @returns {object} - { scrollY: number, isScrolling: boolean }
 */
export function useScrollPosition(options = {}) {
  const { debounceMs = 100 } = options;
  
  const [state, setState] = useState({
    scrollY: 0,
    isScrolling: false
  });

  useEffect(() => {
    let timeoutId;
    
    const handleScroll = useCallback(() => {
      setState(prev => ({
        scrollY: window.scrollY,
        isScrolling: true
      }));

      // Clear existing timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // Set new timeout to stop scrolling state
      timeoutId = setTimeout(() => {
        setState(prev => ({
          ...prev,
          isScrolling: false
        }));
      }, debounceMs);
    }, [debounceMs]);

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Set initial position on mount
    setState({
      scrollY: window.scrollY,
      isScrolling: false
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [debounceMs]);

  return state;
}

export default useScrollPosition;
