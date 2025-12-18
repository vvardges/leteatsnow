import { useAppStore } from '@/app/store/useAppStore';

const Score = () => {
  const score = useAppStore((s) => s.score);
  return (
    <div style={{
      position: 'absolute',
      top: '-35px',
      left: '5px',
      fontSize: '24px',
      zIndex: 10,
      shadow: '0 4px 0 #6d9ac3',
      fontWeight: 500
    }}>
      Score: {score}
    </div>
  );
};

export default Score;
