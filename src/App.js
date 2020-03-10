import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import { MusicProvider } from "./MusicContext";
import { ThemeProvider } from "./ThemeContext";
import { BrowserRouter } from 'react-router-dom';
import Main from "./Main";

function App() {
  return (
    <div className="App">
      <MusicProvider>
        <ThemeProvider>
          <BrowserRouter>
            <Main />
          </BrowserRouter>
        </ThemeProvider>
      </MusicProvider>
    </div>
  );
}

export default App;
