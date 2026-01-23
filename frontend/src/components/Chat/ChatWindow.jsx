import React, { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import ChatSidebar from './ChatSidebar';
import './ChatWindow.css';

const ChatWindow = ({ selectedProfile, product }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'd like to customize this product. Can we add embroidery to it?",
      sender: 'buyer',
      timestamp: '10:30 AM',
      senderName: 'Priya Sharma',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg'
    },
    {
      id: 2,
      text: "Absolutely! What kind of embroidery are you thinking? We have traditional, modern, or mix styles.",
      sender: 'seller',
      timestamp: '10:32 AM',
      senderName: 'Rajesh Kumar',
      avatar: 'https://randomuser.me/api/portraits/men/54.jpg'
    },
    {
      id: 3,
      text: "I'd like traditional embroidery with gold thread. Can you show me some patterns?",
      sender: 'buyer',
      timestamp: '10:35 AM',
      senderName: 'Priya Sharma',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg'
    },
    {
      id: 4,
      text: "Here are some traditional patterns. I can also create a custom pattern based on your preferences.",
      sender: 'seller',
      timestamp: '10:40 AM',
      senderName: 'Rajesh Kumar',
      avatar: 'https://randomuser.me/api/portraits/men/54.jpg',
      attachments: [
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1567557169255-8c2afd5c5cba?w=400&auto=format&fit=crop',
          caption: 'Traditional pattern 1'
        },
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=400&auto=format&fit=crop',
          caption: 'Traditional pattern 2'
        }
      ]
    }
  ]);

  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (text, attachments = []) => {
    const newMessage = {
      id: messages.length + 1,
      text,
      sender: selectedProfile?.role === 'Artisan' ? 'seller' : 'buyer',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      senderName: selectedProfile?.name || 'User',
      avatar: selectedProfile?.avatar,
      attachments
    };

    setMessages([...messages, newMessage]);
    
    // Simulate reply
    if (selectedProfile?.role !== 'Artisan') {
      setTyping(true);
      setTimeout(() => {
        const reply = {
          id: messages.length + 2,
          text: "Thanks for your message! I'll get back to you shortly with design options.",
          sender: 'seller',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          senderName: 'Rajesh Kumar',
          avatar: 'https://randomuser.me/api/portraits/men/54.jpg'
        };
        setMessages(prev => [...prev, reply]);
        setTyping(false);
      }, 2000);
    }
  };

  const handleAttachment = (file) => {
    // Handle file upload
    console.log('Attachment:', file);
  };

  const handleDesignRequest = (designType) => {
    const message = `I'd like to request ${designType} customization. Can you provide options?`;
    handleSendMessage(message);
  };

  return (
    <div className="chat-customization-container">
      <div className="chat-section">
        <div className="chat-header">
          <div className="chat-partner-info">
            <img 
              src={selectedProfile?.role === 'Artisan' 
                ? 'https://randomuser.me/api/portraits/women/32.jpg'
                : 'https://randomuser.me/api/portraits/men/54.jpg'
              } 
              alt="Partner"
              className="partner-avatar"
            />
            <div>
              <h3 className="partner-name">
                {selectedProfile?.role === 'Artisan' ? 'Priya Sharma (Buyer)' : 'Rajesh Kumar (Artisan)'}
              </h3>
              <div className="partner-status">
                <span className="status-dot online"></span>
                <span>Online</span>
              </div>
            </div>
          </div>
          
          <div className="chat-actions">
            <button className="chat-action-btn">
              <i className="fas fa-phone"></i>
            </button>
            <button className="chat-action-btn">
              <i className="fas fa-video"></i>
            </button>
            <button className="chat-action-btn">
              <i className="fas fa-ellipsis-v"></i>
            </button>
          </div>
        </div>

        <div className="messages-container">
          {messages.map((message) => (
            <MessageBubble 
              key={message.id}
              message={message}
              isCurrentUser={message.sender === (selectedProfile?.role === 'Artisan' ? 'seller' : 'buyer')}
            />
          ))}
          
          {typing && (
            <div className="typing-indicator">
              <div className="typing-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span className="typing-text">Artisan is typing...</span>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        <ChatInput 
          onSendMessage={handleSendMessage}
          onAttachment={handleAttachment}
          onDesignRequest={handleDesignRequest}
          selectedProfile={selectedProfile}
        />
      </div>

      <div className="customization-section">
        <ChatSidebar 
          product={product}
          onDesignRequest={handleDesignRequest}
          selectedProfile={selectedProfile}
        />
      </div>
    </div>
  );
};

export default ChatWindow;