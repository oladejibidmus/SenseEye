import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../ui/Logo';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { motion } from 'framer-motion';

const menuItems = [
  { name: 'Features', href: '#features' },
  { name: 'Solution', href: '#solution' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'About', href: '#about' },
];

export const HeroHeader: React.FC = () => {
  const navigate = useNavigate();
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignIn = () => {
    navigate('/signin');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  const handleGetStarted = () => {
    navigate('/signin');
  };

  return (
    <header>
      <nav
        data-state={menuState ? 'active' : ''}
        className="fixed z-50 w-full px-2"
      >
        <div className={`mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12 ${
          isScrolled ? 'bg-background-secondary/80 max-w-4xl rounded-2xl border border-border-default backdrop-blur-lg lg:px-5' : ''
        }`}>
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full justify-between lg:w-auto">
              <Link
                to="/landing"
                aria-label="home"
                className="flex items-center space-x-2"
              >
                <Logo />
              </Link>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? 'Close Menu' : 'Open Menu'}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
              >
                <Menu className={`m-auto size-6 duration-200 ${
                  menuState ? 'rotate-180 scale-0 opacity-0' : ''
                }`} />
                <X className={`absolute inset-0 m-auto size-6 duration-200 ${
                  menuState ? 'rotate-0 scale-100 opacity-100' : '-rotate-180 scale-0 opacity-0'
                }`} />
              </button>
            </div>

            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
              <ul className="flex gap-8 text-sm">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.href}
                      className="text-text-secondary hover:text-text-primary block duration-150"
                    >
                      <span>{item.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`bg-background-secondary mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border border-border-default p-6 shadow-2xl md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none ${
              menuState ? 'block' : ''
            }`}>
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <a
                        href={item.href}
                        className="text-text-secondary hover:text-text-primary block duration-150"
                      >
                        <span>{item.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                <Button
                  variant="tertiary"
                  size="sm"
                  onClick={handleSignIn}
                  className={isScrolled ? 'lg:hidden' : ''}
                >
                  Login
                </Button>
                <Button
                  size="sm"
                  onClick={handleSignUp}
                  className={isScrolled ? 'lg:hidden' : ''}
                >
                  Sign Up
                </Button>
                <Button
                  size="sm"
                  onClick={handleGetStarted}
                  className={isScrolled ? 'lg:inline-flex' : 'hidden'}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};