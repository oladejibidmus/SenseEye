import React from 'react';
import { HeroSection } from '../components/sections/HeroSection';
import { Features } from '../components/sections/Features';
import { ContentSection } from '../components/sections/ContentSection';
import { CallToAction } from '../components/sections/CallToAction';
import { FAQ } from '../components/sections/FAQ';
import { Footer } from '../components/sections/Footer';

export const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-white landing-page">
      <style jsx global>{`
        .landing-page {
          /* Light mode colors for landing page only */
          --bg-primary: #ffffff;
          --bg-secondary: #f8fafc;
          --bg-tertiary: #f1f5f9;
          
          --border-subtle: #e2e8f0;
          --border-default: #cbd5e1;
          --border-strong: #94a3b8;
          
          --text-primary: #0f172a;
          --text-secondary: #334155;
          --text-tertiary: #64748b;
          --text-inverse: #ffffff;
          
          --shadow-subtle: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
          --shadow-medium: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
        }
        
        .landing-page * {
          color: inherit;
        }
        
        .landing-page input,
        .landing-page select,
        .landing-page textarea {
          background-color: var(--bg-tertiary);
          border-color: var(--border-default);
          color: var(--text-primary);
        }
        
        .landing-page input:focus,
        .landing-page select:focus,
        .landing-page textarea:focus {
          border-color: #ff6b35;
          box-shadow: 0 0 0 2px rgba(255, 107, 53, 0.2);
        }
      `}</style>
      
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