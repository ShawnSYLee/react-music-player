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
  FiPause,
  FiSkipBack,
  FiSkipForward,
  FiShuffle,
  FiRepeat
} from "react-icons/fi";
import Playlist from "../data/Playlist";
import { MusicContext } from "../MusicContext"

// Backup of MusicPlayer without using a custom hook.

const Header = () => {
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

const MusicPlayer = () => {
  const [index, setIndex] = useState(0);
  const [audioSrc, setAudioSrc] = useState(Playlist[index].src);
  const [audio] = useState(new Audio(audioSrc));
  const [play, setPlay] = useState(false);
  const [progress, setProgress] = useState(0.0);
  const [activeSong, setActiveSong] = useState(0);
  const [starttime, setStarttime] = useState('0:00');

  // handle skip forward button
  function nextSong() {
    console.log("next song");
    if (index < Playlist.length - 1) {
      setIndex(index + 1);
      setPlay(true);
    } else {
      setPlay(false);
      setIndex(0);
    }
  }

  // handle skip backward button
  function prevSong() {
    console.log("prev song");
    if (progress > 10 || index == 0) {
      audio.currentTime = 0;
    } else if (index > 0) {
      setIndex(index - 1);
    }
    setPlay(true);
  }

  // when index is updated, change the active song and 
  // attach new event listeners
  useEffect(() => {
    setActiveSong(Playlist[index]);
    setAudioSrc(Playlist[index].src);
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', nextSong);
    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', nextSong);
    };
  }, [index])

  // when audioSrc is updated, update the audio src and play
  useEffect(() => {
    audio.src = audioSrc;
    audio.currentTime = 0;
    if (play) audio.play();
  }, [audioSrc])

  // when play is updated, play/pause music accordingly
  useEffect(() => {
    play ? audio.play() : audio.pause();
  }, [play])

  // toggle play true/false
  function togglePlay() {
    setPlay(!play);
  }

  // update progress in accordance to audio's currentTime
  function updateProgress() {
    const duration = audio.duration;
    const currentTime = audio.currentTime;
    setProgress((currentTime / duration) * 100 || 0);
    setStarttime(formatTime(currentTime));
  }

  // handle progress slider input
  function adjustProgress(e) {
    const newTime = audio.duration * (parseFloat(e[0]) / 100);
    audio.currentTime = newTime;
    setProgress(parseFloat(e[0]) / 100);
  }

  function formatTime(time) {
    if (isNaN(time) || time === 0) {
      return '0:00';
    }
    const mins = Math.floor(time / 60);
    const secs = (time % 60).toFixed();
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  return (
    <>
      <Header />
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
            {play == false && <FiPlay className="playicon" />}
            {play == true && <FiPause className="largeicon" />}
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
