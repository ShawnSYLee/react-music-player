import React, { useState, useEffect } from 'react';
import { playlists as plist } from "./data/Playlist";

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
    // let playlists = plist;
    // initialize to a placeholder state
    const [state, setState] = useState({
        playlistplaceholder: plist["default"],
        playlists: plist,
        tracks: plist["default"].tracks,
        index: -1,
        audioSrc: plist["default"].tracks[0].src,
        audio: new Audio(plist["default"].tracks[0]),
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
        playlist: plist["default"],
        displayinfo: plist["default"],
        displaylist: plist["default"].tracks,
        shuffle: false,
        repeat: 'none'
    });
    const cloudPlaylists = store.collection("playlists");
    const cloudSongs = store.collection("songs");

    const [playlistlist, setPlaylistlist] = useState(null)
    // const [likedsongs, setLikedsongs] = useState(0);
    // const [tracklist, setTracklist] = useState([]);

    
    // useEffect(() => {
    //     console.log("USEEFFECT IN MUSICCONTEXT");
    //     setState(state => ({ ...state, playlists: {} }));
    //     cloudPlaylists.onSnapshot((e) => e.docChanges().forEach((c) => {
    //         const { doc } = c
    //         const id = doc.id;
    //         // setLikedsongs(doc.data());
    //         setState((state) => {
    //             const temp = state.playlists;
    //             const pl = { ...temp, [id]: doc.data() };     
    //             return ({ ...state, playlists: pl });
    //         });
    //         console.log("FETCHED DATA: ", doc.data());
    //     }));
    // }, []);
    
    // useEffect(() => {
    //     console.log("tracklist:", tracklist);
    //     if (tracklist.length > 0) {
    //         setState({
    //             playlists: playlistlist,
    //             tracks: tracklist,
    //             index: -1,
    //             audioSrc: tracklist[0].src,
    //             audio: new Audio(tracklist[0]),
    //             play: false,
    //             progress: 0.0,
    //             activeSong: {
    //                 id: 'placeholder',
    //                 src: '',
    //                 cover: '',
    //                 title: 'Title',
    //                 artist: ['Artist'],
    //                 album: 'Album'
    //             },
    //             starttime: '0:00',
    //             color: "#ffffff",
    //             playlist: likedsongs,
    //             shuffle: false,
    //             repeat: 'none'
    //         });
    //     }

    // }, [tracklist]);

    // useEffect(() => {
    //     console.log("playlists:", playlists);
    //     if (playlistlist !== null) {
    //         setState({
    //             ...state,
    //             playlists: playlistlist,
    //         });
    //     }
    // }, [playlistlist]);

    // useEffect(() => {
    //   console.log("STATE:", state);
    // }, [state]);

    // const snapshot = cloudPlaylists.doc("fCgiiouoAYWMsCWzRxVa").get();
    // snapshot.then((snap) => {
    //   likedsongs = snap.data();
    //   console.log(likedsongs);
    // });



    return (
        <MusicContext.Provider value={[state, setState]}>
            {props.children}
        </MusicContext.Provider>
    );
}

export { MusicContext, MusicProvider };