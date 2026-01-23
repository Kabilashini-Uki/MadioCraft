// src/pages/ShoppingCart.jsx
import React, { useState } from 'react';
import './ShoppingCart.css';

const ShoppingCart = ({ onNavigate }) => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Handwoven Banarasi Silk Saree',
      image: 'https://images.unsplash.com/photo-1567557169255-8c2afd5c5cba?w=400&auto=format&fit=crop',
      price: 12500,
      originalPrice: 15000,
      quantity: 1,
      color: 'Maroon',
      size: 'M',
      personalization: 'Wedding Saree with golden zari work',
      deliveryDate: '15-20 days',
      seller: 'Rajesh Weavers',
      sellerRating: 4.8,
      customization: true,
      inStock: true,
      customizable: true,
      customizations: [
        { type: 'Color', value: 'Maroon' },
        { type: 'Pattern', value: 'Traditional Zari' },
        { type: 'Embroidery', value: 'Gold Thread' }
      ]
    },
    {
      id: 2,
      name: 'Madhubani Painting Wall Art',
      image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=400&auto=format&fit=crop',
      price: 8500,
      originalPrice: 10000,
      quantity: 2,
      color: 'Multicolor',
      size: '24x36 inches',
      personalization: '',
      deliveryDate: '10-15 days',
      seller: 'Mithila Artisans',
      sellerRating: 4.9,
      customization: false,
      inStock: true,
      customizable: false
    },
    {
      id: 3,
      name: 'Terracotta Pottery Set',
      image: 'https://images.unsplash.com/photo-1574732011388-8e9d1ef55d93?w=400&auto=format&fit=crop',
      price: 3200,
      originalPrice: 4000,
      quantity: 1,
      color: 'Terracotta',
      size: 'Set of 3',
      personalization: '',
      deliveryDate: '5-7 days',
      seller: 'Clay Craft Studio',
      sellerRating: 4.7,
      customization: false,
      inStock: true,
      customizable: false
    }
  ]);

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [savedForLater, setSavedForLater] = useState([]);
  const [selectedItems, setSelectedItems] = useState(new Set(cartItems.map(item => item.id)));

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    const newSelected = new Set(selectedItems);
    newSelected.delete(id);
    setSelectedItems(newSelected);
  };

  const moveToWishlist = (item) => {
    setSavedForLater([...savedForLater, item]);
    removeItem(item.id);
  };

  const toggleItemSelection = (id) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedItems(newSelected);
  };

  const selectAllItems = () => {
    if (selectedItems.size === cartItems.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(cartItems.map(item => item.id)));
    }
  };

  const applyCoupon = () => {
    const coupons = {
      'WELCOME10': { discount: 0.10, minPurchase: 0, maxDiscount: 2000 },
      'ARTISAN20': { discount: 0.20, minPurchase: 10000, maxDiscount: 5000 },
      'CRAFT25': { discount: 0.25, minPurchase: 15000, maxDiscount: 7500 },
      'FESTIVE30': { discount: 0.30, minPurchase: 20000, maxDiscount: 10000 }
    };
    
    const coupon = coupons[couponCode.toUpperCase()];
    if (coupon) {
      const subtotal = calculateSubtotal();
      if (subtotal >= coupon.minPurchase) {
        const discount = Math.min(subtotal * coupon.discount, coupon.maxDiscount);
        setAppliedCoupon({
          code: couponCode.toUpperCase(),
          discount: coupon.discount,
          amount: discount
        });
        alert(`Coupon applied! You saved ₹${discount.toLocaleString()}`);
      } else {
        alert(`Minimum purchase of ₹${coupon.minPurchase.toLocaleString()} required for this coupon.`);
      }
    } else {
      alert('Invalid coupon code');
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
  };

  const calculateSubtotal = () => {
    return cartItems
      .filter(item => selectedItems.has(item.id))
      .reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateDiscount = () => {
    if (!appliedCoupon) return 0;
    return appliedCoupon.amount;
  };

  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    if (subtotal > 10000) return 0;
    return 200;
  };

  const calculateTax = () => {
    const subtotal = calculateSubtotal();
    return subtotal * 0.18; // 18% GST
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discount = calculateDiscount();
    const shipping = calculateShipping();
    const tax = calculateTax();
    return subtotal - discount + shipping + tax;
  };

  const proceedToCheckout = () => {
    if (selectedItems.size === 0) {
      alert('Please select items to checkout');
      return;
    }
    onNavigate('checkout');
  };

  const continueShopping = () => {
    onNavigate('products');
  };

  const customizeItem = (item) => {
    if (item.customizable) {
      onNavigate('customize', { product: item });
    }
  };

  const getSelectedItemsCount = () => {
    return selectedItems.size;
  };

  const getSelectedItemsTotal = () => {
    return cartItems
      .filter(item => selectedItems.has(item.id))
      .reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="shopping-cart">
      <div className="cart-container">
        {/* Header */}
        <div className="cart-header">
          <h1><i className="fas fa-shopping-cart"></i> Shopping Cart</h1>
          <div className="cart-stats">
            <span className="item-count">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
            </span>
            <button 
              onClick={continueShopping}
              className="continue-btn"
            >
              <i className="fas fa-arrow-left"></i> Continue Shopping
            </button>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <i className="fas fa-shopping-cart fa-4x"></i>
            </div>
            <h2>Your cart is empty</h2>
            <p>Add some beautiful handmade items to get started!</p>
            <button 
              onClick={continueShopping}
              className="browse-btn"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="cart-content">
            {/* Cart Items Section */}
            <div className="cart-items-section">
              <div className="cart-actions-bar">
                <div className="select-all">
                  <input
                    type="checkbox"
                    checked={selectedItems.size === cartItems.length && cartItems.length > 0}
                    onChange={selectAllItems}
                    id="select-all"
                  />
                  <label htmlFor="select-all">
                    Select all ({cartItems.length} items)
                  </label>
                </div>
                <div className="action-buttons">
                  <button 
                    onClick={() => {
                      cartItems.forEach(item => {
                        if (selectedItems.has(item.id)) {
                          moveToWishlist(item);
                        }
                      });
                    }}
                    className="action-btn"
                  >
                    <i className="fas fa-heart"></i> Move to Wishlist
                  </button>
                  <button 
                    onClick={() => {
                      cartItems.forEach(item => {
                        if (selectedItems.has(item.id)) {
                          removeItem(item.id);
                        }
                      });
                    }}
                    className="action-btn remove"
                  >
                    <i className="fas fa-trash"></i> Remove Selected
                  </button>
                </div>
              </div>

              <div className="items-list">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="item-select">
                      <input
                        type="checkbox"
                        checked={selectedItems.has(item.id)}
                        onChange={() => toggleItemSelection(item.id)}
                        className="item-checkbox"
                      />
                    </div>

                    <div className="item-image">
                      <img src={item.image} alt={item.name} />
                      {item.customization && (
                        <span className="custom-badge">
                          <i className="fas fa-palette"></i> Custom
                        </span>
                      )}
                    </div>

                    <div className="item-details">
                      <div className="item-header">
                        <h3 className="item-name">{item.name}</h3>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="remove-item"
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </div>
                      
                      <div className="seller-info">
                        <span className="seller-name">Sold by: {item.seller}</span>
                        <span className="seller-rating">
                          <i className="fas fa-star"></i> {item.sellerRating}
                        </span>
                      </div>

                      {item.customizations && (
                        <div className="customization-details">
                          <h4>Customization:</h4>
                          <div className="customization-tags">
                            {item.customizations.map((custom, idx) => (
                              <span key={idx} className="custom-tag">
                                {custom.type}: {custom.value}
                              </span>
                            ))}
                          </div>
                          {item.personalization && (
                            <div className="personalization">
                              <strong>Personal Text:</strong> "{item.personalization}"
                            </div>
                          )}
                        </div>
                      )}

                      <div className="item-properties">
                        <div className="property">
                          <span className="property-label">Color:</span>
                          <div className="property-value">
                            <div 
                              className="color-dot" 
                              style={{ backgroundColor: item.color.toLowerCase() }}
                            ></div>
                            <span>{item.color}</span>
                          </div>
                        </div>
                        <div className="property">
                          <span className="property-label">Size:</span>
                          <span className="property-value">{item.size}</span>
                        </div>
                        <div className="property">
                          <span className="property-label">Delivery:</span>
                          <span className="property-value">
                            <i className="fas fa-truck"></i> {item.deliveryDate}
                          </span>
                        </div>
                      </div>

                      <div className="item-actions">
                        {item.customizable && (
                          <button 
                            onClick={() => customizeItem(item)}
                            className="customize-btn"
                          >
                            <i className="fas fa-edit"></i> Customize Again
                          </button>
                        )}
                        <button 
                          onClick={() => moveToWishlist(item)}
                          className="wishlist-btn"
                        >
                          <i className="fas fa-heart"></i> Save for Later
                        </button>
                      </div>
                    </div>

                    <div className="item-pricing">
                      <div className="quantity-control">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="qty-btn"
                          disabled={item.quantity <= 1}
                        >
                          <i className="fas fa-minus"></i>
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="qty-btn"
                        >
                          <i className="fas fa-plus"></i>
                        </button>
                      </div>

                      <div className="price-info">
                        <div className="current-price">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </div>
                        {item.originalPrice > item.price && (
                          <div className="original-price">
                            ₹{(item.originalPrice * item.quantity).toLocaleString()}
                          </div>
                        )}
                        <div className="discount">
                          {item.originalPrice > item.price && (
                            <span className="discount-percent">
                              {Math.round((1 - item.price/item.originalPrice) * 100)}% off
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Saved for Later Section */}
              {savedForLater.length > 0 && (
                <div className="saved-section">
                  <h3>
                    <i className="fas fa-heart"></i>
                    Saved for Later ({savedForLater.length} items)
                  </h3>
                  <div className="saved-items">
                    {savedForLater.map((item) => (
                      <div key={item.id} className="saved-item">
                        <img src={item.image} alt={item.name} />
                        <div className="saved-details">
                          <h4>{item.name}</h4>
                          <div className="saved-price">₹{item.price.toLocaleString()}</div>
                          <div className="saved-actions">
                            <button 
                              onClick={() => {
                                setCartItems([...cartItems, { ...item, quantity: 1 }]);
                                setSavedForLater(savedForLater.filter(i => i.id !== item.id));
                              }}
                              className="move-to-cart"
                            >
                              Move to Cart
                            </button>
                            <button 
                              onClick={() => setSavedForLater(savedForLater.filter(i => i.id !== item.id))}
                              className="remove-saved"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary Section */}
            <div className="order-summary-section">
              <div className="order-summary">
                <h2>Order Summary</h2>
                
                {/* Coupon Code */}
                <div className="coupon-section">
                  <label>Have a coupon code?</label>
                  <div className="coupon-input">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter coupon code"
                      disabled={!!appliedCoupon}
                    />
                    {appliedCoupon ? (
                      <button onClick={removeCoupon} className="remove-coupon">
                        Remove
                      </button>
                    ) : (
                      <button onClick={applyCoupon} className="apply-coupon">
                        Apply
                      </button>
                    )}
                  </div>
                  {appliedCoupon && (
                    <div className="applied-coupon">
                      <span className="coupon-code">{appliedCoupon.code}</span>
                      <span className="coupon-discount">
                        -₹{appliedCoupon.amount.toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="price-breakdown">
                  <div className="price-row">
                    <span>Subtotal ({getSelectedItemsCount()} items)</span>
                    <span>₹{calculateSubtotal().toLocaleString()}</span>
                  </div>
                  
                  {appliedCoupon && (
                    <div className="price-row discount">
                      <span>Coupon Discount</span>
                      <span>-₹{calculateDiscount().toLocaleString()}</span>
                    </div>
                  )}
                  
                  <div className="price-row">
                    <span>Shipping</span>
                    <span>
                      {calculateShipping() === 0 ? (
                        <span className="free-shipping">FREE</span>
                      ) : (
                        `₹${calculateShipping()}`
                      )}
                    </span>
                  </div>
                  
                  <div className="price-row">
                    <span>Tax (GST 18%)</span>
                    <span>₹{calculateTax().toLocaleString()}</span>
                  </div>
                  
                  {calculateShipping() > 0 && calculateSubtotal() < 10000 && (
                    <div className="shipping-info">
                      Add ₹{(10000 - calculateSubtotal()).toLocaleString()} more for FREE shipping
                    </div>
                  )}
                  
                  <div className="price-row total">
                    <span>Total Amount</span>
                    <span className="total-amount">₹{calculateTotal().toLocaleString()}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button 
                  onClick={proceedToCheckout}
                  disabled={getSelectedItemsCount() === 0}
                  className={`checkout-btn ${getSelectedItemsCount() === 0 ? 'disabled' : ''}`}
                >
                  <i className="fas fa-lock"></i>
                  Proceed to Checkout ({getSelectedItemsCount()} items)
                  <span className="checkout-total">₹{calculateTotal().toLocaleString()}</span>
                </button>

                {/* Security Features */}
                <div className="security-features">
                  <div className="security-item">
                    <i className="fas fa-shield-alt"></i>
                    <span>Secure SSL Encryption</span>
                  </div>
                  <div className="security-item">
                    <i className="fas fa-undo"></i>
                    <span>14-Day Return Policy</span>
                  </div>
                  <div className="security-item">
                    <i className="fas fa-truck"></i>
                    <span>Free Shipping over ₹10,000</span>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="payment-methods">
                  <h4>We Accept:</h4>
                  <div className="method-icons">
                    <span className="method visa">VISA</span>
                    <span className="method mastercard">MC</span>
                    <span className="method upi">UPI</span>
                    <span className="method cod">COD</span>
                    <span className="method netbanking">NetBanking</span>
                  </div>
                </div>
              </div>

              {/* Need Help Section */}
              <div className="help-section">
                <h3><i className="fas fa-question-circle"></i> Need Help?</h3>
                <div className="help-options">
                  <button className="help-option">
                    <i className="fas fa-shipping-fast"></i>
                    <span>Shipping Info</span>
                  </button>
                  <button className="help-option">
                    <i className="fas fa-undo-alt"></i>
                    <span>Returns & Exchange</span>
                  </button>
                  <button className="help-option">
                    <i className="fas fa-headset"></i>
                    <span>Contact Support</span>
                  </button>
                  <button className="help-option">
                    <i className="fas fa-file-invoice"></i>
                    <span>FAQ</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;