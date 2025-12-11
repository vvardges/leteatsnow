import Layout from '../../components/Layout';
import Box from '../../components/Box';
import Link from 'next/link';

const Page = () => {
  return (
    <Layout>
      <Box>
        <h2>Hints</h2>
        <ul>
          <li>Eat snowflakes to earn points.</li>
          <li>Avoid eating ice blocks.</li>
          <li>Click anywhere on the screen to pause the game.</li>
        </ul>
        <Link href="/">Back</Link>
      </Box>
    </Layout>
  );
};

export default Page;
