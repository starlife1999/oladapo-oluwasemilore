import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function PCLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    onResize();
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // If we move from mobile -> desktop, ensure drawer is closed.
  useEffect(() => {
    if (!isMobile) setSidebarOpen(false);
  }, [isMobile]);

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        overflow: 'hidden',
        background: '#0f172a',
      }}
    >
      {/* Desktop sidebar (>= 768px) */}
      {(!isMobile) && (
        <div
          style={{
            flexShrink: 0,
            width: 220,
            height: '100vh',
            overflowY: 'auto',
          }}
        >
          <Sidebar onNavigate={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Mobile hamburger (< 768px) */}
      {isMobile && (
        <button
          onClick={() => setSidebarOpen(true)}
          style={{
            position: 'fixed',
            top: 12,
            left: 12,
            zIndex: 120,
            width: 44,
            height: 44,
            borderRadius: 12,
            border: '1px solid #334155',
            background: '#080d18',
            color: '#f8fafc',
            fontSize: 20,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label="Open sidebar"
        >
          ☰
        </button>
      )}

      {/* Mobile backdrop */}
      {isMobile && sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 110,
            background: 'rgba(0,0,0,0.55)',
          }}
        />
      )}

      {/* Mobile sidebar overlay */}
      {isMobile && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            height: '100vh',
            zIndex: 115,
            width: 220,
            transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
            transition: 'transform 180ms ease',
            overflowY: 'auto',
          }}
          aria-hidden={!sidebarOpen}
        >
          <Sidebar onNavigate={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Main content */}
      <main style={{ flex: 1, overflowY: 'auto' }}>
        <Outlet />
      </main>
    </div>
  );
}

