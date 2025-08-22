import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css';  // 今のスタイルを使うので読み込み

const notifications = [
  { id: 1, text: 'たろうさんがいいねしました', time: '2025-08-11 15:20' },
  { id: 2, text: 'はなこさんがコメントしました', time: '2025-08-11 14:50' },
];

function Notifications() {
  const navigate = useNavigate();

  return (
    <div className="notifications-container">
      <button className="back-button" onClick={() => navigate(-1)}>← 戻る</button>
      <ul className="notifications-list">
        {notifications.map((n) => (
          <li key={n.id} className="notification-item">
            <div>{n.text}</div>
            <small className="notification-time">{n.time}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notifications;