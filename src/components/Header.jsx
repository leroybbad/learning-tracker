import React, { useEffect } from 'react';
import { initParticleEffects, cleanupParticleEffects, triggerParticleEffect } from '../utils/particleEffects';

const Header = () => {
  useEffect(() => {
    // Initialize effects on component mount
    initParticleEffects();
    
    // Clean up on component unmount
    return () => {
      cleanupParticleEffects();
    };
  }, []);

  return (
    <header>
      <h1 onClick={() => triggerParticleEffect("RADICAL!")}>Learning Tracker</h1>
    </header>
  );
};

export default Header;