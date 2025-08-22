import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/logo.turiran3.png';

export default function Navbar() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY) {
        setShowNavbar(false); // 下にスクロール → 消す
      } else {
        setShowNavbar(true); // 上に戻る → 表示
      }
      setLastScrollY(currentY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div className={`icon-bar ${showNavbar ? 'show' : 'hide'}`}>
      <Link to="/rankings" className="icon-item">
        <span className="material-symbols-outlined icon-symbol">trophy</span>
        <p className="icon-label">ランキング</p>
      </Link>
      <Link to="/map" className="icon-item">
        <span className="material-symbols-outlined icon-symbol">map_search</span>
        <p className="icon-label">マップ</p>
      </Link>
      <Link to="/post" className="icon-item">
        <span class="material-symbols-outlined icon-symbol">directions_boat</span>
        <p className="icon-label">投稿</p>
      </Link>
      <Link to="/mysuiso" className="icon-item">
        <ion-icon name="fish-outline" class="icon-symbol"></ion-icon>
        <p className="icon-label">マイ水槽</p>
      </Link>
      <Link to="/profile" className="icon-item">
        <span className="material-symbols-outlined icon-symbol">account_circle</span>
        <p className="icon-label">プロフィール</p>
      </Link>
    </div>
  );
}