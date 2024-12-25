import {useEffect, useState} from 'react';

export const useGetDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: 500,
    height: 500
  });

  useEffect(() => {
    // Handle resizing of window
    const handleResize = () => {
      // setWindowDimensions({
      //   width: 1000,
      //   height: 500
      // });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowDimensions;
};