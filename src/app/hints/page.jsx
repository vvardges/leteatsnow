'use client';

import Layout from '../../components/Layout';
import Box from '../../components/Box';
import Link from 'next/link';
import { track } from '../services';
import { useEffect } from 'react';

const Page = () => {
  useEffect(() => {
    track('page_view', { page: 'hints' });
  }, []);

  return (
    <Layout>
      <Box>
        <h2>Hints</h2>
        <ul>
          <li>Eat snowflakes to earn points.</li>
          <li>Avoid eating ice blocks.</li>
          <li>Click anywhere on the screen to pause the game.</li>
        </ul>
        <Link href="/" onClick={() => track('hints_back_clicked')}>Back</Link>
      </Box>
    </Layout>
  );
};

export default Page;
