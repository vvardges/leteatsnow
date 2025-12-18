'use client';

import Layout from '../../components/Layout';
import Box from '../../components/Box';
import { track } from '../services';
import { useEffect } from 'react';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  useEffect(() => {
    track('page_view', { page: 'hints' });
  }, []);

  const handleClick = () => {
    track('hints_back_clicked');
    router.push('/');
  };

  return (
    <Layout>
      <Box>
        <h2>Hints</h2>
        <ul>
          <li>Eat snowflakes to earn points.</li>
          <li>Avoid eating ice blocks.</li>
          <li>Click anywhere on the screen to pause the game.</li>
        </ul>
        <Button onClick={handleClick}>Back</Button>
      </Box>
    </Layout>
  );
};

export default Page;
