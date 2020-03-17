import React, { useState, useContext } from 'react';
import { usePalette } from 'react-palette';
import { useHistory } from 'react-router-dom';
import { ThemeContext } from '../Contexts/ThemeContext';

import ProgressSlider from "../Components/ProgressSlider"

import useAudio from "../Hooks/useAudio";

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
    const {
        nextSong,
        prevSong,
        togglePlay,
        progress,
        activeSong,
        toggleShuffle,
        setRepeat,
        play,
        shuffle,
        repeat,
        addToPlaylist
    } = useAudio();
    const [theme, setTheme] = useContext(ThemeContext);
    const { data } = usePalette(activeSong.thumbs[0]);
    const [open, setOpen] = useState(false);
    let history = useHistory();

    function toggle() {
        setOpen(!open);
    }

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
            {/* DROPDOWN MODAL */}
            <div className="droptest"
                style={{
                    display: open ? 'block' : 'none',
                    animationDirection: open ? 'normal' : 'reverse'
                }}
            >
                <div className="drop-button-container">
                    <button className="drop-button"
                        onClick={() => {
                            addToPlaylist("VOzWtitC47ReMccAjoh0", activeSong.id);
                            toggle();
                        }}
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
                style={{ display: open ? 'block' : 'none' }}
                onClick={toggle}
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
                    onClick={toggle}
                >
                    <img className="icon"
                        src={PlusIcon}
                        alt="plus button"
                        style={{ transform: open ? 'rotate(135deg)' : 'none' }}
                    />
                </button>
            </div>

            {/* ALBUM ART */}
            <div className="AlbumContainer">
                <img className="img-coverart"
                    src={activeSong.thumbs[1]}
                    alt="cover art"
                />
            </div>
            
            {/* ALBUM INFO AND CONTROLLER */}
            <div className="Controller"
                style={{
                    backgroundImage: theme.theme === 'light' ? 'radial-gradient(at 50% bottom ,' + data.lightMuted + ', rgba(255, 255, 255, 0), rgba(255, 255, 255, 0))' : 'linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1))'
                }}
            >
                <div className="txt-subtitle">{activeSong.artist.join(', ')}</div>
                <div className="txt-title">{activeSong.title}</div>
                
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
                        {play === false && <img className="playicon" 
                            src={PlayIcon}
                            alt="play button"
                        />}
                        {play === true && <img className="largeicon"
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
                    value={progress}
                    color={data.muted}
                    accent={data.lightVibrant}
                />
            </div>
        </>
    );
}

export default MusicPlayer;
