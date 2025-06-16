import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaVk, FaTelegram, FaBars, FaTimes } from 'react-icons/fa';
import Button from '../ui/Button';
import { motion } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Главная' },
    { path: '/projects', label: 'Проекты' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <NavLink to="/" className="text-2xl font-bold text-secondary">
            Metallo Del Service
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `text-secondary hover:text-primary transition-colors ${
                    isActive
                      ? 'font-semibold'
                      : 'hover:text-primary'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            
            {/* Social Icons */}
            <div className="flex items-center space-x-4">
              <a href="https://vk.com" target="_blank" rel="noopener noreferrer" 
                className="text-secondary hover:text-primary transition-colors">
                <FaVk size={24} />
              </a>
              <a href="https://t.me" target="_blank" rel="noopener noreferrer"
                className="text-secondary hover:text-primary transition-colors">
                <FaTelegram size={24} />
              </a>
            </div>

            <Button variant="primary">
              Оставить заявку
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-secondary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 space-y-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `text-secondary hover:text-primary transition-colors ${
                      isActive
                        ? 'font-semibold'
                        : 'hover:text-primary'
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
              
              {/* Social Icons */}
              <div className="flex space-x-4 py-4">
                <a href="https://vk.com" target="_blank" rel="noopener noreferrer" 
                  className="text-secondary hover:text-primary transition-colors">
                  <FaVk size={24} />
                </a>
                <a href="https://t.me" target="_blank" rel="noopener noreferrer"
                  className="text-secondary hover:text-primary transition-colors">
                  <FaTelegram size={24} />
                </a>
              </div>

              <Button variant="primary" fullWidth>
                Оставить заявку
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header; 