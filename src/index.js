import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import Video from './components/Video/Video';
import {ContextProvider, useAppContext} from './Context';
import SnowfallCanvas from './components/Snowfall/Snowfall';
import Score from './components/Score';
import Lives from './components/Lives';
import {useGetDimensions} from './hooks/useGetDimensins';

function App() {
  const {width, height} = useGetDimensions();
  const {isPlaying, onPlay, score} = useAppContext();
  return (
    <div style={{position: 'relative', width, margin: '0 auto', height}}>
      {isPlaying ? <>
        <Score />
        <Lives />
        <Video />
        <SnowfallCanvas />
      </> : <div style={{background:'blue', height: '100%', fontSize:30}}>
              Score: {score} <br/>
        <button onClick={onPlay}>Play again</button>
      </div>}
    </div>
  );
}

// Create the root and render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>
);
