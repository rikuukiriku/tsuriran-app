import React, { useState } from 'react';
import postsData from '../data/postsData';

function ProfilePosts() {
  const initialVisible = 9;
  const [visiblePosts, setVisiblePosts] = useState(initialVisible);
  const currentUser = 'Riku';

  console.log("全投稿:", postsData);
  console.log("現在のユーザー:", currentUser);

  // ✅ 投稿ユーザー名を小文字トリムで比較（SNSっぽい運用ならこれでOK）
  const userPosts = postsData.filter(post => {
    console.log("投稿ユーザー:", post.user);
    return post.user.trim().toLowerCase() === currentUser.trim().toLowerCase();
  });

  return (
    <div className="profile-posts">
      <h3>📷 投稿一覧（{userPosts.length}件）</h3>
      <div className="posts-grid">
        {userPosts.slice(0, visiblePosts).map((post) => (
          <img
            key={post.id}
            src={post.image}
            alt={`${post.fish}の写真`}
            className="post-image"
          />
        ))}
      </div>

      {visiblePosts < userPosts.length && (
        <button
          className="more-button"
          onClick={() => setVisiblePosts(visiblePosts + 6)}
        >
          もっと見る
        </button>
      )}

      {visiblePosts > initialVisible && (
        <button
          className="close-button"
          onClick={() => setVisiblePosts(initialVisible)}
        >
          閉じる
        </button>
      )}
    </div>
  );
}

export default ProfilePosts;