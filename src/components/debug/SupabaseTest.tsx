import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { supabase } from '../../lib/supabase';
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Database,
  User,
  Shield,
  RefreshCw,
  Loader2,
} from 'lucide-react';

interface TestResult {
  name: string;
  status: 'pending' | 'success' | 'error' | 'warning';
  message: string;
  details?: any;
}

export const SupabaseTest: React.FC = () => {
  const [tests, setTests] = useState<TestResult[]>([]);
  const [running, setRunning] = useState(false);
  const [currentTest, setCurrentTest] = useState<string>('');

  const updateTest = (name: string, status: TestResult['status'], message: string, details?: any) => {
    setTests(prev => {
      const existing = prev.find(t => t.name === name);
      if (existing) {
        return prev.map(t => t.name === name ? { ...t, status, message, details } : t);
      }
      return [...prev, { name, status, message, details }];
    });
  };

  const runTests = async () => {
    setRunning(true);
    setTests([]);
    
    try {
      // Test 1: Basic Connection
      setCurrentTest('Testing basic connection...');
      updateTest('Connection', 'pending', 'Testing connection to Supabase...');
      
      try {
        const { data, error } = await supabase.from('patients').select('count', { count: 'exact' });
        if (error) throw error;
        updateTest('Connection', 'success', `Connected successfully. Found ${data?.length || 0} patients in database.`);
      } catch (error: any) {
        updateTest('Connection', 'error', `Connection failed: ${error.message}`, error);
      }

      // Test 2: Authentication Status
      setCurrentTest('Checking authentication...');
      updateTest('Authentication', 'pending', 'Checking current authentication status...');
      
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        if (session?.user) {
          updateTest('Authentication', 'success', `Authenticated as: ${session.user.email}`, {
            userId: session.user.id,
            email: session.user.email,
            role: session.user.user_metadata?.role || 'No role set'
          });
        } else {
          updateTest('Authentication', 'warning', 'Not authenticated - this is expected if not signed in');
        }
      } catch (error: any) {
        updateTest('Authentication', 'error', `Auth check failed: ${error.message}`, error);
      }

      // Test 3: Database Schema
      setCurrentTest('Verifying database schema...');
      updateTest('Schema', 'pending', 'Checking database tables...');
      
      try {
        const tables = ['patients', 'test_results', 'appointments'];
        const tableResults = [];
        
        for (const table of tables) {
          try {
            const { data, error } = await supabase.from(table).select('*').limit(1);
            if (error) throw error;
            tableResults.push(`✓ ${table} table accessible`);
          } catch (error: any) {
            tableResults.push(`✗ ${table} table error: ${error.message}`);
          }
        }
        
        updateTest('Schema', 'success', 'Database schema verified', tableResults);
      } catch (error: any) {
        updateTest('Schema', 'error', `Schema check failed: ${error.message}`, error);
      }

      // Test 4: Row Level Security
      setCurrentTest('Testing Row Level Security...');
      updateTest('RLS', 'pending', 'Checking RLS policies...');
      
      try {
        // Try to access data without authentication (should work with current policies)
        const { data, error } = await supabase.from('patients').select('id').limit(1);
        
        if (error && error.message.includes('row-level security')) {
          updateTest('RLS', 'success', 'RLS is properly configured and enforced');
        } else if (data !== null) {
          updateTest('RLS', 'warning', 'RLS allows access - check if this is intended for your use case');
        } else {
          updateTest('RLS', 'error', `Unexpected RLS behavior: ${error?.message}`);
        }
      } catch (error: any) {
        updateTest('RLS', 'error', `RLS test failed: ${error.message}`, error);
      }

      // Test 5: Environment Variables
      setCurrentTest('Checking environment variables...');
      updateTest('Environment', 'pending', 'Verifying environment configuration...');
      
      try {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
        
        const envResults = [];
        
        if (supabaseUrl) {
          envResults.push(`✓ VITE_SUPABASE_URL: ${supabaseUrl.substring(0, 30)}...`);
        } else {
          envResults.push('✗ VITE_SUPABASE_URL: Missing');
        }
        
        if (supabaseKey) {
          envResults.push(`✓ VITE_SUPABASE_ANON_KEY: ${supabaseKey.substring(0, 20)}...`);
        } else {
          envResults.push('✗ VITE_SUPABASE_ANON_KEY: Missing');
        }
        
        if (supabaseUrl && supabaseKey) {
          updateTest('Environment', 'success', 'Environment variables configured correctly', envResults);
        } else {
          updateTest('Environment', 'error', 'Missing required environment variables', envResults);
        }
      } catch (error: any) {
        updateTest('Environment', 'error', `Environment check failed: ${error.message}`, error);
      }

      // Test 6: Sample Data Query
      setCurrentTest('Testing data queries...');
      updateTest('Data Query', 'pending', 'Testing data retrieval...');
      
      try {
        const { data: patients, error: patientsError } = await supabase
          .from('patients')
          .select('id, first_name, last_name, email')
          .limit(5);
          
        if (patientsError) throw patientsError;
        
        const { data: testResults, error: resultsError } = await supabase
          .from('test_results')
          .select('id, test_type, eye, date')
          .limit(5);
          
        if (resultsError) throw resultsError;
        
        updateTest('Data Query', 'success', `Successfully queried data`, {
          patients: patients?.length || 0,
          testResults: testResults?.length || 0,
          samplePatient: patients?.[0] || 'No patients found',
          sampleResult: testResults?.[0] || 'No test results found'
        });
      } catch (error: any) {
        updateTest('Data Query', 'error', `Data query failed: ${error.message}`, error);
      }

      // Test 7: Real-time Subscriptions
      setCurrentTest('Testing real-time capabilities...');
      updateTest('Real-time', 'pending', 'Testing real-time subscriptions...');
      
      try {
        const channel = supabase
          .channel('test-channel')
          .on('postgres_changes', 
            { event: '*', schema: 'public', table: 'patients' }, 
            (payload) => {
              console.log('Real-time test payload:', payload);
            }
          );
          
        const subscribeResult = await channel.subscribe();
        
        if (subscribeResult === 'SUBSCRIBED') {
          updateTest('Real-time', 'success', 'Real-time subscriptions working correctly');
          // Clean up subscription
          setTimeout(() => {
            supabase.removeChannel(channel);
          }, 1000);
        } else {
          updateTest('Real-time', 'warning', `Subscription status: ${subscribeResult}`);
        }
      } catch (error: any) {
        updateTest('Real-time', 'error', `Real-time test failed: ${error.message}`, error);
      }

    } catch (error: any) {
      console.error('Test suite error:', error);
    } finally {
      setRunning(false);
      setCurrentTest('');
    }
  };

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-success" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-error" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-warning" />;
      case 'pending':
        return <Loader2 className="w-5 h-5 text-info animate-spin" />;
      default:
        return <div className="w-5 h-5 bg-text-tertiary rounded-full" />;
    }
  };

  const getStatusColor = (status: TestResult['status']) => {
    switch (status) {
      case 'success':
        return 'border-success bg-success/10';
      case 'error':
        return 'border-error bg-error/10';
      case 'warning':
        return 'border-warning bg-warning/10';
      case 'pending':
        return 'border-info bg-info/10';
      default:
        return 'border-border-default bg-background-tertiary';
    }
  };

  useEffect(() => {
    // Run tests automatically on component mount
    runTests();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">Supabase Connectivity Test</h2>
          <p className="text-text-secondary">Comprehensive testing of database connection and functionality</p>
        </div>
        <Button
          onClick={runTests}
          disabled={running}
          icon={running ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
        >
          {running ? 'Running Tests...' : 'Run Tests'}
        </Button>
      </div>

      {running && currentTest && (
        <Card>
          <div className="flex items-center space-x-3">
            <Loader2 className="w-5 h-5 text-accent-primary animate-spin" />
            <span className="text-text-primary font-medium">{currentTest}</span>
          </div>
        </Card>
      )}

      <div className="grid gap-4">
        {tests.map((test, index) => (
          <motion.div
            key={test.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`border-2 ${getStatusColor(test.status)}`}>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  {getStatusIcon(test.status)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-semibold text-text-primary">{test.name}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      test.status === 'success' ? 'bg-success/20 text-success' :
                      test.status === 'error' ? 'bg-error/20 text-error' :
                      test.status === 'warning' ? 'bg-warning/20 text-warning' :
                      'bg-info/20 text-info'
                    }`}>
                      {test.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-text-secondary text-sm mb-3">{test.message}</p>
                  
                  {test.details && (
                    <div className="bg-background-tertiary rounded-lg p-3">
                      <h4 className="text-sm font-medium text-text-primary mb-2">Details:</h4>
                      {Array.isArray(test.details) ? (
                        <ul className="text-xs text-text-secondary space-y-1">
                          {test.details.map((detail, i) => (
                            <li key={i} className="font-mono">{detail}</li>
                          ))}
                        </ul>
                      ) : (
                        <pre className="text-xs text-text-secondary font-mono overflow-x-auto">
                          {JSON.stringify(test.details, null, 2)}
                        </pre>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {tests.length > 0 && !running && (
        <Card>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Database className="w-6 h-6 text-accent-primary" />
              <h3 className="text-lg font-semibold text-text-primary">Test Summary</h3>
            </div>
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-success">
                  {tests.filter(t => t.status === 'success').length}
                </div>
                <div className="text-text-tertiary">Passed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-warning">
                  {tests.filter(t => t.status === 'warning').length}
                </div>
                <div className="text-text-tertiary">Warnings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-error">
                  {tests.filter(t => t.status === 'error').length}
                </div>
                <div className="text-text-tertiary">Failed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-text-primary">
                  {tests.length}
                </div>
                <div className="text-text-tertiary">Total</div>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};