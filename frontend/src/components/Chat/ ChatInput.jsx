import React, { useState } from 'react';
import './ChatInput.css';

const ChatInput = ({ onSendMessage, onAttachment, onDesignRequest, selectedProfile }) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleAttachmentClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*,.pdf,.doc,.docx';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) onAttachment(file);
    };
    input.click();
  };

  const quickDesignOptions = [
    { label: 'Color Change', value: 'color change' },
    { label: 'Pattern Design', value: 'pattern design' },
    { label: 'Size Adjustment', value: 'size adjustment' },
    { label: 'Material Switch', value: 'material switch' },
    { label: 'Add Personalization', value: 'add personalization' }
  ];

  return (
    <div className="chat-input-container">
      {/* Quick Design Requests */}
      {selectedProfile?.role !== 'Artisan' && (
        <div className="quick-design-options">
          <p className="quick-design-label">Quick Design Requests:</p>
          <div className="design-buttons">
            {quickDesignOptions.map((option) => (
              <button
                key={option.value}
                className="design-request-btn"
                onClick={() => onDesignRequest(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Message Input */}
      <form className="chat-input-form" onSubmit={handleSubmit}>
        <div className="input-actions">
          <button 
            type="button" 
            className="input-action-btn"
            onClick={handleAttachmentClick}
          >
            <i className="fas fa-paperclip"></i>
          </button>
          
          <button 
            type="button" 
            className="input-action-btn"
            onClick={() => setIsRecording(!isRecording)}
          >
            <i className={`fas fa-microphone ${isRecording ? 'recording' : ''}`}></i>
          </button>
          
          <button type="button" className="input-action-btn">
            <i className="fas fa-image"></i>
          </button>
          
          <button type="button" className="input-action-btn">
            <i className="fas fa-smile"></i>
          </button>
        </div>

        <div className="message-input-wrapper">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={
              selectedProfile?.role === 'Artisan' 
                ? "Reply to buyer's customization request..."
                : "Type your customization request..."
            }
            className="message-input"
          />
          
          <button 
            type="submit" 
            className="send-button"
            disabled={!message.trim()}
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </form>

      {/* Design Tools for Artisans */}
      {selectedProfile?.role === 'Artisan' && (
        <div className="artisan-tools">
          <div className="tools-header">
            <i className="fas fa-tools"></i>
            <span>Design Tools</span>
          </div>
          <div className="tool-buttons">
            <button className="tool-btn">
              <i className="fas fa-ruler-combined"></i>
              <span>Measure</span>
            </button>
            <button className="tool-btn">
              <i className="fas fa-palette"></i>
              <span>Colors</span>
            </button>
            <button className="tool-btn">
              <i className="fas fa-drafting-compass"></i>
              <span>Patterns</span>
            </button>
            <button className="tool-btn">
              <i className="fas fa-file-invoice-dollar"></i>
              <span>Quote</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatInput;