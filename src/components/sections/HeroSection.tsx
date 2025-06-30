import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { TextEffect } from '../motion/TextEffect';
import { AnimatedGroup } from '../motion/AnimatedGroup';
import { HeroHeader } from './HeroHeader';
import { motion } from 'framer-motion';

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: 'blur(12px)',
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        type: 'spring',
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

export const HeroSection: React.FC = () => {
  return (
    <>
      <HeroHeader />
      <main className="overflow-hidden">
        {/* Background decorations */}
        <div
          aria-hidden
          className="absolute inset-0 isolate hidden opacity-65 contain-strict lg:block"
        >
          <div className="w-140 h-320 absolute left-0 top-0 -rotate-45 rounded-full bg-gradient-radial from-text-tertiary/8 via-text-tertiary/2 to-transparent transform -translate-y-87.5" />
          <div className="h-320 absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-gradient-radial from-text-tertiary/6 via-text-tertiary/2 to-transparent" style={{ transform: 'translate(5%, -50%)' }} />
          <div className="h-320 absolute left-0 top-0 w-60 -rotate-45 bg-gradient-radial from-text-tertiary/4 via-text-tertiary/2 to-transparent transform -translate-y-87.5" />
        </div>

        <section>
          <div className="relative pt-24 md:pt-36">
            {/* Background image for dark mode */}
            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: {
                      delayChildren: 1,
                    },
                  },
                },
                item: {
                  hidden: {
                    opacity: 0,
                    y: 20,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      type: 'spring',
                      bounce: 0.3,
                      duration: 2,
                    },
                  },
                },
              }}
              className="absolute inset-0 -z-20"
            >
              <div className="absolute inset-x-0 top-56 -z-20 hidden lg:top-32 w-full h-full bg-gradient-radial from-accent-primary/5 via-transparent to-transparent" />
            </AnimatedGroup>

            <div className="absolute inset-0 -z-10 size-full bg-gradient-radial from-transparent via-transparent to-background-primary" />
            
            <div className="mx-auto max-w-7xl px-6">
              <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                <AnimatedGroup variants={transitionVariants}>
                  <Link
                    to="#features"
                    className="hover:bg-background-secondary group mx-auto flex w-fit items-center gap-4 rounded-full border border-border-default p-1 pl-4 shadow-lg transition-colors duration-300"
                  >
                    <span className="text-text-primary text-sm">Introducing AI-Powered Visual Field Testing</span>
                    <span className="block h-4 w-0.5 border-l border-border-default bg-border-default" />

                    <div className="bg-background-secondary group-hover:bg-background-tertiary size-6 overflow-hidden rounded-full duration-500">
                      <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                        <span className="flex size-6">
                          <ArrowRight className="m-auto size-3 text-text-secondary" />
                        </span>
                        <span className="flex size-6">
                          <ArrowRight className="m-auto size-3 text-text-secondary" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </AnimatedGroup>

                <TextEffect
                  preset="fade-in-blur"
                  speedSegment={0.3}
                  as="h1"
                  className="mt-8 text-balance text-6xl md:text-7xl lg:mt-16 xl:text-[5.25rem] font-bold text-text-primary"
                >
                  Visual Field Testing Reimagined
                </TextEffect>
                
                <TextEffect
                  per="line"
                  preset="fade-in-blur"
                  speedSegment={0.3}
                  delay={0.5}
                  as="p"
                  className="mx-auto mt-8 max-w-2xl text-balance text-lg text-text-secondary"
                >
                  Clinical-grade visual field testing that's accessible, accurate, and available anywhere. 
                  Transform your practice with innovative perimetry technology.
                </TextEffect>

                <AnimatedGroup
                  variants={{
                    container: {
                      visible: {
                        transition: {
                          staggerChildren: 0.05,
                          delayChildren: 0.75,
                        },
                      },
                    },
                    ...transitionVariants,
                  }}
                  className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row"
                >
                  <div className="bg-accent-primary/10 rounded-xl border border-accent-primary/20 p-0.5">
                    <Button
                      size="lg"
                      className="rounded-xl px-5 text-base"
                      onClick={() => window.location.href = '/signin'}
                    >
                      <span className="text-nowrap">Start Testing</span>
                    </Button>
                  </div>
                  <Button
                    size="lg"
                    variant="tertiary"
                    className="h-12 rounded-xl px-5"
                    onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    <span className="text-nowrap">Learn More</span>
                  </Button>
                </AnimatedGroup>
              </div>
            </div>

            {/* Hero Image/Demo */}
            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.75,
                    },
                  },
                },
                ...transitionVariants,
              }}
            >
              <div className="relative -mr-56 mt-8 overflow-hidden px-2 sm:mr-0 sm:mt-12 md:mt-20">
                <div
                  aria-hidden
                  className="absolute inset-0 z-10 bg-gradient-to-b from-transparent from-35% to-background-primary"
                />
                <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-border-default p-4 shadow-lg bg-background-secondary">
                  {/* Visual Field Demo */}
                  <div className="aspect-[15/8] relative rounded-2xl bg-black p-8 flex items-center justify-center">
                    <div className="relative w-full max-w-md aspect-square">
                      {/* Central fixation point */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-red-500 rounded-full z-10" />
                      
                      {/* Test grid */}
                      <div className="grid grid-cols-8 gap-1 w-full h-full">
                        {Array.from({ length: 64 }).map((_, i) => {
                          const opacity = Math.random() > 0.3 ? 0.8 : 0.2;
                          const color = Math.random() > 0.7 ? '#22c55e' : Math.random() > 0.4 ? '#f59e0b' : '#ef4444';
                          return (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0 }}
                              animate={{ opacity }}
                              transition={{ delay: i * 0.01, duration: 0.5 }}
                              className="rounded-full"
                              style={{ backgroundColor: color, opacity }}
                            />
                          );
                        })}
                      </div>
                    </div>
                    
                    {/* Demo overlay text */}
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="text-sm opacity-75">Live Visual Field Test Demo</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedGroup>
          </div>
        </section>

        {/* Trusted by section */}
        <section className="bg-background-primary pb-16 pt-16 md:pb-32">
          <div className="group relative m-auto max-w-5xl px-6">
            <div className="absolute inset-0 z-10 flex scale-95 items-center justify-center opacity-0 duration-500 group-hover:scale-100 group-hover:opacity-100">
              <a
                href="#testimonials"
                className="block text-sm duration-150 hover:opacity-75 text-text-secondary"
              >
                <span>Trusted by Eye Care Professionals</span>
                <ChevronRight className="ml-1 inline-block size-3" />
              </a>
            </div>
            <div className="group-hover:blur-sm mx-auto mt-12 grid max-w-2xl grid-cols-4 gap-x-12 gap-y-8 transition-all duration-500 group-hover:opacity-50 sm:gap-x-16 sm:gap-y-14">
              {/* Placeholder logos - replace with actual healthcare/medical logos */}
              <div className="flex">
                <div className="mx-auto h-5 w-20 bg-text-tertiary/20 rounded" />
              </div>
              <div className="flex">
                <div className="mx-auto h-4 w-16 bg-text-tertiary/20 rounded" />
              </div>
              <div className="flex">
                <div className="mx-auto h-4 w-16 bg-text-tertiary/20 rounded" />
              </div>
              <div className="flex">
                <div className="mx-auto h-5 w-20 bg-text-tertiary/20 rounded" />
              </div>
              <div className="flex">
                <div className="mx-auto h-5 w-20 bg-text-tertiary/20 rounded" />
              </div>
              <div className="flex">
                <div className="mx-auto h-4 w-16 bg-text-tertiary/20 rounded" />
              </div>
              <div className="flex">
                <div className="mx-auto h-7 w-28 bg-text-tertiary/20 rounded" />
              </div>
              <div className="flex">
                <div className="mx-auto h-6 w-24 bg-text-tertiary/20 rounded" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};