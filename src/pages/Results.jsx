import { useAppContext } from '../Context';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Input from '../components/Input';
import Box from '../components/Box';

const Results = () => {
  const { score } = useAppContext();
  return (
    <Layout>
      <Box gap={2}>
        <h2>Your Score: {score}</h2>
        <Input type="text" placeholder="Enter Nickname" />
        <Button to={'/'}>Submit</Button>
      </Box>
    </Layout>
  );
};

export default Results;
