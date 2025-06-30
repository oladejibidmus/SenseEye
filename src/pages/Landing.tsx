import React from 'react';
import { HeroSection } from '../components/sections/HeroSection';
import { Features } from '../components/sections/Features';
import { ContentSection } from '../components/sections/ContentSection';
import { CallToAction } from '../components/sections/CallToAction';
import { FAQ } from '../components/sections/FAQ';
import { Footer } from '../components/sections/Footer';

export const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-background-primary">
      <HeroSection />
      <div id="features">
        <Features />
      </div>
      <div id="solution">
        <ContentSection />
      </div>
      <div id="pricing">
        <CallToAction />
      </div>
      <FAQ />
      <Footer />
    </div>
  );
};