// src/components/ProfileStats.js
import React from 'react';

function ProfileStats() {
  return (
    <div className="profile-stats">
      <div className="stat-box">
        <strong>25</strong>
        <div>投稿</div>
      </div>
      <div className="stat-box">
        <strong>180</strong>
        <div>フォロワー</div>
      </div>
      <div className="stat-box">
        <strong>76</strong>
        <div>フォロー中</div>
      </div>
    </div>
  );
}

export default ProfileStats;