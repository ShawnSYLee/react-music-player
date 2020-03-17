import React, { useState } from 'react';
import { playlists as plist } from "../data/Playlist";

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

const MusicContext = React.createContext([{}, () => { }]);

const MusicProvider = (props) => {
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
            thumbs: [],
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

    return (
        <MusicContext.Provider value={[state, setState]}>
            {props.children}
        </MusicContext.Provider>
    );
}

export { MusicContext, MusicProvider };