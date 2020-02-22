import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import Main from "./Main";
import { MusicProvider } from "./MusicContext";
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <MusicProvider>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </MusicProvider>
    </div>
  );
}

export default App;
