'use client';

import Layout from '../components/Layout';
import Box from '../components/Box';
import Link from 'next/link';
import { track } from './services';
import { useEffect } from 'react';

const Page = () => {
  useEffect(() => {
    track('page_view', { page: 'home' });
  }, []);

  const handleNavigation = (destination) => {
    track('navigation_click', { from: 'home', to: destination });
  };

  return (
    <Layout>
      <Box gap={2}>
        <h1>Let eat snow!</h1>
        <Box>
          <Link href="/play" onClick={() => handleNavigation('play')}>Play</Link>
          <Link href="/leaderboard" onClick={() => handleNavigation('leaderboard')}>Leaderboard</Link>
          <Link href="/hints" onClick={() => handleNavigation('hints')}>Hints</Link>
        </Box>
        @Vke
      </Box>
    </Layout>
  );
};

export default Page;
