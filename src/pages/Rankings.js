import React, { useState } from 'react';
import postsData from '../data/postsData';
import '../styles/Rankings.css';

const categories = [
  '最新投稿', '今週のMVP', 'いいね賞', '大物賞',
  '小物賞', '坊主賞', 'ファミリー賞・ジュニア賞',
  '伝説の1匹賞', '釣り場自慢賞'
];

function Rankings() {
  const [selectedCategory, setSelectedCategory] = useState('すべて');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [expandedCommentId, setExpandedCommentId] = useState(null);
  const [followedUsers, setFollowedUsers] = useState([]);
  const [commentingPostId, setCommentingPostId] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [likes, setLikes] = useState({});
  const [likedPosts, setLikedPosts] = useState([]);

  const toggleFollow = (user) => {
    setFollowedUsers(prev =>
      prev.includes(user) ? prev.filter(u => u !== user) : [...prev, user]
    );
  };

  const toggleComment = (id) => {
    setCommentingPostId(commentingPostId === id ? null : id);
    setNewComment('');
  };

  const toggleExpandedComment = (id) => {
    setExpandedCommentId(prev => (prev === id ? null : id));
  };

  const handleLike = (id) => {
    if (likedPosts.includes(id)) {
      setLikes(prev => ({
        ...prev,
        [id]: (prev[id] || postsData.find(p => p.id === id)?.likes || 0) - 1
      }));
      setLikedPosts(prev => prev.filter(pid => pid !== id));
    } else {
      setLikes(prev => ({
        ...prev,
        [id]: (prev[id] || postsData.find(p => p.id === id)?.likes || 0) + 1
      }));
      setLikedPosts(prev => [...prev, id]);
    }
  };

  const handleCommentSubmit = (id) => {
    console.log(`投稿 ${id} にコメント: ${newComment}`);
    setNewComment('');
    setCommentingPostId(null);
  };

  const filteredPosts = postsData.filter(post => {
    const matchesCategory =
      selectedCategory === 'すべて' || post.category === selectedCategory;
    const matchesSearch =
      searchTerm === '' ||
      post.bait.includes(searchTerm) ||
      post.spot.includes(searchTerm) ||
      post.fish.includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="rankings-page">
      <div className="rankings-container">

        {/* サブヘッダー */}
        <div className="sub-header">
          <div className="category-bar">
            {categories.map((cat, index) => (
              <button
                key={index}
                className={selectedCategory === cat ? 'active' : ''}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="search-icon" onClick={() => setShowSearchBar(!showSearchBar)}>
            <span className="material-symbols-outlined">search</span>
          </div>
        </div>

        {/* 検索バー */}
        {showSearchBar && (
          <input
            type="text"
            placeholder="キーワードで検索（例: 餌・魚・釣り場）"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="search-bar"
          />
        )}

        {/* 投稿リスト */}
        {filteredPosts.length > 0 ? (
          <div className="post-list-grid">
            {[...filteredPosts].reverse().map((post) => (
              <div className="post-card" key={post.id}>

                {/* 投稿ヘッダー */}
                <div className="post-top">
                  <img src="logo.turiran.PNG" alt="user icon" className="user-icon" />
                  <span className="post-user">{post.user}</span>
                  <button
                    className="follow-button"
                    onClick={() => toggleFollow(post.user)}
                  >
                    {followedUsers.includes(post.user) ? 'フォロー中' : 'フォロー'}
                  </button>
                </div>

                {/* 画像＋オーバーレイ */}
                <div className="image-wrapper">
                  <img src={post.image} className="post-image" />
                  <div className="fish-name-overlay">{post.fish}</div>
                </div>

                {/* アクション */}
                <div className="post-actions">
                  <div className="post-action-left">
                    <span
                      className={`material-symbols-outlined like-icon ${likedPosts.includes(post.id) ? 'liked' : ''}`}
                      onClick={() => handleLike(post.id)}
                    >
                      favorite
                    </span>
                    <span className="like-count">{likes[post.id] ?? post.likes}</span>
                    <span
                      className="comment-icon"
                      onClick={() => toggleComment(post.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.8}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                        />
                      </svg>
                    </span>
                  </div>
                  <div className="post-date">{post.date}</div>
                </div>

                {/* 詳細 */}
                <div className="post-details">
                  <div className="detail-row">
                    <span><strong>サイズ:</strong> {post.size}</span>
                    <span><strong>釣り場:</strong> {post.spot}</span>
                    <span><strong>仕掛け:</strong> {post.bait}</span>
                  </div>

                  <p
                    className={`post-comments ${expandedCommentId === post.id ? 'expanded' : ''}`}
                    onClick={() => toggleExpandedComment(post.id)}
                  >
                    <strong>コメント:</strong>{' '}
                    {Array.isArray(post.comments)
                      ? post.comments.join(" / ")
                      : post.comments}
                  </p>

                  {commentingPostId === post.id && (
                    <div className="comment-input-area">
                      <input
                        type="text"
                        value={newComment}
                        onChange={e => setNewComment(e.target.value)}
                        placeholder="コメントを入力..."
                      />
                      <button onClick={() => handleCommentSubmit(post.id)}>投稿</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-posts">該当する投稿がありません。</p>
        )}
      </div>
    </div>
  );
}

export default Rankings;