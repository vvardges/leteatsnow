import { Link } from 'react-router';
import Layout from '../components/Layout';

const Home = () => {
  return (
      <Layout>
        Let eat snow <br />
        <div>
            <Link to="/play">Play</Link>
            <br />
            <Link to="/leaderboard">Leaderboard</Link>
        </div>
        <br />
        @Vke
      </Layout>
  );
};

export default Home;
