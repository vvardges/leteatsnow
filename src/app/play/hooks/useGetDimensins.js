'use client';

import { useEffect, useState } from 'react';

export const useGetDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: 500,
    height: 500,
  });

  useEffect(() => {
    const getDimension = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      return Math.min(Math.min(w, h), 500);
    };
    // Handle resizing of window
    const handleResize = () => {
      const d = getDimension();
      setWindowDimensions({
        width: d,
        height: d,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowDimensions;
};
