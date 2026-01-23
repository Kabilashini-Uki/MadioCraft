// HomePage.jsx
import React from 'react';
import { ArrowRight, Sparkles, TrendingUp, Users } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { CreatorCard } from '../components/CreatorCard';
import { ArtisanButton } from '../components/ArtisanButton';

export function HomePage({ onNavigate }) {
  const featuredProducts = [
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
  ];

  const featuredCreators = [
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
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1767476106330-4e5a0b4dcf94)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-primary-600/60" />
        </div>
        <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm">Discover Authentic Handcrafted Treasures</span>
            </div>
            <h1 className="text-5xl lg:text-6xl text-white mb-6">
              Where Art Meets
              <span className="block text-accent-500">Authenticity</span>
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Connect with talented artisans and bring home unique, handcrafted pieces that tell a story.
            </p>
            <div className="flex flex-wrap gap-4">
              <ArtisanButton 
                variant="primary" 
                size="lg"
                onClick={() => onNavigate('products')}
              >
                Explore Collection
                <ArrowRight className="w-5 h-5 ml-2" />
              </ArtisanButton>
              <ArtisanButton 
                variant="secondary" 
                size="lg"
                onClick={() => onNavigate('creators')}
              >
                Meet Creators
              </ArtisanButton>
            </div>
          </div>
        </div>
      </section>

     {/* Stats Section */}
<section className="py-16" style={{ backgroundColor: '#f3dcdfff', height:"400px", marginTop:"50px"}}>
  <div className="max-w-7xl mx-auto px-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-xl mb-4">
          <Users className="w-8 h-8 text-white" />
        </div>
        <div className="text-4xl text-primary-600 mb-2">500+</div>
        <div className="text-gray-700">Talented Artisans</div>
      </div>

      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-success-500 rounded-xl mb-4">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <div className="text-4xl text-success-500 mb-2">5,000+</div>
        <div className="text-gray-700">Unique Products</div>
      </div>

      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-500 rounded-xl mb-4">
          <TrendingUp className="w-8 h-8 text-white" />
        </div>
        <div className="text-4xl text-accent-500 mb-2">98%</div>
        <div className="text-gray-700">Satisfaction Rate</div>
      </div>

    </div>
  </div>
</section>


      {/* Featured Products */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-4xl text-gray-900 mb-2">Featured Products</h2>
              <p className="text-gray-500">Handpicked treasures from our artisan community</p>
            </div>
            <ArtisanButton variant="ghost" onClick={() => onNavigate('products')}>
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </ArtisanButton>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <ProductCard key={index} {...product} />
            ))}
          </div>
        </div>
      </section>

{/* Featured Creators */}
<section className="py-20" style={{ backgroundColor: '#f3dcdfff' }}>
  <div className="max-w-7xl mx-auto px-6">
    <div className="flex items-center justify-between mb-10">
      <div>
        <h2 className="text-4xl text-gray-900 mb-2">Meet Our Creators</h2>
        <p className="text-gray-700">
          The talented artisans behind the magic
        </p>
      </div>
      <ArtisanButton variant="ghost" onClick={() => onNavigate('creators')}>
        View All Creators
        <ArrowRight className="w-4 h-4 ml-2" />
      </ArtisanButton>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {featuredCreators.map((creator, index) => (
        <CreatorCard key={index} {...creator} />
      ))}
    </div>
  </div>
</section>



    

  <section className="py-20" >
  <div className="max-w-7xl mx-auto px-6">
    
    {/* Container */}
    <div
      className="rounded-2xl p-14 text-center shadow-xl"
      style={{ border: '2px solid #B75C69' }}
    >
      <h4 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
        Create Something Unique
      </h4>

      <p className="text-xl md:text-1xl font-semibold text-gray-700 mb-10 max-w-3xl mx-auto">
        Work directly with artisans to customize products that match your vision perfectly.
      </p>

      <ArtisanButton
        size="lg"
        style={{ backgroundColor: '#B75C69', color: '#fff' }}
        onClick={() => onNavigate('customize')}
      >
        Start Customizing
      </ArtisanButton>
    </div>

  </div>
</section>

    </div>
  );
}