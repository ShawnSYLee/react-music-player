import { useContext, useEffect } from 'react';
import { MusicContext } from '../MusicContext';

const useAudio = () => {
    const [state, setState] = useContext(MusicContext);

    // handle skip forward button
    function nextSong() {
        console.log("next song");
        if (state.index < state.tracks.length - 1) {
            setState(state => ({ ...state, play: true }));
            changeTrack(state.index + 1);
        } else {
            setState(state => ({ ...state, play: false }));
            changeTrack(0);
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

    function setPlayMode(mode) {
        if (state.mode === mode) {
            console.log('play mode: normal');
            setState(state => ({ ...state, mode: 'normal'}));
        } else {
            console.log('play mode: ' + mode);
            setState(state => ({ ...state, mode: mode}));
        }
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
        setPlayMode,
        formatTime,
        progress: state.progress,
        activeSong: state.activeSong,
        starttime: state.starttime,
        play: state.play,
        audio: state.audio,
        playlist: state.playlist,
        tracks: state.tracks,
        index: state.index,
        mode: state.mode
    }
};

export default useAudio;