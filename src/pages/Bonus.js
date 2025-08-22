// Bonus.js
import React, { useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import '../styles/Bonus.css';

import treasureClosedImg from '../images/treasure-closed.png';
import treasureOpenImg from '../images/treasure-open.png';
import StreakModal from './StreakModal'; // 後で作る

const missionsInit = [
  { id: 4, title: 'ランキングを見る', description: 'ランキングをチェック！', completed: false, reward: 1 },
  { id: 2, title: 'いいねする', description: '誰かの投稿にいいね！', completed: false, reward: 2 },
  { id: 3, title: 'コメントする', description: 'コメントを書いて交流！', completed: false, reward: 3 },
  { id: 5, title: '誰かをフォローする', description: '新しい仲間をフォロー！', completed: false, reward: 4 },
  { id: 1, title: '投稿する', description: '1回投稿してみよう！', completed: false, reward: 10 },
];

// 今日の日付（yyyy-mm-dd）
const getTodayString = () => new Date().toISOString().split('T')[0];

function Bonus() {
  const [dailyClaimed, setDailyClaimed] = useState(false);
  const [treasureOpened, setTreasureOpened] = useState(false);
  const [showRewardPopup, setShowRewardPopup] = useState(false);
  const [missions, setMissions] = useState(missionsInit);
  const [baitCount, setBaitCount] = useState(0);
  const [dailyMissionEarned, setDailyMissionEarned] = useState(0);
  const [lastEarnDate, setLastEarnDate] = useState(getTodayString());
  const [streakCount, setStreakCount] = useState(0);
  const [showStreakModal, setShowStreakModal] = useState(false);
  const [loginHistory, setLoginHistory] = useState([]);

  const DAILY_BAIT_LIMIT = 10;

  useEffect(() => {
    // daily bonus
    const claimed = localStorage.getItem('dailyBonusClaimed') === 'true';
    setDailyClaimed(claimed);

    const storedMissions = JSON.parse(localStorage.getItem('missionsStatus'));
    if (storedMissions) setMissions(storedMissions);

    const storedBait = Number(localStorage.getItem('baitCount'));
    setBaitCount(isNaN(storedBait) ? 0 : storedBait);

    const storedLastEarnDate = localStorage.getItem('lastEarnDate') || getTodayString();
    const storedDailyMissionEarned = Number(localStorage.getItem('dailyMissionEarned'));
    if (storedLastEarnDate !== getTodayString()) {
      setDailyMissionEarned(0);
      localStorage.setItem('dailyMissionEarned', '0');
      setLastEarnDate(getTodayString());
      localStorage.setItem('lastEarnDate', getTodayString());
    } else {
      setDailyMissionEarned(isNaN(storedDailyMissionEarned) ? 0 : storedDailyMissionEarned);
      setLastEarnDate(storedLastEarnDate);
    }

    // 連続ログイン日数
    const lastLogin = localStorage.getItem('lastLoginDate') || getTodayString();
    const storedStreak = Number(localStorage.getItem('streakCount')) || 0;
    const today = getTodayString();
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    let newStreak = 1;
    if (lastLogin === yesterday) {
      newStreak = storedStreak + 1;
    } else if (lastLogin === today) {
      newStreak = storedStreak;
    }
    setStreakCount(newStreak);
    localStorage.setItem('streakCount', newStreak.toString());
    localStorage.setItem('lastLoginDate', today);

    // ログイン履歴を localStorage から読み込み
    const storedHistory = JSON.parse(localStorage.getItem('loginHistory')) || [];
    if (!storedHistory.find(e => e.date === today)) {
      storedHistory.push({ date: today, loggedIn: true });
      localStorage.setItem('loginHistory', JSON.stringify(storedHistory));
    }
    setLoginHistory(storedHistory);
  }, []);

  const claimDailyBonus = () => {
    if (dailyClaimed) return;

    setDailyClaimed(true);
    localStorage.setItem('dailyBonusClaimed', 'true');
    setTreasureOpened(true);

    setTimeout(() => {
      setShowRewardPopup(true);
      const reward = 10;
      const newBait = baitCount + reward;
      setBaitCount(newBait);
      localStorage.setItem('baitCount', newBait);
    }, 700);

    setTimeout(() => setShowRewardPopup(false), 2500);
  };

  const toggleMission = (id) => {
    const updated = missions.map(m => {
      if (m.id === id) {
        if (!m.completed) {
          const possibleAdd = m.reward;
          const remaining = DAILY_BAIT_LIMIT - dailyMissionEarned;
          const addBait = remaining > 0 ? Math.min(possibleAdd, remaining) : 0;

          if (addBait === 0) {
            alert('本日のミッション餌獲得上限（10個）に達しました。');
          } else {
            const newBait = baitCount + addBait;
            setBaitCount(newBait);
            localStorage.setItem('baitCount', newBait);

            const newDailyMissionEarned = dailyMissionEarned + addBait;
            setDailyMissionEarned(newDailyMissionEarned);
            localStorage.setItem('dailyMissionEarned', newDailyMissionEarned);

            setLastEarnDate(getTodayString());
            localStorage.setItem('lastEarnDate', getTodayString());
          }
        }
        return { ...m, completed: !m.completed };
      }
      return m;
    });
    setMissions(updated);
    localStorage.setItem('missionsStatus', JSON.stringify(updated));
  };

  const handleShare = () => {
    const reward = 20;
    const newBait = baitCount + reward;
    setBaitCount(newBait);
    localStorage.setItem('baitCount', newBait);
    alert(`友達にシェアして餌を${reward}個ゲット！`);
  };

  return (
    <div className="bonus-container" style={{ position: 'relative' }}>
      <div style={{ height: '48px' }} />

      <section className="daily-bonus-section gold-card" style={{ position: 'relative' }}>
        {/* 連続ログイン日数バッジ */}
        <div
          className="streak-badge"
          onClick={() => setShowStreakModal(true)}
        >
           {streakCount}日連続
        </div>

        <div className="treasure-wrapper">
          <div
            className={`treasure-box ${treasureOpened ? 'opened' : ''}`}
            onClick={() => { if (!dailyClaimed) claimDailyBonus(); }}
            role="button"
            aria-label="宝箱を開ける"
          >
            <img
              src={treasureOpened ? treasureOpenImg : treasureClosedImg}
              alt="宝箱"
            />
          </div>
        </div>

        <h2>今日のログインボーナス</h2>
        <button
          className={`claim-button ${dailyClaimed ? 'claimed' : ''}`}
          disabled={dailyClaimed}
          onClick={claimDailyBonus}
        >
          {dailyClaimed ? '受け取り済み' : '受け取る'}
        </button>

        <button
          className="claim-button"
          onClick={handleShare}
          style={{ marginTop: '20px' }}
        >
          友達にシェアして餌をもらう
        </button>

        {showRewardPopup && (
          <div className="reward-popup">餌 +10 をゲット！</div>
        )}
      </section>

      {/* 連続ログイン履歴モーダル */}
      {showStreakModal && (
        <StreakModal
          loginHistory={loginHistory}
          onClose={() => setShowStreakModal(false)}
        />
      )}

      <section className="missions-section" style={{ marginTop: '10px' }}>
        <h2>1日ミッション</h2>
        <p>所持餌の数: <strong>{baitCount}</strong> 個</p>
        <p style={{ fontSize: '14px', color: '#666' }}>
          ※1日にミッションで獲得できる餌は最大{DAILY_BAIT_LIMIT}個までです
        </p>

        <ul>
          {missions.map(({ id, title, description, completed, reward }) => (
            <li
              key={id}
              className={`mission-item ${completed ? 'completed' : ''}`}
              onClick={() => toggleMission(id)}
              title={completed ? '達成済み - クリックでリセット' : '未達成 - クリックで達成'}
            >
              <div className="mission-text">
                <strong>{title}</strong> — {description}
              </div>
              <div className="mission-right">
                <FaCheckCircle
                  className={`check-icon ${completed ? 'active' : ''}`}
                  size={22}
                />
                <span className="reward-label">餌＋{reward}個</span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Bonus;