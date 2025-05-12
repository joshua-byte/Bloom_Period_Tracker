import React from 'react';
import { Flower2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-6 bg-white shadow-inner">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start">
              <Flower2 className="text-teal-500 mr-2" size={18} />
              <span className="text-teal-600 font-medium">Bloom</span>
            </div>
            <p className="text-gray-500 text-xs mt-1">
              Nurturing your menstrual and emotional health
            </p>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-gray-500 text-xs">
              &copy; {new Date().getFullYear()} Bloom. All rights reserved.
            </p>
            <p className="text-gray-400 text-xs mt-1">
              Created with care for all menstruators
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};