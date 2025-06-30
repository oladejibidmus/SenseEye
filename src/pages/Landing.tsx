import React from 'react';
import { Navigate } from 'react-router-dom';

export const Landing: React.FC = () => {
  // Redirect directly to sign-in page
  return <Navigate to="/signin" replace />;
};