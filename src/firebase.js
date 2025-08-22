// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// あなたの Firebase プロジェクトの設定
const firebaseConfig = {
  apiKey: "AIzaSyCCdnqH4qKRO7QPqZvIl6ITucZlr1cE0FQ",
  authDomain: "tsuriran.firebaseapp.com",
  projectId: "tsuriran",
  storageBucket: "tsuriran.firebasestorage.app",
  messagingSenderId: "879400706811",
  appId: "1:879400706811:web:c02a4d5fba65c8c0d0065e",
  measurementId: "G-NW6QJLP4E4"
};

// Firebase 初期化
const app = initializeApp(firebaseConfig);

// Firestore を使う準備（←これが重要）
const db = getFirestore(app);

export { db };