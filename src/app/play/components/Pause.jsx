import Button from '../../../components/Button';
import { useRouter } from 'next/navigation';
import Box from '../../../components/Box';
import { useAppStore } from '@/app/store/useAppStore';
import { track } from '@/app/services';
import { useEffect } from 'react';

const Pause = ({mouthRef}) => {
  const onResume = useAppStore(s => s.onResume);
  const paused = useAppStore(s => s.paused);
  const onPause = useAppStore(s => s.onPause);

  const { push } = useRouter();

  useEffect(() => {
    track('game_paused');
  }, []);

  const handleResume = () => {
    track('game_resumed');
    mouthRef.current.paused = false;
    onResume();
  };

  const handleHome = () => {
    track('game_quit', { from: 'pause' });
    push('/');
  };

  const handlePause = () => {
    if(mouthRef.current) mouthRef.current.paused = true;
    onPause();
  };

  return paused ? (
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
            <Button onClick={handleResume}>Resume</Button>
            <Button onClick={handleHome}>Home</Button>
          </Box>
        </div>
      ) : (
        <div style={{position: 'absolute', bottom: '-35px', left:0,  zIndex: 10, width: '100%'}}>
          <button
            onClick={handlePause}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: 'black',
              cursor: 'pointer',
              fontSize: '20px',
              fontFamily: 'Orbitron, serif',
              fontWeight: 500,
              width: '100%',
              textAlign: 'center',
              shadow: '0 4px 0 #6d9ac3'
          }}
          >
            click here to pause the game
          </button>
        </div>
      );
};

export default Pause;
