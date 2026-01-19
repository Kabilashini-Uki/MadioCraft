import React from 'react';
import { Star, Heart, ShoppingCart } from 'lucide-react';

export function ProductCard({ 
  image, 
  title, 
  creator, 
  price, 
  badge, 
  rating, 
  reviews,
  onClick,
  className = '' 
}) {
  const badgeColors = {
    new: 'bg-success-500',
    bestseller: 'bg-accent-500',
    limited: 'bg-primary-600',
    sale: 'bg-red-500',
  };

  const badgeLabels = {
    new: 'New',
    bestseller: 'Bestseller',
    limited: 'Limited',
    sale: 'Sale',
  };

  return (
    <div 
      className={`group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 cursor-pointer ${className}`}
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Badge */}
        {badge && (
          <div className={`absolute top-3 left-3 px-3 py-1 ${badgeColors[badge] || 'bg-primary-600'} text-white text-xs font-semibold rounded-full`}>
            {badgeLabels[badge] || badge}
          </div>
        )}

        {/* Wishlist Button */}
        <button 
          className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-sm"
          onClick={(e) => {
            e.stopPropagation();
            // Handle wishlist
          }}
        >
          <Heart className="w-5 h-5 text-gray-700" />
        </button>

        {/* Quick Add to Cart (shown on hover) */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            className="w-full bg-primary-600 text-white py-2 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-primary-700 transition-colors shadow-lg"
            onClick={(e) => {
              e.stopPropagation();
              // Handle add to cart
            }}
          >
            <ShoppingCart className="w-4 h-4" />
            Quick Add
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="text-sm text-primary-600 font-medium mb-1">{creator}</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{title}</h3>
        
        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            <Star className="w-4 h-4 fill-accent-500 text-accent-500" />
            <span className="ml-1 text-sm font-semibold text-gray-900">{rating}</span>
          </div>
          <span className="text-sm text-gray-500">({reviews} reviews)</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-900">${price}</div>
        </div>
      </div>
    </div>
  );
}
