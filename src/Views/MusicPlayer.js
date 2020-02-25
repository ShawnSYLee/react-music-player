import React, { useState } from 'react';
import '../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import PlayIcon from '../assets/icons/play.svg';
import SkipForwardIcon from '../assets/icons/skipforward.svg';
import SkipBackwardIcon from '../assets/icons/skipbackward.svg';
import ShuffleIcon from '../assets/icons/shuffle.svg';
import RepeatIcon from '../assets/icons/repeat.svg';
import BackIcon from '../assets/icons/back.svg';
import PlusIcon from '../assets/icons/plus.svg';
import PauseIcon from '../assets/icons/pause.svg';

import {
  FiChevronLeft,
  FiPlus,
  FiPlay,
  FiPause,
  FiSkipBack,
  FiSkipForward,
  FiShuffle,
  FiRepeat
} from "react-icons/fi";
import { usePalette } from 'react-palette';
import { Link } from 'react-router-dom';

import ProgressSlider from "../Components/ProgressSlider"
import useAudio from "../Hooks/useAudio";

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
    repeat
  } = useAudio();
  const { data } = usePalette(activeSong.cover)
  const [open, setOpen] = useState(false)

  function toggle() {
    setOpen(!open);
  }

  function handleRepeatButton() {
    switch(repeat) {
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
      <div className="Header">
        <Link to="/playlist">
          <button className="btn-topicon">
            <img src={BackIcon} className="icon" />
          </button>
        </Link>
        <span className="txt-label">Player</span>
        <button className="btn-righticon" onClick={toggle}>
          <img src={PlusIcon} className="icon" style={{ transform: open ? 'rotate(135deg)' : 'none' }} />
        </button>
      </div>
      <div className="droptest" style={{ display: open ? 'block' : 'none', animationDirection: open ? 'normal' : 'reverse' }}>
        <div className="drop-button-container">
          <button className="drop-button">Add to Playlist</button>
          <button className="drop-button">Add to Queue</button>
          <button className="drop-button">View Album</button>
          <button className="drop-button">View Artist</button>
        </div>
      </div>
      <div className="AlbumContainer">
        <img src={activeSong.cover} className="img-coverart" alt="cover art" />
      </div>
      <div style={{ backgroundImage: 'radial-gradient(at 50% bottom ,' + data.lightMuted + ', rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))' }} className="Controller">
        <div className="txt-subtitle">{activeSong.artist.join(', ')}</div>
        <div className="txt-title">{activeSong.title}</div>
        <div className="control-row">
          <button
            className="btn-icon"
            style={{ color: shuffle ? data.lightVibrant : '' }}
            onClick={toggleShuffle}
          >
            <img src={ShuffleIcon} className="icon" />
          </button>
          <button
            className="btn-control"
            onClick={prevSong}
          >
            <img src={SkipBackwardIcon} className="icon" />
          </button>
          <button className="btn-play"
            style={{ backgroundColor: data.lightVibrant }}
            onClick={togglePlay}
          >
            {play === false && <img src={PlayIcon} className="playicon" />}
            {play === true && <img src={PauseIcon} className="largeicon" />}
          </button>
          <button
            className="btn-control"
            onClick={handleNextButton}
          >
            <img src={SkipForwardIcon} className="icon" />
          </button>
          <button
            className="btn-icon"
            onClick={handleRepeatButton}
          >
            <img src={RepeatIcon} className="icon" />
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
