import React from 'react';
import { ProductCard } from '../components/ProductCard';
import { ArtisanButton } from '../components/ArtisanButton';
import { ArrowLeft, Filter, Grid, List } from 'lucide-react';

export function ProductListingPage({ onNavigate }) {
  const products = [
    {
      image: 'https://images.unsplash.com/photo-1767476106330-4e5a0b4dcf94',
      title: 'Handcrafted Ceramic Bowl Set',
      creator: 'Maya Ceramics',
      price: 89,
      badge: 'new',
      rating: 4.9,
      reviews: 34,
    },
    {
      image: 'https://images.unsplash.com/photo-1748141951488-9c9fb9603daf',
      title: 'Artisan Woven Table Runner',
      creator: 'Thread & Co',
      price: 45,
      badge: 'bestseller',
      rating: 4.8,
      reviews: 67,
    },
    {
      image: 'https://images.unsplash.com/photo-1766560360266-38abfd6ce9a4',
      title: 'Sterling Silver Necklace',
      creator: 'Silversmith Studio',
      price: 125,
      badge: 'limited',
      rating: 5.0,
      reviews: 12,
    },
    {
      image: 'https://images.unsplash.com/photo-1745426863209-7b7efde1578a',
      title: 'Wooden Cutting Board',
      creator: 'Wood & Grain',
      price: 65,
      rating: 4.7,
      reviews: 45,
    },
    {
      image: 'https://images.unsplash.com/photo-1767476106330-4e5a0b4dcf94',
      title: 'Handwoven Basket',
      creator: 'Basketry Arts',
      price: 55,
      rating: 4.6,
      reviews: 23,
    },
    {
      image: 'https://images.unsplash.com/photo-1748141951488-9c9fb9603daf',
      title: 'Leather Journal',
      creator: 'Leather Craft Co',
      price: 78,
      rating: 4.8,
      reviews: 56,
    },
  ];

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
            <h1 className="text-4xl font-bold text-gray-900 mb-2">All Products</h1>
            <p className="text-gray-500">{products.length} unique handcrafted items</p>
          </div>
          <div className="flex items-center gap-4">
            <ArtisanButton variant="ghost" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </ArtisanButton>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button className="p-2 rounded bg-white shadow-sm">
                <Grid className="w-4 h-4" />
              </button>
              <button className="p-2 rounded">
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} onClick={() => onNavigate('product-detail')} />
          ))}
        </div>
      </div>
    </div>
  );
}
