import { useContext, useEffect, useState } from 'react';
import * as firebase from "firebase/app"
import "firebase/firestore"
import "firebase/storage"

let store

const useCloud = () => {
    const [audioFile, setAudioFile] = useState(null);
    const [artFile, setArtFile] = useState(null);
    const [title, setTitle] = useState("title");
    const [artist, setArtist] = useState("artist");
    const [album, setAlbum] = useState("album");

    function handleUpload(e) {
        const file = e.target.files[0];
        console.log(file);

        const musicRef = firebase.storage().ref('music/' + file.name);

        musicRef.put(file).then(() => {
            const storageRef = firebase.storage().ref('/music');

            storageRef.child(file.name).getMetadata().then(metadata => {
                const url = metadata.downloadURLs[0];
                const messageRef = firebase.database().ref('message');
                messageRef.push({
                    song: url,
                    songName: file.name
                })
            })
        })
    }

    return {
        handleUpload,
        audioFile, setAudioFile,
        artFile, setArtFile,
        title, setTitle,
        artist, setArtist,
        album, setAlbum
    }
}

export { useCloud };

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
store = firebase.firestore()
