import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <nav style={{ padding: '1rem', background: '#eee' }}>
    <Link to="/">Employee</Link> | <Link to="/admin">Admin</Link>
  </nav>
);

export default Header;