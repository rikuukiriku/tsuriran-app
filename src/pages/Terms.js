// Terms.js
import React, { useState } from 'react';
import './Terms.css';

export default function Terms() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleSection = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const sections = [
    {
      title: '1. はじめに',
      content: `この「つりラン」は、釣りを愛するすべての人が、自由に釣果を共有し、交流することを目的としたSNSサービスです。本サービスを利用することで、以下の利用規約に同意したものとみなされます。`
    },
    {
      title: '2. 利用について',
      content: `当サービスは、無料でご利用いただけます。年齢に関係なく誰でもご利用可能ですが、13歳未満の方は保護者の許可を得てご利用ください。`
    },
    {
      title: '3. 投稿に関するルール',
      content: `・投稿された内容は、他のユーザーにも公開されます（非公開設定あり）。\n・投稿にはご自身で撮影した写真・動画・コメントをご利用ください。\n・個人が特定される情報（顔、ナンバープレート、住所など）が含まれないようご注意ください。`
    },
    {
      title: '4. 禁止事項',
      content: `以下の行為は禁止とします。違反があった場合、投稿の削除やアカウントの停止を行うことがあります。\n・著作権や肖像権を侵害する投稿\n・差別的・攻撃的・不適切な内容\n・虚偽情報の投稿\n・他人のなりすまし\n・営利目的の過度な宣伝\n・その他、運営が不適切と判断した行為`
    },
    {
      title: '5. 著作権・知的財産',
      content: `・ユーザーが投稿した写真・文章の著作権は、原則として投稿者に帰属します。\n・ただし、運営は本サービスのPRや改善のために、投稿内容を使用させていただく場合があります（例：ランキング紹介など）。`
    },
    {
      title: '6. 免責事項',
      content: `・投稿内容の真偽について、運営は一切の責任を負いません。\n・利用者間のトラブルについても、原則として関与いたしません。\n・サービスの提供停止や不具合により生じた損害について、運営は責任を負いません。`
    },
    {
      title: '7. プライバシーとセキュリティ',
      content: `・ユーザーの個人情報は、厳重に管理し、法令に基づいて安全に取り扱います。\n・詳細は「プライバシーポリシー」をご確認ください。`
    },
    {
      title: '8. 利用規約の変更',
      content: `・本規約は予告なく変更されることがあります。重要な変更がある場合は、事前に通知いたします。`
    },
    {
      title: '9. お問い合わせ',
      content: `ご質問やご意見がある場合は、アプリ内のお問い合わせフォームからご連絡ください。`
    },
    {
      title: '10. プライバシーポリシー',
      content: `・収集する情報：ユーザー名、プロフィール画像、位置情報（任意）などの投稿情報。\n・情報の利用目的：投稿の公開、ランキング表示、サービス向上のための分析など。\n・第三者提供：原則として第三者には提供しません（法令等に基づく場合を除く）。\n・クッキー等：アクセス解析のために利用する場合がありますが、個人を特定するものではありません。`
    },
    {
      title: '🎣 つりランは、みんなが安心して使えるアプリを目指しています。',
      content: `誰もが気持ちよく使える場にするために、ルールを守ってご利用いただけると嬉しいです☺️`
    }
  ];

  return (
    <div className="terms-wrapper">
      <h1>利用規約</h1>
      {sections.map((section, index) => (
        <div key={index} className="accordion-section">
          <h2 onClick={() => toggleSection(index)} className="accordion-title">
            {section.title}
          </h2>
          {openIndex === index && (
            <div className="accordion-content">
              {section.content.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}