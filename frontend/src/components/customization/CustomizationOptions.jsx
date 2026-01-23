import React, { useState } from 'react';
import './CustomizationOptions.css';

const CustomizationOptions = ({ 
  product, 
  onOptionChange, 
  selectedOptions = {},
  onSaveDesign,
  onRequestQuote 
}) => {
  const [activeCategory, setActiveCategory] = useState('colors');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [customText, setCustomText] = useState('');
  const [uploadedImages, setUploadedImages] = useState([]);

  // Default options if none provided
  const defaultOptions = {
    colors: [
      { id: 1, name: 'Maroon', value: '#800000', price: 0, hex: '#800000' },
      { id: 2, name: 'Royal Blue', value: '#4169E1', price: 500, hex: '#4169E1' },
      { id: 3, name: 'Emerald Green', value: '#50C878', price: 500, hex: '#50C878' },
      { id: 4, name: 'Gold', value: '#FFD700', price: 1000, hex: '#FFD700' },
      { id: 5, name: 'Ivory', value: '#FFFFF0', price: 300, hex: '#FFFFF0' }
    ],
    patterns: [
      { id: 1, name: 'Traditional Zari', value: 'traditional', price: 0, image: 'https://images.unsplash.com/photo-1567557169255-8c2afd5c5cba?w=150&auto=format&fit=crop' },
      { id: 2, name: 'Modern Geometric', value: 'modern', price: 800, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=150&auto=format&fit=crop' },
      { id: 3, name: 'Floral Embroidery', value: 'floral', price: 600, image: 'https://images.unsplash.com/photo-1516937941344-00b4e0337589?w=150&auto=format&fit=crop' },
      { id: 4, name: 'Paisley', value: 'paisley', price: 700, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=150&auto=format&fit=crop' },
      { id: 5, name: 'Custom Design', value: 'custom', price: 1500, image: 'https://images.unsplash.com/photo-1573408301185-87ae8e5b3be4?w=150&auto=format&fit=crop' }
    ],
    materials: [
      { id: 1, name: 'Pure Silk', value: 'silk', price: 0, description: 'Premium quality silk' },
      { id: 2, name: 'Cotton Blend', value: 'cotton', price: -500, description: 'Breathable cotton mix' },
      { id: 3, name: 'Velvet', value: 'velvet', price: 800, description: 'Luxurious velvet fabric' },
      { id: 4, name: 'Linen', value: 'linen', price: 400, description: 'Natural linen material' },
      { id: 5, name: 'Brocade', value: 'brocade', price: 1200, description: 'Traditional brocade work' }
    ],
    sizes: [
      { id: 1, name: 'Small (S)', value: 'S', price: 0, dimensions: '5x1 meters' },
      { id: 2, name: 'Medium (M)', value: 'M', price: 300, dimensions: '5.5x1.1 meters' },
      { id: 3, name: 'Large (L)', value: 'L', price: 600, dimensions: '6x1.2 meters' },
      { id: 4, name: 'Extra Large (XL)', value: 'XL', price: 900, dimensions: '6.5x1.3 meters' },
      { id: 5, name: 'Custom Size', value: 'custom', price: 1500, dimensions: 'Specify dimensions' }
    ],
    embroidery: [
      { id: 1, name: 'Zari Work', value: 'zari', price: 0, description: 'Traditional gold/silver thread' },
      { id: 2, name: 'Kundan', value: 'kundan', price: 1500, description: 'Stone and bead work' },
      { id: 3, name: 'Resham', value: 'resham', price: 800, description: 'Silk thread embroidery' },
      { id: 4, name: 'Sequence', value: 'sequence', price: 1000, description: 'Shiny sequence work' },
      { id: 5, name: 'Mirror Work', value: 'mirror', price: 1200, description: 'Traditional mirror embroidery' }
    ]
  };

  const categories = [
    { id: 'colors', name: 'Colors', icon: 'fas fa-palette' },
    { id: 'patterns', name: 'Patterns', icon: 'fas fa-drafting-compass' },
    { id: 'materials', name: 'Materials', icon: 'fas fa-cut' },
    { id: 'sizes', name: 'Sizes', icon: 'fas fa-expand-alt' },
    { id: 'embroidery', name: 'Embroidery', icon: 'fas fa-thread' },
    { id: 'advanced', name: 'Advanced', icon: 'fas fa-sliders-h' }
  ];

  const handleOptionSelect = (category, option) => {
    if (onOptionChange) {
      onOptionChange(category, option);
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      id: Date.now() + Math.random(),
      file,
      preview: URL.createObjectURL(file),
      name: file.name
    }));
    
    setUploadedImages([...uploadedImages, ...newImages]);
  };

  const handleRemoveImage = (id) => {
    setUploadedImages(prev => prev.filter(img => img.id !== id));
  };

  const calculateTotalPrice = () => {
    let total = product?.price || 0;
    
    Object.values(selectedOptions).forEach(option => {
      if (option && option.price) {
        total += option.price;
      }
    });

    // Add custom text price
    if (customText.trim()) {
      total += 300;
    }

    // Add uploaded images price
    if (uploadedImages.length > 0) {
      total += uploadedImages.length * 200;
    }

    return total;
  };

  const renderColorOptions = () => (
    <div className="options-grid">
      {defaultOptions.colors.map(color => (
        <div 
          key={color.id}
          className={`option-item ${selectedOptions.color?.id === color.id ? 'selected' : ''}`}
          onClick={() => handleOptionSelect('color', color)}
        >
          <div 
            className="color-swatch"
            style={{ backgroundColor: color.hex }}
            title={color.name}
          >
            {selectedOptions.color?.id === color.id && (
              <i className="fas fa-check"></i>
            )}
          </div>
          <div className="option-details">
            <span className="option-name">{color.name}</span>
            {color.price !== 0 && (
              <span className={`option-price ${color.price > 0 ? 'positive' : 'negative'}`}>
                {color.price > 0 ? '+' : ''}₹{Math.abs(color.price)}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const renderPatternOptions = () => (
    <div className="options-grid">
      {defaultOptions.patterns.map(pattern => (
        <div 
          key={pattern.id}
          className={`option-item ${selectedOptions.pattern?.id === pattern.id ? 'selected' : ''}`}
          onClick={() => handleOptionSelect('pattern', pattern)}
        >
          <div className="pattern-preview">
            <img src={pattern.image} alt={pattern.name} />
            {selectedOptions.pattern?.id === pattern.id && (
              <div className="selection-overlay">
                <i className="fas fa-check"></i>
              </div>
            )}
          </div>
          <div className="option-details">
            <span className="option-name">{pattern.name}</span>
            {pattern.price !== 0 && (
              <span className="option-price positive">
                +₹{pattern.price}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const renderMaterialOptions = () => (
    <div className="options-list">
      {defaultOptions.materials.map(material => (
        <div 
          key={material.id}
          className={`option-item ${selectedOptions.material?.id === material.id ? 'selected' : ''}`}
          onClick={() => handleOptionSelect('material', material)}
        >
          <div className="material-icon">
            <i className="fas fa-cut"></i>
          </div>
          <div className="option-details">
            <span className="option-name">{material.name}</span>
            <span className="option-description">{material.description}</span>
            <span className={`option-price ${material.price > 0 ? 'positive' : 'negative'}`}>
              {material.price > 0 ? '+' : ''}₹{Math.abs(material.price)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  const renderSizeOptions = () => (
    <div className="size-options">
      {defaultOptions.sizes.map(size => (
        <button
          key={size.id}
          className={`size-btn ${selectedOptions.size?.id === size.id ? 'selected' : ''}`}
          onClick={() => handleOptionSelect('size', size)}
        >
          <div className="size-label">{size.name}</div>
          <div className="size-dimensions">{size.dimensions}</div>
          {size.price !== 0 && (
            <div className="size-price">+₹{size.price}</div>
          )}
        </button>
      ))}
    </div>
  );

  const renderEmbroideryOptions = () => (
    <div className="embroidery-options">
      {defaultOptions.embroidery.map(emb => (
        <div 
          key={emb.id}
          className={`option-item ${selectedOptions.embroidery?.id === emb.id ? 'selected' : ''}`}
          onClick={() => handleOptionSelect('embroidery', emb)}
        >
          <div className="embroidery-icon">
            <i className="fas fa-star"></i>
          </div>
          <div className="option-details">
            <span className="option-name">{emb.name}</span>
            <span className="option-description">{emb.description}</span>
            <span className="option-price positive">
              +₹{emb.price}
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  const renderAdvancedOptions = () => (
    <div className="advanced-options">
      {/* Custom Text */}
      <div className="advanced-section">
        <h4>
          <i className="fas fa-font"></i>
          Custom Text/Initials
        </h4>
        <div className="custom-text-input">
          <input
            type="text"
            placeholder="Enter custom text or initials (max 20 characters)"
            value={customText}
            onChange={(e) => setCustomText(e.target.value.slice(0, 20))}
            maxLength="20"
          />
          <div className="text-info">
            <span className="char-count">{customText.length}/20 characters</span>
            <span className="price-info">+₹300</span>
          </div>
          <div className="font-options">
            <label className="font-option">
              <input type="radio" name="font" defaultChecked />
              <span>Traditional</span>
            </label>
            <label className="font-option">
              <input type="radio" name="font" />
              <span>Modern</span>
            </label>
            <label className="font-option">
              <input type="radio" name="font" />
              <span>Cursive</span>
            </label>
          </div>
        </div>
      </div>

      {/* Image Upload */}
      <div className="advanced-section">
        <h4>
          <i className="fas fa-image"></i>
          Upload Reference Images
        </h4>
        <div className="image-upload-area">
          <label className="upload-btn">
            <i className="fas fa-cloud-upload-alt"></i>
            <span>Click to upload images</span>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
          <p className="upload-hint">Upload images for reference (Max 5 images, 5MB each)</p>
        </div>

        {uploadedImages.length > 0 && (
          <div className="uploaded-images">
            {uploadedImages.map(img => (
              <div key={img.id} className="uploaded-image">
                <img src={img.preview} alt={img.name} />
                <button 
                  className="remove-image"
                  onClick={() => handleRemoveImage(img.id)}
                >
                  <i className="fas fa-times"></i>
                </button>
                <span className="image-name">{img.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Special Requests */}
      <div className="advanced-section">
        <h4>
          <i className="fas fa-sticky-note"></i>
          Special Requests
        </h4>
        <textarea
          placeholder="Any special instructions or requests..."
          className="special-requests"
          rows="4"
        />
      </div>
    </div>
  );

  const renderCategoryContent = () => {
    switch (activeCategory) {
      case 'colors':
        return renderColorOptions();
      case 'patterns':
        return renderPatternOptions();
      case 'materials':
        return renderMaterialOptions();
      case 'sizes':
        return renderSizeOptions();
      case 'embroidery':
        return renderEmbroideryOptions();
      case 'advanced':
        return renderAdvancedOptions();
      default:
        return renderColorOptions();
    }
  };

  return (
    <div className="customization-options">
      {/* Category Tabs */}
      <div className="category-tabs">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(category.id)}
          >
            <i className={category.icon}></i>
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      {/* Options Content */}
      <div className="options-content">
        <div className="options-scroll">
          {renderCategoryContent()}
        </div>
      </div>

      {/* Price Summary */}
      <div className="price-summary">
        <div className="summary-header">
          <h4>Customization Summary</h4>
          <div className="total-price">
            ₹{calculateTotalPrice().toLocaleString()}
          </div>
        </div>
        
        <div className="summary-details">
          {selectedOptions.color && (
            <div className="summary-item">
              <span>Color:</span>
              <span>{selectedOptions.color.name}</span>
              {selectedOptions.color.price !== 0 && (
                <span className="item-price">
                  {selectedOptions.color.price > 0 ? '+' : ''}₹{Math.abs(selectedOptions.color.price)}
                </span>
              )}
            </div>
          )}
          
          {selectedOptions.pattern && (
            <div className="summary-item">
              <span>Pattern:</span>
              <span>{selectedOptions.pattern.name}</span>
              {selectedOptions.pattern.price !== 0 && (
                <span className="item-price">
                  +₹{selectedOptions.pattern.price}
                </span>
              )}
            </div>
          )}
          
          {selectedOptions.material && (
            <div className="summary-item">
              <span>Material:</span>
              <span>{selectedOptions.material.name}</span>
              {selectedOptions.material.price !== 0 && (
                <span className="item-price">
                  {selectedOptions.material.price > 0 ? '+' : ''}₹{Math.abs(selectedOptions.material.price)}
                </span>
              )}
            </div>
          )}
          
          {selectedOptions.size && (
            <div className="summary-item">
              <span>Size:</span>
              <span>{selectedOptions.size.name}</span>
              {selectedOptions.size.price !== 0 && (
                <span className="item-price">
                  +₹{selectedOptions.size.price}
                </span>
              )}
            </div>
          )}
          
          {selectedOptions.embroidery && (
            <div className="summary-item">
              <span>Embroidery:</span>
              <span>{selectedOptions.embroidery.name}</span>
              {selectedOptions.embroidery.price !== 0 && (
                <span className="item-price">
                  +₹{selectedOptions.embroidery.price}
                </span>
              )}
            </div>
          )}
          
          {customText.trim() && (
            <div className="summary-item">
              <span>Custom Text:</span>
              <span>"{customText}"</span>
              <span className="item-price">+₹300</span>
            </div>
          )}
          
          {uploadedImages.length > 0 && (
            <div className="summary-item">
              <span>Reference Images:</span>
              <span>{uploadedImages.length} images</span>
              <span className="item-price">
                +₹{uploadedImages.length * 200}
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button 
            className="btn btn-secondary"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            <i className="fas fa-sliders-h"></i>
            {showAdvanced ? 'Hide Advanced' : 'Show Advanced'}
          </button>
          
          <button 
            className="btn btn-primary"
            onClick={onSaveDesign}
          >
            <i className="fas fa-save"></i>
            Save Design
          </button>
          
          <button 
            className="btn btn-success"
            onClick={onRequestQuote}
          >
            <i className="fas fa-file-invoice-dollar"></i>
            Request Quote
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomizationOptions;