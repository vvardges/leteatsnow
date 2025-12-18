'use client';

import Score from './components/Score';
import Lives from './components/Lives';
import Video from './components/Video';
import Snowfall from './components/Snowfall';
import { useRef, useEffect } from 'react';
import Pause from '@/app/play/components/Pause';
import { useAppStore } from '@/app/store/useAppStore';
import { track } from '../services';

const Page = () => {
  const size = useAppStore((s) => s.size);

  useEffect(() => {
    track('game_started', { timestamp: Date.now() });
  }, []);
  // ----------------------------
  // Handle detected face output
  // ----------------------------
  const mouthRef = useRef(null);
  const handleFaceDetected = ({ detections }) => {
    if(detections.length === 0) return;

    //setIsMouthDetected(true);

    let newX, newY;

    try {
      const { x, y } = detections[0].landmarks[3];
      newX = 1 - x;
      newY = y;
    } catch (e) {
      newX = -1000;
      newY = -1000;
    }

    mouthRef.current = {
      x: size * newX,
      y: size * newY,
      paused: mouthRef?.current?.paused || false
    };
  };

  return (
    <>
      <Score />
      <Lives />
      <Video onFaceDetected={handleFaceDetected} />
      <Snowfall mouthRef={mouthRef} />
      <Pause mouthRef={mouthRef} />
    </>
  );
};

export default Page;
