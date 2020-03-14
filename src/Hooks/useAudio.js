import { useContext, useEffect, useState } from 'react';
import { playlists as plist } from "../data/Playlist";
import { MusicContext } from '../MusicContext';
import * as firebase from "firebase/app"
import "firebase/firestore"
import "firebase/storage"

const store = firebase.firestore()

const useAudio = () => {
    const [id, setId] = useState("default");
    const [state, setState] = useContext(MusicContext);
    const cloudPlaylists = store.collection("playlists");

    useEffect(() => {
        console.log("USEEFFECT IN USEAUDIO");
        if (state.playlists === plist) {
            setState(state => ({ ...state, playlists: {} }));
            cloudPlaylists.onSnapshot((e) => e.docChanges().forEach((c) => {
                const { doc } = c
                const id = doc.id;
                // setLikedsongs(doc.data());
                setState((state) => {
                    const temp = state.playlists;
                    const pl = { ...temp, [id]: doc.data() };
                    return ({ ...state, playlists: pl });
                });
                // console.log("FETCHED DATA: ", doc.data());
            }));
        }
    }, []);

    function passID(newid) {
        console.log("PASS ID ", newid, state.playlists);
        if (newid !== id && state.playlists[newid] !== undefined) {
            setId(newid)
            setDisplayFromId(newid);
        }
    }

    function setDisplayDefault() {
        console.log("SETTING DISPLAY DEFAULT");
        setState(state => ({ ...state, displayinfo: plist["default"], displaylist: plist["default"].tracks }));
    }

    function setDisplayFromId(id) {
        console.log("SETTING DISPLAY FROM ID:", id);
        setState(state => ({ ...state, displayinfo: state.playlists[id], displaylist: [] }))
        state.playlists[id].tracks.map((track, i) => {
            track.onSnapshot((doc) => {
                console.log("adding track:", doc.data());
                setState(state => ({ ...state, displaylist: [...state.displaylist, doc.data()] }));
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
            setState(state => ({ ...state, index: 0, activeSong: state.tracks[0], audioSrc: state.tracks[0].src, play: false }));
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
            setState(state => ({ ...state, tracks: state.displaylist, playlist: state.playlists[n] }));
            setState(state => ({ ...state, index: i, activeSong: state.displaylist[i], audioSrc: state.displaylist[i].src, play: true }));
            state.audio.src = state.displaylist[i].src;
            state.audio.currentTime = 0;
            state.audio.play();
        } else {
            console.log('same playlist');
            setState(state => ({ ...state, index: i, activeSong: state.tracks[i], audioSrc: state.tracks[i].src, play: true }));
            state.audio.src = state.tracks[i].src;
            state.audio.currentTime = 0;
            state.audio.play();
        }
    }

    // when play is updated, play/pause music accordingly
    useEffect(() => {
        state.play ? state.audio.play() : state.audio.pause();
    }, [state.play])

    // toggle play true/false
    function togglePlay() {
        setState(state => ({ ...state, play: !state.play }));
    }

    function toggleShuffle() {
        if (state.shuffle) {
            console.log('shuffle OFF');
            setState(state => ({ ...state, shuffle: false }));
        } else {
            console.log('shuffle ON');
            setState(state => ({ ...state, shuffle: true }));
        }
    }

    function setRepeat(mode) {
        console.log('repeat: ' + mode);
        setState(state => ({ ...state, repeat: mode }));
    }

    // update progress in accordance to audio's currentTime
    function updateProgress() {
        const duration = state.audio.duration;
        const currentTime = state.audio.currentTime;
        setState(state => ({ ...state, progress: (currentTime / duration) * 100 || 0, starttime: formatTime(currentTime) }));
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
        setDisplayDefault,
        setDisplayFromId,
        progress: state.progress,
        activeSong: state.activeSong,
        starttime: state.starttime,
        play: state.play,
        audio: state.audio,
        playlist: state.playlist,
        tracks: state.tracks,
        index: state.index,
        shuffle: state.shuffle,
        repeat: state.repeat,
        playlists: state.playlists,
        displaylist: state.displaylist,
        displayinfo: state.displayinfo,
        playlistplaceholder: state.playlistplaceholder
    }
};

export default useAudio;