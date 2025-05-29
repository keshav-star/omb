'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconMenu2, IconX } from '@tabler/icons-react';
import Logo from './Logo';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Explore', href: '/explore' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Request', href: '/request' },
  ];

  const authItems = [
    { label: 'Login', href: '/auth/login' },
    { label: 'Sign Up', href: '/auth/signup' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'py-2' : 'py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg" />
            <div className="relative flex items-center justify-between h-16 px-4">
              {/* Logo */}
              <div className="flex-shrink-0">
                <Logo variant="full" size="sm" />
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-gray-200 hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                ))}
              </div>

              {/* Desktop Auth Buttons */}
              <div className="hidden md:flex items-center space-x-4">
                {authItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`px-4 py-2 rounded-full transition-all duration-200 ${
                      item.label === 'Sign Up'
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
                        : 'text-gray-200 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-gray-200 hover:text-white"
                >
                  {isMobileMenuOpen ? (
                    <IconX size={24} />
                  ) : (
                    <IconMenu2 size={24} />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed inset-x-0 top-[72px] z-50"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-black/30 backdrop-blur-lg border border-white/20 shadow-lg" />
              <div className="relative px-4 py-4 space-y-4">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block text-gray-200 hover:text-white transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <div className="pt-4 border-t border-white/10">
                  {authItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className={`block px-4 py-2 rounded-full transition-all duration-200 ${
                        item.label === 'Sign Up'
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
                          : 'text-gray-200 hover:text-white'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar; 