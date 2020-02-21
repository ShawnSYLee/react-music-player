import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import MusicPlayer from "./MusicPlayer";
import { MusicProvider } from "./MusicContext";

function App() {
  return (
    <MusicProvider>
      <div className="App">
        <MusicPlayer />
      </div>
    </MusicProvider>

  );
}

export default App;
