import Layout from '../components/Layout';
import { useEffect, useState } from 'react';
import { getTopScores } from '../services';
import Box from '../components/Box';
import Button from '../components/Button';
import { useNavigate } from 'react-router';

const Results = () => {
  const navigate = useNavigate();
  const [scores, setScores] = useState([]);
  useEffect(() => {
    getTopScores().then((scores) => setScores(scores));
  }, []);

  if (!scores.length) return null;

  return (
    <Layout>
      <Box>
        <h2>Leaderboard</h2>
        <ol>
          {scores.map(({ name, score }, index) => (
            <li key={index}>
              {`
                ${name}
                ${'.'.repeat((20 - name.length) * 3)}
                ${score}
              `}
            </li>
          ))}
        </ol>
        <Button onClick={() => navigate('/')}>Home</Button>
      </Box>
    </Layout>
  );
};

export default Results;
