import Layout from '../components/Layout';
import Button from '../components/Button';
import Box from '../components/Box';
import { useNavigate } from 'react-router';

const Home = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <Box gap={2}>
        <h1>Let eat snow!</h1>
        <Box>
          <Button onClick={() => navigate('/play')}>Play</Button>
          <Button onClick={() => navigate('/leaderboard')}>Leaderboard</Button>
        </Box>
        @Vke
      </Box>
    </Layout>
  );
};

export default Home;
