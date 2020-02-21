import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import {
  Button,
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
  FiSkipBack,
  FiSkipForward,
  FiShuffle,
  FiRepeat
} from "react-icons/fi";
import Playlist from "./Playlist.js";
import testaudio from './assets/audio/SHY Martin - Good Together.mp3'
import testaudio2 from './assets/audio/Ráptame - Reik.mp3'

function App() {
  return (
    <div className="App">
      <Header />
      <Controller />
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false)

  function toggle() {
    setOpen(!open);
  }

  return (
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
  );
}

function Controller() {
  const [index, setIndex] = useState(0);
  const [audioSrc, setAudioSrc] = useState(Playlist[index].src);
  const [audio] = useState(new Audio(audioSrc));
  const [play, setPlay] = useState(false);
  const [progress, setProgress] = useState(0.0);
  const [activeSong, setActiveSong] = useState(0);

  function nextSong() {
    console.log("next song");
    if (index < Playlist.length - 1) {
      console.log(index);
      setIndex(index + 1);
      console.log(index);
    } 
  }

  function prevSong() {
    console.log("prev song");
    if (progress > 10) {
      audio.currentTime = 0;
    } else if (index > 0) {
      console.log(index);
      setIndex(index - 1);
      console.log(index);
    } 
  }

  useEffect(() => {
    setActiveSong(Playlist[index]);
    setAudioSrc(Playlist[index].src);
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', () => setPlay(false));
    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', () => setPlay(false));
    };
  }, [index])

  useEffect(() => {
    audio.src = audioSrc;
    audio.currentTime = 0;
    if (play) audio.play();
  }, [audioSrc])

  useEffect(() => {
    play ? audio.play() : audio.pause();
  }, [play])

  function togglePlay() {
    setPlay(!play); 
  }

  function updateProgress() {
    const duration = audio.duration;
    const currentTime = audio.currentTime;
    setProgress((currentTime / duration) * 100 || 0);
  }

  function adjustProgress(e) {
    const newTime = audio.duration * (parseFloat(e[0]) / 100);
    audio.currentTime = newTime;
    setProgress(parseFloat(e[0]) / 100);
  }

  return (
    <div className="Controller">
      <div className="MusicInfo">
        <img src={activeSong.cover} className="img-coverart" alt="cover art" />
        <div className="txt-subtitle">{activeSong.artist}</div>
        <div className="txt-title">{activeSong.title}</div>
      </div>
      <div className="control-row">
        <button className="btn-icon"><FiShuffle className="icon" /></button>
        <button 
          className="btn-control"
          onClick={prevSong}
        ><FiSkipBack className="icon" /></button>
        <button className="btn-play"
          onClick={togglePlay}
        >
          <FiPlay className="largeicon" />
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
    </div>
  );
}

export default App;
