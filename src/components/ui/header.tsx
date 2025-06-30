"use client";

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Eye, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
export interface HeaderProps {
  onGetStarted?: () => void;
  onNavigate?: (sectionId: string) => void;
  className?: string;
}
const navigationLinks = [{
  label: "About",
  href: "#about"
}, {
  label: "Contact",
  href: "#contact"
}, {
  label: "Privacy",
  href: "#privacy"
}, {
  label: "Terms",
  href: "#terms"
}] as any[];
export default function Header({
  onGetStarted = () => {},
  onNavigate = () => {},
  className
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const handleNavClick = (sectionId: string) => {
    onNavigate(sectionId);
    setIsMobileMenuOpen(false);
  };
  const handleGetStarted = () => {
    onGetStarted();
    setIsMobileMenuOpen(false);
  };
  return <header className={cn("sticky top-0 z-40 w-full bg-[#FAF7F2]/95 backdrop-blur-sm border-b border-gray-200/50", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div initial={{
          opacity: 0,
          x: -20
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.5
        }} className="flex items-center">
            <Eye className="h-8 w-8 text-[#FF6A1A] mr-3" />
            <span className="text-2xl font-bold text-[#1A2233]">SenseEye</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationLinks.map((link, index) => <motion.button key={link.label} initial={{
            opacity: 0,
            y: -10
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5,
            delay: index * 0.1
          }} onClick={() => handleNavClick(link.href.substring(1))} className="text-[#1A2233] hover:text-[#FF6A1A] font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF6A1A] focus:ring-offset-2 rounded-md px-2 py-1" aria-label={`Navigate to ${link.label} section`}>
                {link.label}
              </motion.button>)}
          </nav>

          {/* Desktop CTA Button */}
          <motion.div initial={{
          opacity: 0,
          x: 20
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.5,
          delay: 0.3
        }} className="hidden md:block">
            <Button onClick={handleGetStarted} className="bg-[#FF6A1A] hover:bg-[#E55A0F] text-white px-6 py-2 font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
              Get Started
            </Button>
          </motion.div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-[#1A2233] hover:text-[#FF6A1A] hover:bg-[#FF6A1A]/10" aria-label="Open navigation menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-[#FAF7F2] border-l border-gray-200">
                <motion.div initial={{
                opacity: 0,
                x: 20
              }} animate={{
                opacity: 1,
                x: 0
              }} transition={{
                duration: 0.3
              }} className="flex flex-col h-full">
                  {/* Mobile Logo */}
                  <div className="flex items-center mb-8 pt-4">
                    <Eye className="h-8 w-8 text-[#FF6A1A] mr-3" />
                    <span className="text-2xl font-bold text-[#1A2233]">SenseEye</span>
                  </div>

                  <Separator className="mb-6" />

                  {/* Mobile Navigation Links */}
                  <nav className="flex flex-col space-y-4 flex-1">
                    {navigationLinks.map((link, index) => <motion.button key={link.label} initial={{
                    opacity: 0,
                    x: 20
                  }} animate={{
                    opacity: 1,
                    x: 0
                  }} transition={{
                    duration: 0.3,
                    delay: index * 0.1
                  }} onClick={() => handleNavClick(link.href.substring(1))} className="text-left text-lg font-medium text-[#1A2233] hover:text-[#FF6A1A] py-3 px-2 rounded-md hover:bg-[#FF6A1A]/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF6A1A] focus:ring-offset-2" aria-label={`Navigate to ${link.label} section`}>
                        {link.label}
                      </motion.button>)}
                  </nav>

                  <Separator className="my-6" />

                  {/* Mobile CTA Button */}
                  <motion.div initial={{
                  opacity: 0,
                  y: 20
                }} animate={{
                  opacity: 1,
                  y: 0
                }} transition={{
                  duration: 0.3,
                  delay: 0.4
                }} className="pb-6">
                    <Button onClick={handleGetStarted} className="w-full bg-[#FF6A1A] hover:bg-[#E55A0F] text-white py-3 font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
                      Get Started
                    </Button>
                  </motion.div>
                </motion.div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>;
}