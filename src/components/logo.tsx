import React from 'react';
import { Eye } from 'lucide-react';

export const Logo: React.FC = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-[#FF6A1A] rounded-lg flex items-center justify-center">
        <Eye className="w-5 h-5 text-white" />
      </div>
      <span className="text-xl font-bold text-gray-900">SenseEye</span>
    </div>
  );
};