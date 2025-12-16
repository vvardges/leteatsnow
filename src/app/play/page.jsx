'use client';

import Score from './components/Score';
import Lives from './components/Lives';
import Video from './components/Video';
import Snowfall from './components/Snowfall';
import { useRef } from 'react';
import Pause from '@/app/play/components/Pause';
import { useAppStore } from '@/app/store/useAppStore';

const Page = () => {
  const paused = useAppStore(s => s.paused);
  const size = useAppStore(s => s.size);

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
      x: size * newX,
      y: size * newY,
    };
  };

  return (
    <>
      <Score />
      <Lives />
      <Video onFaceDetected={handleFaceDetected} />
      <Snowfall mouthRef={mouthRef} />
      {paused && <Pause />}
    </>
  );
};

export default Page;
