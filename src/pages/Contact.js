import React, { useState } from 'react';
import './Contact.css';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('お問い合わせを受け付けました！ありがとうございます😊');
    // 本番ではここでフォーム送信処理を書く（例: fetch API）
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact-wrapper">
      <h1>お問い合わせフォーム</h1>
      <form onSubmit={handleSubmit} className="contact-form">
        <label>お名前</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>メールアドレス</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>お問い合わせ内容</label>
        <textarea name="message" value={formData.message} onChange={handleChange} required />

        <button type="submit">送信</button>
      </form>
    </div>
  );
}