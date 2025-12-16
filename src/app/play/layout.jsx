'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/app/store/useAppStore';

export default function Layout({ children }) {
  const setSize = useAppStore((s) => s.setSize);
  const size = useAppStore((s) => s.size);

  useEffect(() => {
    const size = Math.min(window.innerWidth, window.innerHeight, 500);
    setSize(size);
  }, [setSize]);

  return (
    <div style={{ position: 'relative', height: size, width: size }}>
      {children}
    </div>
  );
}