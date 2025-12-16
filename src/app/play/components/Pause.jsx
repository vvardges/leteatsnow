import Button from '../../../components/Button';
import { useRouter } from 'next/navigation';
import Box from '../../../components/Box';
import { useAppStore } from '@/app/store/useAppStore';

const Pause = () => {
  const onResume = useAppStore(s => s.onResume);
  const { push } = useRouter();

  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 10,
      color: 'white',
      width: '310px',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      borderRadius: '40px',
      textAlign: 'center',
      padding: '60px',
      boxSizing: 'border-box'
    }}>
      <Box>
        <h2>Let eat snow!</h2>
        <Button onClick={onResume}>Resume</Button>
        <Button onClick={() => push('/')}>Home</Button>
      </Box>
    </div>
  );
};

export default Pause;
