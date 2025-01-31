import { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Create a Context
const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const addScore = () => setScore((prev) => prev + 1);

  const [lives, setLives] = useState(3);
  const subtractLive = () => setLives((prev) => prev - 1);

  const [paused, setPaused] = useState(false);

  const [level, setLevel] = useState(1);
  useEffect(() => {
    if (score) setLevel((prev) => prev + 1);
  }, [score]);

  const onStartGame = () => {
    setLives(3);
    setScore(0);
    setPaused(false);
  };

  const router = useRouter();

  const stopGame = () => {
    router.push('/results');
  };

  const onPauseGame = () => {
    setPaused(true);
  };

  const onResume = () => {
    setPaused(false);
  };

  useEffect(() => {
    if (lives < 1) {
      stopGame();
    }
  }, [lives]);

  const onParticleDelete = (type) => {
    switch (type) {
      case 'point':
        return addScore();
      case 'loss':
        return subtractLive();
    }
  };

  const value = {
    onParticleDelete,
    score,
    level,
    lives,
    onStartGame,
    onPauseGame,
    onResume,
    paused,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

// Custom hook for using the context
export const useAppContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useAppContext must be used within a ContextProvider');
  }
  return context;
};
