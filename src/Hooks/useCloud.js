import { useState } from 'react';
import * as firebase from "firebase/app"
import "firebase/firestore"
import "firebase/storage"

const useCloud = () => {
    const [audioFile, setAudioFile] = useState(null);
    const [artFile, setArtFile] = useState(null);
    const [title, setTitle] = useState("title");
    const [artist, setArtist] = useState("artist");
    const [album, setAlbum] = useState("album");



    

    // const derp = cloudPlaylists.get();
    // derp.then((snap) => {
    //     // console.log(snap);
    //     const der = snap.docs[0].data();
    //     // console.log(der);
    // });

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
        album, setAlbum,
    }
}

export { useCloud };

