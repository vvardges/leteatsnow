import {createContext, useState, useContext, useEffect} from 'react';
import {useGetDimensions} from './hooks/useGetDimensins';

const camWidth = 1280;
const camHeight = 1024;
// Create a Context
const Context = createContext();

export const ContextProvider = ({ children }) => {
  const windowDimensions = useGetDimensions();
  const [coordinates, setCoordinates] = useState({x: windowDimensions.width, y: windowDimensions.height});
  const [isPlaying, setIsPlaying] = useState(false);

  const [score, setScore] = useState(0);
  const addScore = () => setScore(prev => prev + 1);

  const [lives, setLives ] = useState(3);
  const subtractLive = () => setLives(prev => prev - 1);

  const startGame = () => {
    setLives(3);
    setScore(0);
    setIsPlaying(true);
  };

  const stopGame = () => {
    setIsPlaying(false);
  };

  useEffect(() => {
    if(lives < 1) {
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
    mouthCoordinates: coordinates,
    setMouthCoordinates: setCoordinates,
    onParticleDelete,
    score,
    lives,
    isPlaying,
    onPlay: startGame
  };

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
};

// Custom hook for using the context
export const useAppContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useAppContext must be used within a ContextProvider');
  }
  return context;
};
