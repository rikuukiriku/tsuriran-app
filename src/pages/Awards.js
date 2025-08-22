import React from 'react';
import './Awards.css';

export default function Awards() {
  const awards = [
    {
      title: '👍 今週のMVP',
      description: '魚のサイズに関係なく、いいねが多かった投稿から選ばれます。',
    },
    {
       title: '🏅 いいね賞（大物・小物）',
      description: '40cm以上部門、40cm未満部門のそれぞれで、週ごとに最もいいねが多かった投稿に贈られます。',
    },
    {
      title: '🐟 大物賞（40cm以上）',
      description: '40cm以上の大物を釣り上げた人の中から、いいね数や話題性で選出される賞です。',
    },
    {
      title: '🐠 小物賞（40cm未満）',
      description: 'サイズは小さくても「映え」や「かわいさ」「珍しさ」で注目を集めた投稿に贈られます。',
    },
    {
       title: '💡 坊主賞',
      description: '釣れなかったのに、思わず笑ってしまうような投稿に贈られます。ユーモアと挑戦を評価！',
    },
    {
      title: '🎉 ファミリー賞／ジュニア賞',
      description: '家族で楽しむ様子や、お子さまが釣りを楽しんでいる投稿に対して運営が選びます。',
    },
    {
      title: '🎣 伝説の1匹賞',
      description: '誰もが驚くようなサイズや珍しい魚を釣り上げた投稿に贈られる賞。インパクト重視！',
    },
    {
      title: '📸 釣り場自慢賞',
      description: '絶景・穴場・雰囲気満点な釣り場を紹介してくれた投稿に贈られる賞です。',
    },

  ];

  return (
    <div className="awards-wrapper">
      <h1>賞の説明</h1>
      <p className="intro-text">つりランでは、さまざまな投稿が評価されるよう、複数の賞をご用意しています。毎週金曜日に更新されるランキングもお楽しみに！</p>

      <div className="award-list">
        {awards.map((award, index) => (
          <div key={index} className="award-card">
            <h2>{award.title}</h2>
            <p>{award.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}