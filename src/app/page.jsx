'use client';

import Layout from '../components/Layout';
import Box from '../components/Box';
import { track } from './services';
import { useEffect } from 'react';
import Button from '../components/Button';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  useEffect(() => {
    track('page_view', { page: 'home' });
  }, []);

  const handleNavigation = (destination) => {
    track('navigation_click', { from: 'home', to: destination }).then(
      () => router.push(`/${destination}`)
    );
  };

  return (
    <Layout>
      <Box gap={2}>
        <h1>Let eat snow!</h1>
        <Box>
          <Button onClick={() => handleNavigation('play')}>Play</Button>
          <Button onClick={() => handleNavigation('leaderboard')}>Leaderboard</Button>
          <Button onClick={() => handleNavigation('hints')}>Hints</Button>
          <Button onClick={() => handleNavigation('privacy')}>Privacy</Button>
        </Box>
        @Vke
      </Box>
    </Layout>
  );
};

export default Page;
