// src/components/ScrollToTop.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // ページ遷移のたびにスクロール位置をトップに戻す
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;