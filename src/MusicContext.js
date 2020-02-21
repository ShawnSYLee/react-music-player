import React, { useState } from 'react';
import Playlist from "./Playlist";

const MusicContext = React.createContext([{}, ()=> {}]);

const MusicProvider = (props) => {
  const [state, setState] = useState({
    tracks: Playlist,
    index: 0,
    audioSrc: Playlist[0].src,
    audio: new Audio(Playlist[0]),
    play: false,
    progress: 0.0,
    activeSong: Playlist[0],
    starttime: '0:00',
    color: "#ffffff"
  });

  return (
    <MusicContext.Provider value={[state, setState]}>
      {props.children}
    </MusicContext.Provider>
  );
}

export { MusicContext, MusicProvider };