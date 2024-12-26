import Score from '../components/Score';
import Lives from '../components/Lives';
import Video from '../components/Video/Video';
import SnowfallCanvas from '../components/Snowfall/Snowfall';
import { useEffect } from 'react';
import { useAppContext } from '../Context';
import Layout from '../components/Layout';

const Play = () => {
  const { onStartGame } = useAppContext();
  useEffect(() => {
    onStartGame();
  }, []);
  return (
    <Layout>
      <Score />
      <Lives />
      <Video />
      <SnowfallCanvas />
    </Layout>
  );
};

export default Play;
