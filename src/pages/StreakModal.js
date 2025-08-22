// StreakModal.js
import React, { useState } from 'react';
import '../styles/StreakModal.css';
import { FaCheck, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function StreakModal({ loginHistory, onClose }) {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth()); // 0~11

  const weekdays = ['日', '月', '火', '水', '木', '金', '土'];

  // 月の開始・終了日
  const monthStart = new Date(currentYear, currentMonth, 1);
  const monthEnd = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = monthEnd.getDate();

  // 月初の曜日
  const startDayOfWeek = monthStart.getDay();

  // 日付配列作成
  const dates = [];
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(currentYear, currentMonth, i);
    const dateStr = date.toISOString().split('T')[0];
    const loggedIn = loginHistory.some(e => e.date === dateStr);
    const dayOfWeek = date.getDay(); // 0:日曜, 6:土曜
    dates.push({
      day: i,
      dateStr,
      loggedIn,
      isToday: dateStr === today.toISOString().split('T')[0],
      dayOfWeek,
    });
  }

  const handlePrevMonth = () => {
    let newMonth = currentMonth - 1;
    let newYear = currentYear;
    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    }
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const handleNextMonth = () => {
    let newMonth = currentMonth + 1;
    let newYear = currentYear;
    const maxDate = new Date(today);
    maxDate.setFullYear(maxDate.getFullYear() + 1);
    if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }
    // 未来は1年先まで
    if (newYear > maxDate.getFullYear() || (newYear === maxDate.getFullYear() && newMonth > maxDate.getMonth())) {
      return;
    }
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  return (
    <div className="streak-modal-overlay">
      <div className="streak-modal">
        <h2>ログイン履歴カレンダー</h2>
        <button className="streak-close-button" onClick={onClose}>×</button>

        {/* 月ナビゲーション */}
        <div className="streak-month-nav">
          <button className="month-btn" onClick={handlePrevMonth}><FaChevronLeft /></button>
          <span>{currentYear}年 {currentMonth + 1}月</span>
          <button className="month-btn" onClick={handleNextMonth}><FaChevronRight /></button>
        </div>

        <div className="streak-calendar-wrapper">
          {/* 曜日 */}
          <div className="streak-calendar-row weekdays">
            {weekdays.map((d, idx) => (
              <div
                key={d}
                className={`streak-calendar-cell weekday ${idx === 0 ? 'sunday' : idx === 6 ? 'saturday' : ''}`}
              >
                {d}
              </div>
            ))}
          </div>

          {/* 日付 */}
          <div className="streak-calendar-row days-grid">
            {/* 月初の空セル */}
            {Array.from({ length: startDayOfWeek }).map((_, idx) => (
              <div key={`empty-${idx}`} className="streak-calendar-cell empty"></div>
            ))}

            {/* 日付セル */}
            {dates.map(d => (
              <div
                key={d.dateStr}
                className={`
                  streak-calendar-cell 
                  ${d.loggedIn ? 'logged-in' : ''} 
                  ${d.isToday ? 'today' : ''} 
                  ${d.dayOfWeek === 0 ? 'sunday' : ''} 
                  ${d.dayOfWeek === 6 ? 'saturday' : ''}
                `}
              >
                {d.day}
                {d.loggedIn && <FaCheck className="check-icon" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StreakModal;