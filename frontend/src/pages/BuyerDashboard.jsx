import React from 'react';
import { ArtisanButton } from '../components/ArtisanButton';
import { ArrowLeft, Package, Heart, CreditCard, Settings } from 'lucide-react';

export function BuyerDashboard({ onNavigate }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <ArtisanButton variant="ghost" size="sm" onClick={() => onNavigate('home')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </ArtisanButton>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Buyer Dashboard</h1>
          <p className="text-gray-500">Manage your orders, favorites, and account</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <Package className="w-8 h-8 text-primary-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">12</div>
            <div className="text-gray-500">Orders</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <Heart className="w-8 h-8 text-red-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">8</div>
            <div className="text-gray-500">Favorites</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <CreditCard className="w-8 h-8 text-success-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">2</div>
            <div className="text-gray-500">Payment Methods</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <Settings className="w-8 h-8 text-gray-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">1</div>
            <div className="text-gray-500">Settings</div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-soft">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Orders</h2>
          <div className="text-center py-12 text-gray-500">
            <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p>No orders yet</p>
            <ArtisanButton variant="primary" className="mt-4" onClick={() => onNavigate('products')}>
              Start Shopping
            </ArtisanButton>
          </div>
        </div>
      </div>
    </div>
  );
}
