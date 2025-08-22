
import React from 'react';
import './Use.css';

export default function HowToUse() {
  return (
    <div className="howto-wrapper">
      <h1>つりランの使い方</h1>

      <section>
        <h2>🎣 釣果を投稿しよう！</h2>
        <p>投稿ボタン（中央下）から釣果写真をアップロードして、サイズや釣れた場所を入力すれば投稿完了！</p>
        <p>自慢の1匹も、坊主の日も、どんどん投稿してね！</p>
      </section>

      <section>
        <h2>🏆 週刊ランキングをチェック！</h2>
        <p>毎週金曜日にランキングが更新されるよ！　（全カテゴリーいいね数に基づきます）</p>
        <ul>
           <li>🔹 「40cm以上」と「40cm未満」で分かれた<span className="bold">「いいね」ランキング</span></li>
           <li>🔸 全サイズ共通の<span className="bold">「総合いいね」ランキング</span></li>
           <li>🌟 伝説の1匹に贈られる<span className="bold">「伝説の1匹賞」</span></li>
           <li>👶 子ども投稿に贈られる<span className="bold">「ジュニア賞」</span></li>
           <li>👨‍👩‍👧‍👦 ファミリーでの釣果に贈られる<span className="bold">「ファミリー賞」</span></li>
           <li>🎣 魅力的な釣り場紹介に贈られる<span className="bold">「釣り場自慢賞」</span></li>
           <li>😅 釣れなかった投稿に贈られる<span className="bold">「坊主賞」</span></li>
        </ul>
        <p>週末の釣りも盛り上がること間違いなし🔥</p>
      </section>

      <section>
        <h2>🔎 タグで絞り込み！</h2>
        <p>「#ルアー」「#キス釣り」「#海釣り」など、タグやカテゴリで検索可能！</p>
        <p>気になる釣り方やスポットをチェックして、仲間を見つけよう！</p>
      </section>

      <section>
        <h2>💬 コメント・フォロー・いいね！</h2>
        <p>気になる投稿にコメントしたり、「いいね」でリアクションしよう！</p>
        <p>フォローすれば、仲間の投稿をすぐにチェックできるよ！</p>
      </section>

      <section>
        <h2>🧑 プロフィールをのぞこう！</h2>
        <p>投稿からユーザーのプロフィールにアクセス可能。</p>
        <p>釣果の傾向や釣りスタイルをのぞいてみよう！</p>
      </section>

      <section>
        <h2>🔐 投稿の公開範囲</h2>
          <p>投稿は「全体公開」か「フォロワー限定」のどちらかを選べるよ！</p>
 　　　　　 <p>自分の釣果をたくさんの人に見てもらいたい時も、仲間だけに共有したい時も、シーンに合わせて使い分けてね！</p>
      </section>

      <section>
        <h2>📣 つりランからのお知らせ</h2>
        <p>新機能やキャンペーンなどは、アプリ内や公式SNSでお知らせします！</p>
        <p>ぜひフォローして最新情報をチェックしてね♪</p>
      </section>
    </div>
  );
}
