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
import useAudio from "./useAudio"

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
  const [open, setOpen] = useState(false)

  function toggle() {
    setOpen(!open);
  }

  return (
    <>
      <div className="Header">
        <button className="btn-icon">
          <FiChevronLeft className="icon" />
        </button>
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
      <div className="AlbumContainer">
        <img src={activeSong.cover} className="img-coverart" alt="cover art" />
      </div>
      <div className="Controller">
        <div className="txt-subtitle">{activeSong.artist}</div>
        <div className="txt-title">{activeSong.title}</div>
        <div className="control-row">
          <button className="btn-icon"><FiShuffle className="icon" /></button>
          <button
            className="btn-control"
            onClick={prevSong}
          ><FiSkipBack className="icon" /></button>
          <button className="btn-play"
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
