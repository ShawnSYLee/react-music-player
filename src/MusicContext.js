import React, { useState } from 'react';
import { tracks, info } from "./data/Playlist";

const MusicContext = React.createContext([{}, () => { }]);

const MusicProvider = (props) => {
  const [state, setState] = useState({
    tracks: tracks,
    index: -1,
    audioSrc: tracks[0].src,
    audio: new Audio(tracks[0]),
    play: false,
    progress: 0.0,
    activeSong: {
      src: '',
      cover: '',
      title: 'Title',
      artist: ['Artist'],
      album: 'Album'
    },
    starttime: '0:00',
    color: "#ffffff",
    playlist: info,
    mode: 'normal'
  });

  return (
    <MusicContext.Provider value={[state, setState]}>
      {props.children}
    </MusicContext.Provider>
  );
}

export { MusicContext, MusicProvider };