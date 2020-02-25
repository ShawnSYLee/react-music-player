import React, { useState } from 'react';
import { tracks, info, playlists } from "./data/Playlist";

const MusicContext = React.createContext([{}, () => { }]);

const MusicProvider = (props) => {
  const [state, setState] = useState({
    playlists: playlists,
    tracks: playlists["liked-songs"].tracks,
    index: -1,
    audioSrc: playlists["liked-songs"].tracks[0].src,
    audio: new Audio(playlists["liked-songs"].tracks[0]),
    play: false,
    progress: 0.0,
    activeSong: {
      id: 'placeholder',
      src: '',
      cover: '',
      title: 'Title',
      artist: ['Artist'],
      album: 'Album'
    },
    starttime: '0:00',
    color: "#ffffff",
    playlist: playlists["liked-songs"],
    playlistInfo: playlists["liked-songs"].info,
    shuffle: false,
    repeat: 'none'
  });

  return (
    <MusicContext.Provider value={[state, setState]}>
      {props.children}
    </MusicContext.Provider>
  );
}

export { MusicContext, MusicProvider };