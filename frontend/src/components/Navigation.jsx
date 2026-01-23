import React, { useState, useRef, useEffect } from 'react';
import {
  Home, ShoppingBag, Users, Palette, BookOpen, GraduationCap, Info,
  User, Search, ShoppingCart, Menu, X, ChevronDown
} from 'lucide-react';
import { MegaMenu } from './MegaMenu';

export default function Navigation({ onPageChange, currentPage }) {
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const dropdownRef = useRef(null);

  // Close dropdown if click is outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowAccountMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { icon: Home, label: 'Home', page: 'home' },
    { icon: ShoppingBag, label: 'Shop', page: 'products', hasMegaMenu: true },
    { icon: Info, label: 'About', page: 'about' },
    { icon: User, label: 'Account', page: 'login', hasDropdown: true },
  ];

  return (
    <>
      {/* Desktop Nav */}
      <nav className="hidden lg:flex justify-between items-center bg-white px-6 py-4 shadow sticky top-0 z-50">
        {/* Left - Brand */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onPageChange('home')}>
          <div className="w-10 h-10 bg-primary-600 rounded flex items-center justify-center">
            <Palette className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-gray-900">MadioCraft</span>
        </div>

        {/* Right - Nav Items */}
        <div className="flex items-center gap-4">
          {navItems.map(item => (
            <div key={item.label} className="relative">
              <button
                onClick={() => {
                  if (item.hasDropdown) {
                    setShowAccountMenu(!showAccountMenu);
                  } else if (!item.hasMegaMenu) {
                    onPageChange(item.page);
                  }
                }}
                onMouseEnter={() => item.hasMegaMenu && setShowMegaMenu(true)}
                onMouseLeave={() => item.hasMegaMenu && setShowMegaMenu(false)}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors font-medium ${
                  currentPage === item.page ? 'bg-primary-50 text-primary-600' : 'text-gray-900 hover:bg-primary-50'
                }`}
              >
                {item.icon && <item.icon className="w-4 h-4" />}
                <span>{item.label}</span>
                {(item.hasMegaMenu || item.hasDropdown) && <ChevronDown className="w-4 h-4" />}
              </button>

              {/* Mega Menu */}
              {item.hasMegaMenu && showMegaMenu && (
                <div className="absolute top-full left-0 mt-2">
                  <MegaMenu onNavigate={onPageChange} />
                </div>
              )}

              {/* Account Dropdown */}
              {item.hasDropdown && showAccountMenu && (
                <div
                  ref={dropdownRef}
                  className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow py-2 z-50"
                >
                  {[
                    { label: 'Login', page: 'login' },
                    { label: 'Register', page: 'register' },
                    { label: 'Buyer Dashboard', page: 'buyer-dashboard' },
                    { label: 'Creator Dashboard', page: 'creator-dashboard' },
                  ].map(option => (
                    <button
                      key={option.label}
                      onClick={() => {
                        onPageChange(option.page);
                        setShowAccountMenu(false);
                      }}
                      className="block w-full px-4 py-2 hover:bg-primary-50 text-left"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* Mobile Nav */}
      <nav className="lg:hidden flex justify-between items-center bg-white px-4 py-3 shadow sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <span className="font-bold text-lg cursor-pointer" onClick={() => onPageChange('home')}>
            Craftopia
          </span>
        </div>

        <button className="relative p-2">
          <ShoppingCart className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary-600 text-white text-xs rounded-full flex items-center justify-center">3</span>
        </button>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white rounded-lg shadow-lg p-4 space-y-2 z-50">
            {navItems.map(item => (
              <button
                key={item.label}
                onClick={() => {
                  onPageChange(item.page);
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 rounded hover:bg-primary-50"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}

