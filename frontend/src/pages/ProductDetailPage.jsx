import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import '../style/ProductDetailPage.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [customization, setCustomization] = useState({
    color: 'Maroon',
    border: 'Traditional Zari',
    personalization: ''
  });

  // Mock product data
  const mockProduct = {
    id: 1,
    name: 'Handwoven Silk Saree with Golden Zari',
    description: 'A masterpiece of traditional Banarasi weaving, this silk saree features intricate zari work depicting traditional motifs.',
    detailedDescription: `This exquisite Banarasi silk saree is a testament to centuries-old weaving traditions. Handcrafted by third-generation weavers in Varanasi, it features:
    
• Pure silk fabric with a luxurious drape
• Intricate gold and silver zari work
• Traditional motifs inspired by Mughal architecture
• Fine pallu with detailed patterning
• Hand-finished edges

Care Instructions:
• Dry clean only
• Store in muslin cloth
• Avoid direct sunlight
• Iron on low heat with cloth barrier`,
    
    price: 12500,
    originalPrice: 15000,
    discountPercentage: 17,
    images: [
      'https://images.unsplash.com/photo-1567557169255-8c2afd5c5cba?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop'
    ],
    category: 'Handloom',
    subcategory: 'Sarees',
    rating: 4.9,
    reviewCount: 128,
    stock: 5,
    isNew: true,
    isBestSeller: true,
    isCustomizable: true,
    
    creator: {
      id: 1,
      name: 'Varanasi Weavers Collective',
      location: 'Varanasi, Uttar Pradesh',
      rating: 4.8,
      totalProducts: 45,
      memberSince: '2018',
      description: 'A cooperative of 25 traditional weavers preserving Banarasi silk weaving for generations.',
      avatar: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop&q=60'
    },
    
    specifications: {
      material: 'Pure Silk with Zari',
      color: 'Maroon with Gold',
      length: '5.5 meters',
      width: '1.1 meters',
      weight: '800 grams',
      care: 'Dry Clean Only',
      productionTime: '15-20 days',
      origin: 'Varanasi, India'
    },
    
    customizationOptions: {
      colors: [
        { name: 'Maroon', hex: '#800000', price: 0 },
        { name: 'Royal Blue', hex: '#4169E1', price: 500 },
        { name: 'Emerald Green', hex: '#50C878', price: 500 },
        { name: 'Purple', hex: '#800080', price: 500 }
      ],
      borders: [
        { name: 'Traditional Zari', price: 0 },
        { name: 'Minimal Zari', price: -1000 },
        { name: 'Heavy Zari', price: 2000 },
        { name: 'Kundan Border', price: 3000 }
      ],
      personalization: {
        available: true,
        maxCharacters: 20,
        price: 300
      }
    },
    
    shipping: {
      estimatedDelivery: '7-10 business days',
      cost: 150,
      freeOver: 5000,
      returnPolicy: '30 days return, 7 days exchange',
      productionTime: 'Made to order (15-20 days)'
    },
    
    reviews: [
      {
        id: 1,
        userName: 'Priya Sharma',
        userAvatar: 'https://randomuser.me/api/portraits/women/32.jpg',
        rating: 5,
        date: '2024-01-15',
        comment: 'Absolutely stunning saree! The craftsmanship is incredible. Perfect for weddings.',
        images: ['https://images.unsplash.com/photo-1567557169255-8c2afd5c5cba?w=800&auto=format&fit=crop']
      },
      {
        id: 2,
        userName: 'Rahul Mehta',
        userAvatar: 'https://randomuser.me/api/portraits/men/54.jpg',
        rating: 4,
        date: '2024-01-10',
        comment: 'Beautiful product. Arrived earlier than expected. The quality is excellent.',
        images: []
      }
    ]
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setProduct(mockProduct);
        setLoading(false);
      }, 500);
    } catch (err) {
      setError('Failed to load product details');
      setLoading(false);
    }
  };

  const handleQuantityChange = (type) => {
    if (type === 'increase' && quantity < product.stock) {
      setQuantity(quantity + 1);
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const calculateCustomizationPrice = () => {
    if (!product) return 0;
    
    let additionalCost = 0;
    
    // Color cost
    const selectedColor = product.customizationOptions.colors.find(
      c => c.name === customization.color
    );
    additionalCost += selectedColor?.price || 0;
    
    // Border cost
    const selectedBorder = product.customizationOptions.borders.find(
      b => b.name === customization.border
    );
    additionalCost += selectedBorder?.price || 0;
    
    // Personalization cost
    if (customization.personalization && product.customizationOptions.personalization.available) {
      additionalCost += product.customizationOptions.personalization.price;
    }
    
    return additionalCost;
  };

  const totalPrice = product 
    ? (product.price + calculateCustomizationPrice()) * quantity
    : 0;

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner-large"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="error-screen">
        <div className="error-icon">
          <i className="fas fa-exclamation-triangle"></i>
        </div>
        <h3>{error || 'Product not found'}</h3>
        <button 
          className="back-button"
          onClick={() => navigate('/products')}
        >
          <i className="fas fa-arrow-left"></i>
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <div className="container">
          <Link to="/" className="breadcrumb-link">
            <i className="fas fa-home"></i> Home
          </Link>
          <span className="breadcrumb-separator">/</span>
          <Link to="/products" className="breadcrumb-link">
            Products
          </Link>
          <span className="breadcrumb-separator">/</span>
          <Link to={`/category/${product.category.toLowerCase()}`} className="breadcrumb-link">
            {product.category}
          </Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{product.name}</span>
        </div>
      </div>

      {/* Back Button */}
      <div className="container">
        <button 
          className="back-button secondary"
          onClick={() => navigate(-1)}
        >
          <i className="fas fa-arrow-left"></i>
          Back
        </button>
      </div>

      {/* Main Product Section */}
      <div className="container">
        <div className="product-main-section">
          {/* Product Images */}
          <div className="product-images-section">
            {/* Main Image */}
            <div className="main-image-container">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="main-image"
              />
              
              {/* Badges */}
              <div className="image-badges">
                {product.isNew && <span className="badge badge-new">NEW</span>}
                {product.isBestSeller && <span className="badge badge-bestseller">BESTSELLER</span>}
                {product.discountPercentage > 0 && (
                  <span className="badge badge-discount">{product.discountPercentage}% OFF</span>
                )}
                {product.stock < 10 && (
                  <span className="badge badge-stock">Only {product.stock} left</span>
                )}
              </div>
              
              {/* Image Actions */}
              <div className="image-actions">
                <button className="image-action-btn">
                  <i className="fas fa-heart"></i>
                </button>
                <button className="image-action-btn">
                  <i className="fas fa-share-alt"></i>
                </button>
                <button className="image-action-btn">
                  <i className="fas fa-expand"></i>
                </button>
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="thumbnail-images">
              {product.images.map((img, index) => (
                <div 
                  key={index}
                  className={`thumbnail-container ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img 
                    src={img} 
                    alt={`${product.name} ${index + 1}`}
                    className="thumbnail-image"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info-section">
            {/* Product Header */}
            <div className="product-header">
              <h1 className="product-title">{product.name}</h1>
              
              {/* Creator Info */}
              <div className="creator-info">
                <div className="creator-avatar">
                  <img src={product.creator.avatar} alt={product.creator.name} />
                </div>
                <div className="creator-details">
                  <Link to={`/creator/${product.creator.id}`} className="creator-name">
                    {product.creator.name}
                  </Link>
                  <div className="creator-location">
                    <i className="fas fa-map-marker-alt"></i>
                    {product.creator.location}
                  </div>
                  <div className="creator-rating">
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <i 
                          key={i} 
                          className={`fas fa-star ${i < Math.floor(product.creator.rating) ? 'filled' : ''}`}
                        ></i>
                      ))}
                    </div>
                    <span className="rating-text">{product.creator.rating} ({product.creator.totalProducts} products)</span>
                  </div>
                </div>
              </div>
              
              {/* Product Rating */}
              <div className="product-rating-large">
                <div className="rating-badge">
                  <span className="rating-value">{product.rating}</span>
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <i 
                        key={i} 
                        className={`fas fa-star ${i < Math.floor(product.rating) ? 'filled' : ''}`}
                      ></i>
                    ))}
                  </div>
                </div>
                <span className="review-count">{product.reviewCount} reviews</span>
                <span className="verified-badge">
                  <i className="fas fa-check-circle"></i>
                  Verified Purchase
                </span>
              </div>
            </div>

            {/* Product Price */}
            <div className="product-price-section">
              <div className="price-display">
                <span className="current-price">₹{totalPrice.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="original-price">₹{product.originalPrice.toLocaleString()}</span>
                )}
              </div>
              {product.discountPercentage > 0 && (
                <div className="discount-info">
                  You save ₹{(product.originalPrice - product.price).toLocaleString()} ({product.discountPercentage}%)
                </div>
              )}
              
              {/* Stock Status */}
              <div className={`stock-status ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                <i className={`fas ${product.stock > 0 ? 'fa-check-circle' : 'fa-times-circle'}`}></i>
                {product.stock > 0 ? `${product.stock} items available` : 'Out of Stock'}
              </div>
            </div>

            {/* Customization Options */}
            {product.isCustomizable && (
              <div className="customization-section">
                <h3 className="section-title">
                  <i className="fas fa-palette"></i>
                  Customize This Product
                </h3>
                
                {/* Color Selection */}
                <div className="customization-option">
                  <label className="option-label">Color</label>
                  <div className="color-options">
                    {product.customizationOptions.colors.map((color) => (
                      <button
                        key={color.name}
                        className={`color-option ${customization.color === color.name ? 'selected' : ''}`}
                        onClick={() => setCustomization({...customization, color: color.name})}
                        title={color.name}
                      >
                        <div 
                          className="color-swatch"
                          style={{ backgroundColor: color.hex }}
                        ></div>
                        <span className="color-name">{color.name}</span>
                        {color.price > 0 && (
                          <span className="color-price">+₹{color.price}</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Border Selection */}
                <div className="customization-option">
                  <label className="option-label">Border Design</label>
                  <div className="border-options">
                    {product.customizationOptions.borders.map((border) => (
                      <button
                        key={border.name}
                        className={`border-option ${customization.border === border.name ? 'selected' : ''}`}
                        onClick={() => setCustomization({...customization, border: border.name})}
                      >
                        <span className="border-name">{border.name}</span>
                        {border.price !== 0 && (
                          <span className="border-price">
                            {border.price > 0 ? '+' : ''}₹{Math.abs(border.price)}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Personalization */}
                {product.customizationOptions.personalization.available && (
                  <div className="customization-option">
                    <label className="option-label">Add Personalization</label>
                    <div className="personalization-input">
                      <input
                        type="text"
                        placeholder="Enter text to personalize (max 20 characters)"
                        value={customization.personalization}
                        onChange={(e) => setCustomization({...customization, personalization: e.target.value.slice(0, 20)})}
                        maxLength="20"
                        className="personalization-text"
                      />
                      <div className="personalization-info">
                        <span className="char-count">
                          {customization.personalization.length}/20 characters
                        </span>
                        <span className="personalization-price">
                          +₹{product.customizationOptions.personalization.price}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Customization Summary */}
                {calculateCustomizationPrice() > 0 && (
                  <div className="customization-summary">
                    <span>Additional customization cost:</span>
                    <span className="customization-cost">+₹{calculateCustomizationPrice()}</span>
                  </div>
                )}
              </div>
            )}

            {/* Quantity Selector */}
            <div className="quantity-section">
              <label className="option-label">Quantity</label>
              <div className="quantity-selector">
                <button 
                  className="quantity-btn"
                  onClick={() => handleQuantityChange('decrease')}
                  disabled={quantity <= 1}
                >
                  <i className="fas fa-minus"></i>
                </button>
                <span className="quantity-display">{quantity}</span>
                <button 
                  className="quantity-btn"
                  onClick={() => handleQuantityChange('increase')}
                  disabled={quantity >= product.stock}
                >
                  <i className="fas fa-plus"></i>
                </button>
                <span className="stock-info">Max: {product.stock} items</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button className="btn btn-primary btn-large">
                <i className="fas fa-shopping-cart"></i>
                Add to Cart - ₹{totalPrice.toLocaleString()}
              </button>
              
              <button className="btn btn-secondary btn-large">
                <i className="fas fa-bolt"></i>
                Buy Now
              </button>
              
              <button className="btn btn-outline btn-large">
                <i className="fas fa-heart"></i>
                Add to Wishlist
              </button>
            </div>

            {/* Shipping Info */}
            <div className="shipping-info">
              <div className="shipping-item">
                <i className="fas fa-shipping-fast"></i>
                <div>
                  <strong>Free Shipping</strong>
                  <p>On orders over ₹{product.shipping.freeOver}</p>
                </div>
              </div>
              <div className="shipping-item">
                <i className="fas fa-undo"></i>
                <div>
                  <strong>{product.shipping.returnPolicy}</strong>
                  <p>Easy returns & exchanges</p>
                </div>
              </div>
              <div className="shipping-item">
                <i className="fas fa-clock"></i>
                <div>
                  <strong>Delivery in {product.shipping.estimatedDelivery}</strong>
                  <p>Production time: {product.shipping.productionTime}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="product-tabs-section">
          <div className="tabs-header">
            <button 
              className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              <i className="fas fa-file-alt"></i>
              Description
            </button>
            <button 
              className={`tab-btn ${activeTab === 'specifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('specifications')}
            >
              <i className="fas fa-info-circle"></i>
              Specifications
            </button>
            <button 
              className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              <i className="fas fa-star"></i>
              Reviews ({product.reviewCount})
            </button>
            <button 
              className={`tab-btn ${activeTab === 'shipping' ? 'active' : ''}`}
              onClick={() => setActiveTab('shipping')}
            >
              <i className="fas fa-truck"></i>
              Shipping & Returns
            </button>
          </div>

          <div className="tabs-content">
            {activeTab === 'description' && (
              <div className="tab-pane">
                <h3>Product Description</h3>
                <p className="product-description">{product.description}</p>
                <div className="detailed-description">
                  {product.detailedDescription.split('\n').map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="tab-pane">
                <h3>Product Specifications</h3>
                <div className="specifications-grid">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="spec-item">
                      <span className="spec-label">{key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</span>
                      <span className="spec-value">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="tab-pane">
                <div className="reviews-header">
                  <h3>Customer Reviews</h3>
                  <button className="btn btn-outline">
                    <i className="fas fa-edit"></i>
                    Write a Review
                  </button>
                </div>
                
                {/* Average Rating */}
                <div className="average-rating">
                  <div className="average-score">
                    <span className="score">{product.rating}</span>
                    <div className="stars-large">
                      {[...Array(5)].map((_, i) => (
                        <i 
                          key={i} 
                          className={`fas fa-star ${i < Math.floor(product.rating) ? 'filled' : ''}`}
                        ></i>
                      ))}
                    </div>
                    <span className="total-reviews">{product.reviewCount} reviews</span>
                  </div>
                  
                  {/* Rating Distribution */}
                  <div className="rating-distribution">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="distribution-row">
                        <span className="rating-label">{rating} stars</span>
                        <div className="distribution-bar">
                          <div 
                            className="distribution-fill"
                            style={{ width: `${(rating === 5 ? 80 : rating === 4 ? 15 : rating === 3 ? 3 : rating === 2 ? 1 : 1)}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Reviews List */}
                <div className="reviews-list">
                  {product.reviews.map((review) => (
                    <div key={review.id} className="review-item">
                      <div className="review-header">
                        <div className="reviewer-info">
                          <img src={review.userAvatar} alt={review.userName} className="reviewer-avatar" />
                          <div>
                            <h4 className="reviewer-name">{review.userName}</h4>
                            <div className="review-date">
                              <i className="fas fa-calendar"></i>
                              {new Date(review.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </div>
                          </div>
                        </div>
                        <div className="review-rating">
                          <div className="stars">
                            {[...Array(5)].map((_, i) => (
                              <i 
                                key={i} 
                                className={`fas fa-star ${i < review.rating ? 'filled' : ''}`}
                              ></i>
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="review-comment">{review.comment}</p>
                      {review.images.length > 0 && (
                        <div className="review-images">
                          {review.images.map((img, index) => (
                            <img key={index} src={img} alt="" className="review-image" />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="tab-pane">
                <h3>Shipping & Returns</h3>
                <div className="shipping-details">
                  <div className="shipping-card">
                    <i className="fas fa-shipping-fast"></i>
                    <div>
                      <h4>Shipping Information</h4>
                      <p>Estimated delivery: {product.shipping.estimatedDelivery}</p>
                      <p>Shipping cost: ₹{product.shipping.cost} (Free on orders over ₹{product.shipping.freeOver})</p>
                      <p>Production time: {product.shipping.productionTime}</p>
                    </div>
                  </div>
                  
                  <div className="shipping-card">
                    <i className="fas fa-undo"></i>
                    <div>
                      <h4>Return Policy</h4>
                      <p>{product.shipping.returnPolicy}</p>
                      <p>Items must be in original condition with all tags attached.</p>
                    </div>
                  </div>
                  
                  <div className="shipping-card">
                    <i className="fas fa-shield-alt"></i>
                    <div>
                      <h4>Customer Protection</h4>
                      <p>100% secure payment</p>
                      <p>Money-back guarantee</p>
                      <p>Direct artisan support</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="related-products">
          <h2 className="section-title">You May Also Like</h2>
          <div className="related-products-grid">
            {/* Add related products component here */}
            <p className="placeholder-text">Related products will be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;