'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconMenu2, IconX, IconUser } from '@tabler/icons-react';
import Logo from './Logo';
import { useAuthStore } from '@/lib/store/auth';
import { UserDropdown } from './user/UserDropdown';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

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
                  <motion.a
                    key={item.label}
                    href={item.href}
                    className="text-gray-200 hover:text-white transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </div>

              {/* Desktop Auth Buttons */}
              <div className="hidden md:flex items-center space-x-4">
                {isAuthenticated ? (
                  <div className="relative">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                      className="flex items-center space-x-2 text-gray-200 hover:text-white transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                        {user?.image ? (
                          <img
                            src={user.image}
                            alt={user.name}
                            className="w-8 h-8 rounded-full"
                          />
                        ) : (
                          <IconUser className="w-5 h-5 text-white" />
                        )}
                      </div>
                    </motion.button>

                    {isUserDropdownOpen && (
                      <UserDropdown onClose={() => setIsUserDropdownOpen(false)} />
                    )}
                  </div>
                ) : (
                  <>
                    <motion.a
                      href="/auth/login"
                      className="text-gray-200 hover:text-white transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Login
                    </motion.a>
                    <motion.a
                      href="/auth/signup"
                      className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Sign Up
                    </motion.a>
                  </>
                )}
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-gray-200 hover:text-white"
                >
                  {isMobileMenuOpen ? (
                    <IconX className="w-6 h-6" />
                  ) : (
                    <IconMenu2 className="w-6 h-6" />
                  )}
                </motion.button>
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
            className="md:hidden fixed top-20 left-4 right-4 z-50"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-black/30 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl" />
              <div className="relative px-4 py-4 space-y-4">
                {navItems.map((item) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    className="block text-gray-200 hover:text-white transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </motion.a>
                ))}
                <div className="pt-4 border-t border-white/10">
                  {isAuthenticated ? (
                    <div className="space-y-2">
                      <motion.a
                        href="/profile"
                        className="block px-4 py-2 text-gray-200 hover:text-white transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Profile
                      </motion.a>
                      <motion.a
                        href="/profile?tab=favorites"
                        className="block px-4 py-2 text-gray-200 hover:text-white transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        My Favorites
                      </motion.a>
                      <motion.a
                        href="/profile?tab=requests"
                        className="block px-4 py-2 text-gray-200 hover:text-white transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Requests
                      </motion.a>
                      <motion.button
                        onClick={() => {
                          useAuthStore.getState().logout();
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full px-4 py-2 text-red-400 hover:text-red-300 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Logout
                      </motion.button>
                    </div>
                  ) : (
                    <>
                      <motion.a
                        href="/auth/login"
                        className="block px-4 py-2 text-gray-200 hover:text-white transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Login
                      </motion.a>
                      <motion.a
                        href="/auth/signup"
                        className="block px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Sign Up
                      </motion.a>
                    </>
                  )}
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