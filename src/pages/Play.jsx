import Score from '../components/Score';
import Lives from '../components/Lives';
import Video from '../components/Video/Video';
import Snowfall from '../components/Snowfall';
import { useEffect, useRef } from 'react';
import { useAppContext } from '../Context';
import Game from '../components/Game';
import { useGetDimensions } from '../hooks/useGetDimensins';
import Pause from '../components/Pause';

const Play = () => {
  const { onStartGame, paused } = useAppContext();
  const { width, height } = useGetDimensions();
  useEffect(() => {
    onStartGame();
  }, []);
  const canvasRef = useRef(null);
  return (
    <Game width={width} height={height}>
      <Score />
      <Lives />
      <Video canvasRef={canvasRef} />
      <Snowfall canvasRef={canvasRef} />
      {paused && <Pause />}
    </Game>
  );
};

export default Play;
