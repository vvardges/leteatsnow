import { useGetDimensions } from '../hooks/useGetDimensins';
import { Link } from 'react-router';

const Home = () => {
  const { width, height } = useGetDimensions();
  return (
    <div style={{ position: 'relative', width, margin: '0 auto', height }}>
      <div style={{ background: 'blue', height: '100%', fontSize: 30 }}>
        Let eat snow <br />
        <Link to="/play">Play</Link>
        <br />
        <Link to="/leaderboard">Leaderboard</Link>
        <br />
        @Vke
      </div>
    </div>
  );
};

export default Home;
