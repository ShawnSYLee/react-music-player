import { useContext, useEffect } from 'react';
import { MusicContext } from '../MusicContext';
import { playlists } from '../data/Playlist';

const useAudio = () => {
    const [state, setState] = useContext(MusicContext);

    // handle skip forward button
    function nextSong() {
        console.log(state.repeat);
        if (state.repeat === 'repeatsong') {
            console.log("repeat song");
            changeTrack(state.index);
        } else if (state.index < state.tracks.length - 1) {
            console.log("next song");
            changeTrack(state.index + 1);
        } else if (state.repeat === 'repeat') {
            console.log("play first song");
            changeTrack(0);
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
            changeTrack(state.index - 1);
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
    function changeTrack(i) {
        setState(state => ({ ...state, index: i, activeSong: state.tracks[i], audioSrc: state.tracks[i].src, play: true }));
        state.audio.src = state.tracks[i].src;
        state.audio.currentTime = 0;
        state.audio.play();
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
        nextSong,
        prevSong,
        togglePlay,
        changeTrack,
        adjustProgress,
        toggleShuffle,
        formatTime,
        setRepeat,
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
        playlistInfo: state.playlistInfo,
        playlists: state.playlists
    }
};

export default useAudio;