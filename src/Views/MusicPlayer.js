import React, { useState, useContext } from 'react';
import { usePalette } from 'react-palette';
import { useHistory } from 'react-router-dom';

import { MusicContext } from '../Contexts/MusicContext';
import { DisplayContext } from '../Contexts/DisplayContext';
import { ThemeContext } from '../Contexts/ThemeContext';

import ProgressSlider from "../Components/ProgressSlider"
import { PlaylistPicker } from '../Components/PlaylistPicker';

import useAudio from "../Hooks/useAudio";
import useDisplay from "../Hooks/useDisplay";

import PlayIcon from '../assets/icons/play.svg';
import SkipForwardIcon from '../assets/icons/skipforward.svg';
import SkipBackwardIcon from '../assets/icons/skipbackward.svg';
import ShuffleIcon from '../assets/icons/shuffle.svg';
import RepeatIcon from '../assets/icons/repeat.svg';
import BackIcon from '../assets/icons/back.svg';
import PlusIcon from '../assets/icons/plus.svg';
import PauseIcon from '../assets/icons/pause.svg';

import '../Styles/App.css';
// import '../Styles/MusicPlayerM.css';
import '../Styles/MusicPlayer.css';

const MusicPlayer = () => {
    const [state] = useContext(MusicContext);
    const [display] = useContext(DisplayContext);
    const [theme] = useContext(ThemeContext);
    const {
        nextSong,
        prevSong,
        togglePlay,
        toggleShuffle,
        setRepeat,
        play,
        shuffle,
        repeat
    } = useAudio();
    const {
        openModal,
        closeModal,
        openPlaylistPicker
    } = useDisplay();
    const { data } = usePalette(state.activeSong.thumbs[0]);
    let history = useHistory();

    function handleRepeatButton() {
        switch (repeat) {
            case 'none':
                setRepeat('repeat');
                break;
            case 'repeat':
                setRepeat('repeatsong');
                break;
            case 'repeatsong':
                setRepeat('none');
                break;
        }
    }

    function handleNextButton() {
        if (repeat === 'repeatsong') {
            setRepeat('repeat');
        }
        nextSong();
    }

    return (
        <>
            <PlaylistPicker />

            {/* DROPDOWN MODAL */}
            <div className="droptest"
                style={{
                    display: display.inModal ? 'block' : 'none',
                    animationDirection: display.inModal ? 'normal' : 'reverse'
                }}
            >
                <div className="drop-button-container">
                    <button className="drop-button"
                        onClick={openPlaylistPicker}
                    >
                        Add to Playlist
          </button>
                    <button className="drop-button">Add to Queue</button>
                    <button className="drop-button">View Album</button>
                    <button className="drop-button">View Artist</button>
                </div>
            </div>

            {/* MODAL TOUCH BLOCKER */}
            <div className="TouchBlocker"
                style={{ display: display.inModal ? 'block' : 'none' }}
                onClick={closeModal}
            />

            {/* HEADER NAVIGATION */}
            <div className="MusicPlayerHeader">
                <button className="btn-topicon"
                    onClick={() => history.goBack()}
                >
                    <img className="icon"
                        src={BackIcon}
                        alt="back button"
                    />
                </button>
                <span className="txt-label">Player</span>
                <button className="btn-righticon"
                    onClick={openModal}
                >
                    <img className="icon"
                        src={PlusIcon}
                        alt="plus button"
                        style={{ transform: display.inModal ? 'rotate(135deg)' : 'none' }}
                    />
                </button>
            </div>

            {/* ALBUM ART */}
            <div className="AlbumContainer">
                <img className="img-coverart"
                    src={state.activeSong.thumbs[1]}
                    alt="cover art"
                />
            </div>
            
            {/* ALBUM INFO AND CONTROLLER */}
            <div className="Controller"
                style={{
                    backgroundImage: theme.theme === 'light' ? 'radial-gradient(at 50% bottom ,' + data.lightMuted + ', rgba(255, 255, 255, 0), rgba(255, 255, 255, 0))' : 'linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1))'
                }}
            >
                <div className="txt-subtitle">{state.activeSong.artist.join(', ')}</div>
                <div className="txt-title">{state.activeSong.title}</div>
                
                <div className="control-row">
                    <button
                        className="btn-icon"
                        style={{ color: shuffle ? data.lightVibrant : '' }}
                        onClick={toggleShuffle}
                    >
                        <img className="icon"
                            src={ShuffleIcon}
                            alt="shuffle button"
                        />
                    </button>
                    <button
                        className="btn-control"
                        onClick={prevSong}
                    >
                        <img className="icon"
                            src={SkipBackwardIcon}
                            alt="skip back button"
                        />
                    </button>
                    <button className="btn-play"
                        style={{ backgroundColor: data.lightVibrant }}
                        onClick={togglePlay}
                    >
                        {state.play === false && <img className="playicon" 
                            src={PlayIcon}
                            alt="play button"
                        />}
                        {state.play === true && <img className="largeicon"
                            src={PauseIcon}
                            alt="pause button"
                        />}
                    </button>
                    <button
                        className="btn-control"
                        onClick={handleNextButton}
                    >
                        <img className="icon"
                            src={SkipForwardIcon}
                            alt="skip forward button"
                        />
                    </button>
                    <button
                        className="btn-icon"
                        onClick={handleRepeatButton}
                    >
                        <img className="icon"
                            src={RepeatIcon}
                            alt="repeat button"    
                        />
                    </button>
                </div>

                <ProgressSlider
                    color={data.muted}
                    accent={data.lightVibrant}
                />
            </div>
        </>
    );
}

export default MusicPlayer;
