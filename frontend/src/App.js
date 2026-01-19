// App.js
import React, { useState } from 'react';
import Navigation from './components/Navigation';
import { HomePage } from './pages/HomePage';
import { ProductListingPage } from './pages/ProductListingPage';
import { CreatorProfilePage } from './pages/CreatorProfilePage';
import { LoginRegisterModal } from './pages/LoginRegisterModal';
import { BuyerDashboard } from './pages/BuyerDashboard';
import { CreatorDashboard } from './pages/CreatorDashboard';
import { CustomizationStudio } from './pages/CustomizationStudio';
import { AboutPage } from './pages/AboutPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handlePageChange = (page) => {
    console.log('Navigating to:', page);
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handlePageChange} />;
      case 'products':
      case 'shop':
        return <ProductListingPage onNavigate={handlePageChange} />;
      case 'creators':
        return <CreatorProfilePage onNavigate={handlePageChange} />;
      case 'login':
      case 'register':
        return <LoginRegisterModal mode={currentPage} onNavigate={handlePageChange} />;
      case 'buyer-dashboard':
        return <BuyerDashboard onNavigate={handlePageChange} />;
      case 'creator-dashboard':
        return <CreatorDashboard onNavigate={handlePageChange} />;
      case 'customize':
        return <CustomizationStudio onNavigate={handlePageChange} />;
      case 'about':
        return <AboutPage onNavigate={handlePageChange} />;
      default:
        return <HomePage onNavigate={handlePageChange} />;
    }
  };

  return (
    <div className="App">
      <Navigation onPageChange={handlePageChange} currentPage={currentPage} />
      <main>
        {renderPage()}
      </main>

      {/* Footer */}
<footer className="bg-black text-white mt-20">
  <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row md:justify-between gap-10">
    
    {/* Brand / Logo */}
    <div className="flex flex-col gap-4">
      <div className="text-2xl font-bold flex items-center gap-2">
        <span>🎨</span>
        <span>MadioCraft</span>
      </div>
      <p className="text-gray-400 max-w-xs">
        Connecting artisans with the world, one handcrafted piece at a time.
      </p>
    </div>

    {/* Shop Links */}
    <div className="flex flex-col gap-2">
      <h4 className="font-semibold mb-2">Shop</h4>
      <a href="#" className="text-gray-400 hover:text-white">All Products</a>
      <a href="#" className="text-gray-400 hover:text-white">New Arrivals</a>
      <a href="#" className="text-gray-400 hover:text-white">Best Sellers</a>
      <a href="#" className="text-gray-400 hover:text-white">Sale Items</a>
    </div>

    {/* Company Links */}
    <div className="flex flex-col gap-2">
      <h4 className="font-semibold mb-2">Company</h4>
      <a href="#" className="text-gray-400 hover:text-white">About Us</a>
      <a href="#" className="text-gray-400 hover:text-white">Our Creators</a>
      <a href="#" className="text-gray-400 hover:text-white">Stories</a>
      <a href="#" className="text-gray-400 hover:text-white">Contact</a>
    </div>

    {/* Support Links */}
    <div className="flex flex-col gap-2">
      <h4 className="font-semibold mb-2">Support</h4>
      <a href="#" className="text-gray-400 hover:text-white">Help Center</a>
      <a href="#" className="text-gray-400 hover:text-white">Shipping Info</a>
      <a href="#" className="text-gray-400 hover:text-white">Returns</a>
      <a href="#" className="text-gray-400 hover:text-white">Track Order</a>
    </div>
  </div>

  {/* Divider */}
  <div className="border-t border-gray-800 mt-8" />

  {/* Bottom Copyright */}
  <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row md:justify-between items-center gap-4 text-gray-500 text-sm">
    <span>© 2026 ArtisanHub. All rights reserved.</span>
    <div className="flex gap-4">
      <a href="#" className="hover:text-white">Privacy Policy</a>
      <a href="#" className="hover:text-white">Terms of Service</a>
      <a href="#" className="hover:text-white">Cookies</a>
    </div>
  </div>
</footer>

    </div>
  );
}
