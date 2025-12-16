'use client';

import Layout from '../../components/Layout';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Box from '../../components/Box';
import { useState } from 'react';
import { submitScore } from '../services';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/app/store/useAppStore';

const Page = () => {
  const { push } = useRouter();
  const score = useAppStore((s) => s.score);
  const resetGame = useAppStore((s) => s.resetGame);
  const [name, setName] = useState('');

  const handleBack = () => {
    resetGame();
    push('/');
  };

  const handleSubmit = () => {
    submitScore(name, score);
    resetGame();
    push('/leaderboard');
  };

  return (
    <Layout>
      <Box gap={2}>
        <h2>Your Score: {score}</h2>
        <Input
          type="text"
          placeholder="Enter Nickname"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <Button disabled={!name} onClick={handleSubmit}>
          Submit
        </Button>
        <Button onClick={handleBack}>
          Back to Home
        </Button>
      </Box>
    </Layout>
  );
};

export default Page;
