import { useContext, useEffect, useState } from 'react';

import { MusicContext } from '../Contexts/MusicContext';

import * as firebase from "firebase/app"
import "firebase/firestore"
import "firebase/storage"

import { playlists as plist } from "../data/Playlist";

const store = firebase.firestore();
const storageref = firebase.storage().ref();

const useAudio = () => {
    const [id, setId] = useState("default");
    const [state, setState] = useContext(MusicContext);
    const cloudPlaylists = store.collection("playlists");
    const cloudSongs = store.collection("songs");

    // on load, creates listener to populate list of playlists from firestore
    useEffect(() => {
        if (state.playlists === plist) {
            setState(state => ({ ...state, playlists: {} }));
            cloudPlaylists.onSnapshot((e) => e.docChanges().forEach((c) => {
                const { doc } = c
                const id = doc.id;
                setState((state) => {
                    const temp = state.playlists;
                    const pl = { ...temp, [id]: doc.data() };
                    return ({ ...state, playlists: pl });
                });
                console.log("FETCHED DATA: ", doc.data());
            }));
        }
    }, []);

    // passes ID of current display playlist
    function passID(newid) {
        console.log("PASS ID ", newid, state.playlists);
        if (newid !== id && state.playlists[newid] !== undefined) {
            setId(newid)
            setDisplayFromId(newid);
        }
    }

    // sets display playlist to id
    function setDisplayFromId(id) {
        console.log("SETTING DISPLAY FROM ID:", id);
        setState(state => ({
            ...state,
            displayinfo: state.playlists[id],
            displaylist: []
        }))
        state.playlists[id].tracks.map((track, i) => {
            track.get().then((doc) => {
                console.log("ADDING TRACK:", doc.data());
                setState(state => ({
                    ...state,
                    displaylist: [...state.displaylist, doc.data()]
                }));
            });
        });
    }

    // handle skip forward button
    function nextSong() {
        console.log(state.repeat);
        if (state.repeat === 'repeatsong') {
            console.log("repeat song");
            changeTrack(state.playlist.id, state.index);
        } else if (state.index < state.tracks.length - 1) {
            console.log("next song");
            changeTrack(state.playlist.id, state.index + 1);
        } else if (state.repeat === 'repeat') {
            console.log("play first song");
            changeTrack(state.playlist.id, 0);
        } else {
            console.log("stop playing");
            setState(state => ({
                ...state,
                index: 0,
                activeSong: state.tracks[0],
                audioSrc: state.tracks[0].src,
                play: false
            }));
            state.audio.src = state.tracks[0].src;
            state.audio.currentTime = 0;
        }
    }

    // handle skip backward button
    function prevSong() {
        console.log("prev song");
        if (state.progress > 10 || state.index === 0) {
            state.audio.currentTime = 0;
        } else if (state.index > 0) {
            changeTrack(state.playlist.id, state.index - 1);
        }
        setState(state => ({ ...state, play: true }));
    }

    // when index is updated, change the active song and 
    // attach new event listeners
    useEffect(() => {
        state.audio.addEventListener('timeupdate', updateProgress);
        state.audio.addEventListener('ended', nextSong);
        return () => {
            state.audio.removeEventListener('timeupdate', updateProgress);
            state.audio.removeEventListener('ended', nextSong);
        };
    }, [state.index])

    // when audioSrc is updated, update the audio src and play
    function changeTrack(n, i) {
        if (state.playlist.id !== n) {
            console.log('change to playlist ' + n);
            setState(state => ({
                ...state,
                tracks: state.displaylist,
                playlist: state.playlists[n],
                index: i,
                activeSong: state.displaylist[i],
                audioSrc: state.displaylist[i].src,
                play: true
            }));
            state.audio.src = state.displaylist[i].src;
            state.audio.currentTime = 0;
            state.audio.play();
        } else {
            console.log('same playlist');
            setState(state => ({
                ...state,
                index: i,
                activeSong: state.tracks[i],
                audioSrc: state.tracks[i].src,
                play: true
            }));
            state.audio.src = state.tracks[i].src;
            state.audio.currentTime = 0;
            state.audio.play();
        }
    }

    // create new playlist
    function createPlaylist(name) {
        const index = Object.keys(state.playlists).length;
        cloudPlaylists.add({
            author: "Shawn Lee",
            name: name,
            index: index,
            tracks: []
        }).then(function(docRef) {
            console.log("NEW PLAYLIST ID: ", docRef.id);
        })
    }

    // add song s to playlist p in firestore
    function addToPlaylist(p, s) {
        var pref = cloudPlaylists.doc(p);
        console.log("ADDING TO PLAYLIST:", p, s);
        pref.update({
            tracks: firebase.firestore.FieldValue.arrayUnion(cloudSongs.doc(s))
        });
    }

    // remove song s from playlist p, both in state and firestore
    function removeFromPlaylist(p, s) {
        var pref = cloudPlaylists.doc(p);
        console.log("REMOVING FROM PLAYLIST:", p, s.id);
        pref.update({
            tracks: firebase.firestore.FieldValue.arrayRemove(cloudSongs.doc(s.id))
        });
        const templist = state.displaylist;
        var index = state.displaylist.indexOf(s);
        templist.splice(index, 1);
        setState(state => ({ ...state, displaylist: templist }))
    }

    // when play is updated, play/pause music accordingly
    useEffect(() => {
        state.play ? state.audio.play() : state.audio.pause();
    }, [state.play])

    // toggle play true/false
    function togglePlay() {
        setState(state => ({ ...state, play: !state.play }));
    }

    // toggle shuffle mode on/off
    function toggleShuffle() {
        if (state.shuffle) {
            console.log('shuffle OFF');
            setState(state => ({ ...state, shuffle: false }));
        } else {
            console.log('shuffle ON');
            setState(state => ({ ...state, shuffle: true }));
        }
    }
    
    // cycle repeat from off / repeat / repeat song
    function setRepeat(mode) {
        console.log('repeat: ' + mode);
        setState(state => ({ ...state, repeat: mode }));
    }

    // update progress in accordance to audio's currentTime
    function updateProgress() {
        const duration = state.audio.duration;
        const currentTime = state.audio.currentTime;
        setState(state => ({
            ...state,
            progress: (currentTime / duration) * 100 || 0,
            starttime: formatTime(currentTime)
        }));
    }

    // handle progress slider input
    function adjustProgress(newProgress) {
        const newTime = state.audio.duration * (newProgress / 100);
        state.audio.currentTime = newTime;
        setState(state => ({ ...state, progress: newProgress / 100 }));
    }

    // format time to m:ss
    function formatTime(time) {
        if (isNaN(time) || time === 0) {
            return '0:00';
        }
        const mins = Math.floor(time / 60);
        const secs = (time % 60).toFixed();
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    return {
        passID,
        nextSong,
        prevSong,
        togglePlay,
        changeTrack,
        adjustProgress,
        toggleShuffle,
        formatTime,
        setRepeat,
        setDisplayFromId,
        addToPlaylist,
        removeFromPlaylist,
        createPlaylist
    }
};

export default useAudio;