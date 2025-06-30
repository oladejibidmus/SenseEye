import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Mail, Lock, Github, Facebook, User, X, Eye, EyeOff } from 'lucide-react';
import { Button } from '../ui/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';

export interface SignUpModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
}

export default function SignUpModal({
  isOpen = false,
  onClose = () => {},
  className
}: SignUpModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSignIn, setIsSignIn] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (!isSignIn && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onClose();
    }, 1500);
  };

  const handleOAuthSignIn = (provider: string) => {
    setIsLoading(true);
    // Simulate OAuth flow
    setTimeout(() => {
      setIsLoading(false);
      onClose();
    }, 1000);
  };

  const handleContinueAsGuest = () => {
    onClose();
  };

  const toggleMode = () => {
    setIsSignIn(!isSignIn);
    setError("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={cn("max-w-md w-full mx-4 bg-white rounded-xl shadow-2xl border-0 p-0 overflow-hidden", className)}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="relative"
        >
          {/* Header */}
          <DialogHeader className="px-6 pt-6 pb-4 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-[#FF6A1A] rounded-full flex items-center justify-center">
                <Eye className="h-6 w-6 text-white" />
              </div>
            </div>
            <DialogTitle className="text-2xl font-bold text-[#1A2233]">
              {isSignIn ? "Welcome Back" : "Join SenseEye"}
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              {isSignIn ? "Sign in to access your visual field testing dashboard" : "Create your account to start visual field testing"}
            </DialogDescription>
          </DialogHeader>

          {/* Form */}
          <div className="px-6 pb-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-[#1A2233]">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="pl-10 h-12 border-gray-200 focus:border-[#FF6A1A] focus:ring-[#FF6A1A]"
                    required
                    aria-describedby={error ? "error-message" : undefined}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-[#1A2233]">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pl-10 pr-10 h-12 border-gray-200 focus:border-[#FF6A1A] focus:ring-[#FF6A1A]"
                    required
                    minLength={8}
                  />
                  <Button
                    type="button"
                    variant="tertiary"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* Confirm Password Field (Sign Up only) */}
              {!isSignIn && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-[#1A2233]">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your password"
                      className="pl-10 pr-10 h-12 border-gray-200 focus:border-[#FF6A1A] focus:ring-[#FF6A1A]"
                      required
                      minLength={8}
                    />
                    <Button
                      type="button"
                      variant="tertiary"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 text-gray-400 hover:text-gray-600"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-red-50 border border-red-200 rounded-lg"
                  id="error-message"
                  role="alert"
                >
                  <p className="text-sm text-red-600">{error}</p>
                </motion.div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-[#FF6A1A] hover:bg-[#E55A0F] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    {isSignIn ? "Signing In..." : "Creating Account..."}
                  </div>
                ) : (
                  isSignIn ? "Sign In" : "Create Account"
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-6">
              <Separator className="flex-1" />
              <span className="px-3 text-sm text-gray-500">or</span>
              <Separator className="flex-1" />
            </div>

            {/* OAuth Buttons */}
            <div className="space-y-3">
              <Button
                type="button"
                variant="tertiary"
                onClick={() => handleOAuthSignIn("google")}
                disabled={isLoading}
                className="w-full h-12 border-gray-200 hover:bg-gray-50 transition-colors duration-200"
              >
                <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <g>
                    <path fill="#EA4335" d="M12 10.8v3.6h5.1c-.2 1.2-1.5 3.5-5.1 3.5-3.1 0-5.6-2.6-5.6-5.7s2.5-5.7 5.6-5.7c1.8 0 3 .7 3.7 1.4l2.5-2.4C16.6 4.5 14.5 3.5 12 3.5 6.8 3.5 2.5 7.7 2.5 12s4.3 8.5 9.5 8.5c5.5 0 9.1-3.8 9.1-9.2 0-.6-.1-1-.2-1.5H12z" />
                    <path fill="#34A853" d="M12 21c2.4 0 4.4-.8 5.9-2.1l-2.8-2.3c-.8.6-1.9 1-3.1 1-2.4 0-4.4-1.6-5.1-3.7H3.1v2.3C4.6 19.2 8 21 12 21z" />
                    <path fill="#4A90E2" d="M21.1 12.2c0-.6-.1-1-.2-1.5H12v3h5.1c-.2 1.2-1.5 3.5-5.1 3.5-3.1 0-5.6-2.6-5.6-5.7s2.5-5.7 5.6-5.7c1.8 0 3 .7 3.7 1.4l2.5-2.4C16.6 4.5 14.5 3.5 12 3.5 6.8 3.5 2.5 7.7 2.5 12s4.3 8.5 9.5 8.5c5.5 0 9.1-3.8 9.1-9.2z" />
                    <path fill="#FBBC05" d="M3.1 7.7l2.3 1.7C6.2 7.7 8.9 6 12 6c1.8 0 3 .7 3.7 1.4l2.5-2.4C16.6 4.5 14.5 3.5 12 3.5c-3.9 0-7.2 2.7-8.5 6.2z" />
                  </g>
                </svg>
                Continue with Google
              </Button>
              <Button
                type="button"
                variant="tertiary"
                onClick={() => handleOAuthSignIn("github")}
                disabled={isLoading}
                className="w-full h-12 border-gray-200 hover:bg-gray-50 transition-colors duration-200"
              >
                <Github className="h-5 w-5 mr-3" />
                Continue with GitHub
              </Button>
              <Button
                type="button"
                variant="tertiary"
                onClick={() => handleOAuthSignIn("facebook")}
                disabled={isLoading}
                className="w-full h-12 border-gray-200 hover:bg-gray-50 transition-colors duration-200"
              >
                <Facebook className="h-5 w-5 mr-3" />
                Continue with Facebook
              </Button>
            </div>

            {/* Continue as Guest */}
            <div className="mt-6 text-center">
              <Button
                type="button"
                variant="tertiary"
                onClick={handleContinueAsGuest}
                disabled={isLoading}
                className="text-[#FF6A1A] hover:text-[#E55A0F] hover:bg-[#FF6A1A]/10 font-medium"
              >
                <User className="h-4 w-4 mr-2" />
                Continue as Guest
              </Button>
            </div>

            {/* Toggle Sign In/Sign Up */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {isSignIn ? "Don't have an account?" : "Already have an account?"}
                <Button
                  type="button"
                  variant="tertiary"
                  onClick={toggleMode}
                  disabled={isLoading}
                  className="ml-1 p-0 h-auto text-[#FF6A1A] hover:text-[#E55A0F] font-medium hover:bg-transparent"
                >
                  {isSignIn ? "Sign Up" : "Sign In"}
                </Button>
              </p>
            </div>

            {/* Terms */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                By continuing, you agree to our{" "}
                <a href="#" className="text-[#FF6A1A] hover:underline">Terms of Service</a>
                {" "}and{" "}
                <a href="#" className="text-[#FF6A1A] hover:underline">Privacy Policy</a>
              </p>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}