"use client";

import * as React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { Play, ArrowRight, Pause, Timer, Headset, Brain } from "lucide-react";
import { Button } from "../ui/Button";
import { Card, CardContent } from "../ui/Card";
import { Badge } from "../ui/badge";

export interface CapitalDemoProps {
  className?: string;
}

export default function CapitalDemo({
  className
}: CapitalDemoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVideoError = () => {
    setHasError(true);
  };

  return (
    <section className={cn("max-w-7xl mx-auto px-4", className)} aria-label="SenseEye Video Demo">
      <motion.header 
        initial={{ opacity: 0, y: 20 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }} 
        viewport={{ once: true }} 
        className="text-center mb-12"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A2233] mb-4">
          See SenseEye in Action
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Watch how our revolutionary VR technology transforms visual field testing
          into a seamless, accurate, and patient-friendly experience.
        </p>
      </motion.header>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        whileInView={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.6, delay: 0.2 }} 
        viewport={{ once: true }} 
        className="max-w-4xl mx-auto"
      >
        <Card className="overflow-hidden shadow-2xl border-0 rounded-2xl bg-white">
          <CardContent className="p-0">
            <div className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden">
              {!hasError ? (
                <>
                  <video 
                    className="w-full h-full object-cover" 
                    poster="https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?w=800&h=450&fit=crop" 
                    onError={handleVideoError} 
                    controls={isPlaying} 
                    muted 
                    loop 
                    playsInline 
                    aria-label="SenseEye demo video"
                  >
                    <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                    <track kind="captions" src="" srcLang="en" label="English captions" />
                    Your browser does not support the video tag.
                  </video>
                  {!isPlaying && (
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      className="absolute inset-0 flex items-center justify-center bg-black/30"
                    >
                      <Button 
                        onClick={handlePlayPause} 
                        size="lg" 
                        className="w-20 h-20 rounded-full bg-[#FF6A1A] hover:bg-[#E55A0F] text-white shadow-2xl hover:scale-110 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#FF6A1A] focus-visible:ring-offset-2" 
                        aria-label="Play demo video"
                      >
                        <Play className="h-8 w-8 ml-1" />
                      </Button>
                    </motion.div>
                  )}
                  {isPlaying && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-black/50 backdrop-blur-sm rounded-lg p-3"
                    >
                      <Button 
                        onClick={handlePlayPause} 
                        variant="tertiary" 
                        size="sm" 
                        className="text-white hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-[#FF6A1A] focus-visible:ring-offset-2" 
                        aria-label="Pause video"
                      >
                        <Pause className="h-4 w-4" />
                      </Button>
                      <span className="text-white text-sm font-medium">
                        SenseEye Demo - Visual Field Testing
                      </span>
                    </motion.div>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#FF6A1A]/10 to-[#1A2233]/10">
                  <div className="text-center p-8">
                    <div className="w-20 h-20 bg-[#FF6A1A] rounded-full flex items-center justify-center mx-auto mb-6">
                      <Play className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#1A2233] mb-4">Demo Coming Soon</h3>
                    <p className="text-gray-600 mb-6 max-w-md">
                      We're preparing an exciting interactive demo to showcase
                      SenseEye's capabilities. Check back soon!
                    </p>
                    <Button 
                      onClick={() => window.location.reload()} 
                      className="bg-[#FF6A1A] hover:bg-[#E55A0F] text-white focus-visible:ring-2 focus-visible:ring-[#FF6A1A] focus-visible:ring-offset-2" 
                      aria-label="Refresh page"
                    >
                      Refresh Page
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, delay: 0.4 }} 
          viewport={{ once: true }} 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
        >
          <div className="flex flex-col items-center text-center">
            <Badge className="w-12 h-12 bg-[#FF6A1A]/10 rounded-full flex items-center justify-center mb-4 border-0">
              <Timer className="h-6 w-6 text-[#FF6A1A]" aria-hidden="true" />
            </Badge>
            <h3 className="font-semibold text-[#1A2233] mb-2">Quick Testing</h3>
            <p className="text-gray-600 text-sm">Complete comprehensive visual field analysis in under 5 minutes</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Badge className="w-12 h-12 bg-[#FF6A1A]/10 rounded-full flex items-center justify-center mb-4 border-0">
              <Headset className="h-6 w-6 text-[#FF6A1A]" aria-hidden="true" />
            </Badge>
            <h3 className="font-semibold text-[#1A2233] mb-2">Immersive Experience</h3>
            <p className="text-gray-600 text-sm">Advanced VR technology for comfortable and accurate testing</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Badge className="w-12 h-12 bg-[#FF6A1A]/10 rounded-full flex items-center justify-center mb-4 border-0">
              <Brain className="h-6 w-6 text-[#FF6A1A]" aria-hidden="true" />
            </Badge>
            <h3 className="font-semibold text-[#1A2233] mb-2">Smart Analysis</h3>
            <p className="text-gray-600 text-sm">AI-powered insights and recommendations for better patient care</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}