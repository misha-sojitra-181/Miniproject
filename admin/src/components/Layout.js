import React from 'react';
import Sidebar from './sidebar';

function Layout({ children }) { 
  return (
    <div className="layout-container" style={{ display: 'flex' }}>
      <Sidebar /> 
      <div className="content" style={{ flex: 1, padding: '20px' }}>
        {children} 
      </div>
    </div>
  );
}

export default Layout;
