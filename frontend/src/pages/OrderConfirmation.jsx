// src/pages/OrderConfirmation.jsx
import React, { useState, useEffect } from 'react';
import './OrderConfirmation.css';

const OrderConfirmation = ({ onNavigate }) => {
  const [order, setOrder] = useState(null);
  const [tracking, setTracking] = useState({
    status: 'confirmed',
    estimatedDelivery: '2024-01-20',
    steps: [
      { id: 1, name: 'Order Confirmed', status: 'completed', date: 'Today, 10:30 AM', icon: 'fas fa-check-circle' },
      { id: 2, name: 'Processing', status: 'active', date: 'Today, 11:00 AM', icon: 'fas fa-cogs' },
      { id: 3, name: 'Quality Check', status: 'pending', date: 'Tomorrow', icon: 'fas fa-clipboard-check' },
      { id: 4, name: 'Dispatched', status: 'pending', date: 'Jan 18', icon: 'fas fa-shipping-fast' },
      { id: 5, name: 'Out for Delivery', status: 'pending', date: 'Jan 19', icon: 'fas fa-truck' },
      { id: 6, name: 'Delivered', status: 'pending', date: 'Jan 20', icon: 'fas fa-home' }
    ]
  });

  useEffect(() => {
    // Generate mock order data
    const mockOrder = {
      orderId: `ORD${Math.floor(Math.random() * 1000000)}`,
      date: new Date().toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      time: new Date().toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit'
      }),
      items: [
        {
          id: 1,
          name: 'Handwoven Banarasi Silk Saree',
          image: 'https://images.unsplash.com/photo-1567557169255-8c2afd5c5cba?w-300&auto=format&fit=crop',
          price: 12500,
          quantity: 1,
          customization: true,
          customizations: [
            { type: 'Color', value: 'Maroon' },
            { type: 'Pattern', value: 'Traditional Zari' },
            { type: 'Embroidery', value: 'Gold Thread' }
          ],
          personalization: 'Wedding Saree with golden zari work',
          artisan: 'Rajesh Weavers',
          artisanContact: '+91 9876543210',
          estimatedCompletion: 'Jan 25, 2024',
          timeline: '7-10 business days'
        }
      ],
      shippingAddress: {
        name: 'Priya Sharma',
        phone: '+91 9876543210',
        email: 'priya@example.com',
        address: '123 Gandhi Nagar, Bandra West',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400050',
        country: 'India'
      },
      billingAddress: {
        sameAsShipping: true,
        name: 'Priya Sharma',
        address: '123 Gandhi Nagar, Bandra West',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400050'
      },
      payment: {
        method: 'UPI',
        transactionId: 'TXN' + Math.floor(Math.random() * 1000000),
        amount: 14750,
        status: 'Paid',
        date: new Date().toLocaleDateString()
      },
      summary: {
        subtotal: 12500,
        shipping: 0,
        discount: 2500,
        tax: 2250,
        total: 14750
      },
      delivery: {
        method: 'Standard Shipping',
        estimatedDelivery: 'Jan 20, 2024',
        trackingNumber: 'TRK' + Math.floor(Math.random() * 1000000),
        carrier: 'Blue Dart'
      }
    };
    
    setOrder(mockOrder);
  }, []);

  const downloadInvoice = () => {
    // In real app, this would generate a PDF invoice
    const invoiceData = {
      ...order,
      downloadDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(invoiceData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `invoice-${order?.orderId}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    alert('Invoice downloaded!');
  };

  const trackOrder = () => {
    window.open(`https://www.bluedart.com/track/${order?.delivery.trackingNumber}`, '_blank');
  };

  const contactArtisan = () => {
    alert(`Contacting artisan: ${order?.items[0].artisan}\nPhone: ${order?.items[0].artisanContact}`);
  };

  const shareOrder = () => {
    const shareText = `I just ordered ${order?.items[0].name} from Craftopia! Order ID: ${order?.orderId}`;
    if (navigator.share) {
      navigator.share({
        title: 'My Craftopia Order',
        text: shareText,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Order details copied to clipboard!');
    }
  };

  const reorderItem = (item) => {
    alert(`Added "${item.name}" to cart!`);
    onNavigate('cart');
  };

  const cancelOrder = () => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      alert('Order cancellation request submitted. Our team will contact you shortly.');
    }
  };

  if (!order) {
    return (
      <div className="loading-order">
        <div className="loading-spinner">
          <i className="fas fa-spinner fa-spin fa-3x"></i>
        </div>
        <h2>Loading Order Details...</h2>
      </div>
    );
  }

  return (
    <div className="order-confirmation">
      <div className="confirmation-container">
        {/* Success Header */}
        <div className="success-header">
          <div className="success-icon">
            <i className="fas fa-check-circle fa-4x"></i>
          </div>
          <div className="success-message">
            <h1>Order Confirmed!</h1>
            <p className="order-id">Order ID: {order.orderId}</p>
            <p className="confirmation-text">
              Thank you for your order. We've sent a confirmation email to your registered email address.
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <button onClick={downloadInvoice} className="action-btn">
            <i className="fas fa-file-invoice"></i>
            <span>Download Invoice</span>
          </button>
          <button onClick={trackOrder} className="action-btn">
            <i className="fas fa-truck"></i>
            <span>Track Order</span>
          </button>
          <button onClick={contactArtisan} className="action-btn">
            <i className="fas fa-user-cog"></i>
            <span>Contact Artisan</span>
          </button>
          <button onClick={shareOrder} className="action-btn">
            <i className="fas fa-share-alt"></i>
            <span>Share Order</span>
          </button>
        </div>

        <div className="order-details-grid">
          {/* Order Tracking */}
          <div className="tracking-section">
            <h2><i className="fas fa-map-marker-alt"></i> Order Tracking</h2>
            <div className="tracking-timeline">
              {tracking.steps.map((step) => (
                <div key={step.id} className={`tracking-step ${step.status}`}>
                  <div className="step-icon">
                    <i className={step.icon}></i>
                  </div>
                  <div className="step-info">
                    <h4>{step.name}</h4>
                    <p>{step.date}</p>
                  </div>
                  <div className="step-connector"></div>
                </div>
              ))}
            </div>
            
            <div className="tracking-details">
              <div className="detail-item">
                <span className="detail-label">Estimated Delivery:</span>
                <span className="detail-value">{tracking.estimatedDelivery}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Tracking Number:</span>
                <span className="detail-value">{order.delivery.trackingNumber}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Carrier:</span>
                <span className="detail-value">{order.delivery.carrier}</span>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="summary-section">
            <h2><i className="fas fa-receipt"></i> Order Summary</h2>
            
            <div className="order-items">
              {order.items.map((item) => (
                <div key={item.id} className="order-item">
                  <img src={item.image} alt={item.name} className="item-image" />
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <div className="item-seller">
                      <i className="fas fa-user-tie"></i> Artisan: {item.artisan}
                    </div>
                    
                    {item.customization && (
                      <div className="customization-details">
                        <h4>Customization Details:</h4>
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
                        <span className="property-label">Quantity:</span>
                        <span className="property-value">{item.quantity}</span>
                      </div>
                      <div className="property">
                        <span className="property-label">Price:</span>
                        <span className="property-value">₹{item.price.toLocaleString()}</span>
                      </div>
                      <div className="property">
                        <span className="property-label">Estimated Completion:</span>
                        <span className="property-value">{item.estimatedCompletion}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="item-actions">
                    <button 
                      onClick={() => reorderItem(item)}
                      className="reorder-btn"
                    >
                      <i className="fas fa-redo"></i> Reorder
                    </button>
                    <button 
                      onClick={() => contactArtisan()}
                      className="contact-btn"
                    >
                      <i className="fas fa-comment"></i> Message Artisan
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="price-summary">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>₹{order.summary.subtotal.toLocaleString()}</span>
              </div>
              <div className="summary-row discount">
                <span>Discount:</span>
                <span>-₹{order.summary.discount.toLocaleString()}</span>
              </div>
              <div className="summary-row">
                <span>Shipping:</span>
                <span className="free">FREE</span>
              </div>
              <div className="summary-row">
                <span>Tax (18%):</span>
                <span>₹{order.summary.tax.toLocaleString()}</span>
              </div>
              <div className="summary-row total">
                <span>Total Amount:</span>
                <span className="total-amount">₹{order.summary.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Shipping & Payment Info */}
          <div className="info-section">
            <div className="shipping-info">
              <h2><i className="fas fa-truck"></i> Shipping Details</h2>
              <div className="address-card">
                <div className="address-header">
                  <strong>{order.shippingAddress.name}</strong>
                  <span className="default-badge">Primary Address</span>
                </div>
                <p>{order.shippingAddress.address}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
                <p>{order.shippingAddress.country}</p>
                <div className="contact-info">
                  <p><i className="fas fa-phone"></i> {order.shippingAddress.phone}</p>
                  <p><i className="fas fa-envelope"></i> {order.shippingAddress.email}</p>
                </div>
              </div>
              
              <div className="delivery-details">
                <div className="detail-item">
                  <span className="detail-label">Delivery Method:</span>
                  <span className="detail-value">{order.delivery.method}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Estimated Delivery:</span>
                  <span className="detail-value">{order.delivery.estimatedDelivery}</span>
                </div>
              </div>
            </div>

            <div className="payment-info">
              <h2><i className="fas fa-credit-card"></i> Payment Information</h2>
              <div className="payment-card">
                <div className="payment-method">
                  <i className="fas fa-university"></i>
                  <div>
                    <strong>{order.payment.method} Payment</strong>
                    <p className="payment-status">
                      <i className="fas fa-check-circle"></i> {order.payment.status}
                    </p>
                  </div>
                </div>
                <div className="payment-details">
                  <div className="detail-item">
                    <span className="detail-label">Transaction ID:</span>
                    <span className="detail-value">{order.payment.transactionId}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Amount Paid:</span>
                    <span className="detail-value">₹{order.payment.amount.toLocaleString()}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Payment Date:</span>
                    <span className="detail-value">{order.payment.date}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="next-steps-section">
            <h2><i className="fas fa-clipboard-list"></i> What's Next?</h2>
            <div className="steps-grid">
              <div className="step-card">
                <div className="step-icon">
                  <i className="fas fa-cogs"></i>
                </div>
                <h3>Artisan Starts Working</h3>
                <p>The artisan will begin crafting your custom item within 24 hours.</p>
                <div className="step-timeline">Starts: Tomorrow</div>
              </div>
              
              <div className="step-card">
                <div className="step-icon">
                  <i className="fas fa-clipboard-check"></i>
                </div>
                <h3>Quality Check</h3>
                <p>Our quality team will inspect the item before dispatch.</p>
                <div className="step-timeline">In 3-4 days</div>
              </div>
              
              <div className="step-card">
                <div className="step-icon">
                  <i className="fas fa-shipping-fast"></i>
                </div>
                <h3>Shipping & Delivery</h3>
                <p>Your order will be shipped with tracking updates.</p>
                <div className="step-timeline">Estimated: {order.delivery.estimatedDelivery}</div>
              </div>
              
              <div className="step-card">
                <div className="step-icon">
                  <i className="fas fa-star"></i>
                </div>
                <h3>Review & Feedback</h3>
                <p>Share your experience and review the artisan's work.</p>
                <div className="step-timeline">After delivery</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="order-actions">
          <button onClick={() => onNavigate('home')} className="btn btn-secondary">
            <i className="fas fa-home"></i> Back to Home
          </button>
          <button onClick={() => onNavigate('products')} className="btn btn-primary">
            <i className="fas fa-shopping-bag"></i> Continue Shopping
          </button>
          <button onClick={trackOrder} className="btn btn-info">
            <i className="fas fa-truck"></i> Track Order
          </button>
          <button onClick={cancelOrder} className="btn btn-danger">
            <i className="fas fa-times"></i> Cancel Order
          </button>
        </div>

        {/* Help Section */}
        <div className="help-section">
          <h3><i className="fas fa-question-circle"></i> Need Help with Your Order?</h3>
          <div className="help-options">
            <div className="help-card">
              <i className="fas fa-headset fa-2x"></i>
              <h4>Customer Support</h4>
              <p>Call us at +91 1800-123-4567</p>
              <button className="help-btn">Contact Now</button>
            </div>
            
            <div className="help-card">
              <i className="fas fa-comments fa-2x"></i>
              <h4>Chat with Artisan</h4>
              <p>Directly message the artisan</p>
              <button className="help-btn">Start Chat</button>
            </div>
            
            <div className="help-card">
              <i className="fas fa-file-alt fa-2x"></i>
              <h4>Order FAQ</h4>
              <p>Common questions answered</p>
              <button className="help-btn">View FAQ</button>
            </div>
            
            <div className="help-card">
              <i className="fas fa-undo fa-2x"></i>
              <h4>Return & Exchange</h4>
              <p>14-day return policy</p>
              <button className="help-btn">Learn More</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;