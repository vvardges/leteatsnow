import { useAppContext } from '../../context';

const Score = () => {
  const { score } = useAppContext();
  return (
    <div style={{
      position: 'absolute',
      top: '10px',
      left: '5px',
      fontSize: '24px',
      zIndex: 10,
      color: 'white'
    }}>
      Score: {score}
    </div>
  );
};

export default Score;
