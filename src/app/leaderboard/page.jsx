'use client';

import Layout from '../../components/Layout';
import { useEffect, useState } from 'react';
import { getTopScores, track } from '../services';
import Box from '../../components/Box';
import Button from '../../components/Button';
import { useRouter } from 'next/navigation';

const Results = () => {
  const { push } = useRouter();
  const [scores, setScores] = useState([]);
  useEffect(() => {
    track('page_view', { page: 'leaderboard' });
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
        <Button onClick={() => {
          track('leaderboard_back_clicked');
          push('/');
        }}>Back</Button>
      </Box>
    </Layout>
  );
};

export default Results;
