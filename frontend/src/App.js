// App.jsx
import React, { useState } from 'react';
import Navigation from './components/Navigation';
import { Sidebar } from './components/Sidebar';
import { HomePage } from './pages/HomePage';
import { CreatorProfilePage } from './pages/CreatorProfilePage';
import ShoppingCart from './pages/ShoppingCart';
import CustomizationStudio from './pages/CustomizationStudio';
import { MegaMenu } from './components/MegaMenu';
import { ArtisanButton } from './components/ArtisanButton';
import { BuyerDashboard } from './pages/BuyerDashboard';
import { CreatorDashboard } from './pages/CreatorDashboard';
import OrderConfirmation from './pages/OrderConfirmation';
import { LoginRegisterModal } from './pages/LoginRegisterModal';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginMode, setLoginMode] = useState('login');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'products':
        return (
          <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-6 py-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-8">All Products</h1>
              {/* Product listing would go here */}
              <div className="text-center py-12 text-gray-500">
                <p>Products listing page</p>
                <ArtisanButton 
                  variant="primary" 
                  className="mt-4"
                  onClick={() => setCurrentPage('home')}
                >
                  Back to Home
                </ArtisanButton>
              </div>
            </div>
          </div>
        );
      case 'creators':
        return <CreatorProfilePage onNavigate={setCurrentPage} />;
      case 'customize':
        return <CustomizationStudio onNavigate={setCurrentPage} />;
      case 'cart':
        return <ShoppingCart onNavigate={setCurrentPage} />;
      case 'checkout':
        return <OrderConfirmation onNavigate={setCurrentPage} />;
      case 'buyer-dashboard':
        return <BuyerDashboard onNavigate={setCurrentPage} />;
      case 'creator-dashboard':
        return <CreatorDashboard onNavigate={setCurrentPage} />;
      case 'login':
        return <LoginRegisterModal mode="login" onNavigate={setCurrentPage} />;
      case 'register':
        return <LoginRegisterModal mode="register" onNavigate={setCurrentPage} />;
      case 'about':
        return (
          <div className="min-h-screen bg-white">
            <div className="max-w-4xl mx-auto px-6 py-16">
              <h1 className="text-4xl font-bold text-gray-900 mb-8">About Us</h1>
              <div className="bg-white rounded-2xl p-8 shadow-soft">
                <p className="text-lg text-gray-700 mb-6">
                  Connecting artisans with customers who appreciate handmade craftsmanship.
                </p>
                <ArtisanButton variant="primary" onClick={() => setCurrentPage('home')}>
                  Back to Home
                </ArtisanButton>
              </div>
            </div>
          </div>
        );
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation 
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      
      {showMegaMenu && (
        <div className="fixed inset-0 z-40">
          <div 
            className="absolute inset-0 bg-black/20"
            onClick={() => setShowMegaMenu(false)}
          />
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-50">
            <MegaMenu onNavigate={setCurrentPage} />
          </div>
        </div>
      )}
      
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="relative w-full max-w-md">
            <LoginRegisterModal 
              mode={loginMode}
              onNavigate={(page) => {
                setCurrentPage(page);
                setShowLoginModal(false);
              }}
            />
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
      
      <div className="flex">
        <Sidebar onNavigate={setCurrentPage} />
        <main className="flex-1 pt-16">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;