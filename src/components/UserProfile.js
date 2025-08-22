// src/components/UserProfile.js
import React, { useState } from 'react';
import '../styles/UserProfile.css'; // 自分用に分けたCSS
import ProfileStats from './ProfileStats';
import ProfileHistory from './ProfileHistory';
import ProfilePosts from './ProfilePosts';

function UserProfile() {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = () => {
    setIsFollowing(prev => !prev);
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-container">
        <div className="profile-header">
          <img src="logo.turiran.PNG" alt="プロフィール" className="profile-image" />
          <div className="profile-info">
            <h2>釣り花子</h2>
            <p>@tsurihanako</p>
          </div>
          <button
            className={`user-profile-follow-button ${isFollowing ? 'following' : ''}`}
            onClick={handleFollow}
          >
            {isFollowing ? 'フォロー中' : 'フォロー'}
          </button>
        </div>

        <ProfileStats />
        <ProfileHistory />
        <ProfilePosts />
      </div>
    </div>
  );
}

export default UserProfile;