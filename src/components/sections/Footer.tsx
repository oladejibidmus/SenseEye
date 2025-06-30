import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../ui/Logo';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Twitter, 
  Linkedin, 
  Github,
  Eye,
  Shield,
  Users,
  Globe
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-background-secondary border-t border-border-default">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Logo />
            <p className="text-text-secondary mt-4 max-w-md leading-relaxed">
              Revolutionizing visual field testing with accessible, clinical-grade technology 
              for eye care professionals worldwide. Making advanced diagnostics available everywhere.
            </p>
            
            <div className="mt-6 space-y-3">
              <div className="flex items-center space-x-3 text-text-secondary">
                <Mail className="w-4 h-4" />
                <span className="text-sm">hello@senseeye.com</span>
              </div>
              <div className="flex items-center space-x-3 text-text-secondary">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-text-secondary">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">San Francisco, CA</span>
              </div>
            </div>

            <div className="flex space-x-4 mt-6">
              <a
                href="#"
                className="text-text-tertiary hover:text-accent-primary transition-colors p-2 hover:bg-background-tertiary rounded-lg"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-text-tertiary hover:text-accent-primary transition-colors p-2 hover:bg-background-tertiary rounded-lg"
                aria-label="Connect on LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-text-tertiary hover:text-accent-primary transition-colors p-2 hover:bg-background-tertiary rounded-lg"
                aria-label="View our GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-text-primary mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <a href="#features" className="text-text-secondary hover:text-text-primary transition-colors text-sm">
                  Features
                </a>
              </li>
              <li>
                <Link to="/signin" className="text-text-secondary hover:text-text-primary transition-colors text-sm">
                  Platform
                </Link>
              </li>
              <li>
                <a href="#faq" className="text-text-secondary hover:text-text-primary transition-colors text-sm">
                  Documentation
                </a>
              </li>
              <li>
                <a href="mailto:demo@senseeye.com" className="text-text-secondary hover:text-text-primary transition-colors text-sm">
                  Request Demo
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-text-primary mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-text-secondary hover:text-text-primary transition-colors text-sm">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-text-secondary hover:text-text-primary transition-colors text-sm">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-text-secondary hover:text-text-primary transition-colors text-sm">
                  Press
                </a>
              </li>
              <li>
                <a href="#" className="text-text-secondary hover:text-text-primary transition-colors text-sm">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 pt-8 border-t border-border-subtle">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-success/20 rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-success" />
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">HIPAA Compliant</p>
                <p className="text-xs text-text-tertiary">Enterprise Security</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-accent-primary/20 rounded-lg flex items-center justify-center">
                <Eye className="w-4 h-4 text-accent-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">Clinical Grade</p>
                <p className="text-xs text-text-tertiary">FDA Validated</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-info/20 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-info" />
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">500+ Practices</p>
                <p className="text-xs text-text-tertiary">Trusted Worldwide</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-warning/20 rounded-lg flex items-center justify-center">
                <Globe className="w-4 h-4 text-warning" />
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">Global Support</p>
                <p className="text-xs text-text-tertiary">24/7 Available</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border-subtle">
          <p className="text-text-tertiary text-sm">
            © 2024 SenseEye. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-text-tertiary hover:text-text-primary text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-text-tertiary hover:text-text-primary text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-text-tertiary hover:text-text-primary text-sm transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};