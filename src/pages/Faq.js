import React, { useState } from 'react';
import './Faq.css';

const faqData = [
  {
    icon: "📝",
    question: "Q1. 登録しないと使えませんか？",
    answer: "登録しなくても投稿の閲覧やランキングの確認はできますが、投稿・コメント・いいねなどは登録が必要です。"
  },
  {
    icon: "🎣",
    question: "Q2. 「つりラン」って何ができるアプリですか？",
    answer: "つりランは、釣り好き同士が写真を投稿して、ランキングや賞で盛り上がれるSNSアプリです！釣れた魚のサイズや「いいね」で毎週ランキングが発表され、週ごとに特集もあります。"
  },
  {
    icon: "🥇",
    question: "Q3. ランキングの仕組みはどうなっていますか？",
    answer: "・40cm以上／40cm未満の2カテゴリに分かれてランキングされます。\n・サイズだけでなく、いいね数によってもランキングされます。\n・週ごとにランキングがリセットされ、毎週金曜に発表されます。"
  },
  {
    icon: "📸",
    question: "Q4. 投稿にはどんな写真を載せたらいいですか？",
    answer: "釣った魚がしっかり写っていれば高評価されやすいですが、坊主（釣れなかった）記録や、景色だけの写真も大歓迎です！顔や場所が写っていても写っていなくてもOK。どんなスタイルでも、あなたの釣りの思い出をぜひ共有してください！"
  },
  {
    icon: "📍",
    question: "Q5. 投稿に位置情報は必須ですか？",
    answer: "任意です。釣り場を共有したくない場合は非公開にすることも可能です。"
  },
  {
    icon: "🖼️",
    question: "Q6. 写真がなくても投稿できますか？",
    answer: "可能ですが、写真付きの投稿の方が注目されやすくなります。"
  },
  {
    icon: "✏️",
    question: "Q7. 投稿後に編集や削除はできますか？",
    answer: "はい、マイページからいつでも編集・削除が可能です。"
  },
  {
    icon: "🚨",
    question: "Q8. 不適切な投稿を見つけた場合は？",
    answer: "通報ボタンから運営に報告できます。内容を確認し、必要に応じて対応します。"
  },
  {
    icon: "🔔",
    question: "Q9. いいねやコメントの通知は届きますか？",
    answer: "はい、通知機能があります。設定でオン・オフの切り替えも可能です。"
  },
  {
    icon: "🌍",
    question: "Q10. 投稿は誰にでも公開されますか？",
    answer: "投稿は基本的に全体公開されますが、フォロワー限定公開など、非公開設定も選べるようになっています。これからも、もっと細かく公開範囲を選べるように改善予定です！"
  },
  {
    icon: "🧒",
    question: "Q11. ジュニアやファミリーも本当に参加できますか？",
    answer: "大歓迎です！お子様の釣果や家族での釣りの思い出もシェアしてください。"
  },
  {
    icon: "👻",
    question: "Q12. 魚が釣れなかったときも投稿できますか？",
    answer: "大歓迎！「坊主賞（釣れなかったで賞）」で、健闘を称える仕組みがあります。釣れなくても一緒に楽しむのがこのアプリの目的です。"
  },
  {
    icon: "🏆",
    question: "Q13. 「伝説の1匹賞」って何ですか？",
    answer: "サイズや種類、状況問わず、「これはすごい！」とみんなが思ったインパクトのある魚に贈られる賞です。見た瞬間「すげぇ…」ってなるような1枚を期待しています！"
  },
  {
    icon: "🔒",
    question: "Q14. 投稿やコメントの公開範囲は？安全性は？",
    answer: "投稿は全ユーザーに公開されますが、運営側で不適切な内容は監視・対処しています。個人情報が写らないようご注意ください。"
  },
  {
    icon: "⏳",
    question: "Q15. 投稿してから反映されるまで時間がかかることはありますか？",
    answer: "基本的には即時反映されますが、混雑時は少し時間がかかることがあります。"
  },
  {
    icon: "📱",
    question: "Q16. アプリは無料ですか？課金要素はありますか？",
    answer: "アプリの利用はすべて無料です！将来的に、もっと楽しめる特別機能（全て任意）を追加するかもしれませんが、基本機能はこれからも無料で使えます。ご安心ください！"
  },
  {
    icon: "🐟",
    question: "Q17. 投稿できる魚の種類に制限はありますか？",
    answer: "特にありません！海でも川でも池でも、釣った魚ならなんでもOK！ただし、ルールやマナーは守って投稿してくださいね。"
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h2>🎣 よくある質問</h2>
      {faqData.map((faq, index) => (
        <div
          key={index}
          className={`faq-item ${openIndex === index ? "open" : ""}`}
        >
          <button className="faq-question" onClick={() => toggleFAQ(index)}>
            {faq.icon} {faq.question}
            <span className="arrow">{openIndex === index ? '▲' : '▼'}</span>
          </button>
          {openIndex === index && (
            <div className="faq-answer">
              {faq.answer.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          )}
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Faq;
