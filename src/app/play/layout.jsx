'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/app/store/useAppStore';
import { useRouter } from 'next/navigation';

export default function Layout({ children }) {
  const router = useRouter();

  const setSize = useAppStore((s) => s.setSize);
  const size = useAppStore((s) => s.size);
  const lives = useAppStore((s) => s.lives);

  useEffect(() => {
    if (lives <= 0) {
      router.replace('/results');
    }
  }, [lives, router]);

  useEffect(() => {
    const newSize = Math.min(window.innerWidth, window.innerHeight, size);
    setSize(newSize);
  }, [setSize, size]);

  return (
    <div style={{ position: 'relative', height: size, width: size, background: 'black' }}>
      {children}
    </div>
  );
}