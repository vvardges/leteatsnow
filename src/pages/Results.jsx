import { useAppContext } from '../Context';
import { useGetDimensions } from '../hooks/useGetDimensins';
import { Link } from 'react-router';

const Results = () => {
  const { width, height } = useGetDimensions();
  const { score } = useAppContext();
  return (
    <div style={{ position: 'relative', width, margin: '0 auto', height }}>
      <div style={{ background: 'blue', height: '100%', fontSize: 30 }}>
        <h1>{score}</h1>
        <input type="text" placeholder="your name" />
        <Link to={'/'}>submit</Link>
      </div>
    </div>
  );
};

export default Results;
