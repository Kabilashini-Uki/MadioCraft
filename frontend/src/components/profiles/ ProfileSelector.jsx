import React, { useState } from 'react';
import './ProfileSelector.css';

const ProfileSelector = ({ profiles = [], onProfileSelect }) => {
  const [selectedProfile, setSelectedProfile] = useState(null);

  const handleProfileSelect = (profile) => {
    setSelectedProfile(profile);
    if (onProfileSelect) {
      onProfileSelect(profile);
    }
  };

  // Mock profiles if none provided
  const defaultProfiles = [
    {
      id: 1,
      name: 'Priya Sharma',
      role: 'Buyer',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
      status: 'online',
      description: 'Looking to customize a wedding saree'
    },
    {
      id: 2,
      name: 'Rajesh Kumar',
      role: 'Artisan',
      avatar: 'https://randomuser.me/api/portraits/men/54.jpg',
      status: 'online',
      description: 'Expert in Banarasi silk weaving'
    },
    {
      id: 3,
      name: 'Meena Patel',
      role: 'Designer',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
      status: 'offline',
      description: 'Textile designer specializing in embroidery'
    },
    {
      id: 4,
      name: 'Anil Gupta',
      role: 'Buyer',
      avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
      status: 'online',
      description: 'Wants to customize leather bag'
    }
  ];

  const displayProfiles = profiles.length > 0 ? profiles : defaultProfiles;

  return (
    <div className="profile-selector">
      <div className="profile-header">
        <h2>Select a Profile to Start Customization</h2>
        <p className="subtitle">Choose your role to begin collaborating on designs</p>
      </div>

      <div className="profiles-grid">
        {displayProfiles.map((profile) => (
          <div 
            key={profile.id}
            className={`profile-card ${selectedProfile?.id === profile.id ? 'selected' : ''}`}
            onClick={() => handleProfileSelect(profile)}
          >
            <div className="profile-avatar-container">
              <img 
                src={profile.avatar} 
                alt={profile.name}
                className="profile-avatar"
              />
              <span className={`status-dot ${profile.status}`}></span>
            </div>
            
            <div className="profile-info">
              <h3 className="profile-name">{profile.name}</h3>
              <div className="profile-role-badge">{profile.role}</div>
              <p className="profile-description">{profile.description}</p>
              
              <div className="profile-stats">
                <div className="stat">
                  <span className="stat-value">12</span>
                  <span className="stat-label">Projects</span>
                </div>
                <div className="stat">
                  <span className="stat-value">4.8</span>
                  <span className="stat-label">Rating</span>
                </div>
              </div>
            </div>

            <div className="profile-actions">
              <button className="select-button">
                {selectedProfile?.id === profile.id ? 'Selected' : 'Select'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedProfile && (
        <div className="selected-profile-info">
          <div className="selected-header">
            <h3>Selected Profile: {selectedProfile.name}</h3>
            <span className="selected-role">{selectedProfile.role}</span>
          </div>
          <p className="selected-description">
            Ready to start customization session as {selectedProfile.role.toLowerCase()}.
            {selectedProfile.role === 'Artisan' 
              ? ' You can now receive customization requests and collaborate with buyers.'
              : ' You can now request customizations from artisans.'}
          </p>
          <button 
            className="start-session-btn"
            onClick={() => onProfileSelect(selectedProfile)}
          >
            Start Customization Session
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileSelector;