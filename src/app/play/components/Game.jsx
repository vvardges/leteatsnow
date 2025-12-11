'use client';

const Game = ({ children, width, height }) => {
  return (
    <div style={{
      position: 'relative',
      width: `${width}px`,
      height: `${height}px`
    }}>
      {children}
    </div>
  );
};

export default Game;
