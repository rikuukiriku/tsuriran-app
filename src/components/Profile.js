// src/components/Profile.js
import React, { useState } from 'react';
import '../styles/Profile.css';
import ProfileHeader from './ProfileHeader';
import ProfileStats from './ProfileStats';
import ProfileHistory from './ProfileHistory';
import ProfilePosts from './ProfilePosts';
import ProfileSettings from './ProfileSettings';

function Profile() {
  const [showSettings, setShowSettings] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false); // ← 鍵アカウント状態

  return (
    <div className="profile-wrapper">
      <div className="profile-container">
        <ProfileHeader
          onSettingsClick={() => setShowSettings(true)}
        />
        <ProfileStats />
        <ProfileHistory />
        {isPrivate ? (
          <div className="locked-profile-message">
            🔒 このアカウントは非公開です
          </div>
        ) : (
          <ProfilePosts />
        )}
        {showSettings && (
          <ProfileSettings
            onClose={() => setShowSettings(false)}
            isPrivate={isPrivate}
            setIsPrivate={setIsPrivate}
          />
        )}
      </div>
    </div>
  );
}

export default Profile;