import Layout from '../../components/Layout';
import Button from '../../components/Button';
import Box from '../../components/Box';

const Page = () => {
  return (
    <Layout>
      <Box gap={2}>
        <h1>Let eat snow!</h1>
        <Box>
          <Button href="/play">Play</Button>
          <Button href="/leaderboard">Leaderboard</Button>
          <Button href="/hints">Hints</Button>
        </Box>
        @Vke
      </Box>
    </Layout>
  );
};

export default Page;
