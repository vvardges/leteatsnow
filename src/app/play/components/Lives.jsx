import { useAppStore } from '@/app/store/useAppStore';

const Lives = () => {
  const lives = useAppStore((s) => s.lives);
  return (
    <div style={{
      position: 'absolute',
      top: '-35px',
      right: '5px',
      fontSize: '24px',
      zIndex: 10,
      shadow: '0 4px 0 #6d9ac3',
      fontWeight: 500
    }}>
      Lives: {lives}
    </div>
  );
};

export default Lives;
