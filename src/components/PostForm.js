// src/components/PostForm.js
import React, { useState } from 'react';
import '../styles/PostForm.css';

export default function PostForm() {
  const [formData, setFormData] = useState({
    image: null,
    fish: '',
    size: '',
    comment: '',
    bait: '',
    lure: '',
    privacy: 'detail',
    location: '',
    prefecture: ''
  });

  const [termsAccepted, setTermsAccepted] = useState(false); // ← 追加！

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: URL.createObjectURL(files[0]) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('投稿内容:', formData);
    alert("投稿しました！（仮）");
  };

  return (
    <div className="post-form-page">
      <h2 className="post-title">最高の瞬間をシェアしよう！</h2>

      <form className="post-form" onSubmit={handleSubmit}>
        {/* 写真アップロード */}
        <label className="image-upload">
          {formData.image ? (
            <img src={formData.image} alt="preview" className="image-preview" />
          ) : (
            <span className="upload-placeholder">＋ 写真を追加 / 撮影</span>
          )}
          <input type="file" name="image" accept="image/*" onChange={handleChange} />
        </label>

        <input type="text" name="fish" placeholder="🐟 魚種（例: タイ）" value={formData.fish} onChange={handleChange} />
        <input type="number" name="size" placeholder="📏 サイズ（cm）" value={formData.size} onChange={handleChange} />

        <div className="privacy-options">
          <label>📍 場所の公開範囲:</label>
          <div className="radio-group">
            <label><input type="radio" name="privacy" value="detail" checked={formData.privacy === 'detail'} onChange={handleChange} /> 詳細まで公開</label>
            <label><input type="radio" name="privacy" value="prefecture" checked={formData.privacy === 'prefecture'} onChange={handleChange} /> 都道府県のみ</label>
            <label><input type="radio" name="privacy" value="private" checked={formData.privacy === 'private'} onChange={handleChange} /> 非公開</label>
          </div>
        </div>

        {formData.privacy === 'detail' && (
          <input type="text" name="location" placeholder="📌 場所を入力（例: 江ノ島）" value={formData.location} onChange={handleChange} />
        )}

        {formData.privacy === 'prefecture' && (
          <select name="prefecture" value={formData.prefecture} onChange={handleChange}>
            <option value="">都道府県を選択</option>
            {['北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
              '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
              '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県',
              '岐阜県', '静岡県', '愛知県', '三重県',
              '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県',
              '鳥取県', '島根県', '岡山県', '広島県', '山口県',
              '徳島県', '香川県', '愛媛県', '高知県',
              '福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県',
              '沖縄県'
            ].map(pref => (
              <option key={pref} value={pref}>{pref}</option>
            ))}
          </select>
        )}

        <textarea name="comment" placeholder="💬 コメント（任意）" rows={3} value={formData.comment} onChange={handleChange} />
        <input type="text" name="bait" placeholder="🎣 仕掛け（任意）" value={formData.bait} onChange={handleChange} />

        {/* ✅ 利用規約チェックボックス */}
        <div className="terms-check">
          <label>
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={() => setTermsAccepted(!termsAccepted)}
            />
            この投稿には人物が写っておらず、不適切な内容を含んでいないことを確認しました。
          </label>
        </div>

        {/* ✅ チェックされていたら表示する投稿ボタン */}
        {termsAccepted && (
          <button className="submit-button" type="submit">投稿する</button>
        )}
      </form>
    </div>
  );
}