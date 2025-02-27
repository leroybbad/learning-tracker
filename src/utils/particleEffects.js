// References to our effect elements
let particleContainerRef = null;
let gridFlashRef = null;
let sunRef = null;
let retroTextRef = null;
let effectsInitialized = false;

/**
 * Initialize particle effect elements
 */
export const initParticleEffects = () => {
  if (effectsInitialized) return;
  
  // Create particle container
  const container = document.createElement('div');
  container.className = 'particle-container';
  document.body.appendChild(container);
  particleContainerRef = container;

  // Create grid flash effect
  const gridFlash = document.createElement('div');
  gridFlash.className = 'grid-flash';
  document.body.appendChild(gridFlash);
  gridFlashRef = gridFlash;

  // Create synthwave sun
  const sun = document.createElement('div');
  sun.className = 'synthwave-sun';
  document.body.appendChild(sun);
  sunRef = sun;

  // Create retro text
  const retroText = document.createElement('div');
  retroText.className = 'retro-text';
  document.body.appendChild(retroText);
  retroTextRef = retroText;
  
  effectsInitialized = true;
};

/**
 * Clean up particle effect elements
 */
export const cleanupParticleEffects = () => {
  if (!effectsInitialized) return;
  
  if (particleContainerRef) document.body.removeChild(particleContainerRef);
  if (gridFlashRef) document.body.removeChild(gridFlashRef);
  if (sunRef) document.body.removeChild(sunRef);
  if (retroTextRef) document.body.removeChild(retroTextRef);
  
  particleContainerRef = null;
  gridFlashRef = null;
  sunRef = null;
  retroTextRef = null;
  effectsInitialized = false;
};

/**
 * Trigger the particle effect with custom text
 * @param {string} text - Text to display in the effect
 */
export const triggerParticleEffect = (text = "RADICAL!") => {
  if (!effectsInitialized) {
    initParticleEffects();
  }
  
  // Don't create particles if already active
  if (particleContainerRef.classList.contains('active')) return;

  // Set custom text
  retroTextRef.textContent = text;

  // Activate all effects
  particleContainerRef.classList.add('active');
  gridFlashRef.classList.add('active');
  sunRef.classList.add('active');
  retroTextRef.classList.add('active');

  // Clear any existing particles
  particleContainerRef.innerHTML = '';

  // Create particles
  const colors = ['#ff00ff', '#00f0ff', '#fe53bb', '#7b61ff', '#feff00'];
  const numParticles = 100;
  
  for (let i = 0; i < numParticles; i++) {
    // Create a particle
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random properties
    const size = Math.random() * 30 + 10;
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const delay = Math.random() * 0.5;
    const duration = Math.random() * 2 + 1.5;
    
    // Apply styles
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.color = color;
    particle.style.opacity = '0';
    particle.style.animation = `fadeInOut ${duration}s ease-out ${delay}s forwards`;
    
    // Add to container
    particleContainerRef.appendChild(particle);
  }

  // Create laser beams for extra effect
  const numLasers = 20;
  
  for (let i = 0; i < numLasers; i++) {
    const laser = document.createElement('div');
    laser.className = 'laser';
    
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight;
    const angle = Math.random() * 360;
    const length = Math.random() * 100 + 100;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const delay = Math.random() * 0.8;
    const duration = Math.random() * 0.5 + 0.7;
    
    laser.style.left = `${startX}px`;
    laser.style.top = `${startY}px`;
    laser.style.width = `${length}px`;
    laser.style.transform = `rotate(${angle}deg)`;
    laser.style.color = color;
    laser.style.opacity = '0';
    laser.style.animation = `fadeInOut ${duration}s ease-out ${delay}s forwards`;
    
    particleContainerRef.appendChild(laser);
  }

  // Automatically remove active class after animation completes
  setTimeout(() => {
    particleContainerRef.classList.remove('active');
    gridFlashRef.classList.remove('active');
    sunRef.classList.remove('active');
    retroTextRef.classList.remove('active');
  }, 3000);
};