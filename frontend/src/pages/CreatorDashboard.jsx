import React from 'react';
import { ArtisanButton } from '../components/ArtisanButton';
import { ArrowLeft, Package, TrendingUp, Eye, Plus } from 'lucide-react';

export function CreatorDashboard({ onNavigate }) {
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Creator Dashboard</h1>
            <p className="text-gray-500">Manage your products, orders, and shop</p>
          </div>
          <ArtisanButton variant="primary" onClick={() => onNavigate('customize')}>
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </ArtisanButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <Package className="w-8 h-8 text-primary-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">24</div>
            <div className="text-gray-500">Products</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-success-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">156</div>
            <div className="text-gray-500">Total Sales</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <Eye className="w-8 h-8 text-accent-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">1.2K</div>
            <div className="text-gray-500">Profile Views</div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-soft">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Products</h2>
          <div className="text-center py-12 text-gray-500">
            <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p>No products yet</p>
            <ArtisanButton variant="primary" className="mt-4" onClick={() => onNavigate('customize')}>
              Create Your First Product
            </ArtisanButton>
          </div>
        </div>
      </div>
    </div>
  );
}
