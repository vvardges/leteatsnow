import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import {ContextProvider} from './Context';
import {BrowserRouter,  Route, Routes} from 'react-router-dom';

import Home from './pages/Home';
import Play from './pages/Play';
import Results from './pages/Results';
import Leaderboard from './pages/Leaderboard';

function App() {
    return (
        <div className="App">
            {/* Define your Routes here */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/play" element={<Play />} />
                <Route path="/results" element={<Results />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
            </Routes>
        </div>
    );
}

// Create the root and render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
      <ContextProvider>
          <App />
      </ContextProvider>
      </BrowserRouter>
  </React.StrictMode>
);
