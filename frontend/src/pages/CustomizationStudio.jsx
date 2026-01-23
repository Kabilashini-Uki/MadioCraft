// CustomizationStudio.jsx
import React, { useState, useRef, useEffect } from 'react';
// Remove the invalid comment line that's causing the error

const CustomizationStudio = ({ onNavigate }) => {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [design, setDesign] = useState({
    color: '#8B4513',
    pattern: 'Traditional',
    embroidery: 'Zari',
    size: 'M',
    personalization: '',
    notes: ''
  });
  const [brushSize, setBrushSize] = useState(5);
  const [brushColor, setBrushColor] = useState('#8B4513');
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Mock profiles
  const profiles = [
    {
      id: 1,
      name: 'Priya Sharma',
      role: 'Buyer',
      // avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
      status: 'online',
      description: 'Looking to customize wedding saree'
    },
    {
      id: 2,
      name: 'Rajesh Kumar',
      role: 'Artisan',
      // avatar: 'https://randomuser.me/api/portraits/men/54.jpg',
      status: 'online',
      description: 'Master weaver with 20+ years experience'
    },
    {
      id: 3,
      name: 'Design Studio',
      role: 'Designer',
      // avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
      status: 'offline',
      description: 'Textile design specialists'
    }
  ];

  // Mock product
  const product = {
    id: 1,
    name: 'Handwoven Banarasi Silk Saree',
    image: 'https://images.unsplash.com/photo-1567557169255-8c2afd5c5cba?w=800&auto=format&fit=crop',
    price: 12500,
    category: 'Handloom',
    customizationOptions: {
      colors: ['Maroon', 'Royal Blue', 'Emerald Green', 'Gold'],
      patterns: ['Traditional', 'Modern', 'Geometric', 'Floral'],
      embroidery: ['Zari', 'Kundan', 'Resham', 'Sequence'],
      sizes: ['S', 'M', 'L', 'XL'],
      personalization: true
    }
  };

  // Initial chat messages
  useEffect(() => {
    setMessages([
      {
        // id: 1,
        // // text: "Hi! I'd like to customize this saree for my wedding. Can we add gold zari work?",
        // sender: 'buyer',
        // timestamp: '10:30 AM',
        // senderName: 'Priya Sharma',
        // avatar: 'https://randomuser.me/api/portraits/women/32.jpg'
      },
      {
        // id: 2,
        // text: "Absolutely! I specialize in gold zari work. What kind of pattern would you like? Traditional or modern?",
        // sender: 'artisan',
        // timestamp: '10:32 AM',
        // senderName: 'Rajesh Kumar',
        // avatar: 'https://randomuser.me/api/portraits/men/54.jpg'
      },
      {
        // id: 3,
        // text: "I prefer traditional patterns. Can you show me some options?",
        // sender: 'buyer',
        // timestamp: '10:35 AM',
        // senderName: 'Priya Sharma',
        // avatar: 'https://randomuser.me/api/portraits/women/32.jpg'
      },
      {
      
        // text: "Here are some traditional patterns. I can also sketch a custom design for you.",
        // sender: 'artisan',
        // timestamp: '10:40 AM',
        // senderName: 'Rajesh Kumar',
        // avatar: 'https://randomuser.me/api/portraits/men/54.jpg',
        attachments: [
          {
            // type: 'image',
            // url: 'https://images.unsplash.com/photo-1567557169255-8c2afd5c5cba?w=200&auto=format&fit=crop',
            // caption: 'Traditional pattern 1'
          }
        ]
      }
    ]);
  }, []);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Canvas setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw product base
    const img = new Image();
    img.src = product.image;
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  }, []);

  const handleProfileSelect = (profile) => {
    setSelectedProfile(profile);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: messages.length + 1,
      text: newMessage,
      sender: selectedProfile?.role === 'Artisan' ? 'artisan' : 'buyer',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      senderName: selectedProfile?.name || 'You',
      avatar: selectedProfile?.avatar
    };

    setMessages([...messages, message]);
    setNewMessage('');

    // Simulate reply after 1 second
    if (selectedProfile?.role !== 'Artisan') {
      setTimeout(() => {
        const reply = {
          id: messages.length + 2,
          text: "I'll work on that design and send you a preview shortly.",
          sender: 'artisan',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          senderName: 'Rajesh Kumar',
          avatar: 'https://randomuser.me/api/portraits/men/54.jpg'
        };
        setMessages(prev => [...prev, reply]);
      }, 1000);
    }
  };

  const handleDesignChange = (field, value) => {
    setDesign(prev => ({ ...prev, [field]: value }));
  };

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.arc(x, y, brushSize, 0, Math.PI * 2);
    ctx.fillStyle = brushColor;
    ctx.fill();
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.arc(x, y, brushSize, 0, Math.PI * 2);
    ctx.fillStyle = brushColor;
    ctx.fill();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const saveDesign = () => {
    const designData = {
      ...design,
      productId: product.id,
      timestamp: new Date().toISOString(),
      createdBy: selectedProfile?.name,
      canvasData: canvasRef.current.toDataURL()
    };
    
    console.log('Design saved:', designData);
    alert('Design saved successfully!');
  };

  const shareDesign = () => {
    const shareUrl = canvasRef.current.toDataURL();
    setMessages(prev => [...prev, {
      id: prev.length + 1,
      text: "Here's the design preview I created:",
      sender: selectedProfile?.role === 'Artisan' ? 'artisan' : 'buyer',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      senderName: selectedProfile?.name || 'You',
      avatar: selectedProfile?.avatar,
      attachments: [{
        type: 'image',
        url: shareUrl,
        caption: 'Design Preview'
      }]
    }]);
  };

  const calculatePrice = () => {
    let total = product.price;
    if (design.color !== '#8B4513') total += 500;
    if (design.pattern !== 'Traditional') total += 1000;
    if (design.embroidery !== 'Zari') total += 800;
    if (design.personalization) total += 300;
    return total;
  };

  // Add CSS styles as a string
  const styles = `
    .customization-studio {
      min-height: 100vh;
      background: linear-gradient(135deg, #e0b9beff 0%, #f3dcdfff 100%);
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    
    .studio-header {
      background: white;
      padding: 1.5rem 2rem;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .back-button {
      background: #6d28d9;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 600;
      transition: all 0.3s ease;
    }
    
    .back-button:hover {
      background: #5b21b6;
      transform: translateY(-2px);
    }
    
    .header-left {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }
    
    .current-profile {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    
    .current-profile img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 3px solid #6d28d9;
    }
    
    .profile-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
    }
    
    .profile-badge.buyer {
      background: #3b82f6;
      color: white;
    }
    
    .profile-badge.artisan {
      background: #10b981;
      color: white;
    }
    
    .profile-badge.designer {
      background: #8b5cf6;
      color: white;
    }
    
    .header-tabs {
      display: flex;
      gap: 0.5rem;
      background: #f3f4f6;
      padding: 0.5rem;
      border-radius: 12px;
    }
    
    .tab-btn {
      padding: 0.75rem 1.5rem;
      border: none;
      background: transparent;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 600;
      color: #6b7280;
      transition: all 0.3s ease;
    }
    
    .tab-btn.active {
      background: white;
      color: #6d28d9;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    
    .studio-main {
      display: flex;
      padding: 2rem;
      gap: 2rem;
      min-height: calc(100vh - 200px);
    }
    
    .left-panel {
      flex: 3;
      background: white;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
    }
    
    .right-panel {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    
    .chat-container {
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    
    .chat-header {
      padding: 1.5rem;
      border-bottom: 1px solid #e5e7eb;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .chat-partner {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    
    .chat-partner img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    
    .messages-container {
      flex: 1;
      padding: 1.5rem;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .message {
      display: flex;
      gap: 1rem;
      max-width: 80%;
    }
    
    .message.sent {
      align-self: flex-end;
      flex-direction: row-reverse;
    }
    
    .message-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    
    .message-content {
      background: #f3f4f6;
      padding: 1rem;
      border-radius: 12px;
      position: relative;
    }
    
    .message.sent .message-content {
      background: #6d28d9;
      color: white;
    }
    
    .message-sender {
      font-weight: 600;
      font-size: 0.9rem;
      margin-bottom: 0.25rem;
    }
    
    .message-time {
      font-size: 0.8rem;
      color: #9ca3af;
      margin-top: 0.5rem;
      text-align: right;
    }
    
    .message.sent .message-time {
      color: rgba(255,255,255,0.8);
    }
    
    .message-input-form {
      display: flex;
      padding: 1.5rem;
      gap: 1rem;
      border-top: 1px solid #e5e7eb;
    }
    
    .message-input {
      flex: 1;
      padding: 0.75rem 1rem;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      font-size: 1rem;
    }
    
    .send-btn {
      background: #6d28d9;
      color: white;
      border: none;
      width: 50px;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
    }
    
    .design-canvas {
      width: 100%;
      height: 500px;
      border: 2px dashed #d1d5db;
      border-radius: 12px;
      background: white;
      cursor: crosshair;
    }
    
    .canvas-tools {
      padding: 1rem;
      background: #f9fafb;
      border-bottom: 1px solid #e5e7eb;
      display: flex;
      gap: 2rem;
      align-items: center;
    }
    
    .tool-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .color-picker {
      display: flex;
      gap: 0.5rem;
    }
    
    .color-option {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 2px solid transparent;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .color-option.active {
      border-color: #6d28d9;
      transform: scale(1.1);
    }
    
    .product-preview {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    
    .product-preview img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }
    
    .product-details {
      padding: 1rem;
    }
    
    .action-buttons {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .action-btn {
      padding: 1rem;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      transition: all 0.3s ease;
    }
    
    .action-btn.primary {
      background: #6d28d9;
      color: white;
    }
    
    .action-btn.primary:hover {
      background: #5b21b6;
    }
    
    .action-btn.secondary {
      background: #f3f4f6;
      color: #374151;
    }
    
    .action-btn.success {
      background: #10b981;
      color: white;
    }
    
    .profiles-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .profiles-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }
    
    .profile-card {
      background: white;
      border-radius: 16px;
      padding: 2rem;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    
    .profile-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 30px rgba(0,0,0,0.15);
    }
    
    .profile-avatar {
      position: relative;
      margin-bottom: 1rem;
    }
    
    .profile-avatar img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      border: 4px solid #6d28d9;
    }
    
    .status-dot {
      position: absolute;
      bottom: 10px;
      right: 10px;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      border: 2px solid white;
    }
    
    .status-dot.online {
      background: #10b981;
    }
    
    .status-dot.offline {
      background: #9ca3af;
    }
    
    .select-profile-btn {
      margin-top: 1.5rem;
      padding: 0.75rem 2rem;
      background: #6d28d9;
      color: white;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .select-profile-btn:hover {
      background: #5b21b6;
    }
    
    @media (max-width: 1024px) {
      .studio-main {
        flex-direction: column;
      }
      
      .left-panel, .right-panel {
        width: 100%;
      }
    }
    
    @media (max-width: 768px) {
      .studio-header {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
      }
      
      .header-tabs {
        flex-wrap: wrap;
        justify-content: center;
      }
      
      .tab-btn {
        padding: 0.5rem 1rem;
        font-size: 0.9rem;
      }
    }
  `;

  // Profile Selection Screen
  if (!selectedProfile) {
    return (
      <>
        <style>{styles}</style>
        <div className="customization-studio">
          <div className="studio-header">
            <button className="back-button" onClick={() => onNavigate('home')}>
              <i className="fas fa-arrow-left"></i> Back to Home
            </button>
            <h1>Customization Studio</h1>
            <p className="subtitle">Select your role to start the customization session</p>
          </div>

          <div className="profiles-container">
            <div className="profiles-grid">
              {profiles.map((profile) => (
                <div 
                  key={profile.id}
                  className="profile-card"
                  onClick={() => handleProfileSelect(profile)}
                >
                  <div className="profile-avatar">
                    <img src={profile.avatar} alt={profile.name} />
                    <span className={`status-dot ${profile.status}`}></span>
                  </div>
                  <div className="profile-info">
                    <h3>{profile.name}</h3>
                    <div className={`profile-role ${profile.role.toLowerCase()}`}>
                      {profile.role}
                    </div>
                    <p>{profile.description}</p>
                    <div className="profile-stats">
                      <div className="stat">
                        <i className="fas fa-star"></i>
                        <span>4.8</span>
                      </div>
                      <div className="stat">
                        <i className="fas fa-project-diagram"></i>
                        <span>24 projects</span>
                      </div>
                    </div>
                  </div>
                  <button className="select-profile-btn">
                    Select Profile
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  // Main Studio Interface
  return (
    <>
      <style>{styles}</style>
      <div className="customization-studio">
        {/* Header */}
        <div className="studio-header">
          <div className="header-left">
            <button className="back-button" onClick={() => setSelectedProfile(null)}>
              <i className="fas fa-arrow-left"></i> Change Profile
            </button>
            <div className="current-profile">
              <img src={selectedProfile.avatar} alt={selectedProfile.name} />
              <div>
                <h3>Customizing as {selectedProfile.name}</h3>
                <span className={`profile-badge ${selectedProfile.role.toLowerCase()}`}>
                  {selectedProfile.role}
                </span>
              </div>
            </div>
          </div>

          <div className="header-tabs">
            <button 
              className={`tab-btn ${activeTab === 'chat' ? 'active' : ''}`}
              onClick={() => setActiveTab('chat')}
            >
              <i className="fas fa-comments"></i> Chat
            </button>
            <button 
              className={`tab-btn ${activeTab === 'design' ? 'active' : ''}`}
              onClick={() => setActiveTab('design')}
            >
              <i className="fas fa-paint-brush"></i> Design
            </button>
            <button 
              className={`tab-btn ${activeTab === 'specs' ? 'active' : ''}`}
              onClick={() => setActiveTab('specs')}
            >
              <i className="fas fa-cogs"></i> Specifications
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="studio-main">
          {/* Left Panel - Chat/Design Canvas */}
          <div className="left-panel">
            {activeTab === 'chat' ? (
              <div className="chat-container">
                {/* Chat Header */}
                <div className="chat-header">
                  <div className="chat-partner">
                    <img src="https://randomuser.me/api/portraits/men/54.jpg" alt="Artisan" />
                    <div>
                      <h4>Rajesh Kumar</h4>
                      <span className="partner-role">Master Artisan</span>
                    </div>
                  </div>
                  <div className="chat-actions">
                    <button><i className="fas fa-phone"></i></button>
                    <button><i className="fas fa-video"></i></button>
                    <button><i className="fas fa-ellipsis-v"></i></button>
                  </div>
                </div>

                {/* Messages */}
                <div className="messages-container">
                  {messages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`message ${message.sender === (selectedProfile.role === 'Artisan' ? 'artisan' : 'buyer') ? 'sent' : 'received'}`}
                    >
                      {message.sender !== (selectedProfile.role === 'Artisan' ? 'artisan' : 'buyer') && (
                        <img src={message.avatar} alt={message.senderName} className="message-avatar" />
                      )}
                      <div className="message-content">
                        <div className="message-sender">{message.senderName}</div>
                        <div className="message-text">{message.text}</div>
                        {message.attachments && (
                          <div className="message-attachments">
                            {message.attachments.map((att, idx) => (
                              <img key={idx} src={att.url} alt={att.caption} />
                            ))}
                          </div>
                        )}
                        <div className="message-time">{message.timestamp}</div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <form className="message-input-form" onSubmit={handleSendMessage}>
                  <div className="input-tools">
                    <button type="button"><i className="fas fa-paperclip"></i></button>
                    <button type="button"><i className="fas fa-image"></i></button>
                    <button type="button"><i className="fas fa-smile"></i></button>
                  </div>
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="message-input"
                  />
                  <button type="submit" className="send-btn">
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </form>
              </div>
            ) : activeTab === 'design' ? (
              <div className="design-container">
                {/* Canvas Tools */}
                <div className="canvas-tools">
                  <div className="tool-group">
                    <label>Brush Size: {brushSize}px</label>
                    <input 
                      type="range" 
                      min="1" 
                      max="20" 
                      value={brushSize}
                      onChange={(e) => setBrushSize(e.target.value)}
                    />
                  </div>
                  <div className="tool-group">
                    <label>Brush Color</label>
                    <div className="color-picker">
                      {['#8B4513', '#e74c3c', '#3498db', '#27ae60', '#f1c40f'].map(color => (
                        <button
                          key={color}
                          className={`color-option ${brushColor === color ? 'active' : ''}`}
                          style={{ backgroundColor: color }}
                          onClick={() => setBrushColor(color)}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="tool-group">
                    <button onClick={clearCanvas} className="tool-btn">
                      <i className="fas fa-trash"></i> Clear
                    </button>
                    <button onClick={shareDesign} className="tool-btn primary">
                      <i className="fas fa-share"></i> Share
                    </button>
                  </div>
                </div>

                {/* Drawing Canvas */}
                <div className="canvas-wrapper">
                  <canvas
                    ref={canvasRef}
                    width={800}
                    height={500}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    className="design-canvas"
                  />
                  <div className="canvas-overlay">
                    <div className="overlay-text">
                      Click and drag to draw on the design
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="specs-container">
                <h3>Design Specifications</h3>
                <div className="specs-grid">
                  <div className="spec-card">
                    <h4><i className="fas fa-palette"></i> Color</h4>
                    <div className="color-display" style={{ backgroundColor: design.color }}></div>
                    <div className="color-options">
                      {product.customizationOptions.colors.map(color => (
                        <button
                          key={color}
                          className={`color-btn ${design.color === color.toLowerCase() ? 'active' : ''}`}
                          onClick={() => handleDesignChange('color', color.toLowerCase())}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="spec-card">
                    <h4><i className="fas fa-drafting-compass"></i> Pattern</h4>
                    <select 
                      value={design.pattern}
                      onChange={(e) => handleDesignChange('pattern', e.target.value)}
                      className="spec-select"
                    >
                      {product.customizationOptions.patterns.map(pattern => (
                        <option key={pattern} value={pattern}>{pattern}</option>
                      ))}
                    </select>
                  </div>

                  <div className="spec-card">
                    <h4><i className="fas fa-thread"></i> Embroidery</h4>
                    <div className="embroidery-options">
                      {product.customizationOptions.embroidery.map(type => (
                        <label key={type} className="embroidery-option">
                          <input
                            type="radio"
                            name="embroidery"
                            value={type}
                            checked={design.embroidery === type}
                            onChange={(e) => handleDesignChange('embroidery', e.target.value)}
                          />
                          <span>{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="spec-card">
                    <h4><i className="fas fa-expand-alt"></i> Size</h4>
                    <div className="size-options">
                      {product.customizationOptions.sizes.map(size => (
                        <button
                          key={size}
                          className={`size-btn ${design.size === size ? 'active' : ''}`}
                          onClick={() => handleDesignChange('size', size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="spec-card full-width">
                    <h4><i className="fas fa-signature"></i> Personalization</h4>
                    <textarea
                      placeholder="Add personalized text (max 50 characters)"
                      value={design.personalization}
                      onChange={(e) => handleDesignChange('personalization', e.target.value)}
                      maxLength="50"
                      className="personalization-input"
                    />
                    <div className="char-count">
                      {design.personalization.length}/50 characters
                    </div>
                  </div>

                  <div className="spec-card full-width">
                    <h4><i className="fas fa-sticky-note"></i> Notes</h4>
                    <textarea
                      placeholder="Add any additional notes or special instructions..."
                      value={design.notes}
                      onChange={(e) => handleDesignChange('notes', e.target.value)}
                      className="notes-input"
                      rows="3"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Panel - Product & Controls */}
          <div className="right-panel">
            {/* Product Preview */}
            <div className="product-preview">
              <img src={product.image} alt={product.name} />
              <div className="product-details">
                <h4>{product.name}</h4>
                <p className="product-category">{product.category}</p>
                <div className="product-price">
                  <span className="original-price">₹{product.price.toLocaleString()}</span>
                  <span className="current-price">₹{calculatePrice().toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Design Summary */}
            <div className="design-summary">
              <h4>Design Summary</h4>
              <div className="summary-items">
                <div className="summary-item">
                  <span>Color:</span>
                  <span className="summary-value">{design.color}</span>
                </div>
                <div className="summary-item">
                  <span>Pattern:</span>
                  <span className="summary-value">{design.pattern}</span>
                </div>
                <div className="summary-item">
                  <span>Embroidery:</span>
                  <span className="summary-value">{design.embroidery}</span>
                </div>
                <div className="summary-item">
                  <span>Size:</span>
                  <span className="summary-value">{design.size}</span>
                </div>
                {design.personalization && (
                  <div className="summary-item">
                    <span>Personalization:</span>
                    <span className="summary-value">{design.personalization}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="price-breakdown">
              <h4>Price Breakdown</h4>
              <div className="price-items">
                <div className="price-item">
                  <span>Base Price</span>
                  <span>₹{product.price.toLocaleString()}</span>
                </div>
                <div className="price-item">
                  <span>Customization</span>
                  <span className="price-adjustment">
                    +₹{(calculatePrice() - product.price).toLocaleString()}
                  </span>
                </div>
                <div className="price-item total">
                  <span>Total</span>
                  <span className="total-price">₹{calculatePrice().toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button className="action-btn secondary" onClick={saveDesign}>
                <i className="fas fa-save"></i> Save Design
              </button>
              <button className="action-btn primary" onClick={() => alert('Quote requested!')}>
                <i className="fas fa-file-invoice-dollar"></i> Request Quote
              </button>
              <button className="action-btn success" onClick={() => alert('Added to cart!')}>
                <i className="fas fa-shopping-cart"></i> Add to Cart
              </button>
            </div>

            {/* Quick Actions */}
            <div className="quick-actions">
              <h4>Quick Actions</h4>
              <div className="quick-buttons">
                <button className="quick-btn">
                  <i className="fas fa-download"></i> Export
                </button>
                <button className="quick-btn">
                  <i className="fas fa-print"></i> Print
                </button>
                <button className="quick-btn">
                  <i className="fas fa-share-alt"></i> Share
                </button>
                <button className="quick-btn">
                  <i className="fas fa-history"></i> History
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomizationStudio;