// src/contexts/ChatContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const ChatContext = createContext();

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within ChatProvider');
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState({});
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [unreadCounts, setUnreadCounts] = useState({});

  // Mock user data
  const mockUsers = [
    { id: 1, name: 'Priya Sharma', role: 'buyer', avatar: 'https://randomuser.me/api/portraits/women/32.jpg' },
    { id: 2, name: 'Rajesh Kumar', role: 'artisan', avatar: 'https://randomuser.me/api/portraits/men/54.jpg' },
    { id: 3, name: 'Meena Patel', role: 'designer', avatar: 'https://randomuser.me/api/portraits/women/65.jpg' },
  ];

  // Initialize with mock data
  useEffect(() => {
    // Set online users
    setOnlineUsers(mockUsers);
    
    // Set current user if in localStorage
    const savedUser = localStorage.getItem('chat_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (userData) => {
    const user = {
      id: Date.now(),
      ...userData,
      avatar: userData.avatar || 'https://randomuser.me/api/portraits/lego/1.jpg'
    };
    setCurrentUser(user);
    setOnlineUsers(prev => [...prev, user]);
    localStorage.setItem('chat_user', JSON.stringify(user));
  };

  const logout = () => {
    setCurrentUser(null);
    setActiveChat(null);
    setMessages({});
    localStorage.removeItem('chat_user');
  };

  const sendMessage = (chatId, content, attachments = []) => {
    if (!currentUser) return;

    const message = {
      id: Date.now().toString(),
      chatId,
      senderId: currentUser.id,
      content,
      attachments,
      timestamp: new Date().toISOString(),
      status: 'sent',
      readBy: [currentUser.id]
    };

    // Add to messages
    setMessages(prev => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), message]
    }));

    // Simulate reply after delay
    if (currentUser.role !== 'artisan') {
      setTimeout(() => {
        const reply = {
          id: Date.now().toString(),
          chatId,
          senderId: 2, // Artisan ID
          content: "Thanks for your message! I'll review your customization request and get back to you shortly.",
          timestamp: new Date().toISOString(),
          status: 'delivered'
        };
        
        setMessages(prev => ({
          ...prev,
          [chatId]: [...(prev[chatId] || []), reply]
        }));

        // Update unread count
        if (activeChat?.id !== chatId) {
          setUnreadCounts(prev => ({
            ...prev,
            [chatId]: (prev[chatId] || 0) + 1
          }));
        }
      }, 2000);
    }

    return message;
  };

  const startTyping = (chatId) => {
    if (!currentUser) return;
    
    // Add typing indicator
    setTypingUsers(prev => [...prev, { chatId, userId: currentUser.id }]);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      stopTyping(chatId);
    }, 3000);
  };

  const stopTyping = (chatId) => {
    if (!currentUser) return;
    
    setTypingUsers(prev => prev.filter(u => 
      !(u.chatId === chatId && u.userId === currentUser.id)
    ));
  };

  const markAsRead = (chatId, messageId) => {
    if (!currentUser) return;

    setMessages(prev => ({
      ...prev,
      [chatId]: prev[chatId]?.map(msg => 
        msg.id === messageId ? { ...msg, readBy: [...(msg.readBy || []), currentUser.id] } : msg
      )
    }));

    // Clear unread count for this chat
    setUnreadCounts(prev => ({
      ...prev,
      [chatId]: 0
    }));
  };

  const createChat = (participants) => {
    if (!currentUser) return;

    const chat = {
      id: Date.now().toString(),
      participants: [...participants, currentUser],
      createdAt: new Date().toISOString(),
      lastMessage: null,
      unreadCount: 0
    };

    return chat;
  };

  const getUnreadCount = (chatId) => {
    return unreadCounts[chatId] || 0;
  };

  const isUserTyping = (chatId, userId) => {
    return typingUsers.some(u => u.chatId === chatId && u.userId === userId);
  };

  const getOnlineStatus = (userId) => {
    return onlineUsers.some(u => u.id === userId);
  };

  const getChatUsers = () => {
    return mockUsers.filter(user => user.id !== currentUser?.id);
  };

  const value = {
    currentUser,
    activeChat,
    messages,
    onlineUsers,
    typingUsers,
    unreadCounts,
    login,
    logout,
    sendMessage,
    startTyping,
    stopTyping,
    markAsRead,
    createChat,
    setActiveChat,
    setMessages,
    getUnreadCount,
    isUserTyping,
    getOnlineStatus,
    getChatUsers
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContext;