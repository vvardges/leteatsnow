import Layout from '../components/Layout';
import Box from '../components/Box';
import Link from 'next/link';

const Page = () => {
  return (
    <Layout>
      <Box gap={2}>
        <h1>Let eat snow!</h1>
        <Box>
          <Link href="/play">Play</Link>
          <Link href="/leaderboard">Leaderboard</Link>
          <Link href="/hints">Hints</Link>
        </Box>
        @Vke
      </Box>
    </Layout>
  );
};

export default Page;
