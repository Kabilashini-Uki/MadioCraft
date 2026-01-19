import React from 'react';
import { ArtisanButton } from '../components/ArtisanButton';
import { ArrowLeft, Upload, Palette, Type, Save } from 'lucide-react';

export function CustomizationStudio({ onNavigate }) {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Customization Studio</h1>
          <p className="text-gray-500">Create and customize your unique products</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-8 shadow-soft mb-6">
              <div className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center mb-6">
                <Upload className="w-16 h-16 text-gray-400" />
              </div>
              <ArtisanButton variant="secondary" className="w-full">
                <Upload className="w-4 h-4 mr-2" />
                Upload Product Image
              </ArtisanButton>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-soft">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                  <input
                    type="text"
                    placeholder="Enter product name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    rows="4"
                    placeholder="Describe your product"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-soft">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Customization Options</h3>
              <div className="space-y-4">
                <ArtisanButton variant="ghost" className="w-full justify-start">
                  <Palette className="w-4 h-4 mr-2" />
                  Colors
                </ArtisanButton>
                <ArtisanButton variant="ghost" className="w-full justify-start">
                  <Type className="w-4 h-4 mr-2" />
                  Text Options
                </ArtisanButton>
              </div>
            </div>

            <ArtisanButton variant="primary" size="lg" className="w-full">
              <Save className="w-4 h-4 mr-2" />
              Save Product
            </ArtisanButton>
          </div>
        </div>
      </div>
    </div>
  );
}
