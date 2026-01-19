import React from 'react';
import { CreatorCard } from '../components/CreatorCard';
import { ArtisanButton } from '../components/ArtisanButton';
import { ArrowLeft } from 'lucide-react';

export function CreatorProfilePage({ onNavigate }) {
  const creators = [
    {
      image: 'https://images.unsplash.com/photo-1767476106330-4e5a0b4dcf94',
      name: 'Maya Ceramics',
      specialty: 'Pottery & Ceramics',
      location: 'Portland, OR',
      rating: 4.9,
      products: 38,
    },
    {
      image: 'https://images.unsplash.com/photo-1748141951488-9c9fb9603daf',
      name: 'Thread & Co',
      specialty: 'Handlooms & Textiles',
      location: 'Austin, TX',
      rating: 4.8,
      products: 52,
    },
    {
      image: 'https://images.unsplash.com/photo-1766560360266-38abfd6ce9a4',
      name: 'Silversmith Studio',
      specialty: 'Jewelry & Accessories',
      location: 'Santa Fe, NM',
      rating: 5.0,
      products: 24,
    },
    {
      image: 'https://images.unsplash.com/photo-1745426863209-7b7efde1578a',
      name: 'Wood & Grain',
      specialty: 'Woodwork & Furniture',
      location: 'Seattle, WA',
      rating: 4.7,
      products: 41,
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
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Meet Our Creators</h1>
          <p className="text-gray-500">Discover the talented artisans behind every handcrafted piece</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {creators.map((creator, index) => (
            <CreatorCard key={index} {...creator} onClick={() => onNavigate('creator-detail')} />
          ))}
        </div>
      </div>
    </div>
  );
}
