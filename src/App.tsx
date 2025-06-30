import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { SignIn } from './components/auth/SignIn';
import { SignUp } from './components/auth/SignUp';
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { TestSetup } from './pages/TestSetup';
import { VisualFieldTest } from './pages/VisualFieldTest';
import { Results } from './pages/Results';
import { Patients } from './pages/Patients';
import { Settings } from './pages/Settings';
import { SupabaseTestPage } from './pages/SupabaseTestPage';
import { useDatabase } from './hooks/useDatabase';
import { useAuth } from './hooks/useAuth';

function App() {
  const { loading: authLoading, user } = useAuth();
  
  // Initialize database connection and load data only when authenticated
  useDatabase();

  // Show loading screen while auth is being determined
  if (authLoading) {
    return (
      <div className="min-h-screen bg-background-primary flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-accent-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Landing page - public */}
        <Route path="/" element={<Landing />} />
        
        {/* Public auth routes */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        
        {/* Test route - accessible without authentication for debugging */}
        <Route path="/test-supabase" element={<SupabaseTestPage />} />
        
        {/* Protected app routes */}
        <Route path="/app" element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/app/dashboard" element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/app/setup" element={
          <ProtectedRoute>
            <Layout>
              <TestSetup />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/app/test" element={
          <ProtectedRoute>
            <Layout>
              <VisualFieldTest />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/app/results" element={
          <ProtectedRoute>
            <Layout>
              <Results />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/app/patients" element={
          <ProtectedRoute>
            <Layout>
              <Patients />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/app/settings" element={
          <ProtectedRoute>
            <Layout>
              <Settings />
            </Layout>
          </ProtectedRoute>
        } />
        
        {/* Redirect any unknown routes to landing page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;