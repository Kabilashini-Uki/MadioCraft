import React from 'react';
import './ChatSidebar.css';

const ChatSidebar = ({ product, onDesignRequest, selectedProfile }) => {
  const designIdeas = [
    { id: 1, name: 'Traditional Zari Work', image: 'https://images.unsplash.com/photo-1567557169255-8c2afd5c5cba?w=200&auto=format&fit=crop', likes: 42 },
    { id: 2, name: 'Modern Geometric', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&auto=format&fit=crop', likes: 38 },
    { id: 3, name: 'Floral Embroidery', image: 'https://images.unsplash.com/photo-1516937941344-00b4e0337589?w=200&auto=format&fit=crop', likes: 56 },
  ];

  return (
    <div className="chat-sidebar">
      {/* Product Preview */}
      <div className="product-preview">
        <img src={product.image} alt={product.name} className="product-image" />
        <div className="product-info">
          <h4>{product.name}</h4>
          <p className="product-category">{product.category}</p>
          <div className="product-price">₹{product.price.toLocaleString()}</div>
        </div>
      </div>
      
      {/* Customization Options */}
      <div className="customization-options">
        <h4 className="section-title">
          <i className="fas fa-sliders-h"></i>
          Customization Options
        </h4>
        <div className="options-list">
          {Object.entries(product.customizationOptions).map(([key, value]) => (
            <div key={key} className="option-item">
              <span className="option-label">
                {key.charAt(0).toUpperCase() + key.slice(1)}:
              </span>
              <div className="option-values">
                {Array.isArray(value) ? (
                  <div className="value-chips">
                    {value.map((val, idx) => (
                      <span key={idx} className="value-chip">{val}</span>
                    ))}
                  </div>
                ) : (
                  <span className={`value-chip ${value ? 'available' : 'not-available'}`}>
                    {value ? 'Available' : 'Not Available'}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Design Ideas */}
      <div className="design-ideas">
        <h4 className="section-title">
          <i className="fas fa-lightbulb"></i>
          Design Ideas
        </h4>
        <div className="ideas-grid">
          {designIdeas.map((idea) => (
            <div key={idea.id} className="idea-card">
              <img src={idea.image} alt={idea.name} className="idea-image" />
              <div className="idea-info">
                <span className="idea-name">{idea.name}</span>
                <div className="idea-likes">
                  <i className="fas fa-heart"></i>
                  <span>{idea.likes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Artisan Quick Actions */}
      {selectedProfile?.role === 'Artisan' && (
        <div className="artisan-quick-actions">
          <h4 className="section-title">
            <i className="fas fa-bolt"></i>
            Quick Actions
          </h4>
          <div className="action-buttons">
            <button className="quick-action-btn">
              <i className="fas fa-calculator"></i>
              <span>Send Quote</span>
            </button>
            <button className="quick-action-btn">
              <i className="fas fa-clock"></i>
              <span>Set Timeline</span>
            </button>
            <button className="quick-action-btn">
              <i className="fas fa-file-contract"></i>
              <span>Create Agreement</span>
            </button>
            <button className="quick-action-btn">
              <i className="fas fa-save"></i>
              <span>Save Draft</span>
            </button>
          </div>
        </div>
      )}
      
      {/* Buyer Quick Actions */}
      {selectedProfile?.role !== 'Artisan' && (
        <div className="buyer-quick-actions">
          <h4 className="section-title">
            <i className="fas fa-magic"></i>
            Quick Requests
          </h4>
          <div className="action-buttons">
            <button 
              className="quick-action-btn"
              onClick={() => onDesignRequest('color change')}
            >
              <i className="fas fa-palette"></i>
              <span>Change Color</span>
            </button>
            <button 
              className="quick-action-btn"
              onClick={() => onDesignRequest('pattern design')}
            >
              <i className="fas fa-drafting-compass"></i>
              <span>New Pattern</span>
            </button>
            <button 
              className="quick-action-btn"
              onClick={() => onDesignRequest('size adjustment')}
            >
              <i className="fas fa-expand-alt"></i>
              <span>Adjust Size</span>
            </button>
            <button 
              className="quick-action-btn"
              onClick={() => onDesignRequest('add personalization')}
            >
              <i className="fas fa-signature"></i>
              <span>Add Text</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatSidebar;