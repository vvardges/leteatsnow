import { useAppStore } from '@/app/store/useAppStore';

const Lives = () => {
  const lives = useAppStore((s) => s.lives);
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
