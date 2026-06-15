import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="global-header">
      <Link to="/" className="logo-container">
        <span className="logo-name">Анна Неверова</span>
        <span className="logo-sub">Нутрициолог</span>
      </Link>
      
      <nav className="nav-links">
        <Link to="/">Главная</Link>
        <Link to="/services">Услуги</Link>
        <Link to="/recipes">Рецепты</Link>
        <Link to="/blog">Блог</Link>
        <Link to="/contacts">Контакты</Link>
      </nav>
    </header>
  );
}

export default Header;