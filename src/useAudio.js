import { useContext, useEffect } from 'react';
import { MusicContext } from './MusicContext';

const useAudio = () => {
    const [state, setState] = useContext(MusicContext);

    // handle skip forward button
    function nextSong() {
        console.log("next song");
        if (state.index < state.tracks.length - 1) {
            setState(state => ({ ...state, play: true, index: state.index + 1 }));
        } else {
            setState(state => ({ ...state, play: false, index: 0 }));
        }
    }

    // handle skip backward button
    function prevSong() {
        console.log("prev song");
        if (state.progress > 10 || state.index === 0) {
            state.audio.currentTime = 0;
        } else if (state.index > 0) {
            setState(state => ({ ...state, index: state.index - 1 }));
        }
        setState(state => ({ ...state, play: true }));
    }

    // when index is updated, change the active song and 
    // attach new event listeners
    useEffect(() => {
        setState(state => ({ ...state, activeSong: state.tracks[state.index] }));
        setState(state => ({ ...state, audioSrc: state.tracks[state.index].src }));
        state.audio.addEventListener('timeupdate', updateProgress);
        state.audio.addEventListener('ended', nextSong);
        return () => {
            state.audio.removeEventListener('timeupdate', updateProgress);
            state.audio.removeEventListener('ended', nextSong);
        };
    }, [state.index])

    // when audioSrc is updated, update the audio src and play
    useEffect(() => {
        state.audio.src = state.audioSrc;
        state.audio.currentTime = 0;
        if (state.play) state.audio.play();
    }, [state.audioSrc])

    // when play is updated, play/pause music accordingly
    useEffect(() => {
        state.play ? state.audio.play() : state.audio.pause();
    }, [state.play])

    // toggle play true/false
    function togglePlay() {
        setState(state => ({ ...state, play: !state.play }));
    }

    // update progress in accordance to audio's currentTime
    function updateProgress() {
        const duration = state.audio.duration;
        const currentTime = state.audio.currentTime;
        setState(state => ({ ...state, progress: (currentTime / duration) * 100 || 0 }));
        setState(state => ({ ...state, starttime: formatTime(currentTime) }));
    }

    // handle progress slider input
    function adjustProgress(e) {
        const newTime = state.audio.duration * (parseFloat(e[0]) / 100);
        state.audio.currentTime = newTime;
        setState(state => ({ ...state, progress: parseFloat(e[0]) / 100 }));
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
        adjustProgress,
        formatTime,
        progress: state.progress,
        activeSong: state.activeSong,
        starttime: state.starttime,
        play: state.play,
        audio: state.audio
    }
};

export default useAudio;