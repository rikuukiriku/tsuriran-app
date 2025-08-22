import React, { useState } from 'react';

const mockHistory = [
  { id: 1, date: '2025/08/01', title: '大物賞 🐟' },
  { id: 2, date: '2025/07/20', title: '伝説の1匹賞 🏆' },
  { id: 3, date: '2025/07/10', title: '坊主賞 😅' },
  { id: 4, date: '2025/06/30', title: 'ファミリー賞 👨‍👩‍👧‍👦' },
  { id: 5, date: '2025/06/10', title: '釣り場自慢賞 🌊' },
];

function ProfileHistory() {
  const initialVisible = 4;
  const [visibleCount, setVisibleCount] = useState(initialVisible);

  return (
    <div className="profile-history">
      <h3>🏅 ランキング履歴</h3>
      <div className="history-list">
        {mockHistory.slice(0, visibleCount).map((item) => (
          <div className="history-card" key={item.id}>
            <strong>{item.title}</strong>
            <p>{item.date}</p>
          </div>
        ))}
      </div>

      {visibleCount < mockHistory.length && (
        <button className="more-button" onClick={() => setVisibleCount(visibleCount + 2)}>
          もっと見る
        </button>
      )}

      {visibleCount > initialVisible && (
        <button className="close-button" onClick={() => setVisibleCount(initialVisible)}>
          閉じる
        </button>
      )}
    </div>
  );
}

export default ProfileHistory;