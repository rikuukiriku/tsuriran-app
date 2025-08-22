import React, { useState, useRef, useEffect, Suspense } from 'react';
import '../styles/MySuiso.css';

// 背景画像
import lakeImg from '../images/lake.jpg.png';
import seaImg from '../images/sea.jpg';
import riverImg from '../images/river.jpg.png';

// 魚データ
const fishData = {
  アジ: { src: '/images/fish_aji.png' },
  タイ: { src: '/images/fish_tai.png' },
  サバ: { src: '/images/fish_saba.png' },
  カサゴ: { src: '/images/fish_kasago.png' },
  コイ: { src: '/images/fish_koi.png' },
};

const backgrounds = {
  湖: lakeImg,
  海: seaImg,
  川: riverImg,
};

// 図鑑コンポーネントを遅延インポート
const FishCatalog = React.lazy(() => import('./FishCatalog'));

export default function MySuiso() {
  const [caughtFishList] = useState(['アジ', 'タイ', 'サバ', 'カサゴ','コイ']);
  const [background, setBackground] = useState('海');
  const [foodStock, setFoodStock] = useState(10);
  const [showCatalog, setShowCatalog] = useState(false);

  const aquariumRef = useRef(null);
  const fishRefs = useRef({});

  const [foodList, setFoodList] = useState([]);
  const [bubbles] = useState(() =>
    Array.from({ length: 15 }).map(() => ({
      left: Math.random() * 100,
      animationDelay: Math.random() * 5,
      animationDuration: 3 + Math.random() * 2,
      size: 5 + Math.random() * 10,
    }))
  );

  const eatRadius = 40;
  const baseSpeed = 120;

  // 魚の状態（位置・速度・上下振幅・周期・向き）
  const [fishStates, setFishStates] = useState(() =>
    caughtFishList.map(() => ({
      x: Math.random() * 500,
      y: 50 + Math.random() * 250,
      speedX: 40 + Math.random() * 60,
      amplitude: 10 + Math.random() * 30,
      period: 2 + Math.random() * 3,
      facing: Math.random() > 0.5 ? 1 : -1,
    }))
  );

  // 餌を落とす
  const dropFood = () => {
    if (foodStock <= 0) {
      alert('餌がこれ以上ありません。週間ミッションやログインボーナスで餌を獲得しましょう！');
      return;
    }
    if (!aquariumRef.current) return;

    const rect = aquariumRef.current.getBoundingClientRect();
    const startX = 10 + Math.random() * (rect.width - 20);
    const id = Date.now() + Math.floor(Math.random() * 1000);
    const now = performance.now();

    const newFood = {
      id,
      startX,
      x: startX,
      y: 8,
      speed: baseSpeed * (0.8 + Math.random() * 0.8),
      amplitude: 8 + Math.random() * 22,
      period: 800 + Math.random() * 1200,
      startTime: now,
    };

    setFoodStock(stock => stock - 1);
    setFoodList(prev => [...prev, newFood]);
  };

  // 餌の動き＆魚との当たり判定
  useEffect(() => {
    let rafId;
    let lastTime = performance.now();

    const stepFood = (time) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;
      const aqEl = aquariumRef.current;
      if (!aqEl) {
        rafId = requestAnimationFrame(stepFood);
        return;
      }
      const aqRect = aqEl.getBoundingClientRect();

      setFoodList(prevFoods => {
        const newFoods = [];

        for (const f of prevFoods) {
          const elapsed = time - f.startTime;
          const nextY = f.y + f.speed * dt;
          const nextX = f.startX + Math.sin((elapsed / f.period) * Math.PI * 2) * f.amplitude;

          let eaten = false;
          Object.values(fishRefs.current).forEach((fishEl) => {
            if (!fishEl) return;
            const fishRect = fishEl.getBoundingClientRect();
            const fishCenterX = fishRect.left + fishRect.width / 2 - aqRect.left;
            const fishCenterY = fishRect.top + fishRect.height / 2 - aqRect.top;

            const dist = Math.hypot(nextX - fishCenterX, nextY - fishCenterY);
            if (dist < eatRadius) eaten = true;
          });

          if (!eaten && nextY < aqRect.height - 6) {
            newFoods.push({ ...f, x: nextX, y: nextY });
          }
        }
        return newFoods;
      });

      rafId = requestAnimationFrame(stepFood);
    };

    rafId = requestAnimationFrame(stepFood);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // 魚の動き（完全ランダム軌道）
  useEffect(() => {
    let rafId;
    const stepFish = (time) => {
      const dt = 0.016;
      const aqEl = aquariumRef.current;
      if (!aqEl) {
        rafId = requestAnimationFrame(stepFish);
        return;
      }
      const aqWidth = aqEl.getBoundingClientRect().width;
      const aqHeight = aqEl.getBoundingClientRect().height;

      fishStates.forEach(f => {
        f.x += f.speedX * dt * f.facing;
        f.y += Math.sin(time / 1000 * Math.PI * 2 / f.period) * f.amplitude * dt;

        // 端で反転
        if (f.x > aqWidth - 80) f.facing = -1;
        if (f.x < 0) f.facing = 1;
        if (f.y < 0) f.y = 0;
        if (f.y > aqHeight - 80) f.y = aqHeight - 80;
      });

      setFishStates([...fishStates]);
      rafId = requestAnimationFrame(stepFish);
    };

    rafId = requestAnimationFrame(stepFish);
    return () => cancelAnimationFrame(rafId);
  }, [fishStates]);

  if (showCatalog) {
    return (
      <Suspense fallback={<div>読み込み中...</div>}>
        <FishCatalog
          onClose={() => setShowCatalog(false)}
          caughtFishList={caughtFishList}
        />
      </Suspense>
    );
  }

  return (
    <div className="mysuiso-container" style={{ position: 'relative' }}>
      {/* 図鑑ボタン */}
      <button
        className="fish-catalog-button"
        onClick={() => setShowCatalog(true)}
        aria-label="魚の図鑑を開く"
      >
        🐟 図鑑
      </button>

      <div className="title-area"><h1>世界に一つの水槽</h1></div>
      <div className="subtitle-area"><p>あなたが釣った魚たちが自由に泳いでいます</p></div>

      <div className="top-controls-container">
        <div className="background-selector-area">
          <label>背景を選ぶ：</label>
          {Object.entries(backgrounds).map(([name]) => (
            <label key={name}>
              <input
                type="radio"
                name="background"
                value={name}
                checked={background === name}
                onChange={e => setBackground(e.target.value)}
              />
              {name}
            </label>
          ))}
        </div>
        <div className="feed-food-area">
          <div className="food-stock-display">餌の残り: {foodStock} 個</div>
          <button onClick={dropFood} disabled={foodStock <= 0}>餌をあげる</button>
        </div>
      </div>

      <div
        ref={aquariumRef}
        className="aquarium"
        style={{
          backgroundImage: `url(${backgrounds[background]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          border: '3px solid #0077aa',
          minHeight: '400px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* 泡 */}
        <div className="bubble-layer">
          {bubbles.map((bubble, i) => (
            <div
              key={`bubble-${i}`}
              className="bubble"
              style={{
                left: `${bubble.left}%`,
                animationDelay: `${bubble.animationDelay}s`,
                animationDuration: `${bubble.animationDuration}s`,
                width: `${bubble.size}px`,
                height: `${bubble.size}px`,
              }}
            />
          ))}
        </div>

        {/* 餌 */}
        {foodList.map(food => (
          <div
            key={food.id}
            className="food"
            style={{ left: `${food.x}px`, top: `${food.y}px`, position: 'absolute' }}
          />
        ))}

        {/* 魚 */}
        {caughtFishList.map((fish, i) => {
          const fishInfo = fishData[fish];
          if (!fishInfo) return null;
          const f = fishStates[i];

          return (
            <img
              ref={(el) => (fishRefs.current[i] = el)}
              key={i}
              src={fishInfo.src}
              alt={fish}
              className="swimming-fish"
              style={{
                position: 'absolute',
                left: `${f.x}px`,
                top: `${f.y}px`,
                transform: `scaleX(${f.facing * -1})`,
                width: '80px',
                height: 'auto',
              }}
              title={fish}
            />
          );
        })}
        {caughtFishList.length === 0 && <p>まだ魚を釣っていません。</p>}
      </div>
    </div>
  );
}