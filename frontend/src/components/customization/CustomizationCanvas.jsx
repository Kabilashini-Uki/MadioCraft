import React, { useState, useRef } from 'react';
import './CustomizationCanvas.css';

const CustomizationCanvas = ({ product, selectedProfile }) => {
  const [design, setDesign] = useState({
    color: 'Red',
    pattern: 'Traditional',
    embroidery: 'Zari',
    personalizationText: '',
    notes: '',
    priceAdjustment: 0
  });

  const [showNotes, setShowNotes] = useState(false);
  const canvasRef = useRef(null);
  const [brushSize, setBrushSize] = useState(5);
  const [brushColor, setBrushColor] = useState('#8B4513');

  const handleDesignChange = (field, value) => {
    setDesign(prev => ({ 
      ...prev, 
      [field]: value,
      priceAdjustment: calculatePriceAdjustment({ ...prev, [field]: value })
    }));
  };

  const calculatePriceAdjustment = (newDesign) => {
    let adjustment = 0;
    
    // Color adjustments
    if (newDesign.color !== 'Red') adjustment += 500;
    
    // Pattern adjustments
    if (newDesign.pattern === 'Modern') adjustment += 1000;
    if (newDesign.pattern === 'Custom') adjustment += 2000;
    
    // Embroidery adjustments
    if (newDesign.embroidery === 'Kundan') adjustment += 1500;
    if (newDesign.embroidery === 'Sequence') adjustment += 2000;
    
    // Personalization
    if (newDesign.personalizationText) adjustment += 300;
    
    return adjustment;
  };

  const handleSaveDesign = () => {
    const designData = {
      ...design,
      productId: product.id,
      timestamp: new Date().toISOString(),
      createdBy: selectedProfile.name,
      totalPrice: product.price + design.priceAdjustment
    };
    
    console.log('Design saved:', designData);
    alert('Design saved successfully! You can continue collaborating.');
  };

  const handleShareDesign = () => {
    const shareData = {
      design,
      previewUrl: canvasRef.current?.toDataURL(),
      message: `New design proposal from ${selectedProfile.name}`
    };
    console.log('Design shared:', shareData);
    alert('Design shared with collaborator!');
  };

  const handleExportDesign = () => {
    const exportData = {
      product: product.name,
      designSpecifications: design,
      priceBreakdown: {
        basePrice: product.price,
        customizationCost: design.priceAdjustment,
        totalPrice: product.price + design.priceAdjustment
      },
      timeline: '7-10 business days',
      notes: design.notes
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `design-spec-${product.name}-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleResetCanvas = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  const handleCanvasClick = (e) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Draw a circle at click position
    ctx.beginPath();
    ctx.arc(x, y, brushSize, 0, Math.PI * 2);
    ctx.fillStyle = brushColor;
    ctx.fill();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    ctx.stroke();
  };

  const colorOptions = [
    { name: 'Red', value: '#e74c3c', price: 0 },
    { name: 'Blue', value: '#3498db', price: 500 },
    { name: 'Green', value: '#27ae60', price: 500 },
    { name: 'Gold', value: '#f1c40f', price: 1000 },
    { name: 'Purple', value: '#9b59b6', price: 500 }
  ];

  const patternOptions = [
    { name: 'Traditional', value: 'Traditional', price: 0 },
    { name: 'Modern', value: 'Modern', price: 1000 },
    { name: 'Geometric', value: 'Geometric', price: 800 },
    { name: 'Floral', value: 'Floral', price: 700 },
    { name: 'Custom', value: 'Custom', price: 2000 }
  ];

  const embroideryOptions = [
    { name: 'Zari', value: 'Zari', price: 0 },
    { name: 'Kundan', value: 'Kundan', price: 1500 },
    { name: 'Resham', value: 'Resham', price: 800 },
    { name: 'Sequence', value: 'Sequence', price: 2000 },
    { name: 'Mirror', value: 'Mirror', price: 1200 }
  ];

  return (
    <div className="customization-canvas">
      <div className="canvas-header">
        <h3>
          <i className="fas fa-paint-brush"></i>
          Design Canvas
          <span className="product-name"> - {product.name}</span>
        </h3>
        <div className="canvas-actions">
          <button className="canvas-btn" onClick={handleResetCanvas}>
            <i className="fas fa-redo"></i> Reset
          </button>
          <button className="canvas-btn" onClick={handleSaveDesign}>
            <i className="fas fa-save"></i> Save
          </button>
          <button className="canvas-btn primary" onClick={handleShareDesign}>
            <i className="fas fa-share"></i> Share
          </button>
          <button className="canvas-btn success" onClick={handleExportDesign}>
            <i className="fas fa-download"></i> Export
          </button>
        </div>
      </div>

      <div className="canvas-main">
        {/* Left Panel - Drawing Canvas */}
        <div className="drawing-section">
          <div className="canvas-toolbar">
            <div className="tool-group">
              <label>Brush Size: {brushSize}px</label>
              <input 
                type="range" 
                min="1" 
                max="20" 
                value={brushSize}
                onChange={(e) => setBrushSize(parseInt(e.target.value))}
                className="brush-slider"
              />
            </div>
            
            <div className="tool-group">
              <label>Brush Color:</label>
              <div className="color-picker">
                {colorOptions.map((color) => (
                  <button
                    key={color.value}
                    className={`color-option ${brushColor === color.value ? 'selected' : ''}`}
                    style={{ backgroundColor: color.value }}
                    onClick={() => setBrushColor(color.value)}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
            
            <div className="tool-group">
              <button className="tool-btn">
                <i className="fas fa-undo"></i> Undo
              </button>
              <button className="tool-btn">
                <i className="fas fa-trash"></i> Clear
              </button>
            </div>
          </div>

          <div className="canvas-container">
            <canvas
              ref={canvasRef}
              width={600}
              height={400}
              onClick={handleCanvasClick}
              className="drawing-canvas"
            />
            <div className="canvas-hint">
              Click on the canvas to draw. Use toolbar to adjust brush settings.
            </div>
          </div>
        </div>

        {/* Right Panel - Design Controls */}
        <div className="controls-section">
          {/* Color Selection */}
          <div className="control-group">
            <h4><i className="fas fa-palette"></i> Color</h4>
            <div className="color-options-grid">
              {colorOptions.map((color) => (
                <button
                  key={color.value}
                  className={`color-select-btn ${design.color === color.name ? 'selected' : ''}`}
                  style={{ backgroundColor: color.value }}
                  onClick={() => handleDesignChange('color', color.name)}
                  title={`${color.name} ${color.price > 0 ? `(+₹${color.price})` : ''}`}
                >
                  <span className="color-name">{color.name}</span>
                  {color.price > 0 && (
                    <span className="color-price">+₹{color.price}</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Pattern Selection */}
          <div className="control-group">
            <h4><i className="fas fa-drafting-compass"></i> Pattern</h4>
            <div className="pattern-options">
              {patternOptions.map((pattern) => (
                <button
                  key={pattern.value}
                  className={`pattern-btn ${design.pattern === pattern.value ? 'selected' : ''}`}
                  onClick={() => handleDesignChange('pattern', pattern.value)}
                >
                  <div className="pattern-preview"></div>
                  <span className="pattern-name">{pattern.name}</span>
                  {pattern.price > 0 && (
                    <span className="pattern-price">+₹{pattern.price}</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Embroidery Selection */}
          <div className="control-group">
            <h4><i className="fas fa-thread"></i> Embroidery</h4>
            <div className="embroidery-options">
              {embroideryOptions.map((embroidery) => (
                <button
                  key={embroidery.value}
                  className={`embroidery-btn ${design.embroidery === embroidery.value ? 'selected' : ''}`}
                  onClick={() => handleDesignChange('embroidery', embroidery.value)}
                >
                  <i className="fas fa-star"></i>
                  <span className="embroidery-name">{embroidery.name}</span>
                  {embroidery.price > 0 && (
                    <span className="embroidery-price">+₹{embroidery.price}</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Personalization */}
          <div className="control-group">
            <h4><i className="fas fa-signature"></i> Personalization</h4>
            <textarea
              placeholder="Add personalized text (max 50 characters)"
              value={design.personalizationText}
              onChange={(e) => handleDesignChange('personalizationText', e.target.value.slice(0, 50))}
              className="personalization-input"
              maxLength="50"
              rows="3"
            />
            <div className="char-count">
              {design.personalizationText.length}/50 characters
              <span className="price-adjustment">+₹300</span>
            </div>
          </div>

          {/* Notes */}
          <div className="control-group">
            <div className="notes-header">
              <h4><i className="fas fa-sticky-note"></i> Notes</h4>
              <button 
                className="notes-toggle"
                onClick={() => setShowNotes(!showNotes)}
              >
                {showNotes ? 'Hide' : 'Show'}
              </button>
            </div>
            {showNotes && (
              <textarea
                placeholder="Add notes about the design, special instructions, or requirements..."
                value={design.notes}
                onChange={(e) => handleDesignChange('notes', e.target.value)}
                className="notes-input"
                rows="4"
              />
            )}
          </div>

          {/* Price Summary */}
          <div className="price-summary">
            <h4><i className="fas fa-tag"></i> Price Summary</h4>
            <div className="price-breakdown">
              <div className="price-item">
                <span>Base Price:</span>
                <span>₹{product.price.toLocaleString()}</span>
              </div>
              <div className="price-item">
                <span>Customization:</span>
                <span className="adjustment">+₹{design.priceAdjustment.toLocaleString()}</span>
              </div>
              <div className="price-item total">
                <span>Total:</span>
                <span className="total-price">
                  ₹{(product.price + design.priceAdjustment).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizationCanvas;