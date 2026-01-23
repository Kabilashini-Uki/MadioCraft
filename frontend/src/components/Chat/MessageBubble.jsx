import React from 'react';
import './MessageBubble.css';

const MessageBubble = ({ message, isCurrentUser }) => {
  return (
    <div className={`message-bubble ${isCurrentUser ? 'current-user' : 'other-user'}`}>
      {!isCurrentUser && (
        <img src={message.avatar} alt={message.senderName} className="message-avatar" />
      )}
      
      <div className="message-content">
        {!isCurrentUser && (
          <div className="message-sender">{message.senderName}</div>
        )}
        
        <div className="message-text">{message.text}</div>
        
        {message.attachments && message.attachments.length > 0 && (
          <div className="message-attachments">
            {message.attachments.map((att, idx) => (
              <div key={idx} className="attachment">
                {att.type === 'image' && (
                  <img src={att.url} alt={att.caption} className="attachment-image" />
                )}
                {att.caption && <div className="attachment-caption">{att.caption}</div>}
              </div>
            ))}
          </div>
        )}
        
        <div className="message-time">{message.timestamp}</div>
      </div>
    </div>
  );
};

export default MessageBubble;