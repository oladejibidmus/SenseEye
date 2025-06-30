import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Play, ArrowRight, Pause } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

export interface CapitalDemoProps {
  className?: string;
}

export default function CapitalDemo({ className }: CapitalDemoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVideoError = () => {
    setHasError(true);
  };

  return (
    <div className={cn("max-w-7xl mx-auto px-4", className)}>
      <motion.div
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
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <Card className="overflow-hidden shadow-2xl border-0 rounded-2xl bg-white">
          <div className="p-0">
            <div className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden">
              {!hasError ? (
                <>
                  {/* Video Element */}
                  <video
                    className="w-full h-full object-cover"
                    poster="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=450&fit=crop"
                    onError={handleVideoError}
                    controls={isPlaying}
                    muted
                    loop
                    playsInline
                  >
                    <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                    <track kind="captions" src="" srcLang="en" label="English captions" />
                    Your browser does not support the video tag.
                  </video>

                  {/* Play Button Overlay */}
                  {!isPlaying && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 flex items-center justify-center bg-black/30"
                    >
                      <Button
                        onClick={handlePlayPause}
                        size="lg"
                        className="w-20 h-20 rounded-full bg-[#FF6A1A] hover:bg-[#E55A0F] text-white shadow-2xl hover:scale-110 transition-all duration-300"
                        aria-label="Play demo video"
                      >
                        <Play className="h-8 w-8 ml-1" />
                      </Button>
                    </motion.div>
                  )}

                  {/* Video Controls */}
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
                        className="text-white hover:bg-white/20"
                        aria-label="Pause video"
                      >
                        <Pause className="h-4 w-4" />
                      </Button>
                      <div className="text-white text-sm font-medium">
                        SenseEye Demo - Visual Field Testing
                      </div>
                    </motion.div>
                  )}
                </>
              ) : (
                /* Error Fallback */
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#FF6A1A]/10 to-[#1A2233]/10">
                  <div className="text-center p-8">
                    <div className="w-20 h-20 bg-[#FF6A1A] rounded-full flex items-center justify-center mx-auto mb-6">
                      <Play className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#1A2233] mb-4">
                      Demo Coming Soon
                    </h3>
                    <p className="text-gray-600 mb-6 max-w-md">
                      We're preparing an exciting interactive demo to showcase 
                      SenseEye's capabilities. Check back soon!
                    </p>
                    <Button
                      onClick={() => window.location.reload()}
                      className="bg-[#FF6A1A] hover:bg-[#E55A0F] text-white"
                    >
                      Refresh Page
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Demo Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
        >
          <div className="text-center">
            <div className="w-12 h-12 bg-[#FF6A1A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-[#FF6A1A] font-bold text-lg">5min</span>
            </div>
            <h3 className="font-semibold text-[#1A2233] mb-2">Quick Testing</h3>
            <p className="text-gray-600 text-sm">Complete comprehensive visual field analysis in under 5 minutes</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-[#FF6A1A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-[#FF6A1A] font-bold text-lg">VR</span>
            </div>
            <h3 className="font-semibold text-[#1A2233] mb-2">Immersive Experience</h3>
            <p className="text-gray-600 text-sm">Advanced VR technology for comfortable and accurate testing</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-[#FF6A1A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-[#FF6A1A] font-bold text-lg">AI</span>
            </div>
            <h3 className="font-semibold text-[#1A2233] mb-2">Smart Analysis</h3>
            <p className="text-gray-600 text-sm">AI-powered insights and recommendations for better patient care</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}