import React from 'react';
import { Star, MapPin, Package, ArrowRight } from 'lucide-react';

export function CreatorCard({ 
  image, 
  name, 
  specialty, 
  location, 
  rating, 
  products,
  onClick,
  className = '' 
}) {
  return (
    <div 
      className={`group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 cursor-pointer ${className}`}
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary-400 to-primary-600">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
          <Star className="w-4 h-4 fill-accent-500 text-accent-500" />
          <span className="text-sm font-semibold text-gray-900">{rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-1">{name}</h3>
        <div className="text-primary-600 font-medium mb-3">{specialty}</div>
        
        {/* Location */}
        <div className="flex items-center gap-2 text-gray-600 mb-4">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{location}</span>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-primary-600" />
            <div>
              <div className="text-sm text-gray-500">Products</div>
              <div className="text-lg font-semibold text-gray-900">{products}</div>
            </div>
          </div>

          <button 
            className="flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              if (onClick) onClick();
            }}
          >
            View Profile
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
