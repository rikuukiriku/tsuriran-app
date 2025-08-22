// Home.js
import React, { useState } from 'react';
import background from '../background1.JPG.PNG';
import './Home.css';
import { Link } from "react-router-dom";

function Home() {
  const [showTooltipBig, setShowTooltipBig] = useState(false);
  const [showTooltipSmall, setShowTooltipSmall] = useState(false);

  return (
    <div
      className="home-container"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <h2 className="main-title">目指せ1位</h2>

      <p className="ranking-label ranking-label-big">本日の大物＆小物</p>
      <p className="ranking-label ranking-label-small">いいねランキング</p>

      <div className="section-container">
        <p className="section-label">
          大物
          <span
            onClick={() => setShowTooltipBig(!showTooltipBig)}
            className="tooltip-icon tooltip-icon-big"
          >
            ?
          </span>
          {showTooltipBig && (
            <span className="tooltip-box tooltip-box-big">
              40cm以上の魚を指します
            </span>
          )}
        </p>
        <p className="section-label section-label-small">
          小物
          <span
            onClick={() => setShowTooltipSmall(!showTooltipSmall)}
            className="tooltip-icon tooltip-icon-small"
          >
            ?
          </span>
          {showTooltipSmall && (
            <span className="tooltip-box tooltip-box-small">
              40cm未満の魚を指します
            </span>
          )}
        </p>
      </div>

      <div className="white-boxes">
        <div className="white-box"></div>
        <div className="white-box"></div>
      </div>

      <div className="safety-message">
        <p className="safety-title">安全に楽しもう</p>
      </div>
    </div>
  );
}

export default Home;      

