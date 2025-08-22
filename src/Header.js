// Header.js
import React, { useState } from 'react';
import logoImage from './logo.turiran.PNG';
import './Header.css';
import { Link } from 'react-router-dom';
import { GiOpenTreasureChest } from 'react-icons/gi'; // 宝箱アイコンインポート

function Header({ showBackButton = false }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <header className="header">
        <div className="menu-icon" onClick={toggleMenu}>
          ☰
        </div>

        <div className="logo-title-container">
          <Link to="/" className="logo-link">
            <img src={logoImage} alt="ロゴ" className="logo-image" />
            <h1 className="site-title">つりラン</h1>
            <p className="site-subtitle">全国釣果ランキング＆記録が集まるサイト</p>
          </Link>
        </div>

        {/* ここで宝箱アイコンを追加 */}
        <Link to="/bonus" className="treasure-icon" title="ログインボーナス">
          <GiOpenTreasureChest size={28} color="#FFD700" />
        </Link>

        {showBackButton && (
          <button className="back-button" onClick={() => window.history.back()}>
            ← 戻る
          </button>
        )}
      </header>

      <div className={`slide-menu ${isOpen ? 'open' : ''}`}>
        <ul className="menu-list">
          <li><Link to="/" onClick={closeMenu}>ホーム</Link></li>
          <li><Link to="/about" onClick={closeMenu}>このサイトについて</Link></li>
          <li><Link to="/Use" onClick={closeMenu}>利用方法</Link></li>
          <li><Link to="/awards" onClick={closeMenu}>賞の説明</Link></li>
          <li><Link to="/winners" onClick={closeMenu}>過去の受賞者一覧</Link></li>
          <li><Link to="/faq" onClick={closeMenu}>よくある質問</Link></li>
          <li><Link to="/terms" onClick={closeMenu}>利用規約</Link></li>
          <li><Link to="/contact" onClick={closeMenu}>お問い合わせ</Link></li>
          <li><Link to="/message" onClick={closeMenu}>運営者からのコメント</Link></li>
        </ul>
      </div>

      {isOpen && <div className="menu-overlay" onClick={closeMenu} />}
    </>
  );
}

export default Header;