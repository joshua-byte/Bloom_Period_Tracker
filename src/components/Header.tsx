import React, { useContext, useState, useEffect } from 'react';
import { Flower2, Home, BarChart2, Info, Menu, X } from 'lucide-react';
import { AppContext } from '../contexts/AppContext';
import { AppPage } from '../types';

export const Header: React.FC = () => {
  const { currentPage, navigateTo } = useContext(AppContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const handleNavigation = (page: AppPage) => {
    navigateTo(page);
    setIsMenuOpen(false);
  };

  const navItems = [
    { page: 'home', label: 'Home', icon: <Home size={18} /> },
    { page: 'track', label: 'Track', icon: <Flower2 size={18} /> },
    { page: 'dashboard', label: 'Dashboard', icon: <BarChart2 size={18} /> },
    { page: 'about', label: 'About', icon: <Info size={18} /> },
  ];

  return (
    <header 
      className={`sticky top-0 z-10 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div 
          className="flex items-center cursor-pointer" 
          onClick={() => handleNavigation('home')}
        >
          <div className="text-teal-500 mr-2">
            <Flower2 size={24} />
          </div>
          <h1 className="text-xl font-semibold text-teal-600 tracking-wide">
            Bloom
          </h1>
        </div>
        
        <button 
          className="md:hidden text-gray-600 hover:text-teal-500 transition"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        <nav className="hidden md:flex space-x-8">
          {navItems.map(({ page, label, icon }) => (
            <button
              key={page}
              onClick={() => handleNavigation(page as AppPage)}
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium transition-all ${
                currentPage === page 
                  ? 'text-white bg-teal-500 shadow-md' 
                  : 'text-gray-600 hover:text-teal-500 hover:bg-teal-50'
              }`}
            >
              {icon}
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute w-full">
          <div className="container mx-auto px-4 py-2">
            {navItems.map(({ page, label, icon }) => (
              <button
                key={page}
                onClick={() => handleNavigation(page as AppPage)}
                className={`flex items-center w-full gap-2 px-4 py-3 text-left text-sm ${
                  currentPage === page 
                    ? 'text-teal-600 bg-teal-50 font-medium' 
                    : 'text-gray-600'
                }`}
              >
                {icon}
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};