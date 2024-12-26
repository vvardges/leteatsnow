import { useEffect, useState } from 'react';

const getDimension = () => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  return Math.min(Math.min(w, h), 500);
};

export const useGetDimensions = () => {
  const d = getDimension();
  const [windowDimensions, setWindowDimensions] = useState({
    width: d,
    height: d,
  });

  useEffect(() => {
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
