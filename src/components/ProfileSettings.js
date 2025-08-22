// src/components/ProfileSettings.js
import React, { useState } from 'react';

function ProfileSettings({ onClose, isPrivate, setIsPrivate }) {
  const [currentView, setCurrentView] = useState('menu');
  const togglePrivacy = () => setIsPrivate(!isPrivate);

  const renderMenu = () => (
    <ul>
      <li onClick={() => setCurrentView('privacy')} style={{ cursor: 'pointer' }}>
        🔐 アカウントの公開設定：{isPrivate ? '非公開' : '公開'}
      </li>
      <li onClick={() => setCurrentView('edit')}>プロフィール編集</li>
      <li onClick={() => setCurrentView('password')}>パスワード変更</li>
      <li onClick={() => setCurrentView('notifications')}>通知設定</li>
      <li onClick={() => setCurrentView('help')}>ヘルプ・お問い合わせ</li>
      <li onClick={() => setCurrentView('delete')}>退会する</li>
    </ul>
  );

  const renderPrivacySetting = () => (
    <div>
      <h4>🔐 アカウントの公開設定</h4>
      <p>
        あなたの投稿が他のユーザーから見えるかどうかを設定できます。<br />
        <strong>非公開</strong>にすると、フォロワー以外のユーザーには投稿が表示されなくなります。
      </p>
      <p>現在の設定：<strong>{isPrivate ? '非公開' : '公開'}</strong></p>
      <button onClick={togglePrivacy}>
        {isPrivate ? '公開にする' : '非公開にする'}
      </button>
      <button onClick={() => setCurrentView('menu')} style={{ marginLeft: '10px' }}>
        戻る
      </button>
    </div>
  );

  const renderEditProfile = () => (
    <div>
      <h4>✏️ プロフィール編集</h4>
      <input type="text" placeholder="ユーザー名" style={{ width: '100%', marginBottom: '8px' }} />
      <textarea placeholder="自己紹介" style={{ width: '100%', height: '80px' }}></textarea>
      <div style={{ marginTop: '10px' }}>
        <button>保存</button>
        <button onClick={() => setCurrentView('menu')}>戻る</button>
      </div>
    </div>
  );

  const renderOtherViews = () => {
    switch (currentView) {
      case 'password':
        return (
          <div>
            <h4>🔑 パスワード変更</h4>
            <p>この機能は現在準備中です。</p>
            <button onClick={() => setCurrentView('menu')}>戻る</button>
          </div>
        );
      case 'notifications':
        return (
          <div>
            <h4>🔔 通知設定</h4>
            <p>この機能は現在準備中です。</p>
            <button onClick={() => setCurrentView('menu')}>戻る</button>
          </div>
        );
      case 'help':
        return (
          <div>
            <h4>📩 ヘルプ・お問い合わせ</h4>
            <p>support@tsuriran.app までご連絡ください。</p>
            <button onClick={() => setCurrentView('menu')}>戻る</button>
          </div>
        );
      case 'delete':
        return (
          <div>
            <h4>⚠️ 退会確認</h4>
            <p>本当に退会しますか？この操作は取り消せません。</p>
            <button style={{ background: 'red', color: 'white' }}>退会する</button>
            <button onClick={() => setCurrentView('menu')}>戻る</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="settings-modal">
      <div className="settings-content">
        <h3>⚙️ プロフィール設定</h3>
        {currentView === 'menu' ? renderMenu() :
         currentView === 'edit' ? renderEditProfile() :
         currentView === 'privacy' ? renderPrivacySetting() :
         renderOtherViews()}
        <button className="close-button" onClick={onClose}>閉じる</button>
      </div>
    </div>
  );
}

export default ProfileSettings;