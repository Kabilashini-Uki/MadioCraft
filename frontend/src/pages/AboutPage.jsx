import React from 'react';
import { ArtisanButton } from '../components/ArtisanButton';
import { ArrowLeft, Heart, Users, Sparkles, Award } from 'lucide-react';

export function AboutPage({ onNavigate }) {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <ArtisanButton variant="ghost" size="sm" onClick={() => onNavigate('home')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </ArtisanButton>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">About MadioCraft</h1>
          <p className="text-xl text-gray-600">
            Connecting artisans with those who appreciate authentic, handcrafted beauty
          </p>
        </div>

        <div className="prose prose-lg max-w-none mb-16">
          <div className="bg-primary-50 rounded-2xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              At Craftopia, we believe in the power of handcrafted artistry. Our platform bridges the gap between
              talented artisans and discerning buyers who value quality, authenticity, and the human touch in every piece.
              We're not just a marketplace—we're a community that celebrates craftsmanship and preserves traditional
              skills while supporting modern creators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <Heart className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Authenticity</h3>
              <p className="text-gray-600">Every product tells a story of dedication and skill</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <Users className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Community</h3>
              <p className="text-gray-600">Building connections between creators and buyers</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <Award className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality</h3>
              <p className="text-gray-600">Curated selection of exceptional handcrafted items</p>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              Craftopia was born from a simple observation: the world was losing touch with the art of handcrafted
              goods. Mass production had taken over, and the unique, personal touch of skilled artisans was becoming
              increasingly rare.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              We set out to create a platform where artisans could showcase their work, connect with customers who
              appreciate their craft, and build sustainable businesses doing what they love. Today, Craftopia is home
              to hundreds of talented creators and thousands of unique, handcrafted products.
            </p>
          </div>
        </div>

        <div className="text-center">
          <ArtisanButton variant="primary" size="lg" onClick={() => onNavigate('products')}>
            Explore Our Collection
          </ArtisanButton>
        </div>
      </div>
    </div>
  );
}
