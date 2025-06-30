import React from 'react';
import { HeroSection } from '../components/sections/HeroSection';
import { Features } from '../components/sections/Features';

export const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-background-primary">
      <HeroSection />
      <div id="features">
        <Features />
      </div>
    </div>
  );
};