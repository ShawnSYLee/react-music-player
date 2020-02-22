import React, { useState } from 'react';
import Sound from 'react-sound';
import { tracks, info } from "./Playlist";

const MusicContext = React.createContext([{}, () => { }]);

const MusicProvider = (props) => {
  const [state, setState] = useState({
    tracks: tracks,
    index: 0,
    audioSrc: tracks[0].src,
    audio: new Audio(tracks[0]),
    play: false,
    progress: 0.0,
    activeSong: tracks[0],
    starttime: '0:00',
    color: "#ffffff",
    playlist: info
  });

  return (
    <MusicContext.Provider value={[state, setState]}>
      {props.children}
    </MusicContext.Provider>
  );
}

export { MusicContext, MusicProvider };