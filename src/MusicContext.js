import React, { useState, useEffect } from 'react';
import { playlists } from "./data/Playlist";

import * as firebase from "firebase/app"
import "firebase/firestore"
import "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDqeeErNO_5d6uk0xUEooRiiMOGRQra6z0",
  authDomain: "reactmusicapp-sylee2k.firebaseapp.com",
  databaseURL: "https://reactmusicapp-sylee2k.firebaseio.com",
  projectId: "reactmusicapp-sylee2k",
  storageBucket: "reactmusicapp-sylee2k.appspot.com",
  messagingSenderId: "133469247508",
  appId: "1:133469247508:web:660a0e1399b3f236fbef01"
};

firebase.initializeApp(firebaseConfig)
const store = firebase.firestore()

const MusicContext = React.createContext([{}, () => { }]);

const MusicProvider = (props) => {
  const cloudPlaylists = store.collection("playlists");
  const cloudSongs = store.collection("songs");

  const [state, setState] = useState({
    playlists: playlists,
    tracks: playlists["fCgiiouoAYWMsCWzRxVa"].tracks,
    index: -1,
    audioSrc: playlists["fCgiiouoAYWMsCWzRxVa"].tracks[0].src,
    audio: new Audio(playlists["fCgiiouoAYWMsCWzRxVa"].tracks[0]),
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
    playlist: playlists["fCgiiouoAYWMsCWzRxVa"],
    shuffle: false,
    repeat: 'none'
  });

  const [playlistlist, setPlaylistlist] = useState()
  const [likedsongs, setLikedsongs] = useState(0);
  const [tracklist, setTracklist] = useState([]);
  useEffect(() => {
    // const snapshot = cloudPlaylists.doc("fCgiiouoAYWMsCWzRxVa").get();
    // snapshot.then((snap) => {
    //   likedsongs = snap.data();
    //   console.log(likedsongs);
    // });

    const snapshot = cloudPlaylists;
    snapshot.onSnapshot((e) => e.docChanges().forEach((c) => {
      const {doc} = c
      const id = doc.id;
      setLikedsongs(doc.data());
      setPlaylistlist(playlistlist => ({ ...playlistlist, [id]: doc.data()}));
      console.log("FETCHED DATA: ", doc.data());
    }));
  }, []);

  useEffect(() => {
    console.log("LIKEDSONGS: ", likedsongs);
    if (likedsongs !== 0) {
      setTracklist(tracklist => []);
      likedsongs.tracks.map((track, i) => {
        track.onSnapshot((doc) => {
          console.log("adding track:", doc.data());
          setTracklist(tracklist => [...tracklist, doc.data()]);
        });
      });
    }
  }, [likedsongs]);

  useEffect(() => {
    console.log("tracklist:", tracklist);
    if (tracklist.length > 0) {
      setState({
        playlists: playlistlist,
        tracks: tracklist,
        index: -1,
        audioSrc: tracklist[0].src,
        audio: new Audio(tracklist[0]),
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
        playlist: likedsongs,
        shuffle: false,
        repeat: 'none'
      });
    }
    
  }, [tracklist]);

  // useEffect(() => {
  //   console.log("STATE:", state);
  // }, [state]);


  return (
    <MusicContext.Provider value={[state, setState]}>
      {props.children}
    </MusicContext.Provider>
  );
}

export { MusicContext, MusicProvider };