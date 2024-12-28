import Score from '../components/Score';
import Lives from '../components/Lives';
import Video from '../components/Video/Video';
import Snowfall from '../components/Snowfall';
import { useEffect } from 'react';
import { useAppContext } from '../Context';
import Game from '../components/Game';
import { useGetDimensions } from '../hooks/useGetDimensins';

const Play = () => {
  const { onStartGame } = useAppContext();
  const {width, height} = useGetDimensions();
  useEffect(() => {
    onStartGame();
  }, []);
  return (
    <Game width={width} height={height}>
      <Score />
      <Lives />
      <Video />
      <Snowfall />
    </Game>
  );
};

export default Play;
