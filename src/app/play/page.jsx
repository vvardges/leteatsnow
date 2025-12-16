'use client';

import Score from './components/Score';
import Lives from './components/Lives';
import Video from './components/Video/Video';
import Snowfall from './components/Snowfall';
import { useEffect, useRef } from 'react';
import { useAppContext } from '../context';
import Pause from './components/Pause';

const Page = () => {
  const { onStartGame, paused } = useAppContext();

  useEffect(() => {
    //onStartGame();
  }, []);

  const mouthRef = useRef(null);

  // ----------------------------
  // Handle detected face output
  // ----------------------------
  const handleFaceDetected = ({detections}) => {
    let newX, newY;

    try {
      const { x, y } = detections[0].landmarks[3];
      newX = (1 - x);
      newY = y;
    } catch (e) {
      newX = 0;
      newY = 0;
    }

    mouthRef.current = {
      x: (Math.min(window.innerWidth, 640) * newX),
      y: (480 * newY),
    };
  };

  return (
    <div style={{ position: 'relative', height: 480, width: 640, maxWidth: '100%' }}>
      <Score />
      <Lives />
      <Video onFaceDetected={handleFaceDetected} />
      <Snowfall mouthRef={mouthRef} />
      {paused && <Pause />}
    </div>
  );
};

export default Page;
