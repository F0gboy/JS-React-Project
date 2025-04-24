import React from 'react';

function Header({ username }) {
  return (
    <header style={{ padding: '1rem', background: '#f4f4f4' }}>
      <h2>Social Media App</h2>
      {username && <p>Welcome, {username} 👋</p>}
    </header>
  );
}

export default Header;
