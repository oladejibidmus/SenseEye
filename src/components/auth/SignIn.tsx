import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { supabase } from '../../lib/supabase';
import {
  Eye,
  Mail,
  Lock,
  AlertCircle,
  Loader2,
  ArrowLeft,
} from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        navigate('/dashboard');
      }
    } catch (err: any) {
      console.error('Sign in error:', err);
      
      // Provide more helpful error messages
      if (err.message === 'Invalid login credentials') {
        setError('Invalid email or password. Please check your credentials and try again.');
      } else if (err.message.includes('Email not confirmed')) {
        setError('Please check your email and confirm your account before signing in.');
      } else {
        setError(err.message || 'Failed to sign in. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background-primary flex items-center justify-center p-4">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="w-full max-w-md"
      >
        {/* Back to Home Button */}
        <motion.div variants={item} className="mb-6">
          <button
            onClick={handleBackToHome}
            className="flex items-center space-x-2 text-text-secondary hover:text-text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
        </motion.div>

        <motion.div variants={item} className="text-center mb-8">
          <div className="w-16 h-16 bg-accent-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Eye className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">SenseEye</h1>
          <p className="text-text-secondary">Clinical Platform</p>
          <p className="text-text-tertiary text-sm mt-2">Sign in to your ophthalmic tech account</p>
        </motion.div>

        <motion.div variants={item}>
          <Card>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-text-primary mb-2">Welcome Back</h2>
              <p className="text-text-tertiary text-sm">Enter your credentials to access the platform</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-error/20 border border-error/30 rounded-lg flex items-center space-x-3">
                <AlertCircle className="w-5 h-5 text-error flex-shrink-0" />
                <p className="text-error text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-background-tertiary border border-border-default rounded-input text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-background-tertiary border border-border-default rounded-input text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                loading={loading}
                disabled={loading}
                icon={loading ? <Loader2 className="w-4 h-4 animate-spin" /> : undefined}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-text-tertiary text-sm">
                Don't have an account?{' '}
                <Link 
                  to="/signup" 
                  className="text-accent-primary hover:text-accent-primary/80 font-medium transition-colors"
                >
                  Sign up here
                </Link>
              </p>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={item} className="mt-8 text-center">
          <p className="text-text-tertiary text-xs">
            Secure authentication powered by Supabase
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};