import { useAppContext } from '../../context';

const Lives = () => {
  const { lives } = useAppContext();
  return (
    <div style={{
      position: 'absolute',
      top: '10px',
      right: '5px',
      fontSize: '24px',
      zIndex: 10,
      color: 'white'
    }}>
      Lives: {lives}
    </div>
  );
};

export default Lives;
