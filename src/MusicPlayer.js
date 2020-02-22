import React, { useState } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Slider
} from "shards-react";
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
import useAudio from "./useAudio";
import { usePalette } from 'react-palette';
import { Link } from 'react-router-dom';

const MusicPlayer = () => {
  const {
    nextSong,
    prevSong,
    togglePlay,
    adjustProgress,
    progress,
    activeSong,
    starttime,
    play,
    audio,
    formatTime
  } = useAudio();
  const { data, loading, error } = usePalette(activeSong.cover)
  const [open, setOpen] = useState(false)

  function toggle() {
    setOpen(!open);
  }

  return (
    <>
      <div className="Header">
        <Link to="/">
          <button className="btn-icon">
            <FiChevronLeft className="icon" />
          </button>
        </Link>
        <span className="txt-label">Player</span>
        <Dropdown open={open} toggle={toggle} className="dropdown-plus">
          <DropdownToggle pill theme="light">
            <FiPlus className="icon" />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>Add to Playlist</DropdownItem>
            <DropdownItem>Add to Queue</DropdownItem>
            <DropdownItem>View Album</DropdownItem>
            <DropdownItem>View Artist</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      {/* <div className="droptest">
        <div className="drop-button-container">
          <button className="drop-button">Add to Playlist</button>
          <button className="drop-button">Add to Queue</button>
          <button className="drop-button">View Album</button>
          <button className="drop-button">View Artist</button>
        </div>
      </div> */}
      <div className="AlbumContainer">
        <img src={activeSong.cover} className="img-coverart" alt="cover art" />
      </div>
      <div style={{ backgroundImage: 'radial-gradient(circle at 50% bottom ,' + data.lightMuted + ', rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))' }} className="Controller">
        <div className="txt-subtitle">{activeSong.artist}</div>
        <div className="txt-title">{activeSong.title}</div>
        <div className="control-row">
          <button className="btn-icon"><FiShuffle className="icon" /></button>
          <button
            className="btn-control"
            onClick={prevSong}
          ><FiSkipBack className="icon" /></button>
          <button className="btn-play"
            style={{ backgroundColor: data.lightVibrant }}
            onClick={togglePlay}
          >
            {play === false && <FiPlay className="playicon" />}
            {play === true && <FiPause className="largeicon" />}
          </button>
          <button
            className="btn-control"
            onClick={nextSong}
          ><FiSkipForward className="icon" /></button>
          <button className="btn-icon"><FiRepeat className="icon" /></button>
        </div>
        <Slider
          onSlide={adjustProgress}
          start={[progress]}
          connect={[true, false]}
          range={{ min: 0, max: 100 }}
        />
        <div className="time-row">
          <div className="left-time">{starttime}</div>
          <div className="right-time">{formatTime(audio.duration)}</div>
        </div>
      </div>
    </>
  );
}

export default MusicPlayer;
