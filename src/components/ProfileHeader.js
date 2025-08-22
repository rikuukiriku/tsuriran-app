import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProfileHeader({ onSettingsClick }) {
  const navigate = useNavigate();

  // ダミー通知件数（バッジ用）
  const notificationsCount = 2;

  return (
    <div className="profile-header">
      <img src="logo.turiran.PNG" alt="プロフィール" className="profile-image" />
      <div className="profile-info">
        <h2>釣り太郎</h2>
        <p>@tsuritaro</p>
      </div>

      {/* 通知ボタン */}
      <button
        className="notification-button"
        onClick={() => navigate('/notifications')}
      >
        🔔
        {/* 未読件数バッジ */}
        <span className="notification-badge">{notificationsCount}</span>
      </button>

      {/* 設定ボタン */}
      <button className="settings-button" onClick={onSettingsClick}>⚙️</button>
    </div>
  );
}

export default ProfileHeader;