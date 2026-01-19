import React from 'react';
import { Sparkles, Flame } from 'lucide-react';

export function MegaMenu({ onNavigate }) {
  const categories = [
    { icon: '🧵', label: 'Handlooms & Textiles' },
    { icon: '🏺', label: 'Pottery & Ceramics' },
    { icon: '💎', label: 'Jewelry & Accessories' },
    { icon: '🏠', label: 'Home Decor' },
    { icon: '🎨', label: 'Paintings & Art' },
    { icon: '🔨', label: 'Woodwork' },
  ];

  const collections = [
    { label: 'New Arrivals', badge: 'NEW', badgeColor: 'bg-success-500' },
    { label: 'Best Sellers', badge: '🔥', badgeColor: 'bg-accent-500' },
    { label: 'Limited Editions', badge: null },
    { label: 'Trending Now', badge: null },
  ];

  const quickLinks = [
    'Browse All Products',
    'Custom Orders',
    'Gift Finder',
    'Sale Items',
    'Workshop Kits',
  ];

  return (
    <div className="w-[800px] bg-white rounded-xl shadow-medium p-6">
      <div className="grid grid-cols-3 gap-6">
        {/* Categories Column */}
        <div>
          <h3 className="text-sm text-primary-600 mb-4 uppercase tracking-wide">
            Categories
          </h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category.label}
                onClick={() => onNavigate('products')}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-gray-900 hover:bg-primary-50 transition-colors group"
              >
                <span className="text-xl">{category.icon}</span>
                <span className="text-sm group-hover:text-primary-600 transition-colors">
                  {category.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Collections Column */}
        <div>
          <h3 className="text-sm text-primary-600 mb-4 uppercase tracking-wide">
            Collections
          </h3>
          <div className="space-y-2">
            {collections.map((collection) => (
              <button
                key={collection.label}
                onClick={() => onNavigate('products')}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-gray-900 hover:bg-primary-50 transition-colors group"
              >
                <span className="text-sm group-hover:text-primary-600 transition-colors flex-1">
                  {collection.label}
                </span>
                {collection.badge && (
                  <span className={`px-2 py-0.5 ${collection.badgeColor || 'bg-primary-600'} text-white text-xs rounded`}>
                    {collection.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Featured Item */}
          <div className="mt-6 p-4 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-xs text-white uppercase tracking-wide">Featured</span>
            </div>
            <p className="text-sm text-white mb-3">
              Explore our curated seasonal collection
            </p>
            <button 
              onClick={() => onNavigate('products')}
              className="text-xs text-white underline hover:no-underline"
            >
              View Collection →
            </button>
          </div>
        </div>

        {/* Quick Links Column */}
        <div>
          <h3 className="text-sm text-primary-600 mb-4 uppercase tracking-wide">
            Quick Links
          </h3>
          <div className="space-y-2">
            {quickLinks.map((link) => (
              <button
                key={link}
                onClick={() => onNavigate('products')}
                className="w-full px-3 py-2 rounded-lg text-left text-sm text-gray-900 hover:bg-primary-50 hover:text-primary-600 transition-colors"
              >
                {link}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
