import { useAppContext } from '../Context';
import { Link } from 'react-router';
import Layout from '../components/Layout';

const Results = () => {
  const { score } = useAppContext();
  return (
    <Layout>
      <h1>{score}</h1>
      <input type="text" placeholder="your name" />
      <Link to={'/'}>submit</Link>
    </Layout>
  );
};

export default Results;
