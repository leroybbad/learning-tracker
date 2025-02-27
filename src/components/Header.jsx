import React, { useEffect, useRef } from 'react';

const Header = () => {
  const particleContainerRef = useRef(null);
  const gridFlashRef = useRef(null);
  const sunRef = useRef(null);
  const retroTextRef = useRef(null);

  useEffect(() => {
    // Create particle container and elements on mount
    const container = document.createElement('div');
    container.className = 'particle-container';
    document.body.appendChild(container);
    particleContainerRef.current = container;

    // Create grid flash effect
    const gridFlash = document.createElement('div');
    gridFlash.className = 'grid-flash';
    document.body.appendChild(gridFlash);
    gridFlashRef.current = gridFlash;

    // Create synthwave sun
    const sun = document.createElement('div');
    sun.className = 'synthwave-sun';
    document.body.appendChild(sun);
    sunRef.current = sun;

    // Create retro text
    const retroText = document.createElement('div');
    retroText.className = 'retro-text';
    retroText.textContent = 'RADICAL!';
    document.body.appendChild(retroText);
    retroTextRef.current = retroText;

    return () => {
      // Clean up on component unmount
      if (particleContainerRef.current) document.body.removeChild(particleContainerRef.current);
      if (gridFlashRef.current) document.body.removeChild(gridFlashRef.current);
      if (sunRef.current) document.body.removeChild(sunRef.current);
      if (retroTextRef.current) document.body.removeChild(retroTextRef.current);
    };
  }, []);

  const createParticles = () => {
    // Don't create particles if already active
    if (particleContainerRef.current.classList.contains('active')) return;

    // Activate all effects
    particleContainerRef.current.classList.add('active');
    gridFlashRef.current.classList.add('active');
    sunRef.current.classList.add('active');
    retroTextRef.current.classList.add('active');

    // Clear any existing particles
    particleContainerRef.current.innerHTML = '';

    // Set up audio effect (optional - uncomment if you want sound)
    // const audio = new Audio('/synthwave-sound.mp3');
    // audio.volume = 0.5;
    // audio.play();

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
      particleContainerRef.current.appendChild(particle);
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
      
      particleContainerRef.current.appendChild(laser);
    }

    // Automatically remove active class after animation completes
    setTimeout(() => {
      particleContainerRef.current.classList.remove('active');
      gridFlashRef.current.classList.remove('active');
      sunRef.current.classList.remove('active');
      retroTextRef.current.classList.remove('active');
    }, 3000);
  };

  return (
    <header>
      <h1 onClick={createParticles}>Learning Tracker</h1>
    </header>
  );
};

export default Header;