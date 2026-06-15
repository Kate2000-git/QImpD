import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="global-footer">
      <p style={{ marginBottom: '15px' }}>
        *Отказ от ответственности: результаты не гарантируются, могут не быть постоянными и зависят от индивидуальных особенностей.
      </p>
      <p style={{ marginBottom: '15px' }}>
        ©2019 - 2026 Анна Неверова Нутрициология 
      </p>
      <div className="footer-links">
        <Link to="/privacy">Политика конфиденциальности</Link> | 
      </div>
    </footer>
  );
}

export default Footer;