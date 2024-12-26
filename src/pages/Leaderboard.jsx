import { Link } from 'react-router';
import Layout from '../components/Layout';

const Results = () => {
  return (
      <Layout>
        <ul>
          <li>Bob</li>
          <li>John</li>
          <li>Alice</li>
          <li>Stop</li>
          <li>Hop</li>
        </ul>
        <Link to="/">Home</Link>
      </Layout>
  );
};

export default Results;
