import { useGetDimensions } from '../hooks/useGetDimensins';
import Score from '../components/Score';
import Lives from '../components/Lives';
import Video from '../components/Video/Video';
import SnowfallCanvas from '../components/Snowfall/Snowfall';
import { useEffect } from 'react';
import { useAppContext } from '../Context';

const Play = () => {
  const { width, height } = useGetDimensions();
  const { onStartGame } = useAppContext();
  useEffect(() => {
    onStartGame();
  }, []);
  return (
    <div style={{ position: 'relative', width, margin: '0 auto', height }}>
      <>
        <Score />
        <Lives />
        <Video />
        <SnowfallCanvas />
      </>
    </div>
  );
};

export default Play;
