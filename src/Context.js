import {createContext, useState, useContext, useEffect} from 'react';
import {useGetDimensions} from './hooks/useGetDimensins';
import {useNavigate} from 'react-router';

// Create a Context
const Context = createContext();

export const ContextProvider = ({ children }) => {
  const windowDimensions = useGetDimensions();
  const [coordinates, setCoordinates] = useState({x: windowDimensions.width, y: windowDimensions.height});

  const [score, setScore] = useState(0);
  const addScore = () => setScore(prev => prev + 1);

  const [lives, setLives ] = useState(3);
  const subtractLive = () => setLives(prev => prev - 1);

  const [level, setLevel] = useState(1);
  useEffect(() => {
    if(score) setLevel(prev => prev + 1);
  }, [score]);

  const onStartGame = () => {
    setLives(3);
    setScore(0);
  };

  const navigate = useNavigate();

  const stopGame = () => {
    navigate('/results');
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
    level,
    lives,
    onStartGame,
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
