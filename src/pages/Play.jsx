import Score from '../components/Score';
import Lives from '../components/Lives';
import Video from '../components/Video/Video';
import Snowfall from '../components/Snowfall';
import { useEffect } from 'react';
import { useAppContext } from '../Context';
import Game from '../components/Game';

const Play = () => {
  const { onStartGame } = useAppContext();
  useEffect(() => {
    onStartGame();
  }, []);
  return (
    <Game width={500} height={500}>
      <Score />
      <Lives />
      <Video />
      <Snowfall />
    </Game>
  );
};

export default Play;
