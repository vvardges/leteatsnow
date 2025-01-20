import Layout from '../components/Layout';
import Box from '../components/Box';
import Button from '../components/Button';
import { useNavigate } from 'react-router';

const Hints = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <Box>
        <h2>Hints</h2>
        <ul>
          <li>Eat snowflakes to earn points.</li>
          <li>Avoid eating ice blocks.</li>
          <li>Click anywhere on the screen to pause the game.</li>
        </ul>
        <Button onClick={() => navigate('/')}>Back</Button>
      </Box>
    </Layout>
  );
};

export default Hints;
